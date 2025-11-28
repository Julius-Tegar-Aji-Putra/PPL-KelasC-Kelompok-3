<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class SellerSeeder extends Seeder
{
    public function run(): void
    {
        $sellers = [
            [
                'name' => 'Budi Santoso',
                'email' => 'budi@santoso.com', 
                'password' => Hash::make('12345678'),
                'nama_toko' => 'Sukses Jaya Store',
                'no_hp' => '081234567890',
                'alamat' => 'Jl. Teknologi Raya No. 10',
                'nik' => '3374010101010001',
                'status' => 'active',
            ],
            [
                'name' => 'Siti Aminah',
                'email' => 'siti@aminah.com',
                'password' => Hash::make('12345678'),
                'nama_toko' => 'Berkah Abadi',
                'no_hp' => '081298765432',
                'alamat' => 'Jl. Pandanaran No. 55',
                'nik' => '3374010101010002',
                'status' => 'active',
            ],
            [
                'name' => 'Doni Pratama',
                'email' => 'doni@pratama.com',
                'password' => Hash::make('12345678'),
                'nama_toko' => 'Doni Gadget',
                'no_hp' => '081355556666',
                'alamat' => 'Jl. Pemuda No. 1',
                'nik' => '3374010101010003',
                'status' => 'inactive', 
            ],
            [
                'name' => 'Rina Wati',
                'email' => 'rina@wati.com',
                'password' => Hash::make('12345678'),
                'nama_toko' => 'Rina Fashion',
                'no_hp' => '081377778888',
                'alamat' => 'Jl. Gajah Mada No. 20',
                'nik' => '3374010101010004',
                'status' => 'active',
            ],
        ];

        foreach ($sellers as $data) {
            User::firstOrCreate(
                ['email' => $data['email']],
                [
                    // --- MAPPING KE DATABASE (Sesuai Kolom Anda) ---
                    'nama'              => $data['name'], // Kolom 'nama'
                    'password'          => $data['password'],
                    'role'              => 'penjual',
                    'status'            => $data['status'],
                    'nama_toko'         => $data['nama_toko'],
                    'deskripsi_singkat' => 'Toko terpercaya yang menjual barang berkualitas original.',
                    'no_handphone'      => $data['no_hp'], // Kolom 'no_handphone'
                    'alamat'            => $data['alamat'], // Kolom 'alamat'
                    'rt'                => '001',
                    'rw'            => '005',
                    'no_ktp'            => $data['nik'], // Kolom 'no_ktp'
                    
                    // File path dummy
                    'foto'              => 'foto_penjual/profil_dummy.jpg', // Kolom 'foto'
                    'file_upload_ktp'   => 'ktp_penjual/ktp_dummy.jpg', // Kolom 'file_upload_ktp'
                    
                    // Data Wilayah (Dummy Semarang)
                    'province_id'       => '33',
                    'province_name'     => 'JAWA TENGAH',
                    'regency_id'        => '3374',
                    'regency_name'      => 'KOTA SEMARANG',
                    'district_id'       => '3374010',
                    'district_name'     => 'SEMARANG TENGAH',
                    'village_id'        => '3374010001',
                    'village_name'      => 'PEKUNDEN',
                ]
            );
        }
    }
}