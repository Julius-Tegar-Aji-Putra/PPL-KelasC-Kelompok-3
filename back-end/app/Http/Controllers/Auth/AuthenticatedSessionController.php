<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): JsonResponse
    {
        // 1. Coba login dengan email & password
        if (! Auth::attempt($request->only('email', 'password'))) {
            throw ValidationException::withMessages([
                'email' => __('auth.failed'),
            ]);
        }

        // 2. Ambil data user yang berhasil login
        $user = $request->user();

        // 3. (Opsional tapi Disarankan) Hapus token lama user agar bersih
        // Jadi user hanya login di satu device/sesi terakhir (tergantung kebutuhan bisnis)
        // Jika ingin multi-device, baris di bawah ini bisa dihapus.
        $user->tokens()->delete();

        // 4. Buat Token Baru
        $token = $user->createToken('auth-token')->plainTextToken;

        // 5. Return Response JSON Lengkap
        // Kita kirim 'role' secara eksplisit agar Frontend mudah melakukan if/else redirect
        return response()->json([
            'message' => 'Login berhasil',
            'token' => $token,
            'user' => $user,
            'role' => $user->role, // Pastikan kolom 'role' ada di tabel users
        ]);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): JsonResponse
    {
        // Hapus hanya token yang sedang dipakai saat ini (current access token)
        // Agar user tidak logout dari device lain jika login multi-device
        if ($request->user()) {
            $request->user()->currentAccessToken()->delete();
        }

        return response()->json(['message' => 'Logout successful']);
    }
}