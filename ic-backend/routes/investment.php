<?php

use App\Http\Controllers\InvestmentController;
use Illuminate\Support\Facades\Route;

// Defines the investment routes
Route::post('/investment', [InvestmentController::class, 'store']);
