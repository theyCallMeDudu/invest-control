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
                'investment_name' => 'BTLG11'
            ],
            [
                'investment_type_id' => 1,
                'investment_name' => 'EVBI11'
            ],
            [
                'investment_type_id' => 1,
                'investment_name' => 'HGCR11'
            ],
            [
                'investment_type_id' => 1,
                'investment_name' => 'HGLG11'
            ],
            [
                'investment_type_id' => 1,
                'investment_name' => 'HGRE11'
            ],
            [
                'investment_type_id' => 1,
                'investment_name' => 'HSML11'
            ],
            [
                'investment_type_id' => 1,
                'investment_name' => 'KNCR11'
            ],
            [
                'investment_type_id' => 1,
                'investment_name' => 'KNRI11'
            ],
            [
                'investment_type_id' => 1,
                'investment_name' => 'LVBI11'
            ],
            [
                'investment_type_id' => 1,
                'investment_name' => 'TVRI11'
            ],
            [
                'investment_type_id' => 1,
                'investment_name' => 'XPCI11'
            ],
            [
                'investment_type_id' => 1,
                'investment_name' => 'XPML11'
            ],
            [
                'investment_type_id' => 1,
                'investment_name' => 'VINO11'
            ],
            [
                'investment_type_id' => 2,
                'investment_name' => 'ABEV3'
            ],
            [
                'investment_type_id' => 2,
                'investment_name' => 'CAML3'
            ],
            [
                'investment_type_id' => 2,
                'investment_name' => 'CXSE3'
            ],
            [
                'investment_type_id' => 2,
                'investment_name' => 'EGIE4F'
            ],
            [
                'investment_type_id' => 2,
                'investment_name' => 'ITSA4'
            ],
            [
                'investment_type_id' => 2,
                'investment_name' => 'KLBN11'
            ],
            [
                'investment_type_id' => 2,
                'investment_name' => 'RADL3'
            ],
            [
                'investment_type_id' => 2,
                'investment_name' => 'SAPR3'
            ],
            [
                'investment_type_id' => 2,
                'investment_name' => 'TAEE11'
            ],
            [
                'investment_type_id' => 2,
                'investment_name' => 'UGPA3'
            ],
        ]);
    }
}
