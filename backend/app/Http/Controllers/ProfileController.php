<?php

namespace App\Http\Controllers;

use App\Models\Testimonial;
use App\Models\User;
use App\Models\Wishlist;
use Illuminate\Http\JsonResponse;
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

    public function getWishlist(Request $request)
    {
        $wishlist = Wishlist::join('books', 'books.id', '=', 'wishlists.book_id')
            ->select('wishlists.id as id', 'books.title as title')
            ->where('user_id', auth()->user()->id)
            ->orderBy('sort')
            ->get();

        return response()->json($wishlist, 200);
    }

    public function sortWishlist(Request $request)
    {
        $sort = 1;
        foreach($request->input('wishlist') as $item){
            //return $item['id'];
            $wishlist = Wishlist::find($item['id']);
            $wishlist->sort = $sort;
            $wishlist->save();
            $sort++;
        }
        return response()->json(['success' => true], 200);
    }

    public function removeWisList(Request $request): JsonResponse
    {
        $wishList = Wishlist::find($request->input('id'));

        if (!is_null($wishList)) {
            $wishList->delete();
        }
        return response()->json(['success' => true], 200);
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
