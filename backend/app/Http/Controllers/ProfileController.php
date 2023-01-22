<?php

namespace App\Http\Controllers;

use App\Models\Testimonial;
use App\Models\User;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function getUser(Request $request)
    {
        $user = User::with('subscription_type')
            ->with('active_shipping_address')
            ->where('id', auth()->user()->id)->get();

        return response()->json($user, 200);
    }

    public function getTestimonials(Request $request)
    {
        return response()->json(Testimonial::where('user_id', auth()->user()->id)->get(), 200);
    }

    public function shippingAddresses(Request $request)
    {
        return response()->json([]);
    }

}
