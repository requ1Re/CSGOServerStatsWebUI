<?php

namespace App\Http\Controllers;

class StatsController extends Controller
{
    public function showSurf()
    {
        $obj = new \StdClass();
        $obj->mapLeaderboard = app('db')->connection('surf')->table('ck_playertimes')->orderBy('runtimepro', 'asc')->get()->unique('mapname')->values()->all();
        $obj->playerLeaderboard = app('db')->connection('surf')->table('ck_playerrank')
                        ->select('steamid', 'name', 'country', 'points', 'finishedmaps', 'lastseen')
                        ->orderBy('points', 'desc')->limit(10)->get();

        return response()->json($obj);
    }
}
