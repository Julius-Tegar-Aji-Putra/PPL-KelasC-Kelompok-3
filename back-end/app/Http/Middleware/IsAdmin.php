<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->user() && $request->user()->role === 'admin') {
            return $next($request);
        }

        return response()->json(['message' => 'Akses Ditolak. Hanya Admin yang boleh masuk.'], 403);
    }
}