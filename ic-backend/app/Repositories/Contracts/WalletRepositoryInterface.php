<?php

namespace App\Repositories\Contracts;

use App\Models\User;
use App\Models\Wallet;

interface WalletRepositoryInterface
{
    public function createWallet(User $user): void;

    public function getWallet(User $user): ?Wallet;
}
