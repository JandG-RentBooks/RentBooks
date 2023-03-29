<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\Lending;
use App\Models\LendingBook;
use App\Models\User;
use Illuminate\Http\Request;
use Dirape\Token\Token;

class DashboardController extends Controller
{
    public function getStatCardsData(Request $request)
    {
        $queryUsers = User::query()->whereRelation('roles', 'reference', '=', 'user');
        $users = $queryUsers;
        $allRegisteredUsers = $users->count();
        $allSubscribedUsers = $queryUsers->whereNotNull('last_payment_date')->count();

        $books = Book::all();
        $inStock = 0;
        foreach ($books as $book) {
            $inStock += $book->in_stock;
        }
        $allBooks = $inStock;
        $allRentedBooks = LendingBook::where('is_back', '=', 0)->count();
        $allLendings = Lending::all()->count();
        $allCurrentLendings = Lending::where('state', '=', 3)->count();
        $allTestimonials = 0;
        $moderatedTestimonials = 0;

        $data = [
            'allRegisteredUsers' => $allRegisteredUsers,
            'allSubscribedUsers' => $allSubscribedUsers,
            'allBooks' => $allBooks,
            'allRentedBooks' => $allRentedBooks,
            'allLendings' => $allLendings,
            'allCurrentLendings' => $allCurrentLendings,
            'allTestimonials' => $allTestimonials,
            'moderatedTestimonials' => $moderatedTestimonials,
        ];

        return response()->json($data, 200);
    }

    public function getActiveLendings(Request $request)
    {
        $data = Lending::with('books')->with('user')->where('state', '=', 3)->get();

        return response()->json($data, 200);
    }

    public function getLending(Request $request, $id)
    {
        $data = Lending::with('books')->with('user')->where('id', $id)->get();

        return response()->json($data, 200);
    }

    public function getUserByPaymentId(Request $request)
    {
        $data = User::with('subscription_type')
            ->with('active_shipping_address')
            ->where('payment_id', $request->input('payment_id'))->first();

        return response()->json($data, 200);
    }

    public function updateLastPaymentDate(Request $request)
    {
        $user = User::find($request->input('user_id'));
        if (!$user) {
            return response()->json(['success' => false], 200);
        }
        $user->last_payment_date = $request->input('last_payment_date');
        $user->save();

        return response()->json(['success' => true], 200);
    }

    public function getRelevantUsers(Request $request)
    {
        $data = User::whereNotNull('subscription_type_id')
            ->whereNotNull('active_shipping_address_id')
            ->whereDate('last_payment_date', '>=', now()->subMonth()->subDays(5))
            ->get();
        return response()->json($data, 200);
    }

    public function getUser(Request $request, $id)
    {
        $data = User::with('subscription_type')
            ->with('active_shipping_address')
            ->where('id', $id)->get();

        return response()->json($data, 200);
    }

    public function storeLending(Request $request)
    {
        $user = User::find($request->input('user_id'));
        if (!$user) {
            return response()->json(['success' => false], 200);
        }
        $token = new Token();
        $shipping_token = $token->Unique('lendings', 'shipping_token', 12);
        Lending::create([
            'user_id' => $request->input('user_id'),
            'shipping_token' => $shipping_token,
            'state' => 1,
            'created_by' => auth()->user()->id,
        ]);

        return response()->json(['success' => true], 200);
    }

    public function addBookToLending(Request $request)
    {
        $book = Book::find($request->input('book_id'));
        $lending = Lending::find($request->input('lending_id'));

        if (!$book || !$lending) {
            return response()->json(['success' => false], 200);
        }
        LendingBook::create([
            'lending_id' => $request->input('lending_id'),
            'book_id' => $request->input('book_id'),
            'is_back' => 0,
        ]);

        return response()->json(['success' => true], 200);
    }

    public function removeBook(Request $request)
    {
        $book = Book::find($request->input('book_id'));
        $lending = Lending::find($request->input('lending_id'));

        if (!$book || !$lending) {
            return response()->json(['success' => false], 200);
        }

        $lendingBook = LendingBook::where([
            ['lending_id', $request->input('lending_id')],
            ['book_id', $request->input('book_id')],
        ]);

        if ($lendingBook->delete()) {
            return response()->json(['success' => true], 200);
        } else {
            return response()->json(['success' => false], 200);
        }
    }

    public function updateLendingState(Request $request)
    {
        $lending = Lending::find($request->input('lending_id'));

        if (!$lending) {
            return response()->json(['success' => false], 200);
        }

        $lending->state = $request->input('state');

        return response()->json(['success' => true], 200);
    }

    public function getLandingByShippingToken(Request $request)
    {
        $data = Lending::with('books')
            ->with('user')
            ->where('shipping_token', $request->input('shipping_token'))->get();

        return response()->json($data, 200);
    }

    public function bookScrapping(Request $request)
    {
        $book = Book::find($request->input('book_id'));
        $lending = Lending::find($request->input('lending_id'));

        if (!$book || !$lending) {
            return response()->json(['success' => false], 200);
        }

        $lendingBook = LendingBook::where([
            ['lending_id', $request->input('lending_id')],
            ['book_id', $request->input('book_id')],
        ]);

        $lendingBook->is_back = 1;
        $lendingBook->save();

        return response()->json(['success' => true], 200);
    }

    public function increaseBookAvailableNumber(Request $request)
    {
        $book = Book::find($request->input('book_id'));
        $lending = Lending::find($request->input('lending_id'));

        if (!$book || !$lending) {
            return response()->json(['success' => false], 200);
        }

        $lendingBook = LendingBook::where([
            ['lending_id', $request->input('lending_id')],
            ['book_id', $request->input('book_id')],
        ]);

        $lendingBook->is_back = 1;
        $lendingBook->save();

        $book->available = $book->available + 1;
        $book->save();

        return response()->json(['success' => true], 200);
    }

    public function closeLending(Request $request)
    {
        $lending = Lending::find($request->input('lending_id'));

        if (!$lending) {
            return response()->json(['success' => false], 200);
        }

        $lending->state = 4;

        return response()->json(['success' => true], 200);
    }

}
