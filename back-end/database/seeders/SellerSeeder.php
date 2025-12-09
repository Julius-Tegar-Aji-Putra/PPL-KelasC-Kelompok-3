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
                'province_id'       => '33',
                'province_name'     => 'Jawa Tengah',
                'regency_id'        => '33.74',
                'regency_name'      => 'Kota Semarang',
                'district_id'       => '33.74.01',
                'district_name'     => 'Semarang Tengah',
                'village_id'        => '33.74.01.1013',
                'village_name'      => 'Pekunden',
                
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
                'province_id'       => '36',
                'province_name'     => 'Banten',
                'regency_id'        => '36.03',
                'regency_name'      => 'Kabupaten Tangerang',
                'district_id'       => '36.03.22',
                'district_name'     => 'Pagedangan',
                'village_id'        => '36.03.22.1004',
                'village_name'      => 'Medang',
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
                'province_id'       => '32',
                'province_name'     => 'Jawa Barat',
                'regency_id'        => '32.09',
                'regency_name'      => 'Kabupaten Cirebon',
                'district_id'       => '32.09.22',
                'district_name'     => 'Kepetakan',
                'village_id'        => '32.09.22.2015',
                'village_name'      => 'Grogol',
            ],
            [
                'name' => 'Ahmad Udin',
                'email' => 'ahmad@udin.com',
                'password' => Hash::make('12345678'),
                'nama_toko' => 'Ahmad Store',
                'no_hp' => '081399998888',
                'alamat' => 'Jl. Siliwangi No. 5',
                'nik' => '3374010108020005',
                'status' => 'active',
                'province_id'       => '32',
                'province_name'     => 'Jawa Barat',
                'regency_id'        => '32.74',
                'regency_name'      => 'Kota Cirebon',
                'district_id'       => '32.74.01',
                'district_name'     => 'Kejaksan',
                'village_id'        => '32.74.01.1001',
                'village_name'      => 'Sukapura',
            ],
            [
                'name' => 'Yuli Winda',
                'email' => 'yuli@winda.com',
                'password' => Hash::make('12345678'),
                'nama_toko' => 'Yuli Store',
                'no_hp' => '081377773333',
                'alamat' => 'Jl. Gunung Jati No. 3',
                'nik' => '3374010103030006',
                'status' => 'active',
                'province_id'       => '14',
                'province_name'     => 'Riau',
                'regency_id'        => '14.01',
                'regency_name'      => 'Kabupaten Kampar',
                'district_id'       => '14.01.06',
                'district_name'     => 'Siak Hulu',
                'village_id'        => '14.01.06.2006',
                'village_name'      => 'Buluh Cina',
            ],
            [
                'name' => 'Sara Lestari',
                'email' => 'sara@lestari.com',
                'password' => Hash::make('12345678'),
                'nama_toko' => 'Sara Store',
                'no_hp' => '081322228888',
                'alamat' => 'Jl. Ahmad Yani No. 15',
                'nik' => '3374010107770007',
                'status' => 'active',
                'province_id'       => '12',
                'province_name'     => 'Sumatera Utara',
                'regency_id'        => '12.05',
                'regency_name'      => 'Kabupaten Langkat',
                'district_id'       => '12.05.10',
                'district_name'     => 'Hinai',
                'village_id'        => '12.05.10.2009',
                'village_name'      => 'Baru Pasar VIII',
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
                'province_id'       => '35',
                'province_name'     => 'Jawa Timur',
                'regency_id'        => '35.11',
                'regency_name'      => 'Kabupaten Bondowoso',
                'district_id'       => '35.11.07',
                'district_name'     => 'Curahdami',
                'village_id'        => '35.11.07.2003',
                'village_name'      => 'Kupang', 
            ],
        ];

        foreach ($sellers as $data) {
            User::firstOrCreate(
                ['email' => $data['email']],
                [
                    'nama'              => $data['name'], 
                    'password'          => $data['password'],
                    'role'              => 'penjual',
                    'status'            => $data['status'],
                    'nama_toko'         => $data['nama_toko'],
                    'deskripsi_singkat' => 'Toko terpercaya yang menjual barang berkualitas original.',
                    'no_handphone'      => $data['no_hp'], 
                    'alamat'            => $data['alamat'], 
                    'rt'                => '001',
                    'rw'            => '005',
                    'no_ktp'            => $data['nik'], // Kolom 'no_ktp'
                    
                    // File path dummy
                    'foto'              => 'foto_penjual/profil_dummy.jpg', // Kolom 'foto'
                    'file_upload_ktp'   => 'ktp_penjual/ktp_dummy.jpg', // Kolom 'file_upload_ktp'   
                    'province_id'       => $data['province_id'],
                    'province_name'     => $data['province_name'],
                    'regency_id'        => $data['regency_id'],
                    'regency_name'      => $data['regency_name'],
                    'district_id'       => $data['district_id'],
                    'district_name'     => $data['district_name'],
                    'village_id'        => $data['village_id'],
                    'village_name'      => $data['village_name'],
                ]
            );
        }
    }
}