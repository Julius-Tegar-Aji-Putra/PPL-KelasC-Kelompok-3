<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\ProductImage;
use App\Models\User;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Ambil User Penjual
        $sellerBudi = User::where('email', 'budi@santoso.com')->first();
        $sellerDoni = User::where('email', 'doni@pratama.com')->first();
        $sellerRina = User::where('email', 'rina@wati.com')->first();
        
        if (!$sellerBudi || !$sellerDoni || !$sellerRina) {
            $this->command->error('User penjual tidak ditemukan. Pastikan SellerSeeder sudah dijalankan!');
            return;
        }

        // 2. Ambil Kategori
        $catGadget = ProductCategory::where('name', 'Gadget')->first();
        $catFashionPria = ProductCategory::where('name', 'Fashion Pria')->first();
        $catElektronik = ProductCategory::where('name', 'Elektronik')->first();

        // 3. Data Produk (Tanpa Slug, Condition Bahasa Indonesia)
        $products = [
            [
                'user_id'     => $sellerDoni->id, 
                'category_id' => $catGadget->id,
                'name'        => 'Laptop Gaming Lenovo LEGION',
                'price'       => 25000000,
                'stock'       => 5,
                'brand'       => 'LENOVO',
                'condition'   => 'baru', // SESUAI ENUM DATABASE
                'warranty_type' => 'resmi',
                'description' => 'Laptop gaming ultra-slim dengan prosesor AMD Ryzen 9 dan grafis RTX 4060.',
                'main_image'  => 'products/p1_main.jpg',
                'images'      => ['products/details/p1_d1.jpg', 'products/details/p1_d2.jpg', 'products/details/p1_d3.jpg']
            ],
                        [
                'user_id'     => $sellerRina->id,
                'category_id' => $catFashionPria->id,
                'name'        => 'Sepatu Sneakers Running Air Zoom',
                'price'       => 850000,
                'stock'       => 20,
                'brand'       => 'Nike',
                'condition'   => 'bekas', // SESUAI ENUM DATABASE
                'warranty_type' => 'tidak ada',
                'description' => 'Sepatu lari kondisi 95% mulus, baru dipakai 2 kali di indoor.',
                'main_image'  => 'products/p2_main.jpg',
                'images'      => ['products/details/p2_d1.jpg', 'products/details/p2_d2.jpg', 'products/details/p2_d3.jpg']
            ],
            [
                'user_id'     => $sellerBudi->id,
                'category_id' => $catElektronik->id,
                'name'        => 'Kamera DSLR Canon EOS 800D Kit',
                'price'       => 8500000,
                'stock'       => 3,
                'brand'       => 'Canon',
                'condition'   => 'bekas', // SESUAI ENUM DATABASE
                'warranty_type' => 'distributor',
                'description' => 'Kamera kondisi normal, karet kencang, tulisan jelas.',
                'main_image'  => 'products/p3_main.jpg',
                'images'      => ['products/details/p3_d1.jpg', 'products/details/p3_d2.jpg', 'products/details/p3_d3.jpg']
            ],
            [
                'user_id'     => $sellerRina->id,
                'category_id' => $catFashionPria->id,
                'name'        => 'Jam Tangan Pria Classic Leather',
                'price'       => 2500000,
                'stock'       => 10,
                'brand'       => 'Fossil',
                'condition'   => 'baru', // SESUAI ENUM DATABASE
                'warranty_type' => 'toko',
                'description' => 'Jam tangan kulit asli dengan desain minimalis dan elegan.',
                'main_image'  => 'products/p4_main.jpg',
                'images'      => ['products/details/p4_d1.jpg', 'products/details/p4_d2.jpg', 'products/details/p4_d3.jpg']
            ],
        ];

        // 4. Eksekusi Insert
        foreach ($products as $item) {
            $product = Product::create([
                'user_id'       => $item['user_id'],
                'category_id'   => $item['category_id'],
                'name'          => $item['name'],
                'price'         => $item['price'],
                'stock'         => $item['stock'],
                'brand'         => $item['brand'],
                'condition'     => $item['condition'],
                'warranty_type' => $item['warranty_type'],
                'description'   => $item['description'],
                'main_image'    => $item['main_image'],
            ]);

            if (isset($item['images'])) {
                foreach ($item['images'] as $imgPath) {
                    ProductImage::create([
                        'product_id' => $product->id,
                        'image_path' => $imgPath
                    ]);
                }
            }
        }
    }
}