<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\WilayahController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\AdminSellerController;

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

// Katalog Produk (List semua produk, bisa difilter nanti via query params)
// Contoh akses: GET /api/products
Route::get('/products', [ProductController::class, 'index']);

// Detail Produk Lengkap (Info produk + Penjual + Gambar Detail + Review)
// Contoh akses: GET /api/products/1
Route::get('/products/{id}', [ProductController::class, 'show']);

// List Kategori (Untuk dropdown filter di katalog)
// Contoh akses: GET /api/categories
Route::get('/categories', [CategoryController::class, 'index']);

// Kirim Review (Tamu/Guest bisa kirim review tanpa login)
// Contoh akses: POST /api/products/1/reviews
Route::post('/products/{id}/reviews', [ReviewController::class, 'store']);


// --- 3. Rute Protected (Hanya Penjual yang Login) ---
Route::middleware(['auth:sanctum'])->group(function () {
    
    // Ambil data user yang sedang login
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Upload Produk Baru
    Route::post('/products', [ProductController::class, 'store']);
    
    // (Opsional) Edit/Delete Produk bisa ditambahkan di sini nanti
});

// --- 4. Rute Admin (Pengelolaan Penjual) ---
// Catatan: Idealnya nanti dibungkus middleware 'admin', tapi untuk tes bisa ditaruh disini
// atau di dalam group auth:sanctum jika adminnya login dulu.
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    
    // Route untuk Admin Verifikasi Penjual
    Route::get('/admin/sellers/pending', [AdminSellerController::class, 'getPendingSellers']);
    Route::post('/admin/sellers/{id}/approve', [AdminSellerController::class, 'approveSeller']);
    Route::post('/admin/sellers/{id}/reject', [AdminSellerController::class, 'rejectSeller']);

});

// Load route auth default (register, login, logout)
require __DIR__.'/auth.php';