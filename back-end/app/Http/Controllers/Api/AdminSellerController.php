<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use App\Mail\SellerApprovedMail;
use App\Mail\SellerRejectedMail;
use App\Jobs\SendEmailJob;

class AdminSellerController extends Controller
{
    public function getPendingSellers()
    {
        // PERBAIKAN: Menambahkan select field lengkap sesuai form Register
        $sellers = User::where('role', 'penjual')
            ->where('status', 'inactive')
            ->select(
                'id', 
                'nama', 
                'email', 
                'nama_toko', 
                'deskripsi_singkat',
                'no_handphone', 
                'alamat',
                'rt',
                'rw',     
                'no_ktp',
                'foto',        
                'file_upload_ktp',
                'province_name',
                'regency_name',
                'district_name',
                'village_name',
                'created_at', 
            )
            ->get();

        return response()->json([
            'success' => true,
            'data' => $sellers
        ]);
    }

    public function approveSeller($id)
    {
        $user = User::findOrFail($id);
        $user->status = 'active';
        $user->save();

        SendEmailJob::dispatch($user->email, new SellerApprovedMail($user));

        return response()->json([
            'success' => true,
            'message' => 'Penjual berhasil disetujui dan email notifikasi dikirim.'
        ]);
    }

    public function rejectSeller($id)
    {
        $user = User::findOrFail($id);
        $emailData = [
            'nama' => $user->nama,
            'email' => $user->email,
            'nama_toko' => $user->nama_toko
        ];

        // Kirim email notifikasi
        SendEmailJob::dispatch($user->email, new SellerRejectedMail($emailData));

        $user->delete();

        return response()->json([
            'success' => true,
            'message' => 'Penjual berhasil ditolak.'
        ]);
    }
}