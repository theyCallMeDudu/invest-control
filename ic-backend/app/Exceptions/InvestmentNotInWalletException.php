<?php

namespace App\Exceptions;

use Exception;

class InvestmentNotInWalletException extends Exception
{
    public function render()
    {
        return response()->json([
            'error' => 'The selected investment is not present in the wallet.',
        ], 400); // Status code 400: Bad Request
    }
}
