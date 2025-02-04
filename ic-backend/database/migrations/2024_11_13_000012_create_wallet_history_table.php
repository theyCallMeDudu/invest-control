<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateWalletHistoryTable extends Migration
{
    public function up()
    {
        Schema::create('wallet_history', function (Blueprint $table) {
            $table->id('wallet_history_id');
            $table->unsignedBigInteger('wallet_id');
            $table->timestamp('date')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->unsignedBigInteger('operation_id');
            $table->foreign('wallet_id')->references('wallet_id')->on('wallet')->onDelete('cascade');
            $table->foreign('operation_id')->references('operation_id')->on('operation')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('wallet_history');
    }
}
