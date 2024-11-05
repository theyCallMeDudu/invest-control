<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\WalletInvestment;

class Wallet extends Model
{
    protected $table      = 'wallet';
    protected $primaryKey = 'wallet_id';
    protected $fillable   = ['user_id',];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function investments()
    {
        return $this->hasMany(WalletInvestment::class);
    }
}
