<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use App\Models\Wrapper;

class ServersController extends Controller
{
    public function showServers() {
        $obj = [];
        $obj = app('db')->connection('webuidata')->table('servers')
            ->select('name', 'ip', 'gamemode')->get();

        foreach($obj as $key => $server){
            $ip = explode(':', $server->ip);

            try {
                $query = new \xPaw\SourceQuery\SourceQuery();
                $query->Connect($ip[0], $ip[1]);

                $info = $query->GetInfo();

                $queryObj = new \StdClass();
                $queryObj->hostname = $info['HostName'];

                $mapObj = new \StdClass();
                if(str_starts_with($info['Map'], "workshop")){
                    $mapObj->name = explode('/', $info['Map'])[2];
                    $mapObj->workshop = true;

                    $steamResponse = Http::asForm()->post('https://api.steampowered.com/ISteamRemoteStorage/GetPublishedFileDetails/v1/', [
                        'itemcount' => 1,
                        'publishedfileids[0]' => explode('/', $info['Map'])[1],
                    ]);

                    if($steamResponse->successful()){
                        $mapObj->preview = $steamResponse->object()->response->publishedfiledetails[0]->preview_url;
                    }
                }else{
                    $mapObj->name = $info['Map'];
                    $mapObj->workshop = false;
                }



                $queryObj->map = $mapObj;
                $queryObj->players = $info['Players'];
                $queryObj->maxPlayers = $info['MaxPlayers'];

                $obj[$key]->queryInfo = $queryObj;
                $obj[$key]->status = "ONLINE";
            }catch(\Exception $ex){
                $obj[$key]->status = "OFFLINE";
            }
        }

        $wrapper = new Wrapper();
        if ($obj) {
            $wrapper->success = true;
            $wrapper->data = $obj;
        } else {
            $wrapper->success = false;
            $wrapper->data = null;
        }

        return response()->json($wrapper);
    }
}
