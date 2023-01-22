<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function getLastRented(Request $request): JsonResponse
    {
        $result = [];

        return response()->json($result, 200);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function getTestimonials(Request $request): JsonResponse
    {
        $result = [];

        return response()->json($result, 200);
    }
}
