<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;


class ProductController extends Controller
{   
    public function index(Request $request)
    {
        $query = Product::with(['seller', 'category', 'reviews']);

        if ($request->filled('search')) {
            $keyword = $request->search;
            $query->where(function ($q) use ($keyword) {
                $q->where('name', 'like', "%{$keyword}%");
            });
        }

        if ($request->filled('category')) {
            $category = $request->category;
            if ($category !== 'semua-kategori') { 
                if (is_numeric($category)) {
                    $query->where('category_id', $category);
                } else {
                    $query->whereHas('category', fn($q) => $q->where('slug', $category));
                }
            }
        }

        if ($request->filled('condition') && in_array($request->condition, ['Baru', 'Bekas'])) {
            $query->where('condition', $request->condition);
        }

        if ($request->filled('store_id')) {
            $query->where('user_id', $request->store_id);
        }

        if (!$request->filled('store_id') && ($request->filled('province_id') || $request->filled('regency_id'))) {
            $query->whereHas('seller', function ($q) use ($request) {
                if ($request->filled('regency_id')) {
                    $q->where('regency_id', $request->regency_id);
                } elseif ($request->filled('province_id')) {
                    $q->where('province_id', $request->province_id);
                }
            });
        }

        if ($request->filled('sort')) {
            switch ($request->sort) {
                case 'price_asc': $query->orderBy('price', 'asc'); break;
                case 'price_desc': $query->orderBy('price', 'desc'); break;
                default: $query->orderBy('created_at', 'desc'); break;
            }
        } else {
            $query->orderBy('created_at', 'desc');
        }

        $paginator = $query->paginate(12);

        $paginator->getCollection()->transform(function ($product) {
            return [
                'id' => $product->id,
                'name' => $product->name,
                'price' => $product->price,
                'condition' => $product->condition,
                'main_image' => url('storage/' . $product->main_image), 
                'seller_location' => $product->seller->regency_name ?? 'Lokasi Tidak Diketahui',
                'total_sold' => $product->total_sold ?? 0,
                'rating' => round($product->reviews->avg('rating') ?? 0, 1),
                'category' => $product->category->name,
                'store_name' => $product->seller->nama_toko,
            ];
        });

        return response()->json($paginator);
    }

    public function searchSuggestions(Request $request)
    {
        $keyword = $request->query('query');

        if (!$keyword || strlen($keyword) < 2) {
            return response()->json(['products' => [], 'stores' => []]);
        }

        try {
            $products = Product::where('name', 'like', "%{$keyword}%")
                ->select('id', 'name', 'main_image', 'price')
                ->limit(7)
                ->get()
                ->map(function($p) {
                    return [
                        'id' => $p->id,
                        'name' => $p->name,
                        'type' => 'product',
                        'image' => $p->main_image ? url('storage/' . $p->main_image) : null,
                        'price' => $p->price
                    ];
                });

            $stores = User::where('role', 'penjual')
                ->where('status', 'active')
                ->where('nama_toko', 'like', "%{$keyword}%")
                ->select('id', 'nama_toko', 'province_name', 'foto') 
                ->limit(3)
                ->get()
                ->map(function($s) {
                    return [
                        'id' => $s->id,
                        'name' => $s->nama_toko,
                        'type' => 'store',
                        'location' => $s->province_name ?? 'Lokasi Tidak Diketahui',
                        'image' => $s->foto ? url('storage/' . $s->foto) : null 
                    ];
                });

            return response()->json([
                'products' => $products,
                'stores' => $stores
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Gagal memuat saran pencarian.',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function indexSeller(Request $request)
    {
        $products = Product::where('user_id', Auth::id())
            ->with('category:id,name')
            ->select('id', 'category_id', 'name', 'price', 'stock', 'brand', 'condition', 'created_at')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json(['success' => true, 'data' => $products]);
    }

    public function showSeller($id)
    {
        $product = Product::where('user_id', Auth::id())
            ->where('id', $id)
            ->with(['category', 'images'])
            ->first();

        if (!$product) return response()->json(['message' => 'Produk tidak ditemukan'], 404);

        return response()->json(['success' => true, 'data' => $product]);
    }    

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'category_id'   => 'required|exists:product_categories,id',
            'name'          => 'required|string|max:255',
            'price'         => 'required|numeric|min:0',
            'brand'         => 'required|string|max:100',
            'warranty_type' => 'required|string',
            
            'condition'     => 'required|in:Baru,Bekas', 
            
            'stock'         => 'required|integer|min:1',
            'description'   => 'required|string',
            'main_image'    => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'additional_images' => 'array|max:4',
            'additional_images.*' => 'image|mimes:jpeg,png,jpg|max:2048'
        ]);

        if ($validator->fails()) return response()->json(['errors' => $validator->errors()], 422);

        try {
            DB::beginTransaction();

            $slugName = Str::slug($request->name); 
            $timestamp = time(); 

            $mainFile = $request->file('main_image');
            $mainExt  = $mainFile->getClientOriginalExtension();
            
            $mainName = $slugName . '-' . $timestamp . '.' . $mainExt;
            
            $mainImagePath = $mainFile->storeAs('products', $mainName, 'public');

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

            if ($request->hasFile('additional_images')) {
                foreach ($request->file('additional_images') as $index => $file) {
                    $ext = $file->getClientOriginalExtension();
                    
                    $detailName = $slugName . '-' . ($index + 1) . '-' . $timestamp . '.' . $ext;

                    $path = $file->storeAs('products/details', $detailName, 'public');
                    
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
                return response()->json([
                'success' => false,
                'message' => 'Server Error: ' . $e->getMessage(),
                'line' => $e->getLine(),
                'file' => $e->getFile()
            ], 500);
        }
    }

    public function show($id)
    {
        $product = Product::with(['images', 'seller', 'reviews', 'category'])->findOrFail($id);

        if (!$product) {
            return response()->json(['message' => 'Produk tidak ditemukan'], 404);
        }
        
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
                    'user' => $review->reviewer_name, 
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