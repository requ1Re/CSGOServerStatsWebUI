<?php

namespace App\Http\Controllers;

use App\Models\Wrapper;

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

        $wrapper = new Wrapper();
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

        $wrapper = new Wrapper();
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

        $wrapper = new Wrapper();

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

    public function showKZ()
    {
        $obj = new \StdClass();

        $objMapLeaderboard = new \StdClass();
        $objMapLeaderboard->tp = app('db')->connection('kz')->table('playertimes')
            ->select('steamid AS steamId', 'mapname AS mapName', 'name', 'runtime AS time', 'teleports AS teleports')
            ->where('runtime', '>', -1)
            ->orderBy('time', 'asc')->get()->unique('mapName')->values()->all();

        $objMapLeaderboard->pro = app('db')->connection('kz')->table('playertimes')
            ->select('steamid AS steamId', 'mapname AS mapName', 'name', 'runtimepro AS time')
            ->where('runtimepro', '>', -1)
            ->orderBy('time', 'asc')->get()->unique('mapName')->values()->all();

        $obj->mapLeaderboard = $objMapLeaderboard;

        $objPlayerLeaderboard = new \StdClass();
        $objPlayerLeaderboard->points = app('db')->connection('kz')->table('playerrank')
            ->select('steamid AS steamId', 'name', 'country', 'points')
            ->orderBy('points', 'desc')->limit(10)->get();

        $objPlayerLeaderboard->finishedMaps = app('db')->connection('kz')->table('playerrank')
            ->select(
                'steamid AS steamId',
                'name',
                'country',
                'finishedmaps AS finishedMaps',
                'finishedmapstp AS finishedMapsTP',
                'finishedmapspro AS finishedMapsPro'
            )
            ->orderBy('finishedMaps', 'desc')->limit(10)->get();

        $obj->playerLeaderboard = $objPlayerLeaderboard;

        $wrapper = new Wrapper();
        if ($obj->mapLeaderboard && $obj->playerLeaderboard) {
            $wrapper->success = true;
            $wrapper->data = $obj;
        } else {
            $wrapper->success = false;
            $wrapper->data = null;
        }

        return response()->json($wrapper);
    }

    public function showRetake() {
        $obj = new \StdClass();

        $obj->score = app('db')->connection('retakes')->table('rankme')
            ->select('steam AS steamId', 'name', 'score')
            ->orderBy('score', 'desc')->limit(10)->get();

        $obj->kills = app('db')->connection('retakes')->table('rankme')
            ->select('steam AS steamId', 'name', 'kills')
            ->orderBy('kills', 'desc')->limit(10)->get();

        $obj->mvp = app('db')->connection('retakes')->table('rankme')
            ->select('steam AS steamId', 'name', 'mvp')
            ->orderBy('mvp', 'desc')->limit(10)->get();

        $obj->noscopeDistance = app('db')->connection('retakes')->table('rankme')
            ->select('steam AS steamId', 'name', 'no_scope_dis AS distance')
            ->orderBy('no_scope_dis', 'desc')->limit(10)->get();

        $wrapper = new Wrapper();
        if ($obj->score && $obj->noscopeDistance && $obj->kills && $obj->mvp) {
            $wrapper->success = true;
            $wrapper->data = $obj;
        } else {
            $wrapper->success = false;
            $wrapper->data = null;
        }
        return response()->json($wrapper);
    }
}
