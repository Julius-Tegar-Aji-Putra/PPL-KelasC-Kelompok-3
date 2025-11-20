<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules;

class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'nama' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:' . User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],

            'nama_toko' => ['required', 'string', 'max:255'],
            'deskripsi_singkat' => ['nullable', 'string'],
            'no_handphone' => ['required', 'string', 'max:15'],
            'alamat' => ['required', 'string'],
            'rt' => ['required', 'string', 'max:3'],
            'rw' => ['required', 'string', 'max:3'],
            'no_ktp' => ['required', 'string', 'size:16'],
            'foto' => ['required', 'image', 'mimes:jpeg,png,jpg', 'max:2048'],
            'file_upload_ktp' => ['required', 'image', 'mimes:jpeg,png,jpg', 'max:2048'],
            'province_id' => ['required', 'string'],
            'province_name' => ['required', 'string'],
            'regency_id' => ['required', 'string'],
            'regency_name' => ['required', 'string'],
            'district_id' => ['required', 'string'],
            'district_name' => ['required', 'string'],
            'village_id' => ['required', 'string'],
            'village_name' => ['required', 'string'],
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $path_foto = $request->file('foto')->store('foto_penjual', 'public');
        $path_file_ktp = $request->file('file_upload_ktp')->store('ktp_penjual', 'public');

        $user = User::create([
            'nama' => $request->nama,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'penjual',
            'nama_toko' => $request->nama_toko,
            'deskripsi_singkat' => $request->deskripsi_singkat,
            'no_handphone' => $request->no_handphone,
            'alamat' => $request->alamat,
            'rt' => $request->rt,
            'rw' => $request->rw,
            'no_ktp' => $request->no_ktp,
            'province_id' => $request->province_id,
            'province_name' => $request->province_name,
            'regency_id' => $request->regency_id,
            'regency_name' => $request->regency_name,
            'district_id' => $request->district_id,
            'district_name' => $request->district_name,
            'village_id' => $request->village_id,
            'village_name' => $request->village_name,
            'foto' => $path_foto,
            'file_upload_ktp' => $path_file_ktp,
        ]);

        event(new Registered($user));

        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user' => $user
        ], 201);
    }
}
