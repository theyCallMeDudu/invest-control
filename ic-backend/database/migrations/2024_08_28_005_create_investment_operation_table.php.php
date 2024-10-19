<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateInvestmentOperationTable extends Migration
{
    public function up()
    {
        Schema::create('investment_operation', function (Blueprint $table) {
            $table->id('investment_operation_id');
            $table->foreignId('investment_id')->constrained('investment', 'investment_id');
            $table->foreignId('operation_type_id')->constrained('operation_type', 'operation_type_id');
            $table->foreignId('currency_type_id')->constrained('currency_type', 'currency_type_id');

            // Define operation_date with default value of the current date and time
            $table->date('operation_date')->default(DB::raw('CURRENT_DATE'));

            $table->integer('quantity');
            $table->decimal('unit_price', 10, 2);
            $table->decimal('operation_value', 10, 2);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('investment_operation');
    }
}
