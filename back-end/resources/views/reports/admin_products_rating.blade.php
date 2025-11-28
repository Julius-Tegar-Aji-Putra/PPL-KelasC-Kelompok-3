@extends('reports.layout')

@section('content')
<table>
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
        @foreach($data as $index => $item)
        <tr>
            <td class="center">{{ $index + 1 }}</td>
            <td>{{ $item->name }}</td>
            <td>{{ $item->category->name ?? '-' }}</td>
            <td class="num">Rp {{ number_format($item->price, 0, ',', '.') }}</td>
            <td class="center">{{ round($item->reviews_avg_rating ?? 0, 1) }}</td>
            <td>{{ $item->seller->nama_toko ?? '-' }}</td>
            <td>{{ $item->seller->province_name ?? '-' }}</td>
        </tr>
        @endforeach
    </tbody>
</table>
@endsection