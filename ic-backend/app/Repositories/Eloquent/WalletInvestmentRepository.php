<?php

namespace App\Repositories\Eloquent;

use App\Models\WalletInvestment;
use App\Repositories\Contracts\WalletInvestmentRepositoryInterface;

class WalletInvestmentRepository implements WalletInvestmentRepositoryInterface
{
    protected $model;

    public function __construct(WalletInvestment $walletInvestment)
    {
        $this->model = $walletInvestment;
    }

    public function isInvestmentInWallet(int $wallet_id, int $investment_id)
    {
        return $this->model
                    ->where('wallet_id', $wallet_id)
                    ->where('investment_id', $investment_id)
                    ->first();
    }

    public function createWalletInvestment(int $wallet_id, array $data)
    {
        $this->model->create([
            'wallet_id'      => $wallet_id,
            'investment_id'  => $data['investment_id']
        ]);
    }
}
