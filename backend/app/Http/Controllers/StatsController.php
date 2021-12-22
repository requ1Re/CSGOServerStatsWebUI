<?php

namespace App\Http\Controllers;

class StatsController extends Controller
{
    public function showSurf()
    {
        $obj = new \StdClass();
        $obj->mapLeaderboard = app('db')->connection('surf')->table('ck_playertimes')->orderBy('runtimepro', 'asc')->get()->unique('mapname')->values()->all();

        $objPlayerLeaderboard = new \StdClass();
        $objPlayerLeaderboard->points = app('db')->connection('surf')->table('ck_playerrank')
            ->select('steamid', 'name', 'country', 'points')
            ->orderBy('points', 'desc')->limit(10)->get();

        $objPlayerLeaderboard->finishedMaps = app('db')->connection('surf')->table('ck_playerrank')
            ->select('steamid', 'name', 'country', 'finishedmapspro')
            ->orderBy('finishedmapspro', 'desc')->limit(10)->get();

        $obj->playerLeaderboard = $objPlayerLeaderboard;

        return response()->json($obj);
    }


    public function showSurfMap($map_name)
    {
        return response()->json(app('db')->connection('surf')->table('ck_playertimes')->where('mapname', $map_name)->orderBy('runtimepro', 'asc')->limit(10)->get());
    }
}
