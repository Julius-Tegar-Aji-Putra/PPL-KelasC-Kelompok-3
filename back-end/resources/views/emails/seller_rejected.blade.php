<!DOCTYPE html>
<html>
<head><title>Pendaftaran Ditolak</title></head>
<body style="font-family: Arial, sans-serif;">
    <h2>Halo, {{ $user->nama }}.</h2>
    <p>Mohon maaf, pendaftaran toko Anda <strong>{{ $user->nama_toko }}</strong> belum dapat kami setujui.</p>
    <p>Hal ini mungkin dikarenakan data yang kurang lengkap atau tidak memenuhi syarat.</p>
    <br>
    <p>Terima kasih,<br>Admin Marketplace</p>
</body>
</html>