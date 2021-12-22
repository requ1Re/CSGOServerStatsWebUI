<?php

namespace App\Http\Controllers;

class StatsController extends Controller
{
    public function showSurf()
    {
        return response()->json(app('db')->connection('surf')->table('ck_playertimes')->get());
    }
}
