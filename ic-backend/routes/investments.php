<?php

use App\Http\Controllers\InvestmentController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    // Defines the investments routes
    Route::get('/investments', [InvestmentController::class, 'index']);

    // Defines the investment routes
    Route::post('/investments', [InvestmentController::class, 'store']);

    // Gets an existing investment by its ID
    Route::get('/investments/{investment_id}', [InvestmentController::class, 'edit']);

    // Updates an existing investment by its ID
    Route::put('/investments/{investment_id}', [InvestmentController::class, 'update']);

    // Deletes an existing investment by its ID
    Route::delete('/investments/{investment_id}', [InvestmentController::class, 'destroy']);

    // Gets available years for an investment
    Route::get('/investments/{investment_id}/available-years', [InvestmentController::class, 'getAvailableInvestmentYears']);

    // Gets annual summary of investment operations
    Route::get('/investments/{investment_id}/operations/summary/{year}', [InvestmentController::class, 'getYearInvestmentOperations']);
});
