<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Review;
use App\Models\User;
use App\Models\ProductCategory;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function getSellerStats(Request $request)
    {
        $user = $request->user(); // Ambil user yang sedang login (Penjual)

        // 1. Hitung Ringkasan (Card Atas)
        // Ambil semua ID produk milik penjual ini
        $sellerProductIds = Product::where('user_id', $user->id)->pluck('id');

        $totalProduk = $sellerProductIds->count();
        
        $totalStok = Product::where('user_id', $user->id)->sum('stock');

        // Rata-rata rating toko (dari semua review produk milik penjual)
        $rataRataRating = Review::whereIn('product_id', $sellerProductIds)->avg('rating');


        // 2. Grafik Sebaran Stok per Produk (Bar Chart)
        // Ambil nama produk dan stoknya
        $stockData = Product::where('user_id', $user->id)
            ->select('name', 'stock as stok')
            ->orderBy('stock', 'desc') // Urutkan dari stok terbanyak
            ->get();


        // 3. Grafik Sebaran Rating per Produk (Bar Chart Horizontal)
        // Kita butuh rata-rata rating per produk spesifik
        $ratingData = Product::where('user_id', $user->id)
            ->withAvg('reviews', 'rating') // Laravel Helper untuk hitung avg relasi
            ->orderBy('reviews_avg_rating', 'desc')
            ->get()
            ->map(function ($product) {
                return [
                    'name' => $product->name,
                    'rating' => round($product->reviews_avg_rating ?? 0, 1) // Default 0 jika belum ada review
                ];
            });


        // 4. Grafik Sebaran Lokasi Pembeli (Pie Chart)
        // Grouping review berdasarkan kolom 'province'
        $locationData = Review::whereIn('product_id', $sellerProductIds)
            ->select('province as name', DB::raw('count(*) as value'))
            ->groupBy('province')
            ->orderBy('value', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => [
                'totalProduk' => $totalProduk,
                'totalStok' => (int) $totalStok,
                'rataRataRating' => round($rataRataRating ?? 0, 1),
                'stockData' => $stockData,
                'ratingData' => $ratingData,
                'locationData' => $locationData
            ]
        ]);
    }

    /**
     * SRS-MartPlace-07: Dashboard Admin Platform
     * Menampilkan statistik global untuk admin.
     */
    public function getAdminStats()
    {
        // 1. Sebaran Jumlah Produk berdasarkan Kategori
        // Menggunakan withCount untuk menghitung relasi products di setiap kategori
        $productsByCategory = ProductCategory::withCount('products')
            ->orderBy('products_count', 'desc')
            ->get()
            ->map(function ($cat) {
                return [
                    'name' => $cat->name,
                    'value' => $cat->products_count
                ];
            });

        // 2. Sebaran Jumlah Toko berdasarkan Lokasi Provinsi
        // Mengambil user dengan role 'penjual', dikelompokkan berdasarkan nama provinsi
        $storesByProvince = User::where('role', 'penjual')
            ->whereNotNull('province_name')
            ->select('province_name as name', DB::raw('count(*) as value'))
            ->groupBy('province_name')
            ->orderBy('value', 'desc')
            ->limit(10) // Ambil Top 10 provinsi terbanyak biar grafik tidak berantakan
            ->get();

        // 3. Jumlah User Penjual Aktif dan Tidak Aktif (termasuk Rejected)
        // Mengelompokkan penjual berdasarkan status (active, inactive, rejected)
        $sellerStatusDistribution = User::where('role', 'penjual')
            ->select('status', DB::raw('count(*) as value'))
            ->groupBy('status')
            ->get();

        // 4. Statistik Pengunjung (Reviewer)
        // Menghitung total ulasan masuk dan jumlah unik orang yang mereview (berdasarkan email)
        $totalReviews = Review::count();
        $uniqueReviewers = Review::distinct('reviewer_email')->count('reviewer_email');

        return response()->json([
            'success' => true,
            'data' => [
                'products_by_category' => $productsByCategory,
                'stores_by_province'   => $storesByProvince,
                'seller_status'        => $sellerStatusDistribution,
                'review_activity'      => [
                    'total_reviews'    => $totalReviews,
                    'unique_reviewers' => $uniqueReviewers
                ]
            ]
        ]);
    }
}
