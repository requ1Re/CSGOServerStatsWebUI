<?php

namespace App\Http\Controllers;

use App\Models\Wrapper;

class ServersController extends Controller
{
    public function showServers() {
        $obj = [];
        $obj = app('db')->connection('webuidata')->table('servers')
            ->select('name', 'ip', 'gamemode')->get();

        foreach($obj as $key => $server){
            $ip = explode(':', $server->ip);
            $query = new \xPaw\SourceQuery\SourceQuery();
            $query->Connect($ip[0], $ip[1]);

            $info = $query->GetInfo();

            $queryObj = new \StdClass();
            $queryObj->hostname = $info['HostName'];
            $queryObj->map = $info['Map'];
            $queryObj->players = $info['Players'];
            $queryObj->maxPlayers = $info['MaxPlayers'];

            $obj[$key]->queryInfo = $queryObj;
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
