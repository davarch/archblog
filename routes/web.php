<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::middleware('guest')->group(function () {
    Route::get('login', static function () {
        return view('index');
    })->name('login');

    Route::get('registration', static function () {
        return view('index');
    })->name('registration');
});

Route::middleware('auth')->group(function () {
    Route::get('user', static function () {
        return auth()->user();
    });
});

Route::get('{any}', static function () {
    return view('index');
})->where('any', '.*');
