<?php

use App\Http\Controllers\InvestmentTypeController;
use Illuminate\Support\Facades\Route;

// Define as rotas relacionadas a Investment Types
Route::get('/investment-types', [InvestmentTypeController::class, 'index']);
