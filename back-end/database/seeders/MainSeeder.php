<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\ProductImage;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class MainSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Buat Kategori (Penting untuk Produk)
        $catElektronik = ProductCategory::firstOrCreate(
            ['slug' => 'elektronik'],
            ['name' => 'Elektronik']
        );

        $catFashion = ProductCategory::firstOrCreate(
            ['slug' => 'fashion'],
            ['name' => 'Fashion']
        );
        
        // 2. Data Dummy Penjual & Produk
        $dataPenjual = [
            [
                'seller' => ['name' => 'Budi Komputer', 'email' => 'budi@store.com', 'phone' => '081111222333'],
                'product' => [
                    'name' => 'Laptop Gaming ROG', 
                    'price' => 15000000,
                    'brand' => 'Asus',
                    'desc' => 'Laptop gaming spesifikasi dewa, kondisi mulus like new.',
                    'cat_id' => $catElektronik->id,
                    'img_prefix' => 'p1' 
                ]
            ],
            [
                'seller' => ['name' => 'Siti Shoes', 'email' => 'siti@store.com', 'phone' => '082222333444'],
                'product' => [
                    'name' => 'Sepatu Running Nike', 
                    'price' => 1200000,
                    'brand' => 'Nike',
                    'desc' => 'Sepatu lari nyaman, ukuran 42, original.',
                    'cat_id' => $catFashion->id,
                    'img_prefix' => 'p2' 
                ]
            ],
            [
                'seller' => ['name' => 'Andi Kamera', 'email' => 'andi@store.com', 'phone' => '083333444555'],
                'product' => [
                    'name' => 'Kamera DSLR Canon', 
                    'price' => 8000000,
                    'brand' => 'Canon',
                    'desc' => 'Kamera untuk pemula dan profesional, bonus lensa kit.',
                    'cat_id' => $catElektronik->id,
                    'img_prefix' => 'p3' 
                ]
            ],
            [
                'seller' => ['name' => 'Rina Watch', 'email' => 'rina@store.com', 'phone' => '084444555666'],
                'product' => [
                    'name' => 'Jam Tangan G-Shock', 
                    'price' => 2500000,
                    'brand' => 'Casio',
                    'desc' => 'Tahan air dan tahan banting, cocok untuk outdoor.',
                    'cat_id' => $catFashion->id,
                    'img_prefix' => 'p4' 
                ]
            ],
        ];

        foreach ($dataPenjual as $data) {
            // 3. Buat User (Penjual) - SESUAI CONTROLLER
            $user = User::updateOrCreate(
                ['email' => $data['seller']['email']], 
                [
                    // -- Bagian Akun --
                    'nama' => $data['seller']['name'],
                    'password' => Hash::make('password'),
                    'role' => 'penjual',
                    'status' => 'active', // Kita paksa aktif biar bisa punya produk
                    
                    // -- Bagian Data Diri & Toko (Sesuai RegisteredUserController) --
                    'nama_toko' => $data['seller']['name'] . " Official",
                    'deskripsi_singkat' => 'Official store dari ' . $data['seller']['name'],
                    'no_handphone' => $data['seller']['phone'], // Max 15 chars
                    'alamat' => 'Jl. Merdeka No. 45, Semarang',
                    'rt' => '001', // Max 3 chars
                    'rw' => '002', // Max 3 chars
                    'no_ktp' => '3374010101900001', // Size 16 chars
                    
                    // -- Wilayah (Required) --
                    'province_id' => '33', 
                    'province_name' => 'Jawa Tengah',
                    'regency_id' => '3374', 
                    'regency_name' => 'Kota Semarang',
                    'district_id' => '3374010', 
                    'district_name' => 'Semarang Tengah',
                    'village_id' => '3374010001', 
                    'village_name' => 'Pekunden',

                    // -- File Uploads (Path disesuaikan dengan format controller: public/...) --
                    'foto' => 'public/foto_penjual/profil_dummy.jpg', 
                    'file_upload_ktp' => 'public/ktp_penjual/ktp_dummy.jpg', 
                ]
            );

            // 4. Buat Produk (Hapus lama biar bersih)
            Product::where('user_id', $user->id)->delete();

            $product = Product::create([
                'user_id' => $user->id,
                'category_id' => $data['product']['cat_id'],
                'name' => $data['product']['name'],
                'price' => $data['product']['price'],
                'brand' => $data['product']['brand'],
                'warranty_type' => 'Resmi',
                'condition' => 'baru',
                'stock' => 15,
                'description' => $data['product']['desc'],
                'main_image' => 'products/' . $data['product']['img_prefix'] . '_main.jpg', 
                'total_sold' => rand(5, 100)
            ]);

            // 5. Buat Gambar Detail
            for ($i = 1; $i <= 3; $i++) {
                ProductImage::create([
                    'product_id' => $product->id,
                    'image_path' => 'products/details/' . $data['product']['img_prefix'] . '_d' . $i . '.jpg'
                ]);
            }
        }
    }
}