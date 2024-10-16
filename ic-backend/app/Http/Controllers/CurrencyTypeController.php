<?php

namespace App\Http\Controllers;

use App\Models\CurrencyType;

class CurrencyTypeController extends Controller
{
    public function index()
    {
        $currencyTypes = CurrencyType::all();
        return response()->json($currencyTypes);
    }
}
