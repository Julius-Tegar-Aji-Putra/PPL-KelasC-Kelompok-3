<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Product;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Auth;

class ReportController extends Controller
{
    // ===========================
    // BAGIAN PLATFORM (ADMIN)
    // ===========================

    // SRS-09: Laporan Akun Penjual (Aktif/Tidak Aktif)
    public function reportSellersStatus()
    {
        // Sort: Aktif dulu, baru inactive (sesuai docs)
        $sellers = User::where('role', 'penjual')
            ->whereIn('status', ['active', 'inactive']) // Hanya status ini
            ->orderByRaw("FIELD(status, 'active', 'inactive')")
            ->select('nama', 'nama_toko', 'status') // Asumsi PIC = nama user
            ->get();

        return $this->generatePdf('reports.admin_sellers_status', [
            'title' => 'Laporan Daftar Akun Penjual Berdasarkan Status',
            'data' => $sellers
        ]);
    }

    // SRS-10: Laporan Toko per Provinsi
    public function reportSellersLocation()
    {
        // Sort: Berdasarkan provinsi
        $sellers = User::where('role', 'penjual')
            ->whereNotNull('province_name')
            ->orderBy('province_name', 'asc')
            ->select('nama', 'nama_toko', 'province_name')
            ->get();

        return $this->generatePdf('reports.admin_sellers_location', [
            'title' => 'Laporan Daftar Toko Berdasarkan Lokasi Propinsi',
            'data' => $sellers
        ]);
    }

    // SRS-11: Laporan Produk & Rating (Platform)
    public function reportPlatformProductsRating()
    {
        // Sort: Rating menurun (Highest to Lowest)
        $products = Product::with(['category', 'seller', 'reviews'])
            ->withAvg('reviews', 'rating')
            ->orderByDesc('reviews_avg_rating')
            ->get();

        return $this->generatePdf('reports.admin_products_rating', [
            'title' => 'Laporan Daftar Produk Berdasarkan Rating',
            'data' => $products
        ]);
    }

    // ===========================
    // BAGIAN PENJUAL (SELLER)
    // ===========================

    // SRS-12: Laporan Stok Produk (Sort by Stock Desc)
    public function reportSellerStock(Request $request)
    {
        $products = Product::where('user_id', Auth::id())
            ->with('category')
            ->withAvg('reviews', 'rating')
            ->orderByDesc('stock')
            ->get();

        return $this->generatePdf('reports.seller_products_stock', [
            'title' => 'Laporan Daftar Produk Berdasarkan Stock',
            'data' => $products
        ]);
    }

    // SRS-13: Laporan Produk Rating (Sort by Rating Desc)
    public function reportSellerRating(Request $request)
    {
        $products = Product::where('user_id', Auth::id())
            ->with('category')
            ->withAvg('reviews', 'rating')
            ->orderByDesc('reviews_avg_rating')
            ->get();

        // Menggunakan view yang sama dengan SRS-12 karena kolomnya sama persis di docs
        // Cuma beda urutan datanya aja
        return $this->generatePdf('reports.seller_products_stock', [
            'title' => 'Laporan Daftar Produk Berdasarkan Rating',
            'data' => $products
        ]);
    }

    // SRS-14: Laporan Low Stock (< 2)
    public function reportSellerLowStock(Request $request)
    {
        $products = Product::where('user_id', Auth::id())
            ->where('stock', '<', 2)
            ->with('category')
            ->withAvg('reviews', 'rating')
            ->orderBy('stock', 'asc') // Sort stock paling dikit
            ->get();

        return $this->generatePdf('reports.seller_products_stock', [
            'title' => 'Laporan Daftar Stock Barang Yang Harus Segera Di Pesan',
            'data' => $products
        ]);
    }

    // --- HELPER FUNCTION BIAR GA ULANG KODE ---
    private function generatePdf($view, $data)
    {
        $data['processor'] = Auth::user()->nama; // Nama pemroses
        $data['date'] = now()->format('d-m-Y'); // Tanggal dibuat

        $pdf = Pdf::loadView($view, $data);
        // Set paper A4 Portrait
        $pdf->setPaper('a4', 'portrait');
        
        // Return stream (agar bisa dipreview/download di browser)
        return $pdf->stream('Laporan_MartPlace.pdf');
    }
}