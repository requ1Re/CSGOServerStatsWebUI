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
    $router->group(['prefix' => 'server'], function () use ($router) {
        $router->group(['prefix' => 'surf'], function () use ($router) {
            $router->get('stats', ['uses' => 'StatsController@showSurf']);
        });
        $router->group(['prefix' => 'kz'], function () use ($router) {
            $router->get('stats', ['uses' => 'StatsController@showKZ']);
        });
        $router->group(['prefix' => 'retake'], function () use ($router) {
            $router->get('stats', ['uses' => 'StatsController@showRetake']);
        });
    });
});
