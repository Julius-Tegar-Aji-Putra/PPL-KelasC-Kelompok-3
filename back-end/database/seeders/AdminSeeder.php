<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => 'admin@marketplace.com'],
            [
                'nama'     => 'Super Admin', // Ganti 'name' jadi 'nama'
                'password' => Hash::make('password123'),
                'role'     => 'admin',
                'status'   => 'active',
            ]
        );
    }
}