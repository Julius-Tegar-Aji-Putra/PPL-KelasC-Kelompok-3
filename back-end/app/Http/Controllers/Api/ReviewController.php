<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Review;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule; // Penting buat validasi unik
use App\Mail\ReviewThankYouMail;

class ReviewController extends Controller
{
    public function store(Request $request, $productId)
    {
        // 1. Cek Produk Ada dulu
        $product = Product::find($productId);
        if (!$product) {
            return response()->json(['message' => 'Produk tidak ditemukan'], 404);
        }

        // 2. Validasi Input & Uniqueness
        $validator = Validator::make($request->all(), [
            'reviewer_name'  => 'required|string|max:255',
            'reviewer_phone' => [
                'required',
                'string',
                'max:20',
                // Cek: di tabel reviews, kolom reviewer_phone harus unik UNTUK product_id ini
                Rule::unique('reviews')->where(function ($query) use ($productId) {
                    return $query->where('product_id', $productId);
                }),
            ],
            'reviewer_email' => [
                'required',
                'email',
                'max:255',
                // Cek: di tabel reviews, kolom reviewer_email harus unik UNTUK product_id ini
                Rule::unique('reviews')->where(function ($query) use ($productId) {
                    return $query->where('product_id', $productId);
                }),
            ],
            'province'       => 'required|string',
            'rating'         => 'required|integer|min:1|max:5',
            'comment'        => 'required|string',
        ], [
            // Custom Error Messages biar user paham
            'reviewer_email.unique' => 'Email ini sudah memberikan ulasan untuk produk ini.',
            'reviewer_phone.unique' => 'Nomor HP ini sudah memberikan ulasan untuk produk ini.',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // 3. Simpan Review
        try {
            $review = Review::create([
                'product_id'     => $productId,
                'reviewer_name'  => $request->reviewer_name,
                'reviewer_email' => $request->reviewer_email,
                'reviewer_phone' => $request->reviewer_phone,
                'province'       => $request->province,
                'rating'         => $request->rating,
                'comment'        => $request->comment,
            ]);

            // 4. Kirim Email Notifikasi (Pake Mail yang sudah kamu buat sebelumnya)
            // Pastikan class ReviewThankYouMail sudah ada
            try {
                $emailData = [
                    'name'         => $request->reviewer_name,
                    'product_name' => $product->name,
                    'rating'       => $request->rating,
                    'comment'      => $request->comment
                ];
                Mail::to($request->reviewer_email)->send(new ReviewThankYouMail($emailData));
            } catch (\Exception $e) {
                // Log error email tapi biarkan review tersimpan
            }

            return response()->json([
                'success' => true,
                'message' => 'Review berhasil ditambahkan. Cek email Anda untuk notifikasi.',
                'data'    => $review
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false, 
                'message' => 'Gagal menyimpan review: ' . $e->getMessage()
            ], 500);
        }
    }
}