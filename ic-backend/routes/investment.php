<?php

use App\Http\Controllers\InvestmentController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    // Defines the investments routes
    Route::get('/investments', [InvestmentController::class, 'index']);

    // Defines the investment routes
    Route::post('/investment', [InvestmentController::class, 'store']);

    // Gets an existing investment by its ID
    Route::get('/investment/{investment_id}', [InvestmentController::class, 'edit']);

    // Updates an existing investment by its ID
    Route::put('/investment/{investment_id}', [InvestmentController::class, 'update']);

    // Deletes an existing investment by its ID
    Route::delete('/investment/{investment_id}', [InvestmentController::class, 'destroy']);
});
