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
    public function reportSellersStatus()
    {
        $sellers = User::where('role', 'penjual')
            ->whereIn('status', ['active', 'inactive']) 
            ->orderByRaw("FIELD(status, 'active', 'inactive')")
            ->select('nama', 'nama_toko', 'status') 
            ->get();

        return $this->generatePdf('reports.admin_sellers_status', [
            'title' => 'Laporan Daftar Akun Penjual Berdasarkan Status',
            'data' => $sellers
        ]);
    }

    public function reportSellersLocation()
    {
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

    public function reportPlatformProductsRating()
    {
        $products = Product::with(['category', 'seller', 'reviews'])
            ->withAvg('reviews', 'rating')
            ->orderByDesc('reviews_avg_rating')
            ->get();

        return $this->generatePdf('reports.admin_products_rating', [
            'title' => 'Laporan Daftar Produk Berdasarkan Rating',
            'data' => $products
        ]);
    }

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

    public function reportSellerRating(Request $request)
    {
        $products = Product::where('user_id', Auth::id())
            ->with('category')
            ->withAvg('reviews', 'rating')
            ->orderByDesc('reviews_avg_rating')
            ->get();

        return $this->generatePdf('reports.seller_products_stock', [
            'title' => 'Laporan Daftar Produk Berdasarkan Rating',
            'data' => $products
        ]);
    }

    public function reportSellerLowStock(Request $request)
    {
        $products = Product::where('user_id', Auth::id())
            ->where('stock', '<', 2)
            ->with('category')
            ->withAvg('reviews', 'rating')
            ->orderBy('stock', 'asc') 
            ->get();

        return $this->generatePdf('reports.seller_products_stock', [
            'title' => 'Laporan Daftar Stock Barang Yang Harus Segera Di Pesan',
            'data' => $products
        ]);
    }

    private function generatePdf($view, $data)
    {
        $data['processor'] = Auth::user()->nama; 
        $data['date'] = now()->format('d-m-Y'); 

        $pdf = Pdf::loadView($view, $data);
        $pdf->setPaper('a4', 'portrait');
        
        return $pdf->stream('Laporan_MartPlace.pdf');
    }
}