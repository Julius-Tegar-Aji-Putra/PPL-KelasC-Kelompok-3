<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Toko Anda telah disetujui</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:24px 0;">
    <tr>
        <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;">
                <!-- Header MartPlace -->
                <tr>
                    <td style="padding:16px 24px;background:#111111;color:#ffffff;">
                        <table width="100%">
                            <tr>
                                <td style="font-weight:700;font-size:18px;">
                                    Mart<span style="color:#ff4b4b;">Place</span>
                                </td>
                                <td align="right" style="font-size:12px;color:#eeeeee;">
                                    Platform katalog kebutuhan mahasiswa
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>

                <!-- Salam & info utama -->
                <tr>
                    <td style="padding:24px 24px 8px 24px;">
                        <h1 style="margin:0 0 8px 0;font-size:20px;color:#222222;">
                            Selamat, toko Anda telah disetujui! 🎉
                        </h1>
                        <p style="margin:0 0 16px 0;font-size:14px;color:#555555;line-height:1.6;">
                            Halo, {{ $data['nama'] }}.<br>
                            Pengajuan toko Anda di <strong>MartPlace</strong> telah selesai kami verifikasi dan
                            sekarang <strong>berstatus Aktif</strong>. Anda sudah bisa mulai menambahkan produk
                            dan berjualan kepada mahasiswa.
                        </p>
                    </td>
                </tr>

                <!-- Ringkasan toko -->
                <tr>
                    <td style="padding:0 24px 24px 24px;">
                        <div style="font-size:13px;color:#555;margin-bottom:6px;font-weight:600;">
                            Ringkasan toko:
                        </div>
                        <div style="border-radius:8px;border:1px solid #f0f0f0;padding:12px 14px;background:#fafafa;">
                            <div style="font-size:13px;color:#333;line-height:1.6;margin-bottom:4px;">
                                <strong>Nama Toko:</strong>
                                {{ $data['nama_toko'] }}
                            </div>
                            <div style="font-size:13px;color:#333;line-height:1.6;margin-bottom:4px;">
                                <strong>PIC / Penanggung Jawab:</strong>
                                {{ $data['nama'] }}
                            </div>
                            <div style="font-size:13px;color:#333;line-height:1.6;">
                                <strong>Status:</strong>
                                <span style="color:#16a34a;font-weight:600;">AKTIF</span>
                            </div>
                        </div>
                    </td>
                </tr>

                <!-- Penutup -->
                <tr>
                    <td style="padding:0 24px 18px 24px;">
                        <p style="margin:0;font-size:13px;color:#555555;line-height:1.6;">
                            Silakan masuk ke akun Anda di MartPlace untuk mengelola profil toko
                            dan menambahkan produk pertama Anda.
                        </p>
                    </td>
                </tr>

                <!-- Footer -->
                <tr>
                    <td style="padding:12px 24px 18px 24px;border-top:1px solid #f0f0f0;font-size:11px;color:#999999;">
                        Email ini dikirim otomatis oleh sistem MartPlace. Mohon untuk tidak membalas email ini.
                    </td>
                </tr>

            </table>
        </td>
    </tr>
</table>
</body>
</html>
