<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\WalletInvestment;

class WalletInvestmentHistory extends Model
{
    protected $table      = 'wallet_investment_history';
    protected $primaryKey = 'wallet_history_id';
    protected $fillable   = [
        'wallet_id',
        'operation_id'
    ];

    public function walletInvestment()
    {
        return $this->belongsTo(WalletInvestment::class);
    }
}
