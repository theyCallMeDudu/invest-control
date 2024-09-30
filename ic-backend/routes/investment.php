<?php

use App\Http\Controllers\InvestmentController;
use Illuminate\Support\Facades\Route;

// Defines the investment routes
Route::post('/investment', [InvestmentController::class, 'store']);

// Gets an existing investment by its ID
Route::get('/investment/{investment_id}', [InvestmentController::class, 'edit']);

// Updates an existing investment
Route::put('/investment/{investment_id}', [InvestmentController::class, 'update']);
