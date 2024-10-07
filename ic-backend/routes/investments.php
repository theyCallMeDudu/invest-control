<?php

use App\Http\Controllers\InvestmentsController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    // Defines the investments routes
    Route::get('/investments', [InvestmentsController::class, 'index']);
});
