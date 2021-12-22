<?php

namespace App\Http\Controllers;

class StatsController extends Controller
{
    public function showSurf()
    {

        $obj = new \StdClass();
        $obj->mapLeaderboard = app('db')->connection('surf')->table('ck_playertimes')
            ->select('steamid AS steamId', 'mapname AS mapName', 'name', 'runtimepro AS time')
            ->orderBy('runtimepro', 'asc')->get()->unique('mapName')->values()->all();

        $objPlayerLeaderboard = new \StdClass();
        $objPlayerLeaderboard->points = app('db')->connection('surf')->table('ck_playerrank')
            ->select('steamid AS steamId', 'name', 'country', 'points')
            ->orderBy('points', 'desc')->limit(10)->get();

        $objPlayerLeaderboard->finishedMaps = app('db')->connection('surf')->table('ck_playerrank')
            ->select('steamid AS steamId', 'name', 'country', 'finishedmapspro AS finishedMaps')
            ->orderBy('finishedMaps', 'desc')->limit(10)->get();

        $obj->playerLeaderboard = $objPlayerLeaderboard;

        $wrapper = new \StdClass();
        if ($obj->mapLeaderboard && $obj->playerLeaderboard) {
            $wrapper->success = true;
            $wrapper->data = $obj;
        } else {
            $wrapper->success = false;
            $wrapper->data = null;
        }

        return response()->json($wrapper);
    }


    public function showSurfMap($map_name)
    {
        $data = app('db')->connection('surf')->table('ck_playertimes')
            ->select('steamid AS steamId', 'mapname AS mapName', 'name', 'runtimepro AS time')
            ->where('mapname', $map_name)
            ->orderBy('runtimepro', 'asc')->limit(10)->get();

        $wrapper = new \StdClass();
        if ($data && count($data) > 0) {
            $wrapper->success = true;
            $wrapper->data = $data;
        } else {
            $wrapper->success = false;
            $wrapper->data = null;
        }

        return response()->json(
            $wrapper
        );
    }

    public function showSurfPlayer($steamId)
    {
        $stats = app('db')->connection('surf')->table('ck_playerrank')
            ->select('name', 'country', 'points', 'finishedmapspro AS finishedMaps')
            ->where('steamid', $steamId)->first();

        $wrapper = new \StdClass();

        $obj = new \StdClass();
        if ($stats) {
            $obj->name = $stats->name;
            $obj->country = $stats->country;
            $obj->points = $stats->points;
            $obj->finishedMaps = $stats->finishedMaps;

            $obj->bestMapTimes = app('db')->connection('surf')->table('ck_playertimes')
                ->select('mapname AS mapName', 'runtimepro AS time')
                ->where('steamid', $steamId)
                ->orderBy('runtimepro', 'asc')->get()->unique('mapName')->values()->all();

            $wrapper->success = true;
            $wrapper->data = $obj;
        } else {
            $wrapper->success = false;
            $wrapper->data = null;
        }


        return response()->json($wrapper);
    }
}
