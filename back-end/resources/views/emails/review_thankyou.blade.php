<!DOCTYPE html>
<html>
<head>
    <title>Terima Kasih</title>
</head>
<body style="font-family: Arial, sans-serif; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee;">
        <h2 style="color: #2563EB;">Halo, {{ $data['name'] }}! 👋</h2>
        
        <p>Terima kasih telah meluangkan waktu untuk memberikan ulasan pada produk:</p>
        <p style="font-weight: bold; font-size: 16px;">"{{ $data['product_name'] }}"</p>
        
        <div style="background-color: #f9fafb; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0;"><strong>Rating Anda:</strong> {{ $data['rating'] }} / 5 ⭐</p>
            <p style="margin: 10px 0 0;"><strong>Komentar:</strong><br> 
            <i>"{{ $data['comment'] }}"</i></p>
        </div>

        <p>Masukan Anda sangat berharga bagi kami dan penjual untuk meningkatkan kualitas layanan.</p>
        
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="font-size: 12px; color: #888;">Salam hangat,<br>Tim MarketPlace</p>
    </div>
</body>
</html>