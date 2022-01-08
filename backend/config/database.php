<?php

return [
    'default' => 'webuidata',

    'connections' => [
        'surf' => [
            'driver'    => 'mysql',
            'host'      => env('DB_SURF_HOST'),
            'port'      => env('DB_SURF_PORT'),
            'database'  => env('DB_SURF_DATABASE'),
            'username'  => env('DB_SURF_USERNAME'),
            'password'  => env('DB_SURF_PASSWORD'),
            'charset'   => 'utf8mb4',
            'collation' => 'utf8mb4_unicode_ci',
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
            'charset'   => 'utf8mb4',
            'collation' => 'utf8mb4_unicode_ci',
            'prefix'    => '',
            'strict'    => false,
        ],
        'webuidata' => [
            'driver'    => 'mysql',
            'host'      => env('DB_WEBUIDATA_HOST'),
            'port'      => env('DB_WEBUIDATA_PORT'),
            'database'  => env('DB_WEBUIDATA_DATABASE'),
            'username'  => env('DB_WEBUIDATA_USERNAME'),
            'password'  => env('DB_WEBUIDATA_PASSWORD'),
            'charset'   => 'utf8mb4',
            'collation' => 'utf8mb4_unicode_ci',
            'prefix'    => '',
            'strict'    => false,
        ],
    ],
    'migrations' => 'migrations'
];
