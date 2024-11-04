<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInvestmentSummaryTable extends Migration
{
    public function up()
    {
        Schema::create('investment_summary', function (Blueprint $table) {
            $table->id('summary_id');
            $table->foreignId('investment_id')->constrained('investment', 'investment_id');
            $table->integer('year');
            $table->integer('total_quantity');
            $table->decimal('total_spent', 10, 2);
            $table->decimal('average_price', 10, 2);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('investment_summary');
    }
}
