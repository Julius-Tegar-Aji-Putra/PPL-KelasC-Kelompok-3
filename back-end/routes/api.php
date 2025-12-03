<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\WilayahController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\AdminSellerController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\ReportController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// --- 1. Rute Wilayah (Untuk Dropdown Lokasi) ---
Route::get('/wilayah/provinces', [WilayahController::class, 'getProvinces']);
Route::get('/wilayah/regencies', [WilayahController::class, 'getRegencies']);
Route::get('/wilayah/districts', [WilayahController::class, 'getDistricts']);
Route::get('/wilayah/villages', [WilayahController::class, 'getVillages']);


// --- 2. Rute Public (Bisa diakses Pengunjung Tanpa Login) ---

// Search Suggestions (Autosuggest) 
Route::get('/search/suggestions', [ProductController::class, 'searchSuggestions']);

// Katalog Produk (List semua produk, bisa difilter nanti via query params)
Route::get('/products', [ProductController::class, 'index']);

// Detail Produk Lengkap (Info produk + Penjual + Gambar Detail + Review)
Route::get('/products/{id}', [ProductController::class, 'show']);

// List Kategori (Untuk dropdown filter di katalog)
Route::get('/categories', [CategoryController::class, 'index']);

// Kirim Review (Tamu/Guest bisa kirim review tanpa login)
Route::post('/products/{id}/reviews', [ReviewController::class, 'store']);

// --- 3. Rute Khusus  ---
Route::middleware(['auth:sanctum'])->group(function () {
    // Ambil data user 
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

});

// --- 4. Rute Admin ---
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    // Route untuk Admin Verifikasi Penjual
    Route::get('/admin/sellers/pending', [AdminSellerController::class, 'getPendingSellers']);
    Route::post('/admin/sellers/{id}/approve', [AdminSellerController::class, 'approveSeller']);
    Route::post('/admin/sellers/{id}/reject', [AdminSellerController::class, 'rejectSeller']);
    // Dashbboard Admin
    Route::get('/admin/dashboard/stats', [DashboardController::class, 'getAdminStats']);
    // Laporan Admin
    Route::get('/admin/reports/seller-status', [ReportController::class, 'reportSellersStatus']);
    Route::get('/admin/reports/seller-location', [ReportController::class, 'reportSellersLocation']);
    Route::get('/admin/reports/product-rating', [ReportController::class, 'reportPlatformProductsRating']);
});

// --- 5. Rute Penjual  ---
Route::middleware(['auth:sanctum', 'penjual'])->group(function () {
    // List Produk 
    Route::get('/seller/products', [ProductController::class, 'indexSeller']);
    // Upload Produk
    Route::post('/seller/products', [ProductController::class, 'store']);
    // Detail Produk
    Route::get('/seller/products/{id}', [ProductController::class, 'showSeller']);
    // Dashboard Statistik
    Route::get('/seller/dashboard/stats', [DashboardController::class, 'getSellerStats']);

    // Laporan Penjual
    Route::get('/seller/reports/stock', [ReportController::class, 'reportSellerStock']);
    Route::get('/seller/reports/rating', [ReportController::class, 'reportSellerRating']);
    Route::get('/seller/reports/low-stock', [ReportController::class, 'reportSellerLowStock']);
});

require __DIR__.'/auth.php';