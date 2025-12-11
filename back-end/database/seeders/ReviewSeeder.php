<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Review;
use App\Models\Product;

class ReviewSeeder extends Seeder
{
    public function run(): void
    {
        $products = range(1, 52);

        $reviewsData = [
            // --- PRODUK AWAL (ID 1, 2, 3, 4) ---

            // PRODUK 1: Laptop Gaming Lenovo LEGION
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
            
            // PRODUK 2: Sepatu Sneakers Running Air Zoom
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
            
            // PRODUK 3: Kamera DSLR Canon EOS 800D Kit
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

            // PRODUK 4: Jam Tangan Pria Classic Leather
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
                ],
            // --- KATEGORI GADGET (ID 5, 6, 7) ---

            // PRODUK 5: Samsung Galaxy S23 5G 256GB
            5 => [
                [
                    'name' => 'David GadgetIn KW',
                    'rating' => 5,
                    'comment' => 'Kualitas flagship emang beda. Layar dynamic AMOLED-nya manja banget di mata. Nightography-nya juara!',
                    'province' => 'DKI Jakarta'
                ],
                [
                    'name' => 'Sisca Kohl',
                    'rating' => 5,
                    'comment' => 'Mari kita coba! Warnanya cantik banget, cocok buat bikin konten TikTok. Pengiriman super cepat.',
                    'province' => 'Banten'
                ],
                [
                    'name' => 'Bambang Pamungkas',
                    'rating' => 4,
                    'comment' => 'HP enak digenggam karena ukurannya compact. Sayang paket penjualannya tipis, gak dapet kepala charger.',
                    'province' => 'DKI Jakarta'
                ],
                [
                    'name' => 'Lesti Kejora',
                    'rating' => 5,
                    'comment' => 'Suara speakernya jernih, buat dengerin lagu enak banget. Seller ramah dan fast response.',
                    'province' => 'Jawa Barat'
                ]
            ],

            // PRODUK 6: iPad Air 5 M1 64GB WiFi
            6 => [
                [
                    'name' => 'Jerome Polin',
                    'rating' => 5,
                    'comment' => 'Mantappu Jiwa! Chip M1 kenceng banget buat ngedit video matematika. Baterai awet seharian.',
                    'province' => 'Jawa Timur'
                ],
                [
                    'name' => 'Maudy Ayunda',
                    'rating' => 5,
                    'comment' => 'Sangat produktif pakai iPad ini buat baca jurnal dan multitasking. Ringan dibawa ke mana-mana.',
                    'province' => 'DKI Jakarta'
                ],
                [
                    'name' => 'Reza Arap',
                    'rating' => 3,
                    'comment' => 'Barang oke original, cuma storage 64GB ternyata kurang banget buat game berat. Nyesel gak ambil yang 256GB.',
                    'province' => 'Bali'
                ],
                [
                    'name' => 'Windah Basudara',
                    'rating' => 5,
                    'comment' => 'Adik-adik, ini tablet gacor parah! Layarnya smooth banget buat main game rhythm.',
                    'province' => 'Jawa Barat'
                ],
                [
                    'name' => 'Desy Ratnasari',
                    'rating' => 4,
                    'comment' => 'Pengiriman agak lama sampai ke Sukabumi, tapi packing aman pakai bubble wrap tebal.',
                    'province' => 'Jawa Barat'
                ]
            ],

            // PRODUK 7: Xiaomi Redmi Note 12 Pro
            7 => [
                [
                    'name' => 'Tretan Muslim',
                    'rating' => 4,
                    'comment' => 'HP midrange rasa flagship. Chuakzz! Cuma sayang banyak iklan di UI-nya, harus di-setting dulu biar bersih.',
                    'province' => 'Jawa Timur'
                ],
                [
                    'name' => 'Coki Pardede',
                    'rating' => 5,
                    'comment' => 'Charging 67W-nya gokil, ditinggal mandi sebentar udah penuh. Value for money terbaik.',
                    'province' => 'DKI Jakarta'
                ],
                [
                    'name' => 'Rigen Rakelna',
                    'rating' => 2,
                    'comment' => 'Emosi saya! Baru dipake seminggu udah panas banget pas main game. Padahal sinyal bagus.',
                    'province' => 'Nusa Tenggara Barat'
                ],
                [
                    'name' => 'Kiky Saputri',
                    'rating' => 5,
                    'comment' => 'Kameranya bening banget buat selfie, gak kalah sama HP mahal. Recommended seller!',
                    'province' => 'DKI Jakarta'
                ]
            ],
            // --- KATEGORI ELEKTRONIK (ID 8, 9, 10) ---

            // PRODUK 8: Smart TV LG 43 Inch 4K UHD
            8 => [
                [
                    'name' => 'Raditya Dika',
                    'rating' => 5,
                    'comment' => 'Nonton Netflix resolusi 4K gambarnya tajem banget. WebOS-nya smooth, gak lemot pas pindah aplikasi. Worth every penny!',
                    'province' => 'DKI Jakarta'
                ],
                [
                    'name' => 'Hanung Bramantyo',
                    'rating' => 4,
                    'comment' => 'Kualitas warna hitamnya cukup pekat, oke buat nonton film horor. Cuma remote-nya agak licin sering selip.',
                    'province' => 'DI Yogyakarta'
                ],
                [
                    'name' => 'Inul Daratista',
                    'rating' => 5,
                    'comment' => 'Gambarnya bening kayak kaca! Buat karaokean di rumah suaranya juga lumayan kenceng tanpa soundbar.',
                    'province' => 'Jawa Timur'
                ],
                [
                    'name' => 'Pak RT Somad',
                    'rating' => 3,
                    'comment' => 'Barang bagus, tapi kurir nganterinnya sore banget pas hujan. Untung packing kayu jadi aman.',
                    'province' => 'Jawa Barat'
                ]
            ],

            // PRODUK 9: Speaker Bluetooth JBL Flip 6
            9 => [
                [
                    'name' => 'Ariel Noah',
                    'rating' => 5,
                    'comment' => 'Karakter suaranya balance, bass-nya dapet tapi vokal tetep jernih. Cocok buat nemenin bikin lagu.',
                    'province' => 'Jawa Barat'
                ],
                [
                    'name' => 'Denny Caknan',
                    'rating' => 5,
                    'comment' => 'Mantap lur! Bass-e nendang pol. Di bawa nongkrong outdoor suaranya tetep kedengeran jelas. Los dol!',
                    'province' => 'Jawa Timur'
                ],
                [
                    'name' => 'Via Vallen',
                    'rating' => 4,
                    'comment' => 'Warna merahnya bagus, build quality solid. Baterai awet dipake seharian. Cuma agak berat dikit.',
                    'province' => 'Jawa Timur'
                ]
            ],

            // PRODUK 10: Rice Cooker Digital Philips HD4515
            10 => [
                [
                    'name' => 'Chef Renatta',
                    'rating' => 5,
                    'comment' => 'Hasil nasinya pulen sempurna, matangnya merata. Fitur masaknya banyak, bisa buat sup juga. Desain estetik.',
                    'province' => 'DKI Jakarta'
                ],
                [
                    'name' => 'Nagita Slavina',
                    'rating' => 5,
                    'comment' => 'Suka banget warnanya, matching sama dapur aku. Masak nasi jadi lebih cepet dan gak gampang basi.',
                    'province' => 'Jawa Barat'
                ],
                [
                    'name' => 'Ibu Tejo',
                    'rating' => 4,
                    'comment' => 'Solusi buat ibu-ibu arisan nih. Panci anti lengketnya beneran bagus, nyucinya gampang. Dadi ora rewel.',
                    'province' => 'DI Yogyakarta'
                ],
                [
                    'name' => 'Anak Kos Sejati',
                    'rating' => 3,
                    'comment' => 'Fungsi oke, tapi kabel powernya kependekan buat di kosan saya, harus pake sambungan lagi.',
                    'province' => 'Sulawesi Selatan'
                ]
            ],
            // --- KATEGORI FASHION PRIA (ID 11, 12) ---

            // PRODUK 11: Kemeja Flannel Uniqlo Kotak-kotak (Bekas)
            11 => [
                [
                    'name' => 'Anak Senja Indie',
                    'rating' => 5,
                    'comment' => 'Parah sih ini hidden gem! Barang bekas tapi rasanya kayak baru. Wangi laundry pula pas dateng.',
                    'province' => 'DKI Jakarta'
                ],
                [
                    'name' => 'Fiersa Besari KW',
                    'rating' => 4,
                    'comment' => 'Kondisi 90% valid, warna masih pekat. Cuma ada noda dikit di ujung lengan, tapi gak kelihatan. Aman buat naik gunung.',
                    'province' => 'Jawa Barat'
                ],
                [
                    'name' => 'Pemburu Thrift',
                    'rating' => 5,
                    'comment' => 'Ukuran L-nya pas banget, gak melar. Seller jujur soal kondisi barang. Bakal langganan nih.',
                    'province' => 'DI Yogyakarta'
                ]
            ],

            // PRODUK 12: Jaket Denim Levis Trucker
            12 => [
                [
                    'name' => 'Iqbaal Ramadhan',
                    'rating' => 5,
                    'comment' => 'Bikin auto ganteng kayak Dilan. Bahannya tebal, kaku khas denim mahal. Original store quality.',
                    'province' => 'Jawa Barat'
                ],
                [
                    'name' => 'Jefri Nichol',
                    'rating' => 4,
                    'comment' => 'Styling-nya gampang masuk ke mana aja. Cuma pengiriman agak delay sedikit karena hujan.',
                    'province' => 'DKI Jakarta'
                ],
                [
                    'name' => 'Chicco Jerikho',
                    'rating' => 5,
                    'comment' => 'Investasi fashion terbaik. Ukuran fit body, jahitan rapi banget. Mantap bro!',
                    'province' => 'Bali'
                ]
            ],

            // --- KATEGORI FASHION WANITA (ID 13, 14, 15, 16) ---

            // PRODUK 13: Dress Floral Midi Zara
            13 => [
                [
                    'name' => 'Raisa Andriana',
                    'rating' => 5,
                    'comment' => 'Gemes banget motif bunganya! Bahannya jatuh dan adem, cocok buat konser outdoor.',
                    'province' => 'DKI Jakarta'
                ],
                [
                    'name' => 'Isyana Sarasvati',
                    'rating' => 4,
                    'comment' => 'Suka sama cutting-nya yang bikin kelihatan ramping. Cuma agak kepanjangan dikit di aku, harus potong dikit.',
                    'province' => 'Jawa Timur'
                ],
                [
                    'name' => 'Pevita Pearce',
                    'rating' => 5,
                    'comment' => 'Perfect summer dress. Pengiriman cepet banget, pagi pesen sore sampe.',
                    'province' => 'DKI Jakarta'
                ]
            ],

            // PRODUK 14: Tas Selempang Coach Tabby (Bekas)
            14 => [
                [
                    'name' => 'Syahrini Princess',
                    'rating' => 5,
                    'comment' => 'Cetar membahana! Meskipun preloved, kondisinya like new banget. Dustbag lengkap, sertifikat ada. Trusted seller!',
                    'province' => 'DKI Jakarta'
                ],
                [
                    'name' => 'Nagita Slavina',
                    'rating' => 4,
                    'comment' => 'Kulitnya masih mulus, hardware emasnya juga belum pudar. Lumayan buat nambah koleksi lemari.',
                    'province' => 'Jawa Barat'
                ],
                [
                    'name' => 'Tasya Farasya',
                    'rating' => 5,
                    'comment' => 'Jujurly ini worth it banget harganya dibanding beli baru. Gak ada defect yang berarti.',
                    'province' => 'DKI Jakarta'
                ]
            ],

            // PRODUK 15: Sepatu Heels Charles & Keith
            15 => [
                [
                    'name' => 'Cinta Laura Kiehl',
                    'rating' => 5,
                    'comment' => 'Oh my God, so comfy! Dipake jalan seharian di mall gak bikin kaki lecet. Desainnya elegan banget.',
                    'province' => 'Bali'
                ],
                [
                    'name' => 'Prilly Latuconsina',
                    'rating' => 3,
                    'comment' => 'Modelnya cantik, tapi ukurannya agak sempit di bagian depan untuk kaki lebar. Saran naik 1 size.',
                    'province' => 'Banten'
                ],
                [
                    'name' => 'Ayu Ting Ting',
                    'rating' => 5,
                    'comment' => 'Alamat palsu? Enggak dong, barangnya asli sampe rumah dengan selamat. Cantik banget dipake kondangan.',
                    'province' => 'Jawa Barat'
                ]
            ],

            // PRODUK 16: Blouse Batik Modern
            16 => [
                [
                    'name' => 'Ibu Sri Mulyani',
                    'rating' => 5,
                    'comment' => 'Motif parangnya modern tapi tetap sopan. Cocok untuk dipakai rapat kerja. Bahan katunnya menyerap keringat.',
                    'province' => 'DKI Jakarta'
                ],
                [
                    'name' => 'Najwa Shihab',
                    'rating' => 4,
                    'comment' => 'Potongannya rapi, enak dilihat. Cuma kancingnya agak ringkih, perlu dijahit ulang biar kuat.',
                    'province' => 'DKI Jakarta'
                ],
                [
                    'name' => 'Mbak Rara Pawang Hujan',
                    'rating' => 5,
                    'comment' => 'Adem bahannya, gak gerah meskipun dipakai pas cuaca panas. Warnanya cerah sesuai foto.',
                    'province' => 'Bali'
                ],
                [
                    'name' => 'Guru SD Teladan',
                    'rating' => 4,
                    'comment' => 'Harga terjangkau buat seragam harian. Pengiriman standar 3 hari sampai.',
                    'province' => 'Jawa Tengah'
                ]
            ],
            // --- KATEGORI KECANTIKAN (ID 17, 18, 19, 20) ---

            // PRODUK 17: Serum Vitamin C Somethinc
            17 => [
                [
                    'name' => 'Tasya Farasya KW',
                    'rating' => 5,
                    'comment' => 'Tasya Farasya Approved! Teksturnya ringan banget, gak lengket. Baru pake seminggu bekas jerawat udah mulai pudar.',
                    'province' => 'DKI Jakarta'
                ],
                [
                    'name' => 'Pejuang Glowing',
                    'rating' => 4,
                    'comment' => 'Bagus sih, cuma botolnya kecil cepet abis. Tapi hasilnya nyata, muka jadi lebih cerah pas bangun tidur.',
                    'province' => 'Jawa Tengah'
                ],
                [
                    'name' => 'Abel Cantika',
                    'rating' => 5,
                    'comment' => 'Local pride terbaik! Packaging aman banget pake bubble wrap tebel. Expired date masih lama.',
                    'province' => 'Sumatera Barat'
                ]
            ],

            // PRODUK 18: Lipstick Matte Maybelline Superstay
            18 => [
                [
                    'name' => 'Mbak-mbak SCBD',
                    'rating' => 5,
                    'comment' => 'Beneran tahan badai! Dipake makan gorengan sama soto gak luntur sama sekali. Touch up cuma perlu dikit.',
                    'province' => 'DKI Jakarta'
                ],
                [
                    'name' => 'Suhay Salim',
                    'rating' => 4,
                    'comment' => 'Warnanya cakep banget buat ombre. Minusnya agak susah dibersihin, harus pake oil remover yang kuat.',
                    'province' => 'Jawa Timur'
                ],
                [
                    'name' => 'Anak Kuliah',
                    'rating' => 5,
                    'comment' => 'Lipcream andalan buat wisuda nanti. Transferproof banget di masker, gak nempel-nempel.',
                    'province' => 'DI Yogyakarta'
                ],
                [
                    'name' => 'Mama Muda',
                    'rating' => 3,
                    'comment' => 'Bikin bibir agak kering kalau gak pake lipbalm dulu. Pengiriman standar.',
                    'province' => 'Kalimantan Timur'
                ]
            ],

            // PRODUK 19: Skintific 5X Ceramide Moisturizer
            19 => [
                [
                    'name' => 'Dokter Kulit TikTok',
                    'rating' => 5,
                    'comment' => 'Ingredients-nya juara buat benerin skin barrier. Tekstur gel-nya pas kena kulit langsung lumer jadi air. Enak banget!',
                    'province' => 'Jawa Barat'
                ],
                [
                    'name' => 'Korban Racun FYP',
                    'rating' => 5,
                    'comment' => 'Akhirnya beli juga karena viral. Ternyata beneran bagus buat kemerahan. Mahal dikit tapi worth it.',
                    'province' => 'Sulawesi Selatan'
                ],
                [
                    'name' => 'Si Kulit Sensitif',
                    'rating' => 4,
                    'comment' => 'Cocok di kulit aku yang gampang jerawatan. Cuma isinya dikit ya 30gr, sebulan udah abis.',
                    'province' => 'Banten'
                ]
            ],

            // PRODUK 20: Parfum Chanel No 5 (Preloved)
            20 => [
                [
                    'name' => 'Sosialita Hemat',
                    'rating' => 5,
                    'comment' => 'Wangi orang kaya! Meskipun preloved sisa 80%, tapi wanginya masih strong banget. Hemat berjuta-juta daripada beli baru.',
                    'province' => 'DKI Jakarta'
                ],
                [
                    'name' => 'Kolektor Vial',
                    'rating' => 4,
                    'comment' => 'Batch code tembus, dijamin ori. Box-nya emang agak kotor dikit sesuai deskripsi, tapi botolnya mulus.',
                    'province' => 'Bali'
                ],
                [
                    'name' => 'Ibu Pejabat',
                    'rating' => 5,
                    'comment' => 'Seller amanah, packing kayu super aman buat barang pecah belah. Wangi klasik yang gak pernah salah.',
                    'province' => 'Jawa Tengah'
                ]
            ],
            // --- KATEGORI MAKANAN & MINUMAN (ID 21, 22, 23, 24) ---

            // PRODUK 21: Kripik Singkong Pedas Maicih
            21 => [
                [
                    'name' => 'Tanboy Kun',
                    'rating' => 5,
                    'comment' => 'Pedasnya nendang banget! Level 10 bukan kaleng-kaleng. Cocok buat temen nonton drakor, tapi siap-siap air putih ya.',
                    'province' => 'DKI Jakarta'
                ],
                [
                    'name' => 'Anak Kos Lapar',
                    'rating' => 4,
                    'comment' => 'Enak, renyah, bumbunya melimpah. Cuma isinya agak sedikit ya, kebanyakan angin hehe. Tapi rasanya juara.',
                    'province' => 'DI Yogyakarta'
                ],
                [
                    'name' => 'Korban Boncabe',
                    'rating' => 3,
                    'comment' => 'Rasanya oke, tapi pengiriman lama jadi pas sampe kripiknya agak remuk sedikit. Tolong packingnya ditebelin lagi.',
                    'province' => 'Jawa Timur'
                ],
                [
                    'name' => 'Mbak Yul',
                    'rating' => 5,
                    'comment' => 'Nostalgia jaman sekolah dulu. Rasanya masih sama, gurih pedas bikin nagih. Seller fast response.',
                    'province' => 'Jawa Barat'
                ]
            ],

            // PRODUK 22: Kopi Arabika Gayo Aceh 250g
            22 => [
                [
                    'name' => 'Filosofi Kopi',
                    'rating' => 5,
                    'comment' => 'Notes fruity-nya keluar banget pas diseduh V60. Roastingannya pas medium, nggak gosong. Recommended buat home brewer.',
                    'province' => 'DKI Jakarta'
                ],
                [
                    'name' => 'Bapak-bapak Komplek',
                    'rating' => 5,
                    'comment' => 'Mantap kopinya, wangi semerbak satu rumah. Pagi-pagi ngopi ini langsung melek. Pengiriman cepat.',
                    'province' => 'Jawa Tengah'
                ],
                [
                    'name' => 'Penderita Maag',
                    'rating' => 3,
                    'comment' => 'Rasanya enak tapi asamnya agak kuat buat lambung saya. Yang punya maag hati-hati ya, harus makan dulu.',
                    'province' => 'Banten'
                ],
                [
                    'name' => 'Barista Magang',
                    'rating' => 4,
                    'comment' => 'Beans fresh, ada tanggal roastingnya. Cuma packagingnya plastik biasa bukan valve, jadi harus cepet dipindah ke toples.',
                    'province' => 'Bali'
                ]
            ],

            // PRODUK 23: Frozen Kebab Daging Sapi isi 10
            23 => [
                [
                    'name' => 'Mama Muda Sibuk',
                    'rating' => 5,
                    'comment' => 'Penyelamat bekal anak sekolah! Praktis tinggal panasin teflon. Dagingnya banyak, kejunya kerasa.',
                    'province' => 'Jawa Barat'
                ],
                [
                    'name' => 'Kang Begadang',
                    'rating' => 5,
                    'comment' => 'Camilan wajib ada di kulkas buat nemenin nonton bola tengah malem. Kulit tortillanya nggak gampang sobek.',
                    'province' => 'Jawa Timur'
                ],
                [
                    'name' => 'Food Vlogger',
                    'rating' => 4,
                    'comment' => 'Rasanya enak, saosnya pas. Tapi saran pengirimannya harus pake yang sehari sampai ya, takut lumer kalau kelamaan.',
                    'province' => 'DKI Jakarta'
                ],
                [
                    'name' => 'Anak Rantau',
                    'rating' => 2,
                    'comment' => 'Yah pas sampe udah agak lembek karena kurirnya nyasar dulu. Untung pas dimasak masih aman dimakan.',
                    'province' => 'Sumatera Selatan'
                ]
            ],

            // PRODUK 24: Madu Hutan Murni 500ml
            24 => [
                [
                    'name' => 'dr. Zaidul Akbar Fans',
                    'rating' => 5,
                    'comment' => 'Masya Allah, madunya asli. Sudah dites masukin kulkas nggak beku, dites bakar nggak gosong. Bagus buat imun.',
                    'province' => 'Jawa Barat'
                ],
                [
                    'name' => 'Ibu Hamil Happy',
                    'rating' => 5,
                    'comment' => 'Rasanya manis ada sedikit asam segarnya, khas madu hutan. Packing botol kaca aman banget pake bubble wrap berlapis.',
                    'province' => 'Jawa Timur'
                ],
                [
                    'name' => 'Pencari Herbal',
                    'rating' => 4,
                    'comment' => 'Khasiatnya terasa, badan jadi lebih fit. Cuma harganya lumayan pricey ya untuk ukuran 500ml. Tapi ada harga ada rupa.',
                    'province' => 'Kalimantan Barat'
                ]
            ],
            // --- KATEGORI OTOMOTIF (ID 25, 26, 27, 28) ---

            // PRODUK 25: Helm KYT TT Course
            25 => [
                [
                    'name' => 'Anak Sunmori',
                    'rating' => 5,
                    'comment' => 'Ganteng parah! Motifnya rapi, busanya empuk, dan yang penting ringan di kepala. Aerodinamisnya kerasa pas ngebut.',
                    'province' => 'DKI Jakarta'
                ],
                [
                    'name' => 'Motovlog Pemula',
                    'rating' => 4,
                    'comment' => 'Slot intercom-nya pas, gampang pasang mic. Cuma visor bawaan masih clear, harus beli flat visor dark smoke lagi biar makin sangar.',
                    'province' => 'Jawa Barat'
                ],
                [
                    'name' => 'Budi Kepala Besar',
                    'rating' => 3,
                    'comment' => 'Ukuran XL-nya ternyata ngepres banget di pipi sampai susah ngomong. Tapi kata temen emang gitu kalau helm balap.',
                    'province' => 'Jawa Timur'
                ],
                [
                    'name' => 'Rider Nmax',
                    'rating' => 5,
                    'comment' => 'Pengiriman super aman, kardus double wall dan bubble tebal. Barang mulus tanpa lecet. Mantap gan!',
                    'province' => 'Bali'
                ]
            ],

            // PRODUK 26: Oli Mesin Shell Helix HX7 10W-40
            26 => [
                [
                    'name' => 'Montir Rumahan',
                    'rating' => 5,
                    'comment' => 'Barcode tembus, segel utuh, dijamin original. Udah dicoba scan di web Shell hasilnya valid. Jangan ragu beli di sini.',
                    'province' => 'Banten'
                ],
                [
                    'name' => 'Supir Travel',
                    'rating' => 5,
                    'comment' => 'Tarikan mesin jadi enteng, suara mesin lebih halus. Cocok buat mobil operasional yang jalan tiap hari.',
                    'province' => 'Jawa Tengah'
                ],
                [
                    'name' => 'Pak Asep Grab',
                    'rating' => 4,
                    'comment' => 'Harganya miring dibanding bengkel resmi. Cuma pengirimannya agak rembes dikit di tutupnya, mungkin kebanting kurir.',
                    'province' => 'Jawa Barat'
                ],
                [
                    'name' => 'Komunitas Avanza',
                    'rating' => 5,
                    'comment' => 'Seller responsif, nanya kecocokan buat mobil tua dijawab ramah. Recommended seller!',
                    'province' => 'Sumatera Selatan'
                ]
            ],

            // PRODUK 27: Sarung Tangan Motor Kulit
            27 => [
                [
                    'name' => 'Touring Mania',
                    'rating' => 5,
                    'comment' => 'Grip ke stang jadi mantap, gak licin pas hujan. Ada protektor di buku jari bikin ngerasa aman pas touring jauh.',
                    'province' => 'DI Yogyakarta'
                ],
                [
                    'name' => 'Ojol Tiap Hari',
                    'rating' => 3,
                    'comment' => 'Bahannya agak panas kalau dipake siang bolong macet-macetan. Tapi kalau malem enak anget.',
                    'province' => 'DKI Jakarta'
                ],
                [
                    'name' => 'Rider Cantik',
                    'rating' => 4,
                    'comment' => 'Modelnya keren, kulitnya sintetis tapi halus. Jahitan rapi. Ukuran M pas di tangan cewek.',
                    'province' => 'Jawa Barat'
                ]
            ],

            // PRODUK 28: Karpet Mobil Universal 1 Set
            28 => [
                [
                    'name' => 'Bapak Sayang Mobil',
                    'rating' => 4,
                    'comment' => 'Bahannya karet tebal, gampang dicuci kalau kotor kena tanah. Tinggal gunting dikit buat nyesuain lekukan mobil.',
                    'province' => 'Jawa Timur'
                ],
                [
                    'name' => 'Ibu Penjemput Sekolah',
                    'rating' => 5,
                    'comment' => 'Berguna banget buat nahan tumpahan minum anak-anak. Mobil jadi gak bau apek. Worth it lah harga segini.',
                    'province' => 'DKI Jakarta'
                ],
                [
                    'name' => 'Reviewer Jujur',
                    'rating' => 3,
                    'comment' => 'Awal dibuka bau karetnya nyengat banget, harus dijemur dulu 2 hari baru ilang baunya. Tapi fungsi oke.',
                    'province' => 'Kalimantan Barat'
                ]
            ],
            // --- KATEGORI HOBI & KOLEKSI (ID 29, 30, 31, 32) ---

            // PRODUK 29: Action Figure Gundam HG RX-78-2
            29 => [
                [
                    'name' => 'Builder Santuy',
                    'rating' => 5,
                    'comment' => 'Classic never dies! Artikulasi HG sekarang makin canggih. Part lengkap, runner aman gak ada yang patah.',
                    'province' => 'DKI Jakarta'
                ],
                [
                    'name' => 'Kolektor Dus Mulus',
                    'rating' => 4,
                    'comment' => 'Packing standar sih, untung dusnya gak penyok parah pas nyampe. Buat harga segini worth it lah buat latihan panel lining.',
                    'province' => 'Jawa Barat'
                ],
                [
                    'name' => 'Wibu Karbitan',
                    'rating' => 5,
                    'comment' => 'Baru pertama kali ngerakit gundam, seru banget! Instruksinya jelas bahasa Jepang tapi gambarnya mudah dipahami.',
                    'province' => 'Jawa Timur'
                ]
            ],

            // PRODUK 30: Uang Kuno Rp100 Perahu Layar 1991
            30 => [
                [
                    'name' => 'Jasa Mahar Nikah',
                    'rating' => 5,
                    'comment' => 'Kondisinya beneran gress/unc (uncirculated), kaku dan bersih. Cocok banget buat klien saya yang mau bikin mahar.',
                    'province' => 'Jawa Tengah'
                ],
                [
                    'name' => 'Numismatik Senior',
                    'rating' => 4,
                    'comment' => 'Barang original ada benang pengamannya. Sayang ada sedikit foxing (bintik kuning) di ujung, tapi wajar faktor usia.',
                    'province' => 'DKI Jakarta'
                ],
                [
                    'name' => 'Sinta Calon Pengantin',
                    'rating' => 5,
                    'comment' => 'Alhamdulillah dapet juga buat pelengkap mahar tanggal cantik. Seller ramah, dikasih bonus plastik pelindung.',
                    'province' => 'Sumatera Utara'
                ]
            ],

            // PRODUK 31: Diecast Hot Wheels Nissan GTR
            31 => [
                [
                    'name' => 'JDM Lovers',
                    'rating' => 5,
                    'comment' => 'Godzilla is here! Detail tampo lampunya rapi. Blister aman sentosa, dikasih protektor juga sama agannya.',
                    'province' => 'Banten'
                ],
                [
                    'name' => 'Pemburu Gantungan',
                    'rating' => 3,
                    'comment' => 'Mobilnya oke, tapi card-nya ada kerut dikit di bagian hook. Buat kolektor carded ini agak minus, tapi buat loose sih oke.',
                    'province' => 'Jawa Barat'
                ],
                [
                    'name' => 'Hot Wheels Hunter',
                    'rating' => 5,
                    'comment' => 'Harga bersahabat dibanding lapak sebelah yang udah digoreng harganya. Packing aman double wall.',
                    'province' => 'DKI Jakarta'
                ]
            ],

            // PRODUK 32: Album K-Pop NCT Dream (Unsealed)
            32 => [
                [
                    'name' => 'NCTzen Garis Keras',
                    'rating' => 5,
                    'comment' => 'Huaaa seneng banget! Walaupun unsealed tapi photobook-nya masih mulus banget no damage. Makasih freebies permennya kak!',
                    'province' => 'Jawa Barat'
                ],
                [
                    'name' => 'Mark Lee Pacarku',
                    'rating' => 4,
                    'comment' => 'Pengiriman cepet. Kondisi CD aman belum pernah di-play. Worth it buat yang cuma ngincer photobook sama CD-nya aja.',
                    'province' => 'DKI Jakarta'
                ],
                [
                    'name' => 'Sijeuni Baru',
                    'rating' => 5,
                    'comment' => 'Packing tebel banget pake kardus + bubble wrap, aman dari kurir yang suka lempar paket. Trusted seller!',
                    'province' => 'Sulawesi Selatan'
                ]
            ],
            // --- KATEGORI BUKU & ATK (ID 33, 34, 35, 36) ---

            // PRODUK 33: Novel Harry Potter dan Batu Bertuah (Bekas)
            33 => [
                [
                    'name' => 'Potterhead Sejati',
                    'rating' => 5,
                    'comment' => 'Seneng banget nemu cetakan lama cover ini! Walau kertas menguning (foxing) wajar karena buku tua, tapi halaman lengkap dan masih layak baca.',
                    'province' => 'DKI Jakarta'
                ],
                [
                    'name' => 'Pembaca Pemula',
                    'rating' => 4,
                    'comment' => 'Pengiriman cepet. Bukunya dibungkus plastik lagi jadi aman dari hujan. Cover depan ada lipatan dikit tapi oke lah harga segini.',
                    'province' => 'Jawa Barat'
                ],
                [
                    'name' => 'Kolektor Buku',
                    'rating' => 3,
                    'comment' => 'Deskripsinya kurang detail, ternyata ada coretan nama pemilik sebelumnya di halaman depan. Tapi selebihnya aman.',
                    'province' => 'DI Yogyakarta'
                ]
            ],

            // PRODUK 34: Paket Alat Tulis Faber Castell
            34 => [
                [
                    'name' => 'Mama Siap Ujian',
                    'rating' => 5,
                    'comment' => 'Beli buat anak mau UN. Paket komplit gak ribet cari satu-satu. Pensilnya asli 2B sudah dites scan komputer.',
                    'province' => 'Jawa Timur'
                ],
                [
                    'name' => 'Anak Sekolah',
                    'rating' => 5,
                    'comment' => 'Penghapusnya enak banget bersih gak ninggalin bekas hitam. Penggarisnya juga tebal. Mantap!',
                    'province' => 'Jawa Tengah'
                ],
                [
                    'name' => 'Budi Stationery',
                    'rating' => 4,
                    'comment' => 'Harga bersaing sama toko sebelah. Packing rapi, kotak pensilnya gak penyok. Recommended buat stok di rumah.',
                    'province' => 'Banten'
                ]
            ],

            // PRODUK 35: Buku Tulis Sinar Dunia 58 Lembar (1 Pack)
            35 => [
                [
                    'name' => 'Ibu Rumah Tangga Hemat',
                    'rating' => 5,
                    'comment' => 'Langganan tiap tahun ajaran baru. Kertas SiDU emang paling juara, tebal dan putih, ditulis pulpen gel gak tembus ke belakang.',
                    'province' => 'Jawa Barat'
                ],
                [
                    'name' => 'Mahasiswa Kupu-kupu',
                    'rating' => 4,
                    'comment' => 'Datang tepat waktu. Packing cuma plastik hitam aja sih, untung bukunya gak ada yang nekuk sudutnya.',
                    'province' => 'Sumatera Utara'
                ],
                [
                    'name' => 'Pak Guru SD',
                    'rating' => 5,
                    'comment' => 'Stok buat hadiah murid di kelas. Kualitas standar pabrik, garisnya jelas. Seller responsif.',
                    'province' => 'Kalimantan Timur'
                ]
            ],

            // PRODUK 36: Novel Bumi Manusia - Pramoedya
            36 => [
                [
                    'name' => 'Mahasiswa Sastra',
                    'rating' => 5,
                    'comment' => 'Karya masterpiece Pak Pram! Bukunya original, segel rapi. Bau kertas barunya bikin candu. Wajib baca minimal sekali seumur hidup.',
                    'province' => 'DI Yogyakarta'
                ],
                [
                    'name' => 'Penyuka Sejarah',
                    'rating' => 5,
                    'comment' => 'Packing super aman pake bubble wrap tebal + kardus, padahal cuma beli satu buku. Buku mendarat mulus tanpa cacat.',
                    'province' => 'DKI Jakarta'
                ],
                [
                    'name' => 'Netizen Budiman',
                    'rating' => 4,
                    'comment' => 'Beli karena keracunan filmnya. Ternyata novelnya jauh lebih detail dan emosional. Pengiriman standar 2 hari.',
                    'province' => 'Jawa Timur'
                ]
            ],
            // --- KATEGORI GAMING (ID 37, 38, 39, 40) ---

            // PRODUK 37: Mouse Gaming Logitech G502 Hero
            37 => [
                [
                    'name' => 'Gamer Kompetitif',
                    'rating' => 5,
                    'comment' => 'Aim jadi auto lock! Sensornya presisi banget, berat mouse bisa diatur pake pemberat bawaan. Tombol sniper-nya berguna banget buat FPS.',
                    'province' => 'DKI Jakarta'
                ],
                [
                    'name' => 'User G-Hub',
                    'rating' => 4,
                    'comment' => 'Mouse-nya enak, grip nyaman buat tangan besar. Cuma software G-Hub kadang suka error ga detect mouse, harus restart dulu.',
                    'province' => 'Jawa Barat'
                ],
                [
                    'name' => 'Scroll Wheel Maniac',
                    'rating' => 5,
                    'comment' => 'Fitur infinite scroll-nya nagih banget buat browsing dokumen panjang. Klik kanan kirinya empuk. Best mouse ever!',
                    'province' => 'Jawa Timur'
                ]
            ],

            // PRODUK 38: Keyboard Mechanical Keychron K2
            38 => [
                [
                    'name' => 'Programmer Work From Cafe',
                    'rating' => 5,
                    'comment' => 'Layout 75% compact banget, meja jadi lega. Switch Gateron Brown-nya enak, tactile tapi gak berisik, aman buat ngetik di kantor.',
                    'province' => 'DI Yogyakarta'
                ],
                [
                    'name' => 'Mac User',
                    'rating' => 5,
                    'comment' => 'Jarang ada keyboard mech yang fully support Mac kayak gini. Tombol command/option berfungsi sempurna. Koneksi bluetooth stabil.',
                    'province' => 'DKI Jakarta'
                ],
                [
                    'name' => 'Gamers Wireless',
                    'rating' => 4,
                    'comment' => 'Build quality solid, berat mantap. Cuma kalau mode bluetooth buat main game kompetitif masih kerasa ada sedikit latency, mending pake kabel.',
                    'province' => 'Banten'
                ]
            ],

            // PRODUK 39: Headset Gaming SteelSeries Arctis 3 (Bekas)
            39 => [
                [
                    'name' => 'Pemburu Barang Second',
                    'rating' => 4,
                    'comment' => 'Sesuai deskripsi, kondisi fisik 95%. Earpad emang baru diganti jadi bersih. Suara masih balance kanan kiri, mic jernih.',
                    'province' => 'Jawa Barat'
                ],
                [
                    'name' => 'PUBG Player',
                    'rating' => 5,
                    'comment' => 'Step musuh kedengeran jelas banget arahnya. Headband ski goggle-nya nyaman parah, gak bikin kepala sakit walau main 5 jam.',
                    'province' => 'Sumatera Utara'
                ],
                [
                    'name' => 'Budget Gamer',
                    'rating' => 4,
                    'comment' => 'Harga miring dapet rasa baru. Minus pemakaian wajar aja di kabel agak kotor dikit, tapi fungsi normal jaya.',
                    'province' => 'Jawa Timur'
                ]
            ],

            // PRODUK 40: Sony PS5 DualSense Controller
            40 => [
                [
                    'name' => 'Console Peasant',
                    'rating' => 5,
                    'comment' => 'Next gen experience! Adaptive trigger-nya gokil pas main game tembak-tembakan, kerasa berat pas nahan pelatuk. Haptic feedback detail banget.',
                    'province' => 'DKI Jakarta'
                ],
                [
                    'name' => 'PC Gamer',
                    'rating' => 5,
                    'comment' => 'Pake di PC via Steam lancar jaya. Desainnya futuristik dan grip-nya lebih enak dibanding stik PS4. Semoga gak cepet drift.',
                    'province' => 'Bali'
                ],
                [
                    'name' => 'FIFA Player',
                    'rating' => 4,
                    'comment' => 'Barang original, serial number tembus. Packing aman. Cuma baterainya emang agak boros ya fitur getarnya nyala semua.',
                    'province' => 'Jawa Tengah'
                ]
            ],
            // --- KATEGORI KESEHATAN (ID 41, 42, 43, 44) ---

            // PRODUK 41: Vitamin C 1000mg Blackmores
            41 => [
                [
                    'name' => 'Mama Siaga',
                    'rating' => 5,
                    'comment' => 'Wajib stok di rumah buat jaga imun keluarga. Botol kacanya tebal, packing seller aman banget pake bubble wrap berlapis.',
                    'province' => 'Jawa Barat'
                ],
                [
                    'name' => 'Pekerja Lembur',
                    'rating' => 5,
                    'comment' => 'Minum ini badan jadi gak gampang drop walau sering begadang. Expired date masih lama, 2 tahun lagi. Mantap!',
                    'province' => 'DKI Jakarta'
                ],
                [
                    'name' => 'Budi Santuy',
                    'rating' => 4,
                    'comment' => 'Harga bersaing, pengiriman cepat. Cuma tabletnya emang agak gede ya, buat yang susah nelen obat harus dipotong dulu.',
                    'province' => 'Jawa Timur'
                ]
            ],

            // PRODUK 42: Masker Medis Sensi 3 Ply Earloop
            42 => [
                [
                    'name' => 'Anak Kereta',
                    'rating' => 5,
                    'comment' => 'Masker sejuta umat. Talinya nyaman di kuping gak bikin sakit walau dipake seharian di KRL. Bahannya lembut.',
                    'province' => 'Banten'
                ],
                [
                    'name' => 'Petugas Medis',
                    'rating' => 4,
                    'comment' => 'Barang original ada logo emboss Sensi. Box agak penyok dikit pas sampe, tapi isinya plastik segel jadi aman higienis.',
                    'province' => 'DKI Jakarta'
                ],
                [
                    'name' => 'Ibu Arisan',
                    'rating' => 5,
                    'comment' => 'Murah meriah dapet 50 pcs. Warna hijaunya cerah. Seller fast response ditanya stok langsung jawab.',
                    'province' => 'Sulawesi Selatan'
                ],
                [
                    'name' => 'Ojol Ganteng',
                    'rating' => 5,
                    'comment' => 'Napas masih lega pake masker ini. Cocok buat kerja lapangan. Thanks gan!',
                    'province' => 'Jawa Tengah'
                ]
            ],

            // PRODUK 43: Termometer Digital Omron
            43 => [
                [
                    'name' => 'Bunda Baru Punya Anak',
                    'rating' => 5,
                    'comment' => 'Sangat membantu buat ngecek suhu bayi. Ujungnya lentur jadi gak takut nyolok sakit. Hasil ukurnya cepet dan akurat.',
                    'province' => 'DI Yogyakarta'
                ],
                [
                    'name' => 'Ayah Siaga',
                    'rating' => 4,
                    'comment' => 'Merk Omron emang jaminan mutu. Awet udah dipake setahun batre belum abis. Cuma tombol on/off agak keras dikit.',
                    'province' => 'Jawa Barat'
                ],
                [
                    'name' => 'Apoteker Muda',
                    'rating' => 5,
                    'comment' => 'Kalibrasinya bagus, selisih dikit banget sama termometer air raksa. Lebih aman karena gak ada kaca.',
                    'province' => 'Sumatera Barat'
                ]
            ],

            // PRODUK 44: Timbangan Badan Digital Xiaomi
            44 => [
                [
                    'name' => 'Pejuang Diet',
                    'rating' => 5,
                    'comment' => 'Keren banget bisa konek ke HP! Jadi semangat diet liat grafik berat badan turun. Desainnya minimalis estetik.',
                    'province' => 'DKI Jakarta'
                ],
                [
                    'name' => 'Gym Rat',
                    'rating' => 4,
                    'comment' => 'Data BMI-nya lumayan akurat buat referensi. Kaca pijakannya kokoh. Minusnya gak dapet baterai AAA, harus beli sendiri.',
                    'province' => 'Bali'
                ],
                [
                    'name' => 'Anak Kos Hedon',
                    'rating' => 5,
                    'comment' => 'Pengiriman kargo aman, gak pecah. Timbangan rasa flagship harga terjangkau. Good job seller!',
                    'province' => 'Jawa Timur'
                ]
            ],
            // --- KATEGORI OLAHRAGA (ID 45, 46, 47, 48) ---

            // PRODUK 45: Raket Badminton Yonex Astrox
            45 => [
                [
                    'name' => 'Kevin Sanjaya KW',
                    'rating' => 5,
                    'comment' => 'Head heavy-nya kerasa banget, buat smash auto nukik tajam. Frame kokoh, tarikan senar pas buat main ganda.',
                    'province' => 'Jawa Tengah'
                ],
                [
                    'name' => 'Badminton Lovers',
                    'rating' => 4,
                    'comment' => 'Barang original sunrise, ada stiker hologram. Cuma grip bawaan agak licin, harus dilapis grip karet lagi biar mantap.',
                    'province' => 'DKI Jakarta'
                ],
                [
                    'name' => 'Pemain Tarkam',
                    'rating' => 5,
                    'comment' => 'Ringan tapi bertenaga. Buat drive cepet juga enak maneuver-nya. Seller ramah, minta pasang senar 26 lbs dilayanin.',
                    'province' => 'Jawa Barat'
                ]
            ],

            // PRODUK 46: Bola Basket Molten BG4500
            46 => [
                [
                    'name' => 'Anak Basket DBL',
                    'rating' => 5,
                    'comment' => 'Touch-nya beda emang bola mahal. Grip lengket di tangan, kontrol dribble jadi enak banget. Cocok buat indoor.',
                    'province' => 'DKI Jakarta'
                ],
                [
                    'name' => 'Guru Penjas',
                    'rating' => 5,
                    'comment' => 'Kualitas kulit komposit premium. Pantulannya konsisten. Murid-murid jadi semangat latihan.',
                    'province' => 'Sumatera Selatan'
                ],
                [
                    'name' => 'Streetballer',
                    'rating' => 3,
                    'comment' => 'Bola bagus, tapi kurang rekomen buat lapangan semen kasar, cepet abis kulitnya. Mending buat di GOR parket.',
                    'province' => 'Jawa Timur'
                ],
                [
                    'name' => 'Kobe Fans',
                    'rating' => 5,
                    'comment' => 'Pengiriman kilat, bola dateng dalam keadaan kempes jadi aman di perjalanan. Tinggal pompa langsung gass.',
                    'province' => 'Jawa Barat'
                ]
            ],

            // PRODUK 47: Matras Yoga Happyfit 8mm
            47 => [
                [
                    'name' => 'Instruktur Yoga',
                    'rating' => 5,
                    'comment' => 'Tebal 8mm pas banget buat nopang lutut dan siku, gak sakit pas pose plank lama. Beneran anti slip walaupun keringetan.',
                    'province' => 'Bali'
                ],
                [
                    'name' => 'Pejuang Kurus',
                    'rating' => 4,
                    'comment' => 'Warnanya cantik, dapet tas jaring juga buat bawa ke studio senam. Cuma awal dibuka bau karetnya lumayan nyengat.',
                    'province' => 'DKI Jakarta'
                ],
                [
                    'name' => 'Ibu Hamil Sehat',
                    'rating' => 5,
                    'comment' => 'Nyaman banget buat senam hamil. Empuk dan lebar, jadi leluasa geraknya. Recommended!',
                    'province' => 'DI Yogyakarta'
                ]
            ],

            // PRODUK 48: Jersey Timnas Indonesia Home
            48 => [
                [
                    'name' => 'Ultras Garuda',
                    'rating' => 5,
                    'comment' => 'Merinding pas pake! Bahan dryfit-nya adem, detail motif sayap garudanya keren abis. Siap dukung Timnas di GBK!',
                    'province' => 'DKI Jakarta'
                ],
                [
                    'name' => 'Kolektor Jersey',
                    'rating' => 4,
                    'comment' => 'Kualitas kain bagus, jahitan rapi. Cuma sizing chart-nya agak slim fit ya, saran naik 1 size kalau perut agak buncit.',
                    'province' => 'Jawa Timur'
                ],
                [
                    'name' => 'Suporter Layar Kaca',
                    'rating' => 5,
                    'comment' => 'Produk original Erspo, tag lengkap. Bangga beli produk asli buat dukung timnas. Seller fast response.',
                    'province' => 'Jawa Tengah'
                ]
            ],
            // --- KATEGORI PERABOTAN RUMAH (ID 49, 50, 51, 52) ---

            // PRODUK 49: Lampu Meja Belajar LED
            49 => [
                [
                    'name' => 'Mahasiswa Arsitek',
                    'rating' => 5,
                    'comment' => 'Cahayanya terang tapi soft, gak bikin mata cepet lelah buat nugas malem-malem. Baterainya juga awet bisa dibawa-bawa tanpa kabel.',
                    'province' => 'DI Yogyakarta'
                ],
                [
                    'name' => 'Freelancer Malam',
                    'rating' => 4,
                    'comment' => 'Desainnya clean banget, tombol touch-nya sensitif. Cuma sayang kabel chargernya tipe micro-USB lama, bukan Type-C.',
                    'province' => 'DKI Jakarta'
                ],
                [
                    'name' => 'Anak Sekolah',
                    'rating' => 5,
                    'comment' => 'Fleksibel banget leher lampunya bisa diputer-puter. Sangat berguna pas mati lampu juga.',
                    'province' => 'Jawa Timur'
                ]
            ],

            // PRODUK 50: Rak Buku Minimalis Kayu
            50 => [
                [
                    'name' => 'Ibu Rumah Tangga Rapi',
                    'rating' => 5,
                    'comment' => 'Perakitan gampang banget kayak main lego, ada manualnya jelas. Kokoh buat naruh koleksi buku berat. Ruangan jadi estetik.',
                    'province' => 'Jawa Barat'
                ],
                [
                    'name' => 'Anak Kos Estetik',
                    'rating' => 4,
                    'comment' => 'Finishing cat putihnya halus. Cuma pas rakit butuh obeng sendiri ya, gak dapet dari sananya. Overall oke banget.',
                    'province' => 'DKI Jakarta'
                ],
                [
                    'name' => 'Pak Tukang',
                    'rating' => 3,
                    'comment' => 'Bahan partikel board, standar lah ya. Jangan kena air biar gak melembung. Pengiriman aman pake kargo.',
                    'province' => 'Banten'
                ]
            ],

            // PRODUK 51: Sprei Kintakun King Size
            51 => [
                [
                    'name' => 'Pengantin Baru',
                    'rating' => 5,
                    'comment' => 'Motif bunganya cantik, bikin kamar jadi romantis. Bahannya adem di kulit, gak kasar sama sekali. Suami suka.',
                    'province' => 'Sumatera Selatan'
                ],
                [
                    'name' => 'Mama Laundry',
                    'rating' => 4,
                    'comment' => 'Udah dicuci berkali-kali warnanya tetep cerah gak luntur. Karet di ujung sprei juga kenceng gak gampang copot.',
                    'province' => 'Jawa Tengah'
                ],
                [
                    'name' => 'Anak Rebahan',
                    'rating' => 5,
                    'comment' => 'Nyaman pol buat tidur seharian pas weekend. Harga flash sale dapet murah. Makasih seller!',
                    'province' => 'Jawa Timur'
                ]
            ],

            // PRODUK 52: Kursi Kantor Ergonomis (Bekas)
            52 => [
                [
                    'name' => 'Programmer WFH',
                    'rating' => 5,
                    'comment' => 'Punggung terselamatkan! Meski bekas, busanya masih tebal dan hidrolik naik turunnya lancar jaya. Best deal banget harga segini.',
                    'province' => 'DKI Jakarta'
                ],
                [
                    'name' => 'Pencari Diskon',
                    'rating' => 4,
                    'comment' => 'Kondisi fisik 90%, ada baret dikit di kaki kursi kena sepatu, tapi gak ngaruh fungsi. Jaring sandaran masih kenceng.',
                    'province' => 'Jawa Barat'
                ],
                [
                    'name' => 'Pak Bos Hemat',
                    'rating' => 5,
                    'comment' => 'Roda kursinya licin gak macet. Lumayan buat ganti kursi di kantor rumah yang udah reyot. Seller jujur soal kondisi.',
                    'province' => 'Banten'
                ]
            ]
        ];

        foreach ($products as $productId) {
            if (!isset($reviewsData[$productId])) continue;

            foreach ($reviewsData[$productId] as $index => $data) {
                Review::create([
                    'product_id'     => $productId,
                    'reviewer_name'  => $data['name'],
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