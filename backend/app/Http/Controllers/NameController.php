<?php

namespace App\Http\Controllers;

use App\Models\Wrapper;

class NameController extends Controller
{
    public function requestNames($steam_ids)
    {
        $steamIds = explode(',', $steam_ids);

        $wrapper = new Wrapper();

        $data = app('db')->connection('webuidata')
            ->table('usernames')
            ->whereIn('steam_id', $steamIds)
            ->select('steam_id AS steamId', 'community_id AS communityId', 'username')
            ->get();

        if ($data) {
            $wrapper->success = true;
            $wrapper->data = $data;
        } else {
            $wrapper->success = false;
            $wrapper->data = null;
        }


        return response()->json($wrapper);
    }
}
