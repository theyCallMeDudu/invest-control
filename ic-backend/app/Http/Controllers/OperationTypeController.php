<?php

namespace App\Http\Controllers;

use App\Models\OperationType;

class OperationTypeController extends Controller
{
    public function index()
    {
        $operationTypes = OperationType::all();
        return response()->json($operationTypes);
    }
}
