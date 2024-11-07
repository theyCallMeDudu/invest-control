<?php

namespace App\Http\Services;

use App\Models\User;
use App\Repositories\Contracts\WalletRepositoryInterface;

class WalletService
{
    protected $walletRepository;

    public function __construct(WalletRepositoryInterface $walletRepository)
    {
        $this->walletRepository = $walletRepository;
    }

    public function checkUserWallet(User $user): void
    {
        if (!$user->wallet()->exists()) {
            $this->walletRepository->createWallet($user);
        }
    }
}
