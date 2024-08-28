<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInvestmentOperationTable extends Migration
{
    public function up()
    {
        Schema::create('investment_operation', function (Blueprint $table) {
            $table->id('operation_id');
            $table->foreignId('investment_id')->constrained('investment', 'investment_id');
            $table->foreignId('operation_type')->constrained('operation_type', 'operation_type_id');
            $table->date('operation_date');
            $table->integer('quantity');
            $table->decimal('price_per_unit', 10, 2);
            $table->decimal('total_price', 10, 2);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('investment_operation');
    }
}
