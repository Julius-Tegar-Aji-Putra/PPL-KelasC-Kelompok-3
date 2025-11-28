# Campus Market - PPL Kelompok 3

Aplikasi marketplace untuk lingkungan kampus dengan fitur email notification.

## Persiapan Awal

### Backend (Laravel)

```bash
cd back-end
composer install
cp .env.example .env
php artisan key:generate
```

Buka file `.env` dan pastikan konfigurasi berikut:

```env
DB_DATABASE=campus_market
QUEUE_CONNECTION=database
```

Jalankan migrasi database:

```bash
php artisan migrate:fresh --seed
```

### Frontend (React)

```bash
cd front-end
npm install
```

## Cara Menjalankan Aplikasi

Aplikasi memerlukan 3 terminal yang berjalan bersamaan:

**Terminal 1 - Backend Server:**
```bash
cd back-end
php artisan serve
```

**Terminal 2 - Queue Worker:**
```bash
cd back-end
php artisan queue:work
```
*Catatan: Terminal ini wajib aktif agar email notifikasi (registrasi/review) dapat terkirim*

**Terminal 3 - Frontend:**
```bash
cd front-end
npm run dev
```

## Catatan Penting

- Pastikan semua 3 terminal tetap berjalan selama development
- Setting `QUEUE_CONNECTION=database` di file `.env` wajib digunakan untuk performa optimal
- Jika ada perubahan di file `.env`, restart queue worker (Terminal 2)