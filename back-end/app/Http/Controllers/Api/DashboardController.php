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
        $user = $request->user(); 

        $sellerProductIds = Product::where('user_id', $user->id)->pluck('id');

        $totalProduk = $sellerProductIds->count();
        
        $totalStok = Product::where('user_id', $user->id)->sum('stock');

        $rataRataRating = Review::whereIn('product_id', $sellerProductIds)->avg('rating');

        $stockData = Product::where('user_id', $user->id)
            ->select('name', 'stock as stok')
            ->orderBy('stock', 'desc') 
            ->get();

        $ratingData = Product::where('user_id', $user->id)
            ->withAvg('reviews', 'rating') 
            ->orderBy('reviews_avg_rating', 'desc')
            ->get()
            ->map(function ($product) {
                return [
                    'name' => $product->name,
                    'rating' => round($product->reviews_avg_rating ?? 0, 1) 
                ];
            });


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

    public function getAdminStats()
    {
        $productsByCategory = ProductCategory::withCount('products')
            ->orderBy('products_count', 'desc')
            ->get()
            ->map(function ($cat) {
                return [
                    'name' => $cat->name,
                    'value' => $cat->products_count
                ];
            });

        $storesByProvince = User::where('role', 'penjual')
            ->whereNotNull('province_name')
            ->select('province_name as name', DB::raw('count(*) as value'))
            ->groupBy('province_name')
            ->orderBy('value', 'desc')
            ->limit(10) 
            ->get();

        $sellerStatusDistribution = User::where('role', 'penjual')
            ->select('status', DB::raw('count(*) as value'))
            ->groupBy('status')
            ->get();

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
