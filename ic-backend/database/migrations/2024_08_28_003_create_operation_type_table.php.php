<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOperationTypeTable extends Migration
{
    public function up()
    {
        Schema::create('operation_type', function (Blueprint $table) {
            $table->id('operation_type_id');
            $table->string('operation_type_name');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('operation_type');
    }
}
