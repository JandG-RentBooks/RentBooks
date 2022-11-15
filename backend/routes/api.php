<?php

use App\Http\Controllers\Admin\AuthorController;
use App\Http\Controllers\Admin\BookController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\LabelController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Auth\RegisterController;
use Illuminate\Support\Facades\Route;

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
    Route::post('register', 'register');
    Route::post('login', 'login');
});

Route::middleware('auth:sanctum')->group(function () {
    Route::prefix('admin')->middleware('can:accessAdmin')->group(function () {
        Route::resource('user', UserController::class);
        Route::resource('author', AuthorController::class);
        Route::resource('book', BookController::class);
        Route::resource('category', CategoryController::class);
        Route::resource('label', LabelController::class);
    });

    Route::prefix('admin')->middleware('can:accessEmployee')->group(function () {
        Route::resource('author', AuthorController::class);
        Route::resource('book', BookController::class);
        Route::resource('category', CategoryController::class);
        Route::resource('label', LabelController::class);
    });


});

