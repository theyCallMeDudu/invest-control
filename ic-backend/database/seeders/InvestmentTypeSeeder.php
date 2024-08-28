<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class InvestmentTypeSeeder extends Seeder
{
    public function run()
    {
        DB::table('investment_type')->insert([
            ['investment_type_name' => 'REIT'],
            ['investment_type_name' => 'Stock'],
        ]);
    }
}
