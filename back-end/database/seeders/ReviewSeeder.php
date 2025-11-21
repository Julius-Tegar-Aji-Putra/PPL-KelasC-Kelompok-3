<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Review;
use App\Models\Product;

class ReviewSeeder extends Seeder
{
    public function run(): void
    {
        // Kita asumsikan Product ID 1-4 sudah ada dari ProductSeeder
        $products = [1, 2, 3, 4]; 

        // Data Dummy yang bervariasi
        $reviewsData = [
            // PRODUK 1 (Laptop) - Rating Bagus
            1 => [
                [
                    'name' => 'Ahmad Gamer',
                    'rating' => 5,
                    'comment' => 'Gila sih ini laptop kenceng banget! Render video 4K lancar jaya. Recommended seller!',
                    'province' => 'DKI Jakarta'
                ],
                [
                    'name' => 'Siti Nurbaya',
                    'rating' => 4,
                    'comment' => 'Barang bagus, packing aman kayu. Cuma pengiriman agak telat sehari dari ekspedisi.',
                    'province' => 'Jawa Barat'
                ],
                [
                    'name' => 'Budi Santoso',
                    'rating' => 5,
                    'comment' => 'Sesuai deskripsi, garansi resmi sudah dicek. Mantap!',
                    'province' => 'Jawa Tengah'
                ]
            ],
            // PRODUK 2 (Jam Tangan) - Rating Campur (Ada yang kecewa)
            2 => [
                [
                    'name' => 'Rina Nose',
                    'rating' => 3,
                    'comment' => 'Strap kulitnya agak kaku ya, beda sama foto. Tapi mesin jam oke.',
                    'province' => 'Bali'
                ],
                [
                    'name' => 'Doni Tata',
                    'rating' => 5,
                    'comment' => 'Buat kado ulang tahun suami, dia suka banget. Elegan dan mewah.',
                    'province' => 'Jawa Timur'
                ],
                [
                    'name' => 'Kevin Sanjaya',
                    'rating' => 2,
                    'comment' => 'Pengiriman lama banget, respon penjual lambat.',
                    'province' => 'Sumatera Utara'
                ]
            ],
            // PRODUK 3 (Sepatu Bekas) - Rating Jujur
            3 => [
                [
                    'name' => 'Fajar Alfian',
                    'rating' => 4,
                    'comment' => 'Kondisi bekas tapi masih mulus 90%. Sol masih tebal. Worth it lah harga segini.',
                    'province' => 'Jawa Barat'
                ],
                [
                    'name' => 'Marcus Gideon',
                    'rating' => 5,
                    'comment' => 'Pas di kaki, nyaman buat lari pagi. Makasih gan!',
                    'province' => 'DKI Jakarta'
                ],
                [
                    'name' => 'Hendra Setiawan',
                    'rating' => 4,
                    'comment' => 'Box agak penyok dikit, tapi sepatu aman.',
                    'province' => 'Banten'
                ]
            ],
            // PRODUK 4 (Kamera) - Rating Tinggi
            4 => [
                [
                    'name' => 'Dian Sastro',
                    'rating' => 5,
                    'comment' => 'Hasil foto tajam, lensa kit berfungsi normal. Gak nyesel beli bekas di sini.',
                    'province' => 'DI Yogyakarta'
                ],
                [
                    'name' => 'Nicholas Saputra',
                    'rating' => 5,
                    'comment' => 'Barang istimewa, karet-karet masih kenceng semua. Top!',
                    'province' => 'DKI Jakarta'
                ],
                [
                    'name' => 'Reza Rahadian',
                    'rating' => 4,
                    'comment' => 'Minus pemakaian wajar aja, selebihnya oke.',
                    'province' => 'Jawa Tengah'
                ]
            ]
        ];

        foreach ($products as $productId) {
            if (!isset($reviewsData[$productId])) continue;

            foreach ($reviewsData[$productId] as $index => $data) {
                Review::create([
                    'product_id'     => $productId,
                    'reviewer_name'  => $data['name'],
                    // Trik agar email & hp unik: pakai index loop
                    'reviewer_email' => strtolower(str_replace(' ', '', $data['name'])) . $productId . $index . '@example.com',
                    'reviewer_phone' => '08123456' . $productId . $index,
                    'province'       => $data['province'],
                    'rating'         => $data['rating'],
                    'comment'        => $data['comment'],
                ]);
            }
        }
    }
}