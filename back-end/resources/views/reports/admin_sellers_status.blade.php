@extends('reports.layout')

@section('content')
<table>
    <thead>
        <tr>
            <th width="5%">No</th>
            <th>Nama Penjual</th> 
            <th>Nama Toko</th>
            <th>Status</th>
        </tr>
    </thead>
    <tbody>
        @foreach($data as $index => $item)
        <tr>
            <td class="center">{{ $index + 1 }}</td>
            <td>{{ $item->nama }}</td>
            <td>{{ $item->nama_toko }}</td>
            <td class="center">
                {{ $item->status === 'active' ? 'Aktif' : 'Tidak Aktif' }}
            </td>
        </tr>
        @endforeach
    </tbody>
</table>
@endsection