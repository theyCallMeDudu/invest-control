<?php

namespace App\Http\Services;

use App\Models\User;
use App\Repositories\Contracts\WalletInvestmentRepositoryInterface;
use App\Repositories\Contracts\WalletRepositoryInterface;
use App\Repositories\Eloquent\WalletInvestmentRepository;
use Illuminate\Support\Facades\Auth;

class WalletService
{
    protected $walletRepository;
    protected $walletInvestmentRepository;

    public function __construct(
        WalletRepositoryInterface $walletRepository,
        WalletInvestmentRepository $walletInvestmentRepository)
    {
        $this->walletRepository = $walletRepository;
        $this->walletInvestmentRepository = $walletInvestmentRepository;
    }

    public function checkUserWallet(User $user): void
    {
        if (!$user->wallet()->exists()) {
            $this->walletRepository->createWallet($user);
        }
    }

    public function addToWallet(array $data): void
    {
        $user = Auth::user();
        $wallet = $user->wallet;

        // Checks if already have the investment in th wallet
        $walletInvestment = $this->walletInvestmentRepository->isInvestmentInWallet($wallet->id, $data['investment_id']);

        if (!is_null($walletInvestment)) {
            // Updates its quantity and average price
            $walletInvestment->total_quantity += $data['quantity'];
            $walletInvestment->total_invested += $data['operation_value'];
            $walletInvestment->average_price  = $this->walletInvestmentRepository->calculateNewAveragePrice(
                                                    $walletInvestment->id,
                                                    $data['quantity'],
                                                    $data['unit_price']);
            $walletInvestment->save();
        } else {
            $this->walletInvestmentRepository->createWalletInvestment($wallet->id, $data);
        }
    }

    public function removeFromWallet(array $data): void
    {
        $user = Auth::user();
        $wallet = $user->wallet;

        // Checks if already have the investment in th wallet
        $walletInvestment = $this->walletInvestmentRepository->isInvestmentInWallet($wallet->id, $data['investment_id']);

        if ($walletInvestment) {
            // Decreases the quantity ou removes it if its is equal to 0
            $walletInvestment->total_quantity -= $data['quantity'];

            if ($walletInvestment->total_quantity <= 0) {
                $walletInvestment->delete();
            } else {
                $walletInvestment->save();
            }
        }
    }
}
