<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Http\Services\WalletService;

class AuthController extends Controller
{
    protected $walletService;

    public function __construct(WalletService $walletService)
    {
        $this->walletService = $walletService;
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (empty($credentials['email']) || empty($credentials['password'])) {
            return response()->json(['error' => 'E-mail and password are mandatory'], 400);
        }

        if (!Auth::attempt($credentials)) {
            $user = User::where('email', $credentials['email'])->first();
            if ($user) {
                return response()->json(['error' => 'Incorrect password'], 401);
            } else {
                return response()->json(['error' => 'E-mail not found'], 401);
            }
        }

        $user = Auth::user();

        $this->walletService->checkUserWallet($user);

        $token = $user->createToken('authToken')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out successfully'], 200);
    }
}
