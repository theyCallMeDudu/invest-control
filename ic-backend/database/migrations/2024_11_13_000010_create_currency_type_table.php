<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCurrencyTypeTable extends Migration
{
    public function up()
    {
        Schema::create('currency_type', function (Blueprint $table) {
            $table->id('currency_type_id');
            $table->string('currency_type_code', 3); // Ex: 'USD', 'EUR', 'BRL', following ISO 4217 standards
            $table->string('currency_type_symbol', 5); // Ex: 'R$', '$', '€' - for display purposes
            $table->string('currency_type_name'); // Ex: 'Euro', 'Real', 'Dollar'
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('currency_type');
    }
}
