<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>{{ $title ?? 'Laporan Produk Berdasarkan Rating - MartPlace' }}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        @page {
            size: A4;
            margin: 15mm 12mm 15mm 12mm; 
        }

        body {
            font-family: "Helvetica", "Arial", sans-serif;
            font-size: 10pt;
            color: #333;
            line-height: 1.5;
            background: #f3f4f6; 
        }

        .page {
            width: 100%;
        }

        .page-inner {
            background: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 4pt;
            padding: 10mm 8mm 8mm 8mm;
        }

        .header-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 8mm;
        }

        .header-table td {
            vertical-align: top;
        }

        .brand {
            font-size: 18pt;
            font-weight: 700;
            color: #111827;
        }

        .brand span {
            color: #ff4b4b; 
        }

        .report-meta {
            text-align: right;
            font-size: 9pt;
            color: #4b5563;
        }

        .report-meta .title {
            font-size: 12pt;
            font-weight: 700;
            letter-spacing: 0.5pt;
            text-transform: uppercase;
        }

        .report-meta .subtitle {
            font-size: 9pt;
            color: #6b7280;
        }

        .summary-wrapper {
            margin-bottom: 6mm;
        }

        .summary-title {
            font-size: 11pt;
            font-weight: 600;
            margin-bottom: 2mm;
            color: #111827;
        }

        .summary-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 9pt;
        }

        .summary-table td {
            padding: 1pt 0;
        }

        .summary-label {
            width: 26%;
            color: #6b7280;
        }

        .summary-value {
            font-weight: 500;
            color: #374151;
        }

        .summary-note {
            margin-top: 3mm;
            font-size: 8.5pt;
            color: #6b7280;
        }

        .divider {
            border-top: 1px solid #e5e7eb;
            margin: 5mm 0 4mm 0;
        }

        table.report {
            width: 100%;
            border-collapse: collapse;
            font-size: 9pt;
            background: #ffffff;
        }

        table.report thead {
            display: table-header-group;
        }

        table.report tr {
            page-break-inside: avoid;
        }

        table.report th,
        table.report td {
            padding: 6pt 7pt;             
            vertical-align: middle;
            border: 1px solid #e5e7eb;     
        }

        table.report th {
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.3pt;
            text-align: center;
            background: #f9fafb;
        }

        table.report tbody tr:nth-child(even) {
            background: #f9fafb;          
        }

        .center {
            text-align: center;
        }

        .price {
            text-align: right;
            font-family: "Courier New", monospace;
            white-space: nowrap;
        }

        .empty-row {
            text-align: center;
            color: #9ca3af;
            font-style: italic;
            padding: 12pt 0;
        }

        .footer {
            margin-top: 7mm;
            padding-top: 3mm;
            border-top: 1px solid #e5e7eb;
            font-size: 8.5pt;
            color: #6b7280;
            text-align: center;
        }
    </style>
</head>
<body>
<div class="page">
    <div class="page-inner">

        {{-- Header ala invoice Tokopedia --}}
        <table class="header-table">
            <tr>
                <td>
                    <div class="brand">Mart<span>Place</span></div>
                </td>
                <td>
                    <div class="report-meta">
                        <div class="title">{{ strtoupper($title ?? 'LAPORAN PRODUK') }}</div>
                        <div class="subtitle">Berdasarkan Rating</div>
                        <div>Tanggal Cetak: {{ $date ?? date('d M Y') }}</div>
                    </div>
                </td>
            </tr>
        </table>

        {{-- Ringkasan singkat --}}
        <div class="summary-wrapper">
            <div class="summary-title">Ringkasan Laporan</div>
            <table class="summary-table">
                <tr>
                    <td class="summary-label">Platform</td>
                    <td class="summary-value">MartPlace – Katalog kebutuhan mahasiswa</td>
                </tr>
                <tr>
                    <td class="summary-label">Jenis Laporan</td>
                    <td class="summary-value">
                        {{ $title ?? 'Daftar produk berdasarkan rata-rata rating ulasan' }}
                    </td>
                </tr>
                <tr>
                    <td class="summary-label">Total Produk</td>
                    <td class="summary-value">
                        {{ is_countable($data) ? count($data) : '-' }}
                    </td>
                </tr>
                <tr>
                    <td class="summary-label">Diproses oleh</td>
                    <td class="summary-value">{{ $processor ?? 'MartPlace System' }}</td>
                </tr>
            </table>

            <div class="summary-note">
                Catatan: Data diurutkan berdasarkan rata-rata rating tertinggi ke terendah.
            </div>
        </div>

        <div class="divider"></div>

        {{-- Tabel produk --}}
        <table class="report">
            <thead>
            <tr>
                <th width="5%">No</th>
                <th>Produk</th>
                <th>Kategori</th>
                <th>Harga</th>
                <th>Rating</th>
                <th>Nama Toko</th>
                <th>Provinsi</th>
            </tr>
            </thead>
            <tbody>
            @forelse($data as $index => $item)
                @php
                    $rating = $item->reviews_avg_rating ?? 0;
                @endphp
                <tr>
                    <td class="center">{{ $index + 1 }}</td>
                    <td>{{ $item->name }}</td>
                    <td>{{ data_get($item, 'category.name', '-') }}</td>
                    <td class="price">
                        Rp {{ number_format((float)($item->price ?? 0), 0, ',', '.') }}
                    </td>
                    <td class="center">
                        {{ number_format((float) $rating, 1, ',', '') }}
                    </td>
                    <td>{{ data_get($item, 'seller.nama_toko', '-') }}</td>
                    <td>{{ data_get($item, 'seller.province_name', '-') }}</td>
                </tr>
            @empty
                <tr>
                    <td colspan="7" class="empty-row">
                        Tidak ada data produk untuk ditampilkan.
                    </td>
                </tr>
            @endforelse
            </tbody>
        </table>

        <div class="footer">
            Laporan ini dihasilkan secara otomatis oleh sistem MartPlace.
        </div>

    </div>
</div>
</body>
</html>
