<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInvestmentTable extends Migration
{
    public function up()
    {
        Schema::create('investment', function (Blueprint $table) {
            $table->id('investment_id');
            $table->foreignId('investment_type_id')->constrained('investment_type', 'investment_type_id');
            $table->string('investment_name');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('investment');
    }
}
