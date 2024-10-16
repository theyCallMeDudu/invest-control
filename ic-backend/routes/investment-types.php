<?php

use App\Http\Controllers\InvestmentTypeController;
use Illuminate\Support\Facades\Route;

Route::get('/investment-types', [InvestmentTypeController::class, 'index']);
