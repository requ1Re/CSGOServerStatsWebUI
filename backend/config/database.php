<?php

return [
    'default' => 'surf',

    'connections' => [
        'surf' => [
            'driver'    => 'mysql',
            'host'      => env('DB_SURF_HOST'),
            'port'      => env('DB_SURF_PORT'),
            'database'  => env('DB_SURF_DATABASE'),
            'username'  => env('DB_SURF_USERNAME'),
            'password'  => env('DB_SURF_PASSWORD'),
            'charset'   => 'utf8',
            'collation' => 'utf8_unicode_ci',
            'prefix'    => '',
            'strict'    => false,
        ],
        'kz' => [
            'driver'    => 'mysql',
            'host'      => env('DB_KZ_HOST'),
            'port'      => env('DB_KZ_PORT'),
            'database'  => env('DB_KZ_DATABASE'),
            'username'  => env('DB_KZ_USERNAME'),
            'password'  => env('DB_KZ_PASSWORD'),
            'charset'   => 'utf8',
            'collation' => 'utf8_unicode_ci',
            'prefix'    => '',
            'strict'    => false,
        ],
    ],
];
