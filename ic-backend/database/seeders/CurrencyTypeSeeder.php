<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CurrencyTypeSeeder extends Seeder
{
    public function run()
    {
        DB::table('currency_type')->insert([
            [
                'currency_type_code'   => 'BRL',
                'currency_type_symbol' => 'R$',
                'currency_type_name'   => 'Real',
                'created_at'           => now(),
                'updated_at'           => now(),
            ],
            [
                'currency_code'   => 'USD',
                'currency_symbol' => '$',
                'currency_name'   => 'Dollar',
                'created_at'      => now(),
                'updated_at'      => now(),
            ],
            [
                'currency_code'   => 'EUR',
                'currency_symbol' => '€',
                'currency_name'   => 'Euro',
                'created_at'      => now(),
                'updated_at'      => now(),
            ],
        ]);
    }
}
