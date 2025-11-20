<!DOCTYPE html>
<html>
<head><title>Akun Disetujui</title></head>
<body style="font-family: Arial, sans-serif;">
    <h2>Halo, {{ $user->nama }}!</h2>
    <p>Selamat! Pendaftaran toko Anda <strong>{{ $user->nama_toko }}</strong> telah disetujui oleh Admin.</p>
    <p>Status akun Anda sekarang: <strong style="color: green;">AKTIF</strong>.</p>
    <p>Silakan login ke aplikasi menggunakan email dan password yang Anda daftarkan.</p>
    <br>
    <p>Terima kasih,<br>Admin Marketplace</p>
</body>
</html>