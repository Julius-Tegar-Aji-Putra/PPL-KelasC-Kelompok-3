<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Status pengajuan toko Anda</title>
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
                            Pengajuan toko Anda belum dapat kami setujui
                        </h1>
                        <p style="margin:0 0 16px 0;font-size:14px;color:#555555;line-height:1.6;">
                            Halo, {{ $data['name'] }}.<br>
                            Setelah proses verifikasi, saat ini pengajuan toko
                            <strong>{{ $data['store_name'] }}</strong> di MartPlace
                            belum dapat kami setujui.
                        </p>
                    </td>
                </tr>

                <!-- Ringkasan toko + status -->
                <tr>
                    <td style="padding:0 24px 16px 24px;">
                        <div style="font-size:13px;color:#555;margin-bottom:6px;font-weight:600;">
                            Ringkasan toko:
                        </div>
                        <div style="border-radius:8px;border:1px solid #f0f0f0;padding:12px 14px;background:#fafafa;">
                            <div style="font-size:13px;color:#333;line-height:1.6;margin-bottom:4px;">
                                <strong>Nama Toko:</strong>
                                {{ $data['store_name'] }}
                            </div>
                            <div style="font-size:13px;color:#333;line-height:1.6;margin-bottom:4px;">
                                <strong>PIC / Penanggung Jawab:</strong>
                                {{ $data['name'] }}
                            </div>
                            <div style="font-size:13px;color:#333;line-height:1.6;">
                                <strong>Status:</strong>
                                <span style="color:#b91c1c;font-weight:600;">DITOLAK</span>
                            </div>
                        </div>
                    </td>
                </tr>

                <!-- Alasan penolakan -->
                <tr>
                    <td style="padding:0 24px 24px 24px;">
                        <div style="border-radius:8px;border:1px solid #fee2e2;background:#fef2f2;padding:12px 14px;">
                            <div style="font-size:13px;color:#b91c1c;font-weight:600;margin-bottom:4px;">
                                Alasan penolakan:
                            </div>
                            <div style="font-size:13px;color:#7f1d1d;line-height:1.5;">
                                {{ $data['reason'] ?? 'Silakan periksa kembali data dan dokumen pengajuan toko Anda.' }}
                            </div>
                        </div>
                    </td>
                </tr>

                <!-- Penutup -->
                <tr>
                    <td style="padding:0 24px 18px 24px;">
                        <p style="margin:0;font-size:13px;color:#555555;line-height:1.6;">
                            Anda dapat memperbaiki data pengajuan sesuai alasan di atas, lalu mengajukan ulang
                            melalui halaman pendaftaran penjual di MartPlace.
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
