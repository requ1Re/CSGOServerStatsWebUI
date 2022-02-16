<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return 'Welcome';
});

$router->group(['prefix' => 'v1'], function () use ($router) {
    $router->get('cron/accounts', ['uses' => 'CronController@cronAccounts']);
    $router->get('cron/names', ['uses' => 'CronController@cronNames']);

    $router->get('users/{steam_ids}', ['uses' => 'NameController@requestNames']);

    $router->group(['prefix' => 'server'], function () use ($router) {
        $router->get('/', ['uses' => 'ServersController@showServers']);
        $router->group(['prefix' => 'surf'], function () use ($router) {
            $router->get('leaderboard', ['uses' => 'StatsController@showSurf']);
            $router->get('leaderboard/map/{map_name}', ['uses' => 'StatsController@showSurfMap']);
            $router->get('stats/player/{steamId}', ['uses' => 'StatsController@showSurfPlayer']);
        });
        $router->group(['prefix' => 'kz'], function () use ($router) {
            $router->get('leaderboard', ['uses' => 'StatsController@showKZ']);
            $router->get('leaderboard/map/{map_name}', ['uses' => 'StatsController@showKZMap']);
            $router->get('stats/player/{steamId}', ['uses' => 'StatsController@showKZPlayer']);
        });
        $router->group(['prefix' => 'retakes'], function () use ($router) {
            $router->get('stats', ['uses' => 'StatsController@showRetake']);
        });
    });
});
