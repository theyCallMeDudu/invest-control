<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInvestmentTypeTable extends Migration
{
    public function up()
    {
        Schema::create('investment_type', function (Blueprint $table) {
            $table->id('investment_type_id');
            $table->string('investment_type_name');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('investment_type');
    }
}
