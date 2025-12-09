<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Review;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule; 
use App\Mail\ReviewThankYouMail;
use App\Jobs\SendEmailJob;

class ReviewController extends Controller
{
    public function store(Request $request, $productId)
    {
        $product = Product::find($productId);
        if (!$product) {
            return response()->json(['message' => 'Produk tidak ditemukan'], 404);
        }

        $validator = Validator::make($request->all(), [
            'reviewer_name'  => 'required|string|max:255',
            'reviewer_phone' => [
                'required',
                'string',
                'max:20',
                Rule::unique('reviews')->where(function ($query) use ($productId) {
                    return $query->where('product_id', $productId);
                }),
            ],
            'reviewer_email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('reviews')->where(function ($query) use ($productId) {
                    return $query->where('product_id', $productId);
                }),
            ],
            'province'       => 'required|string',
            'rating'         => 'required|integer|min:1|max:5',
            'comment'        => 'required|string',
        ], [
            'reviewer_email.unique' => 'Email ini sudah memberikan ulasan untuk produk ini.',
            'reviewer_phone.unique' => 'Nomor HP ini sudah memberikan ulasan untuk produk ini.',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

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

            $emailData = [
                'name'         => $request->reviewer_name,
                'product_name' => $product->name,
                'rating'       => $request->rating,
                'comment'      => $request->comment
            ];

            SendEmailJob::dispatch($request->reviewer_email, new ReviewThankYouMail($emailData));

            return response()->json([
                'success' => true,
                'message' => 'Review berhasil ditambahkan.', 
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