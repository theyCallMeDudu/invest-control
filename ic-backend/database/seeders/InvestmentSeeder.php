<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class InvestmentSeeder extends Seeder
{
    public function run()
    {
        DB::table('investment')->insert([
            [
                'investment_type_id' => 1,
                'investment_name' => 'ALZR11'
            ],
            [
                'investment_type_id' => 1,
                'investment_name' => 'BRCO11'
            ],
            [
                'investment_type_id' => 1,
                'investment_name' => 'EVBI11'
            ],
            [
                'investment_type_id' => 1,
                'investment_name' => 'XPML11'
            ],

        ]);
    }
}
