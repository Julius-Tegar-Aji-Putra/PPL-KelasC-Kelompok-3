<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\WilayahController;

Route::get('/wilayah/provinces', [WilayahController::class, 'getProvinces']);
Route::get('/wilayah/regencies', [WilayahController::class, 'getRegencies']);
Route::get('/wilayah/districts', [WilayahController::class, 'getDistricts']);
Route::get('/wilayah/villages', [WilayahController::class, 'getVillages']);

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

require __DIR__.'/auth.php';