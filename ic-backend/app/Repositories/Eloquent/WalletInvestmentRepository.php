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

    public function createWalletInvestment(int $wallet_id, array $data): void
    {
        $this->model->create([
            'wallet_id'      => $wallet_id,
            'investment_id'  => $data['investment_id']
        ]);
    }

    public function getWalletInvestments(int $walletId)
    {
        return $this->model::where('wallet_investment.wallet_id', $walletId)
            ->join('investment', 'wallet_investment.investment_id', '=', 'investment.investment_id')
            ->join('investment_type', 'investment.investment_type_id', '=', 'investment_type.investment_type_id')
            ->select(
                'wallet_investment.investment_id',
                'investment.investment_type_id',
                'investment.investment_name',
                'investment_type.investment_type_name'
            )
            ->get();
    }
}
