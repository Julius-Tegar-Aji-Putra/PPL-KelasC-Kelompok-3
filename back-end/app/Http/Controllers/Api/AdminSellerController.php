<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Mail\SellerApprovedMail;
use App\Mail\SellerRejectedMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class AdminSellerController extends Controller
{
    // 1. List Penjual Pending (Inactive)
    public function index()
    {
        $pendingSellers = User::where('role', 'penjual')
                              ->where('status', 'inactive')
                              ->get();
        
        return response()->json(['data' => $pendingSellers]);
    }

    // 2. Approve (Terima)
    public function approve($id)
    {
        $seller = User::findOrFail($id);
        
        // Ubah status
        $seller->status = 'active';
        $seller->save();

        // Kirim Email
        try {
            Mail::to($seller->email)->send(new SellerApprovedMail($seller));
        } catch (\Exception $e) {
            return response()->json(['message' => 'Akun aktif, tapi email gagal: ' . $e->getMessage()]);
        }

        return response()->json(['message' => 'Penjual disetujui & email terkirim.']);
    }

    // 3. Reject (Tolak)
    public function reject($id)
    {
        $seller = User::findOrFail($id);

        // Kirim Email Dulu
        try {
            Mail::to($seller->email)->send(new SellerRejectedMail($seller));
        } catch (\Exception $e) {
            // Lanjut aja
        }

        // Hapus User
        $seller->delete();

        return response()->json(['message' => 'Penjual ditolak & data dihapus.']);
    }
}