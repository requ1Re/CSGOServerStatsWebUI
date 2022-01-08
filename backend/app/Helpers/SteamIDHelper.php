<?php // Code within app\Helpers\Helper.php

namespace App\Helpers;

class SteamIDHelper
{
    public static function convertSteamID2ToCommunityID($steamId)
    {
        $accountId = 0;

        if (preg_match('/^STEAM_[0-9]:([0-9]):([0-9]+)$/i', $steamId, $matches)) {
            $accountId = $matches[1] + ($matches[2] * 2);
        }
        if (preg_match('/^\[U:[0-9]:([0-9]+)\]$/i', $steamId, $matches)) {
            $accountId = $matches[1];
        }

        return gmp_strval(gmp_add('76561197960265728', $accountId));
    }
}
