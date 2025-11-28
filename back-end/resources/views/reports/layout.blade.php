<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: sans-serif; font-size: 12px; }
        .header { text-align: center; margin-bottom: 20px; }
        .header h2 { margin: 0; text-transform: uppercase; color: #DB4444; }
        .meta { margin-bottom: 15px; border-bottom: 2px solid #eee; padding-bottom: 10px; }
        
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th, td { border: 1px solid #333; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; font-weight: bold; text-align: center; }
        td { vertical-align: top; }
        .center { text-align: center; }
        .num { text-align: right; }
    </style>
</head>
<body>
    <div class="header">
        <h2>MARTPLACE REPORT</h2>
        <h3>{{ $title }}</h3>
    </div>

    <div class="meta">
        <strong>Tanggal dibuat:</strong> {{ $date }} <br>
        <strong>Oleh:</strong> {{ $processor }}
    </div>

    @yield('content')

</body>
</html>