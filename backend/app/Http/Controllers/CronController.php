<?php

namespace App\Http\Controllers;

use App\Helpers\SteamIDHelper;

class CronController extends Controller
{
    public function cronAccounts()
    {
        $dbUsers = app('db')->connection('webuidata')->table('usernames')->pluck('steam_id');

        $surfUsers = app('db')->connection('surf')
            ->table('ck_playerrank')
            ->select('steamid', 'name')
            ->where('steamid', '!=', '')
            ->whereNotIn('steamid', $dbUsers)
            ->get();

        $kzUsers = app('db')->connection('kz')
            ->table('playerrank')
            ->select('steamid', 'name')
            ->where('steamid', '!=', '')
            ->whereNotIn('steamid', $dbUsers)
            ->get();

        foreach ($surfUsers as $surfUser) {
            if (
                app('db')->connection('webuidata')->table('usernames')->where('steam_id', $surfUser->steamid)->doesntExist()
                && isset($surfUser->steamid)
                && isset($surfUser->name)
            ) {
                app('db')->connection('webuidata')->table('usernames')->insert([
                    'steam_id' => $surfUser->steamid,
                    'community_id' => SteamIDHelper::convertSteamID2ToCommunityID($surfUser->steamid),
                    'username' => $surfUser->name,
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s')
                ]);
            }
        }

        foreach ($kzUsers as $kzUser) {
            if (
                app('db')->connection('webuidata')->table('usernames')->where('steam_id', $kzUser->steamid)->doesntExist()
                && isset($kzUser->steamid)
                && isset($kzUser->name)
            ) {
                app('db')->connection('webuidata')->table('usernames')->insert([
                    'steam_id' => $kzUser->steamid,
                    'community_id' => SteamIDHelper::convertSteamID2ToCommunityID($kzUser->steamid),
                    'username' => $kzUser->name,
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s')
                ]);
            }
        }

        return response()->json(['success' => true, 'inserted' => [
            'surf' => count($surfUsers), 'kz' => count($kzUsers)
        ]]);
    }


    public function cronNames()
    {
        $key = env('STEAM_API_KEY');

        $dbUsers = app('db')->connection('webuidata')->table('usernames')->get()->toArray();

        $steamRequests = 0;
        $dbRequests = 0;
        $dbUsersChunks = array_chunk($dbUsers, 80);
        foreach ($dbUsersChunks as $dbUserChunk) {
            $ids = [];

            foreach ($dbUserChunk as $dbUser) {
                $ids[] = $dbUser->community_id;
            }
            $idList = implode(',', $ids);
            $url = 'http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=' . $key . '&steamids=' . $idList;
            $response = json_decode(file_get_contents($url), flags: JSON_INVALID_UTF8_SUBSTITUTE);

            $steamRequests += 1;

            // search user in dbUserChunk by community_id and update name
            foreach ($response->response->players as $player) {
                foreach ($dbUserChunk as $dbUser) {
                    if ($dbUser->community_id == $player->steamid) {
                        if($dbUser->username <> $player->personaname){
                            app('db')->connection('webuidata')->table('usernames')->where('community_id', $player->steamid)->update([
                                'username' => $player->personaname
                            ]);
                            $dbRequests += 1;
                        }
                    }
                }
            }



        }

        return response()->json(['success' => true, 'requests' => ['steam' => $steamRequests, 'db' => $dbRequests]]);
    }
}
