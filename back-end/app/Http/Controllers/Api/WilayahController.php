<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http; 
use Illuminate\Support\Facades\Cache; 

class WilayahController extends Controller
{
    protected $baseUrl = 'https://wilayah.id/api';

    public function getProvinces()
    {
        $provinces = Cache::remember('provinces', 86400, function () {
            $response = Http::get($this->baseUrl . '/provinces.json');
            return $response->json();
        });
        return response()->json($provinces);
    }

    public function getRegencies(Request $request)
    {
        $provinceId = $request->query('province_id');
        $regencies = Cache::remember('regencies_' . $provinceId, 86400, function () use ($provinceId) {
            $response = Http::get($this->baseUrl . "/regencies/{$provinceId}.json");
            return $response->json();
        });
        return response()->json($regencies);
    }

    public function getDistricts(Request $request)
    {
        $regencyId = $request->query('regency_id');
        $districts = Cache::remember('districts_' . $regencyId, 86400, function () use ($regencyId) {
            $response = Http::get($this->baseUrl . "/districts/{$regencyId}.json");
            return $response->json();
        });
        return response()->json($districts);
    }

    public function getVillages(Request $request)
    {
        $districtId = $request->query('district_id');
        $villages = Cache::remember('villages_' . $districtId, 86400, function () use ($districtId) {
            $response = Http::get($this->baseUrl . "/villages/{$districtId}.json");
            return $response->json();
        });
        return response()->json($villages);
    }
}