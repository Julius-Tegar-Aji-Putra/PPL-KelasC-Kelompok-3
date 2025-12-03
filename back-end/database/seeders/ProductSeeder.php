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
        $sellerSiti = User::where('email', 'siti@aminah.com')->first();
        $sellerAhmad = User::where('email', 'ahmad@udin.com')->first();
        $sellerYuli = User::where('email', 'yuli@winda.com')->first();
        $sellerSara = User::where('email', 'sara@lestari.com')->first();

        
        if (!$sellerBudi || !$sellerDoni || !$sellerRina || !$sellerSiti || !$sellerAhmad || !$sellerYuli || !$sellerSara) {
            $this->command->error('User penjual tidak ditemukan. Pastikan SellerSeeder sudah dijalankan!');
            return;
        }

        // 2. Ambil Kategori
        $catGadget = ProductCategory::where('name', 'Gadget')->first();
        $catFashionPria = ProductCategory::where('name', 'Fashion Pria')->first();
        $catElektronik = ProductCategory::where('name', 'Elektronik')->first();
        $catFashionWanita = ProductCategory::where('name', 'Fashion Wanita')->first();
        $catKecantikan = ProductCategory::where('name', 'Kecantikan & Perawatan')->first();
        $catMakanan = ProductCategory::where('name', 'Makanan & Minuman')->first();
        $catOtomotif = ProductCategory::where('name', 'Otomotif')->first();
        $catHobi = ProductCategory::where('name', 'Hobi & Koleksi')->first();
        $catBuku = ProductCategory::where('name', 'Buku & ATK')->first();
        $catGaming = ProductCategory::where('name', 'Gaming')->first();
        $catKesehatan = ProductCategory::where('name', 'Kesehatan')->first();
        $catOlahraga = ProductCategory::where('name', 'Olahraga')->first();
        $catPerabotan = ProductCategory::where('name', 'Perabotan Rumah')->first();

        // 3. Data Produk (Tanpa Slug, Condition Bahasa Indonesia)
        $products = [

            // --- 4 DATA AWAL ---

            [
                'user_id'     => $sellerBudi->id, 
                'category_id' => $catGadget->id,
                'name'        => 'Laptop Gaming Lenovo LEGION',
                'price'       => 25000000,
                'stock'       => 5,
                'brand'       => 'LENOVO',
                'condition'   => 'Baru', 
                'warranty_type' => 'Garansi Resmi',
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
                'condition'   => 'Bekas', 
                'warranty_type' => 'Tidak Ada Garansi',
                'description' => 'Sepatu lari kondisi 95% mulus, baru dipakai 2 kali di indoor.',
                'main_image'  => 'products/p2_main.jpg',
                'images'      => ['products/details/p2_d1.jpg', 'products/details/p2_d2.jpg', 'products/details/p2_d3.jpg']
            ],
            [
                'user_id'     => $sellerBudi->id,
                'category_id' => $catElektronik->id,
                'name'        => 'Kamera DSLR Canon EOS 800D Kit',
                'price'       => 8500000,
                'stock'       => 1,
                'brand'       => 'Canon',
                'condition'   => 'Bekas', 
                'warranty_type' => 'Garansi Distributor',
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
                'condition'   => 'Baru',
                'warranty_type' => 'Garansi Toko',
                'description' => 'Jam tangan kulit asli dengan desain minimalis dan elegan.',
                'main_image'  => 'products/p4_main.jpg',
                'images'      => ['products/details/p4_d1.jpg', 'products/details/p4_d2.jpg', 'products/details/p4_d3.jpg']
            ],

            // --- KATEGORI GADGET ---

            [
                'user_id' => $sellerBudi->id,
                'category_id' => $catGadget->id,
                'name' => 'Samsung Galaxy S23 5G 256GB',
                'price' => 12000000,
                'stock' => 5,
                'brand' => 'Samsung',
                'condition' => 'Baru',
                'warranty_type' => 'Garansi Resmi',
                'description' => 'Smartphone flagship dengan kamera nightography terbaik dan prosesor Snapdragon 8 Gen 2.',
                'main_image' => 'products/p5_main.jpg',
                'images' => ['products/details/p5_d1.jpg']
            ],
            [
                'user_id' => $sellerBudi->id,
                'category_id' => $catGadget->id,
                'name' => 'iPad Air 5 M1 64GB WiFi',
                'price' => 9500000,
                'stock' => 3,
                'brand' => 'Apple',
                'condition' => 'Baru',
                'warranty_type' => 'Garansi Resmi',
                'description' => 'Tablet powerful dengan chip M1, layar Liquid Retina, cocok untuk desain dan multitasking.',
                'main_image' => 'products/p6_main.jpg',
                'images' => ['products/details/p6_d1.jpg']
            ],
            [
                'user_id' => $sellerBudi->id,
                'category_id' => $catGadget->id,
                'name' => 'Xiaomi Redmi Note 12 Pro',
                'price' => 3800000,
                'stock' => 10,
                'brand' => 'Xiaomi',
                'condition' => 'Baru',
                'warranty_type' => 'Garansi Resmi',
                'description' => 'HP midrange juara dengan layar AMOLED 120Hz dan pengisian daya turbo 67W.',
                'main_image' => 'products/p7_main.jpg',
                'images' => ['products/details/p7_d1.jpg']
            ],

            // --- KATEGORI ELEKTRONIK --- 

            [
                'user_id' => $sellerBudi->id,
                'category_id' => $catElektronik->id,
                'name' => 'Smart TV LG 43 Inch 4K UHD',
                'price' => 4500000,
                'stock' => 4,
                'brand' => 'LG',
                'condition' => 'Baru',
                'warranty_type' => 'Garansi Resmi',
                'description' => 'Smart TV dengan resolusi 4K jernih, mendukung Netflix dan Youtube, bezel tipis.',
                'main_image' => 'products/p8_main.jpg',
                'images' => ['products/details/p8_d1.jpg']
            ],
            [
                'user_id' => $sellerBudi->id,
                'category_id' => $catElektronik->id,
                'name' => 'Speaker Bluetooth JBL Flip 6',
                'price' => 1800000,
                'stock' => 8,
                'brand' => 'JBL',
                'condition' => 'Baru',
                'warranty_type' => 'Garansi Distributor',
                'description' => 'Speaker portable tahan air IP67 dengan suara bass yang nendang dan baterai awet.',
                'main_image' => 'products/p9_main.jpg',
                'images' => ['products/details/p9_d1.jpg']
            ],
            [
                'user_id' => $sellerBudi->id,
                'category_id' => $catElektronik->id,
                'name' => 'Rice Cooker Digital Philips HD4515',
                'price' => 750000,
                'stock' => 12,
                'brand' => 'Philips',
                'condition' => 'Baru',
                'warranty_type' => 'Garansi Resmi',
                'description' => 'Penanak nasi digital dengan 8 fungsi memasak otomatis dan panci bakuhanseki anti lengket.',
                'main_image' => 'products/p10_main.jpg',
                'images' => ['products/details/p10_d1.jpg']
            ],

            // --- KATEGORI FASHION PRIA --- 

            [
                'user_id' => $sellerRina->id,
                'category_id' => $catFashionPria->id,
                'name' => 'Kemeja Flannel Uniqlo Kotak-kotak',
                'price' => 250000,
                'stock' => 5,
                'brand' => 'Uniqlo',
                'condition' => 'Bekas',
                'warranty_type' => 'Tidak Ada Garansi',
                'description' => 'Kemeja flannel kondisi 90% mulus, ukuran L, warna masih pekat jarang dipakai.',
                'main_image' => 'products/p11_main.jpg',
                'images' => ['products/details/p11_d1.jpg']
            ],
            [
                'user_id' => $sellerRina->id,
                'category_id' => $catFashionPria->id,
                'name' => 'Jaket Denim Levis Trucker',
                'price' => 1200000,
                'stock' => 3,
                'brand' => 'Levis',
                'condition' => 'Baru',
                'warranty_type' => 'Garansi Toko',
                'description' => 'Jaket jeans klasik model trucker, bahan denim tebal dan awet, warna indigo.',
                'main_image' => 'products/p12_main.jpg',
                'images' => ['products/details/p12_d1.jpg']
            ],

            // --- KATEGORI FASHION WANITA ---

            [
                'user_id' => $sellerRina->id,
                'category_id' => $catFashionWanita->id,
                'name' => 'Dress Floral Midi Zara',
                'price' => 550000,
                'stock' => 6,
                'brand' => 'Zara',
                'condition' => 'Baru',
                'warranty_type' => 'Garansi Toko',
                'description' => 'Dress motif bunga bahan rayon viscose adem, cocok untuk acara santai maupun semi-formal.',
                'main_image' => 'products/p13_main.jpg',
                'images' => ['products/details/p13_d1.jpg']
            ],
            [
                'user_id' => $sellerRina->id,
                'category_id' => $catFashionWanita->id,
                'name' => 'Tas Selempang Coach Tabby',
                'price' => 3500000,
                'stock' => 1,
                'brand' => 'Coach',
                'condition' => 'Bekas',
                'warranty_type' => 'Tidak Ada Garansi',
                'description' => 'Tas original kondisi preloved like new, lengkap dengan dustbag dan sertifikat.',
                'main_image' => 'products/p14_main.jpg',
                'images' => ['products/details/p14_d1.jpg']
            ],
            [
                'user_id' => $sellerRina->id,
                'category_id' => $catFashionWanita->id,
                'name' => 'Sepatu Heels Charles & Keith',
                'price' => 899000,
                'stock' => 4,
                'brand' => 'Charles & Keith',
                'condition' => 'Baru',
                'warranty_type' => 'Garansi Toko',
                'description' => 'High heels 5cm dengan desain elegan, nyaman dipakai seharian tidak membuat kaki sakit.',
                'main_image' => 'products/p15_main.jpg',
                'images' => ['products/details/p15_d1.jpg']
            ],
            [
                'user_id' => $sellerRina->id,
                'category_id' => $catFashionWanita->id,
                'name' => 'Blouse Batik Modern',
                'price' => 175000,
                'stock' => 15,
                'brand' => 'Batik Keris',
                'condition' => 'Baru',
                'warranty_type' => 'Tidak Ada Garansi',
                'description' => 'Atasan batik cap motif parang modern, bahan katun prima halus dan menyerap keringat.',
                'main_image' => 'products/p16_main.jpg',
                'images' => ['products/details/p16_d1.jpg']
            ],

            // --- KATEGORI KECANTIKAN ---

            [
                'user_id' => $sellerSiti->id,
                'category_id' => $catKecantikan->id,
                'name' => 'Serum Vitamin C Somethinc',
                'price' => 129000,
                'stock' => 20,
                'brand' => 'Somethinc',
                'condition' => 'Baru',
                'warranty_type' => 'Garansi Resmi',
                'description' => 'Serum pencerah wajah, memudarkan noda hitam dan meratakan warna kulit dalam 14 hari.',
                'main_image' => 'products/p17_main.jpg',
                'images' => ['products/details/p17_d1.jpg']
            ],
            [
                'user_id' => $sellerSiti->id,
                'category_id' => $catKecantikan->id,
                'name' => 'Lipstick Matte Maybelline Superstay',
                'price' => 85000,
                'stock' => 25,
                'brand' => 'Maybelline',
                'condition' => 'Baru',
                'warranty_type' => 'Tidak Ada Garansi',
                'description' => 'Lipcream matte tahan lama hingga 16 jam, transferproof dan tidak membuat bibir kering.',
                'main_image' => 'products/p18_main.jpg',
                'images' => ['products/details/p18_d1.jpg']
            ],
            [
                'user_id' => $sellerSiti->id,
                'category_id' => $catKecantikan->id,
                'name' => 'Skintific 5X Ceramide Moisturizer',
                'price' => 135000,
                'stock' => 15,
                'brand' => 'Skintific',
                'condition' => 'Baru',
                'warranty_type' => 'Garansi Resmi',
                'description' => 'Pelembab wajah viral untuk memperbaiki skin barrier yang rusak, tekstur gel ringan.',
                'main_image' => 'products/p19_main.jpg',
                'images' => ['products/details/p19_d1.jpg']
            ],
            [
                'user_id' => $sellerSiti->id,
                'category_id' => $catKecantikan->id,
                'name' => 'Parfum Chanel No 5 (Preloved)',
                'price' => 1500000,
                'stock' => 1,
                'brand' => 'Chanel',
                'condition' => 'Bekas',
                'warranty_type' => 'Tidak Ada Garansi',
                'description' => 'Parfum original sisa 80%, dijual karena ingin ganti varian lain. Box masih lengkap.',
                'main_image' => 'products/p20_main.jpg',
                'images' => ['products/details/p20_d1.jpg']
            ],

            // --- KATEGORI MAKANAN & MINUMAN ---

            [
                'user_id' => $sellerYuli->id,
                'category_id' => $catMakanan->id,
                'name' => 'Kripik Singkong Pedas Maicih',
                'price' => 25000,
                'stock' => 50,
                'brand' => 'Maicih',
                'condition' => 'Baru',
                'warranty_type' => 'Tidak Ada Garansi',
                'description' => 'Kripik singkong dengan bumbu pedas level 10, renyah dan bikin ketagihan.',
                'main_image' => 'products/p21_main.jpg',
                'images' => ['products/details/p21_d1.jpg']
            ],
            [
                'user_id' => $sellerYuli->id,
                'category_id' => $catMakanan->id,
                'name' => 'Kopi Arabika Gayo Aceh 250g',
                'price' => 85000,
                'stock' => 20,
                'brand' => 'Otten Coffee',
                'condition' => 'Baru',
                'warranty_type' => 'Tidak Ada Garansi',
                'description' => 'Biji kopi pilihan dari dataran tinggi Gayo, aroma kuat dengan notes fruity.',
                'main_image' => 'products/p22_main.jpg',
                'images' => ['products/details/p22_d1.jpg']
            ],
            [
                'user_id' => $sellerYuli->id,
                'category_id' => $catMakanan->id,
                'name' => 'Frozen Kebab Daging Sapi isi 10',
                'price' => 60000,
                'stock' => 30,
                'brand' => 'Baba Rafi',
                'condition' => 'Baru',
                'warranty_type' => 'Tidak Ada Garansi',
                'description' => 'Kebab beku praktis tinggal dipanaskan, isian daging sapi melimpah dan keju.',
                'main_image' => 'products/p23_main.jpg',
                'images' => ['products/details/p23_d1.jpg']
            ],
            [
                'user_id' => $sellerYuli->id,
                'category_id' => $catMakanan->id,
                'name' => 'Madu Hutan Murni 500ml',
                'price' => 120000,
                'stock' => 15,
                'brand' => 'Uray',
                'condition' => 'Baru',
                'warranty_type' => 'Garansi Toko',
                'description' => 'Madu asli dari hutan tanpa campuran gula, baik untuk menjaga imunitas tubuh.',
                'main_image' => 'products/p24_main.jpg',
                'images' => ['products/details/p24_d1.jpg']
            ],

            // --- KATEGORI OTOMOTIF ---

            [
                'user_id' => $sellerBudi->id,
                'category_id' => $catOtomotif->id,
                'name' => 'Helm KYT TT Course',
                'price' => 1300000,
                'stock' => 5,
                'brand' => 'KYT',
                'condition' => 'Baru',
                'warranty_type' => 'Garansi Resmi',
                'description' => 'Helm full face dengan desain aerodinamis, busa bisa dilepas, sudah standar SNI dan DOT.',
                'main_image' => 'products/p25_main.jpg',
                'images' => ['products/details/p25_d1.jpg']
            ],
            [
                'user_id' => $sellerBudi->id,
                'category_id' => $catOtomotif->id,
                'name' => 'Oli Mesin Shell Helix HX7 10W-40',
                'price' => 85000,
                'stock' => 24,
                'brand' => 'Shell',
                'condition' => 'Baru',
                'warranty_type' => 'Garansi Distributor',
                'description' => 'Oli mesin mobil sintetik untuk performa mesin lebih halus dan tarikan enteng.',
                'main_image' => 'products/p26_main.jpg',
                'images' => ['products/details/p26_d1.jpg']
            ],
            [
                'user_id' => $sellerBudi->id,
                'category_id' => $catOtomotif->id,
                'name' => 'Sarung Tangan Motor Kulit',
                'price' => 150000,
                'stock' => 10,
                'brand' => 'Respiro',
                'condition' => 'Baru',
                'warranty_type' => 'Tidak Ada Garansi',
                'description' => 'Sarung tangan riding bahan kulit sintetis premium, nyaman dan anti slip saat hujan.',
                'main_image' => 'products/p27_main.jpg',
                'images' => ['products/details/p27_d1.jpg']
            ],
            [
                'user_id' => $sellerBudi->id,
                'category_id' => $catOtomotif->id,
                'name' => 'Karpet Mobil Universal 1 Set',
                'price' => 250000,
                'stock' => 8,
                'brand' => 'Sparco',
                'condition' => 'Baru',
                'warranty_type' => 'Garansi Toko',
                'description' => 'Karpet lantai mobil bahan karet tebal, mudah dibersihkan dan cocok untuk semua jenis mobil.',
                'main_image' => 'products/p28_main.jpg',
                'images' => ['products/details/p28_d1.jpg']
            ],

            // --- KATEGORI HOBI ---

            [
                'user_id' => $sellerAhmad->id,
                'category_id' => $catHobi->id,
                'name' => 'Action Figure Gundam HG RX-78-2',
                'price' => 180000,
                'stock' => 6,
                'brand' => 'Bandai',
                'condition' => 'Baru',
                'warranty_type' => 'Garansi Toko',
                'description' => 'Model kit Gundam skala 1/144 High Grade, detail presisi, perlu dirakit.',
                'main_image' => 'products/p29_main.jpg',
                'images' => ['products/details/p29_d1.jpg']
            ],
            [
                'user_id' => $sellerAhmad->id,
                'category_id' => $catHobi->id,
                'name' => 'Uang Kuno Rp100 Perahu Layar 1991',
                'price' => 50000,
                'stock' => 10,
                'brand' => 'Koleksi',
                'condition' => 'Bekas',
                'warranty_type' => 'Tidak Ada Garansi',
                'description' => 'Uang kertas kuno kondisi mulus tanpa lipatan, cocok untuk mahar atau koleksi numismatik.',
                'main_image' => 'products/p30_main.jpg',
                'images' => ['products/details/p30_d1.jpg']
            ],
            [
                'user_id' => $sellerAhmad->id,
                'category_id' => $catHobi->id,
                'name' => 'Diecast Hot Wheels Nissan GTR',
                'price' => 75000,
                'stock' => 12,
                'brand' => 'Hot Wheels',
                'condition' => 'Baru',
                'warranty_type' => 'Tidak Ada Garansi',
                'description' => 'Mainan mobil diecast skala 1:64, blister mulus, varian warna langka.',
                'main_image' => 'products/p31_main.jpg',
                'images' => ['products/details/p31_d1.jpg']
            ],
            [
                'user_id' => $sellerAhmad->id,
                'category_id' => $catHobi->id,
                'name' => 'Album K-Pop NCT Dream (Unsealed)',
                'price' => 150000,
                'stock' => 2,
                'brand' => 'SM Ent',
                'condition' => 'Bekas',
                'warranty_type' => 'Tidak Ada Garansi',
                'description' => 'Album kondisi bagus, CD belum pernah diputar, lengkap photobook tapi tanpa photocard random.',
                'main_image' => 'products/p32_main.jpg',
                'images' => ['products/details/p32_d1.jpg']
            ],

            // --- KATEGORI BUKU & ATK ---

            [
                'user_id' => $sellerSara->id,
                'category_id' => $catBuku->id,
                'name' => 'Novel Harry Potter dan Batu Bertuah',
                'price' => 85000,
                'stock' => 5,
                'brand' => 'Gramedia',
                'condition' => 'Bekas',
                'warranty_type' => 'Tidak Ada Garansi',
                'description' => 'Novel terjemahan bahasa Indonesia, kondisi kertas agak menguning tapi halaman lengkap.',
                'main_image' => 'products/p33_main.jpg',
                'images' => ['products/details/p33_d1.jpg']
            ],
            [
                'user_id' => $sellerSara->id,
                'category_id' => $catBuku->id,
                'name' => 'Paket Alat Tulis Faber Castell',
                'price' => 45000,
                'stock' => 20,
                'brand' => 'Faber Castell',
                'condition' => 'Baru',
                'warranty_type' => 'Garansi Toko',
                'description' => 'Satu set berisi pensil 2B, penghapus, penggaris, dan pulpen, cocok untuk ujian.',
                'main_image' => 'products/p34_main.jpg',
                'images' => ['products/details/p34_d1.jpg']
            ],
            [
                'user_id' => $sellerSara->id,
                'category_id' => $catBuku->id,
                'name' => 'Buku Tulis Sinar Dunia 58 Lembar (1 Pack)',
                'price' => 38000,
                'stock' => 30,
                'brand' => 'SiDU',
                'condition' => 'Baru',
                'warranty_type' => 'Tidak Ada Garansi',
                'description' => 'Satu pack berisi 10 buku tulis kualitas kertas tebal tidak tembus tinta.',
                'main_image' => 'products/p35_main.jpg',
                'images' => ['products/details/p35_d1.jpg']
            ],
            [
                'user_id' => $sellerSara->id,
                'category_id' => $catBuku->id,
                'name' => 'Novel Bumi Manusia - Pramoedya',
                'price' => 110000,
                'stock' => 8,
                'brand' => 'Lentera Dipantara',
                'condition' => 'Baru',
                'warranty_type' => 'Garansi Toko',
                'description' => 'Buku original segel plastik, karya sastra legendaris Indonesia tentang Minke.',
                'main_image' => 'products/p36_main.jpg',
                'images' => ['products/details/p36_d1.jpg']
            ],

            // --- KATEGORI GAMING ---
            
            [
                'user_id' => $sellerBudi->id,
                'category_id' => $catGaming->id,
                'name' => 'Mouse Gaming Logitech G502 Hero',
                'price' => 650000,
                'stock' => 10,
                'brand' => 'Logitech',
                'condition' => 'Baru',
                'warranty_type' => 'Garansi Resmi',
                'description' => 'Mouse gaming kabel dengan sensor 25K DPI, berat bisa diatur, tombol macro programmable.',
                'main_image' => 'products/p37_main.jpg',
                'images' => ['products/details/p37_d1.jpg']
            ],
            [
                'user_id' => $sellerBudi->id,
                'category_id' => $catGaming->id,
                'name' => 'Keyboard Mechanical Keychron K2',
                'price' => 1400000,
                'stock' => 5,
                'brand' => 'Keychron',
                'condition' => 'Baru',
                'warranty_type' => 'Garansi Distributor',
                'description' => 'Keyboard mechanical wireless 75%, switch gateron brown, kompatibel Mac dan Windows.',
                'main_image' => 'products/p38_main.jpg',
                'images' => ['products/details/p38_d1.jpg']
            ],
            [
                'user_id' => $sellerBudi->id,
                'category_id' => $catGaming->id,
                'name' => 'Headset Gaming SteelSeries Arctis 3',
                'price' => 700000,
                'stock' => 2,
                'brand' => 'SteelSeries',
                'condition' => 'Bekas',
                'warranty_type' => 'Tidak Ada Garansi',
                'description' => 'Headset kondisi 95%, earpad baru diganti, mic jernih, suara surround mantap.',
                'main_image' => 'products/p39_main.jpg',
                'images' => ['products/details/p39_d1.jpg']
            ],
            [
                'user_id' => $sellerBudi->id,
                'category_id' => $catGaming->id,
                'name' => 'Sony PS5 DualSense Controller',
                'price' => 1100000,
                'stock' => 8,
                'brand' => 'Sony',
                'condition' => 'Baru',
                'warranty_type' => 'Garansi Resmi',
                'description' => 'Stik PS5 original warna putih, fitur haptic feedback dan adaptive triggers.',
                'main_image' => 'products/p40_main.jpg',
                'images' => ['products/details/p40_d1.jpg']
            ],

            // --- KATEGORI KESEHATAN ---
            
            [
                'user_id' => $sellerSiti->id,
                'category_id' => $catKesehatan->id,
                'name' => 'Vitamin C 1000mg Blackmores',
                'price' => 150000,
                'stock' => 20,
                'brand' => 'Blackmores',
                'condition' => 'Baru',
                'warranty_type' => 'Garansi Resmi',
                'description' => 'Suplemen vitamin C untuk menjaga daya tahan tubuh, isi 60 tablet.',
                'main_image' => 'products/p41_main.jpg',
                'images' => ['products/details/p41_d1.jpg']
            ],
            [
                'user_id' => $sellerSiti->id,
                'category_id' => $catKesehatan->id,
                'name' => 'Masker Medis Sensi 3 Ply Earloop',
                'price' => 35000,
                'stock' => 100,
                'brand' => 'Sensi',
                'condition' => 'Baru',
                'warranty_type' => 'Tidak Ada Garansi',
                'description' => 'Masker kesehatan sekali pakai, menyaring debu dan virus, 1 box isi 50 pcs.',
                'main_image' => 'products/p42_main.jpg',
                'images' => ['products/details/p42_d1.jpg']
            ],
            [
                'user_id' => $sellerSiti->id,
                'category_id' => $catKesehatan->id,
                'name' => 'Termometer Digital Omron',
                'price' => 75000,
                'stock' => 10,
                'brand' => 'Omron',
                'condition' => 'Baru',
                'warranty_type' => 'Garansi Resmi',
                'description' => 'Alat pengukur suhu tubuh akurat dan cepat, ujung fleksibel aman untuk anak.',
                'main_image' => 'products/p43_main.jpg',
                'images' => ['products/details/p43_d1.jpg']
            ],
            [
                'user_id' => $sellerSiti->id,
                'category_id' => $catKesehatan->id,
                'name' => 'Timbangan Badan Digital Xiaomi',
                'price' => 250000,
                'stock' => 5,
                'brand' => 'Xiaomi',
                'condition' => 'Baru',
                'warranty_type' => 'Garansi Distributor',
                'description' => 'Timbangan pintar bisa konek ke HP untuk memantau BMI dan berat badan.',
                'main_image' => 'products/p44_main.jpg',
                'images' => ['products/details/p44_d1.jpg']
            ],

            // --- KATEGORI OLAHRAGA ---
            
            [
                'user_id' => $sellerAhmad->id,
                'category_id' => $catOlahraga->id,
                'name' => 'Raket Badminton Yonex Astrox',
                'price' => 650000,
                'stock' => 6,
                'brand' => 'Yonex',
                'condition' => 'Baru',
                'warranty_type' => 'Garansi Toko',
                'description' => 'Raket bulutangkis ringan tipe head heavy untuk smash power yang kuat, sudah terpasang senar.',
                'main_image' => 'products/p45_main.jpg',
                'images' => ['products/details/p45_d1.jpg']
            ],
            [
                'user_id' => $sellerAhmad->id,
                'category_id' => $catOlahraga->id,
                'name' => 'Bola Basket Molten BG4500',
                'price' => 550000,
                'stock' => 4,
                'brand' => 'Molten',
                'condition' => 'Baru',
                'warranty_type' => 'Garansi Resmi',
                'description' => 'Bola basket size 7 standar IBL, bahan kulit komposit premium grip mantap.',
                'main_image' => 'products/p46_main.jpg',
                'images' => ['products/details/p46_d1.jpg']
            ],
            [
                'user_id' => $sellerAhmad->id,
                'category_id' => $catOlahraga->id,
                'name' => 'Matras Yoga Happyfit 8mm',
                'price' => 180000,
                'stock' => 12,
                'brand' => 'Happyfit',
                'condition' => 'Baru',
                'warranty_type' => 'Tidak Ada Garansi',
                'description' => 'Yoga mat tebal anti slip, nyaman untuk senam lantai dan pilates.',
                'main_image' => 'products/p47_main.jpg',
                'images' => ['products/details/p47_d1.jpg']
            ],
            [
                'user_id' => $sellerAhmad->id,
                'category_id' => $catOlahraga->id,
                'name' => 'Jersey Timnas Indonesia Home',
                'price' => 450000,
                'stock' => 8,
                'brand' => 'Erspo',
                'condition' => 'Baru',
                'warranty_type' => 'Garansi Resmi',
                'description' => 'Baju bola original supporter version, bahan dryfit adem dipakai olahraga.',
                'main_image' => 'products/p48_main.jpg',
                'images' => ['products/details/p48_d1.jpg']
            ],

            // --- KATEGORI PERABOTAN ---
            
            [
                'user_id' => $sellerYuli->id,
                'category_id' => $catPerabotan->id,
                'name' => 'Lampu Meja Belajar LED',
                'price' => 125000,
                'stock' => 15,
                'brand' => 'Baseus',
                'condition' => 'Baru',
                'warranty_type' => 'Garansi Toko',
                'description' => 'Lampu meja dengan baterai rechargeable, cahaya bisa diatur, aman untuk mata.',
                'main_image' => 'products/p49_main.jpg',
                'images' => ['products/details/p49_d1.jpg']
            ],
            [
                'user_id' => $sellerYuli->id,
                'category_id' => $catPerabotan->id,
                'name' => 'Rak Buku Minimalis Kayu',
                'price' => 350000,
                'stock' => 5,
                'brand' => 'IKEA',
                'condition' => 'Baru',
                'warranty_type' => 'Tidak Ada Garansi',
                'description' => 'Rak serbaguna 3 susun warna putih, mudah dirakit, desain scandinavian.',
                'main_image' => 'products/p50_main.jpg',
                'images' => ['products/details/p50_d1.jpg']
            ],
            [
                'user_id' => $sellerYuli->id,
                'category_id' => $catPerabotan->id,
                'name' => 'Sprei Kintakun King Size',
                'price' => 110000,
                'stock' => 10,
                'brand' => 'Kintakun',
                'condition' => 'Baru',
                'warranty_type' => 'Tidak Ada Garansi',
                'description' => 'Sprei ukuran 180x200 bahan microtex lembut, tidak luntur, motif bunga.',
                'main_image' => 'products/p51_main.jpg',
                'images' => ['products/details/p51_d1.jpg']
            ],
            [
                'user_id' => $sellerYuli->id,
                'category_id' => $catPerabotan->id,
                'name' => 'Kursi Kantor Ergonomis (Bekas)',
                'price' => 850000,
                'stock' => 1,
                'brand' => 'Informa',
                'condition' => 'Bekas',
                'warranty_type' => 'Tidak Ada Garansi',
                'description' => 'Kursi kerja jaring, hidrolik masih naik turun lancar, roda aman, pemakaian 1 tahun.',
                'main_image' => 'products/p52_main.jpg',
                'images' => ['products/details/p52_d1.jpg']
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