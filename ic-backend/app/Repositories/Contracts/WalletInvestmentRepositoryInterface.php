<?php

namespace App\Repositories\Contracts;

interface WalletInvestmentRepositoryInterface
{
    public function isInvestmentInWallet(int $wallet_id, int $investment_id);

    public function calculateNewAveragePrice(int $wallet_investment_id, int $quantity, float $unit_price);

    public function createWalletInvestment(int $wallet_id, array $data);
}
