<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        // Mengambil produk dengan relasi yang diperlukan untuk frontend
        $products = Product::with(['seller', 'category'])->get()->map(function ($product) {
            return [
                'id' => $product->id,
                'name' => $product->name,
                'price' => 0, // Harga belum didefinisikan di PDF, bisa ditambahkan jika perlu
                'main_image' => asset('storage/' . $product->main_image),
                'seller_name' => $product->seller->nama_toko, // Placeholder nama penjual
                'seller_location' => $product->seller->regency_name ?? 'Lokasi Tidak Diketahui', // Placeholder lokasi
                'total_sold' => $product->total_sold . ' Terjual', // Placeholder tulisan
                'rating' => $product->reviews()->avg('rating') ?? 0,
            ];
        });

        return response()->json(['data' => $products]);
    }

    public function store(Request $request)
    {
        // Pastikan user adalah penjual yang aktif
        if (Auth::user()->status !== 'active') {
            return response()->json(['message' => 'Akun Anda belum aktif.'], 403);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'category_id' => 'required|exists:product_categories,id',
            'brand' => 'required|string',
            'warranty_type' => 'required|string',
            'condition' => 'required|in:baru,bekas',
            'stock' => 'required|integer',
            'description' => 'required|string',
            'main_image' => 'required|image|max:2048',
            'detail_images.*' => 'image|max:2048' // Array gambar tambahan
        ]);

        if ($validator->fails()) return response()->json($validator->errors(), 422);

        // Upload Main Image
        $mainImagePath = $request->file('main_image')->store('public/products');
        $mainImagePath = str_replace('public/', '', $mainImagePath);

        // Simpan Produk
        $product = Product::create([
            'user_id' => Auth::id(),
            'category_id' => $request->category_id,
            'name' => $request->name,
            'brand' => $request->brand,
            'warranty_type' => $request->warranty_type,
            'condition' => $request->condition,
            'stock' => $request->stock,
            'description' => $request->description,
            'main_image' => $mainImagePath,
            'total_sold' => 0
        ]);

        // Upload Detail Images (jika ada)
        if ($request->hasFile('detail_images')) {
            foreach ($request->file('detail_images') as $image) {
                $path = $image->store('public/products/details');
                ProductImage::create([
                    'product_id' => $product->id,
                    'image_path' => str_replace('public/', '', $path)
                ]);
            }
        }

        return response()->json(['message' => 'Produk berhasil ditambahkan', 'data' => $product], 201);
    }

public function show($id)
    {
        // Hapus 'reviews.user' dari eager loading karena relasi user sudah tidak ada
        $product = Product::with(['images', 'seller', 'reviews', 'category'])->findOrFail($id);
        
        $data = [
            'id' => $product->id,
            'name' => $product->name,
            'description' => $product->description,
            'stock' => $product->stock,
            'brand' => $product->brand,
            'condition' => $product->condition,
            'warranty_type' => $product->warranty_type,
            'main_image' => asset('storage/' . $product->main_image),
            'detail_images' => $product->images->map(fn($img) => asset('storage/' . $img->image_path)),
            'seller' => [
                'name' => $product->seller->nama_toko,
                'location' => $product->seller->regency_name,
                'province' => $product->seller->province_name,
            ],
            'reviews' => $product->reviews->map(function($review) {
                return [
                    // Ambil nama langsung dari kolom guest_name
                    'user' => $review->guest_name, 
                    'rating' => $review->rating,
                    'comment' => $review->comment,
                    'province' => $review->province,
                    'date' => $review->created_at->format('Y-m-d'),
                ];
            })
        ];

        return response()->json(['data' => $data]);
    }
}