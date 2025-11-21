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
    // Index melihat produk di katalog
    public function index(Request $request)
    {
        // Mulai Query Builder
        $query = Product::with(['seller', 'category']);

        // --- LOGIKA FILTER KATEGORI ---
        // Jika ada parameter 'category' di URL (contoh: /api/products?category=phones)
        if ($request->has('category') && $request->category != null) {
            $slug = $request->category;
            // Filter produk yang punya relasi kategori dengan slug tersebut
            $query->whereHas('category', function($q) use ($slug) {
                $q->where('slug', $slug);
            });
        }

        // Eksekusi Query & Mapping Data
        $products = $query->get()->map(function ($product) {
            return [
                'id' => $product->id,
                'name' => $product->name,
                'price' => $product->price,
                'condition' => $product->condition,
                'main_image' => asset('storage/' . $product->main_image),
                'seller_location' => $product->seller->regency_name ?? 'Lokasi Tidak Diketahui',
                'total_sold' => $product->total_sold,
                'rating' => $product->reviews()->avg('rating') ?? 0,
            ];
        });

        return response()->json(['data' => $products]);
    }

    // Index List Produk Penjual
    public function indexSeller(Request $request)
    {
        $products = Product::where('user_id', Auth::id())
            ->with('category:id,name')
            ->select('id', 'category_id', 'name', 'price', 'stock', 'brand', 'condition', 'main_image', 'created_at')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json(['success' => true, 'data' => $products]);
    }

    // Detail produk yang ditunjukan ke seller saja
    public function showSeller($id)
    {
        $product = Product::where('user_id', Auth::id())
            ->where('id', $id)
            ->with(['category', 'images'])
            ->first();

        if (!$product) return response()->json(['message' => 'Produk tidak ditemukan'], 404);

        return response()->json(['success' => true, 'data' => $product]);
    }    

    // Upload produk untuk penjual
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'category_id'   => 'required|exists:product_categories,id',
            'name'          => 'required|string|max:255',
            'price'         => 'required|numeric|min:0',
            'brand'         => 'required|string|max:100',
            'warranty_type' => 'required|string',
            
            // PENTING: Sesuaikan dengan Enum di Database Anda (baru, bekas)
            'condition'     => 'required|in:baru,bekas', 
            
            'stock'         => 'required|integer|min:1',
            'description'   => 'required|string',
            'main_image'    => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'additional_images' => 'array|max:4',
            'additional_images.*' => 'image|mimes:jpeg,png,jpg|max:2048'
        ]);

        if ($validator->fails()) return response()->json(['errors' => $validator->errors()], 422);

        try {
            DB::beginTransaction();

            // Upload Main Image
            $mainImagePath = $request->file('main_image')->store('products', 'public');

            // Create Product (TANPA SLUG)
            $product = Product::create([
                'user_id'       => Auth::id(),
                'category_id'   => $request->category_id,
                'name'          => $request->name,
                'price'         => $request->price,
                'brand'         => $request->brand,
                'warranty_type' => $request->warranty_type,
                'condition'     => $request->condition,
                'stock'         => $request->stock,
                'description'   => $request->description,
                'main_image'    => $mainImagePath,
            ]);

            // Upload Additional Images
            if ($request->hasFile('additional_images')) {
                foreach ($request->file('additional_images') as $file) {
                    $path = $file->store('products/details', 'public');
                    ProductImage::create([
                        'product_id' => $product->id,
                        'image_path' => $path
                    ]);
                }
            }

            DB::commit();
            return response()->json(['success' => true, 'message' => 'Produk berhasil diupload', 'data' => $product], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['success' => false, 'message' => 'Gagal upload: ' . $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        // Hapus 'reviews.user' dari eager loading karena relasi user sudah tidak ada
        $product = Product::with(['images', 'seller', 'reviews', 'category'])->findOrFail($id);
        
        $data = [
            'id' => $product->id,
            'name' => $product->name,
            'price' => $product->price,
            'description' => $product->description,
            'stock' => $product->stock,
            'brand' => $product->brand,
            'condition' => $product->condition,
            'warranty_type' => $product->warranty_type,
            'total_sold' => $product->total_sold . ' Terjual',
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