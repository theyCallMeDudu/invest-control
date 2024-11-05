<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Wallet;
use App\Models\Investment;
use App\Models\WalletInvestmentHistory;

class WalletInvestment extends Model
{
    protected $table      = 'wallet_investment';
    protected $primaryKey = 'wallet_investment_id';
    protected $fillable   = [
        'wallet_id',
        'investment_id',
        'total_quantity',
        'total_invested',
        'average_price',
    ];

    public function wallet()
    {
        return $this->belongsTo(Wallet::class);
    }

    public function investment()
    {
        return $this->belongsTo(Investment::class);
    }

    public function history()
    {
        return $this->hasMany(WalletInvestmentHistory::class);
    }
}
