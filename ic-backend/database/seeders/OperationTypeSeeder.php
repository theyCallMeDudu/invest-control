<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OperationTypeSeeder extends Seeder
{
    public function run()
    {
        DB::table('operation_type')->insert([
            ['operation_type_name' => 'Purchase'],
            ['operation_type_name' => 'Sell'],
        ]);
    }
}

