<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateWalletInvestmentTable extends Migration
{
    public function up()
    {
        Schema::create('wallet_investment', function (Blueprint $table) {
            $table->id('wallet_investment_id');
            $table->unsignedBigInteger('wallet_id');
            $table->unsignedBigInteger('investment_id');
            $table->decimal('average_price', 10, 2);
            $table->integer('total_quantity');
            $table->decimal('total_invested', 10, 2);
            $table->foreign('wallet_id')->references('wallet_id')->on('wallet')->onDelete('cascade');
            $table->foreign('investment_id')->references('investment_id')->on('investment')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('wallet_investment');
    }
}

