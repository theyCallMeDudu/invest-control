<?php

use App\Http\Controllers\CurrencyTypeController;
use Illuminate\Support\Facades\Route;

Route::get('/currency-types', [CurrencyTypeController::class, 'index']);
