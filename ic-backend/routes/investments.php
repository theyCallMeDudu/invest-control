<?php

use App\Http\Controllers\InvestmentsController;
use Illuminate\Support\Facades\Route;

// Defines the investments routes
Route::get('/investments', [InvestmentsController::class, 'index']);

