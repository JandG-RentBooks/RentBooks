<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ImageStorageController;
use App\Http\Controllers\Admin\PublisherController;
use App\Http\Controllers\Admin\SubscriptionTypeController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TestimonialController;
use App\Http\Controllers\WishlistController;
use App\Models\Wishlist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Admin\AuthorController;
use App\Http\Controllers\Admin\BookController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\CoverTypeController;
use App\Http\Controllers\Admin\LabelController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Auth\RegisterController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::controller(RegisterController::class)->group(function () {
    Route::get('register', 'index');
    Route::post('register', 'register');
    Route::post('login', 'login');
});

//Címlap
Route::get('testimonial', [TestimonialController::class, 'index']);
Route::get('last-rented', [HomeController::class, 'getLastRented']);
Route::get('books', [\App\Http\Controllers\BookController::class, 'index']);
Route::get('books/{book}', [\App\Http\Controllers\BookController::class, 'details']);
Route::get('book-categories', [\App\Http\Controllers\BookController::class, 'getCategories']);
Route::get('company', [HomeController::class, 'getCompany']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('logout', [RegisterController::class, 'logout']);
    Route::prefix('admin')->middleware('can:accessAdmin')->group(function () {
        Route::resource('user', UserController::class);
    });

    Route::prefix('admin')->middleware('can:accessEmployee')->group(function () {
        Route::resource('author', AuthorController::class);

        Route::get('book/image-storage', [BookController::class, 'getImages']);
        Route::resource('book', BookController::class);

        Route::resource('category', CategoryController::class);
        Route::resource('cover-type', CoverTypeController::class);
        Route::resource('label', LabelController::class);
        Route::resource('publisher', PublisherController::class);
        Route::resource('subscription-type', SubscriptionTypeController::class);

        //Dashboard
        Route::get('dashboard', [DashboardController::class, 'index']);
        Route::get('dashboard/stat-cards-data', [DashboardController::class, 'getStatCardsData']);
        Route::get('dashboard/active-lendings', [DashboardController::class, 'getActiveLendings']);
        Route::get('dashboard/lending/{id}', [DashboardController::class, 'getLending']);
        Route::get('dashboard/user-by-payment-id', [DashboardController::class, 'getUserByPaymentId']);
        Route::patch('dashboard/update-last-payment-date', [ProfileController::class, 'updateLastPaymentDate']);

        Route::get('dashboard/relevant-users', [DashboardController::class, 'getRelevantUsers']);
        Route::get('dashboard/user/{id}', [DashboardController::class, 'getUser']);
        Route::post('dashboard/lending', [DashboardController::class, 'storeLending']);
        Route::post('dashboard/lending/add-book', [DashboardController::class, 'addBookToLending']);
        Route::post('dashboard/lending/remove-book', [DashboardController::class, 'removeBook']);
        Route::patch('dashboard/lending/set-state', [DashboardController::class, 'updateLendingState']);

        Route::get('dashboard/lending-by-shipping-token', [DashboardController::class, 'getLandingByShippingToken']);
        Route::patch('dashboard/book/scrapping', [DashboardController::class, 'bookScrapping']);
        Route::patch('dashboard/book/increase-available-number', [DashboardController::class, 'increaseBookAvailableNumber']);
        Route::patch('dashboard/close-lending', [DashboardController::class, 'closeLending']);


        //ImageStorage
        Route::resource('image-storage', ImageStorageController::class)->only(['index', 'store', 'destroy']);
    });

    Route::middleware('can:accessUser')->group(function () {
        //Profile User data
        Route::get('profile/user', [ProfileController::class, 'getUser']);
        Route::patch('profile/user', [ProfileController::class, 'updateUser']);

        //Profile Shipping Address
        Route::get('profile/shipping-address', [ProfileController::class, 'getShippingAddresses']);
        Route::post('profile/shipping-address', [ProfileController::class, 'storeShippingAddress']);
        Route::patch('profile/shipping-address', [ProfileController::class, 'updateActiveShippingAddress']);
        Route::patch('profile/shipping-address/{id}', [ProfileController::class, 'updateShippingAddress']);
        Route::delete('profile/shipping-address/{id}', [ProfileController::class, 'removeShippingAddress']);

        //Profile Subscriptions
        Route::get('profile/subscriptions', [ProfileController::class, 'getSubscriptions']);
        Route::patch('profile/subscription', [ProfileController::class, 'updateActiveSubscription']);

        //Profile Lending
        Route::get('profile/lending', [ProfileController::class, 'getLending']);
        Route::get('profile/lending/history', [ProfileController::class, 'getLendingHistory']);

        //Profile Wishlist
        Route::get('profile/wishlist', [ProfileController::class, 'getWishlist']);
        Route::patch('profile/wishlist', [ProfileController::class, 'sortWishlist']);
        Route::post('profile/wishlist/delete', [ProfileController::class, 'removeWisList']);


        //Book-Wishlist
        Route::post('books/{book}/wishlist', [\App\Http\Controllers\BookController::class, 'changeWisListStatus']);
        Route::get('books/{book}/wishlist', [\App\Http\Controllers\BookController::class, 'checkWisListStatus']);
    });
});
