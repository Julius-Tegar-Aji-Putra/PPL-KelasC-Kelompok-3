<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules;

class RegisteredUserController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        // 1. Definisikan Aturan (Rules)
        $rules = [
            'nama' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:' . User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'nama_toko' => ['nullable', 'string', 'max:255', 'unique:users,nama_toko'],
            'deskripsi_singkat' => ['nullable', 'string'],
            'no_handphone' => ['required', 'numeric', 'digits_between:10,15'], // Ubah jadi numeric agar lebih ketat
            'alamat' => ['required', 'string'],
            'rt' => ['required', 'numeric', 'digits:3'], 
            'rw' => ['required', 'numeric', 'digits:3'],
            'no_ktp' => ['required', 'numeric', 'digits:16'], // Wajib 16 digit angka
            'foto' => ['required', 'image', 'mimes:jpeg,png,jpg', 'max:2048'],
            'file_upload_ktp' => ['required', 'image', 'mimes:jpeg,png,jpg', 'max:2048'],
            'province_id' => ['required'],
            'regency_id' => ['required'],
            'district_id' => ['required'],
            'village_id' => ['required'],
        ];

        // 2. Definisikan Pesan Bahasa Indonesia (Messages)
        $messages = [
            'required' => ':attribute wajib diisi.',
            'email' => 'Format email tidak valid.',
            'unique' => ':attribute sudah terdaftar di sistem.',
            'confirmed' => 'Konfirmasi password tidak cocok.',
            'numeric' => ':attribute harus berupa angka.',
            'digits' => ':attribute harus berisi :digits digit.',
            'digits_between' => ':attribute harus antara :min sampai :max digit.',
            'image' => 'File harus berupa gambar.',
            'mimes' => 'Format file harus jpeg, png, atau jpg.',
            'max' => [
                'file' => 'Ukuran file maksimal 2MB.',
                'string' => ':attribute maksimal :max karakter.',
            ],
            'size' => ':attribute harus berukuran :size karakter.',
        ];

        // 3. Buat Validator dengan Pesan Custom
        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $path_foto = $request->file('foto')->store('foto_penjual', 'public');
        $path_file_ktp = $request->file('file_upload_ktp')->store('ktp_penjual', 'public');

        $user = User::create([
            'nama' => $request->nama,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'penjual',
            'status' => 'inactive',
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

        return response()->json([
            'message' => 'Registrasi berhasil. Silakan tunggu verifikasi Admin untuk mengaktifkan akun Anda.',
        ], 201);
    }
}