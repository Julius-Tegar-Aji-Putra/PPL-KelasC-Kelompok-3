<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ReviewController extends Controller
{
    public function store(Request $request, $productId)
    {
        // 1. Validasi Input
        $validator = Validator::make($request->all(), [
            'guest_name' => 'required|string|max:255',
            // Email atau Phone harus diisi salah satu (required_without)
            'guest_email' => 'required_without:guest_phone|nullable|email|max:255',
            'guest_phone' => 'required_without:guest_email|nullable|string|max:20',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string',
            'province' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // 2. Pengecekan Uniqueness Manual (Email atau No. Telp)
        // "Cek pakai email atau notel" 
        $email = $request->guest_email;
        $phone = $request->guest_phone;

        $existingReview = Review::where('product_id', $productId)
            ->where(function ($query) use ($email, $phone) {
                if ($email) {
                    $query->where('guest_email', $email);
                }
                if ($phone) {
                    // Jika user mengisi keduanya, kita cek salah satunya saja yg cocok (OR)
                    // atau bisa dipisah querynya. Di sini menggunakan orWhere agar ketat.
                    $query->orWhere('guest_phone', $phone);
                }
            })
            ->first();

        if ($existingReview) {
            return response()->json([
                'message' => 'Anda sudah memberikan review untuk produk ini sebelumnya (terdeteksi melalui Email atau No. HP).'
            ], 409); // 409 Conflict
        }

        // 3. Simpan Review
        $review = Review::create([
            'product_id' => $productId,
            'guest_name' => $request->guest_name,
            'guest_email' => $request->guest_email,
            'guest_phone' => $request->guest_phone,
            'rating' => $request->rating,
            'comment' => $request->comment,
            'province' => $request->province,
        ]);

        return response()->json([
            'message' => 'Review berhasil ditambahkan', 
            'data' => $review
        ], 201);
    }
}