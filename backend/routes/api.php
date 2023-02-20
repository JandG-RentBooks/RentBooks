<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ImageStorageController;
use App\Http\Controllers\Admin\PublisherController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TestimonialController;
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

Route::controller(RegisterController::class)->group(function(){
    Route::get('register', 'index');
    Route::post('register', 'register');
    Route::post('login', 'login');
});

Route::controller(HomeController::class)->group(function(){
    //Címlap
    Route::get('testimonial', [TestimonialController::class, 'index']);
});

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

        //Dashboard
        Route::get('dashboard', [DashboardController::class, 'index']);

        //ImageStorage
        Route::resource('image-storage', ImageStorageController::class)->only(['index', 'store', 'destroy']);
    });

    Route::middleware('can:accessUser')->group(function () {
        //Profile
        Route::get('profile/user', [ProfileController::class, 'getUser']);
        Route::get('profile/testimonials', [ProfileController::class, 'getTestimonials']);
        //Wishlist
        Route::resource('wishlist', Wishlist::class);
    });
});
