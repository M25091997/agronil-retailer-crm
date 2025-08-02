<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CommanController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


// Public routes
Route::post('/login/phone', [AuthController::class, 'login']);
Route::post('/verify/otp', [AuthController::class, 'otp_verify']);
Route::get('/products', [CommanController::class, 'get_products']);
Route::get('/categories', [CommanController::class, 'get_categories']);

// Protected routes
Route::middleware(['auth:api', 'api.auth'])->group(function () {
    Route::get('/user/profile', [UserController::class, 'profile']);
});
