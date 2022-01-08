<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsernamesTable extends Migration
{
    protected $table = 'usernames';

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::connection('webuidata')->create('usernames', function (Blueprint $table) {
            $table->id();
            $table->string('steam_id')->unique();
            $table->string('community_id')->unique();
            $table->string('username');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::connection('webuidata')->dropIfExists('usernames');
    }
}
