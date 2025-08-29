<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\CommanController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\RetailerController;
use App\Http\Controllers\ShippingAddressController;
use App\Models\Retailer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Artisan;


// Public routes
Route::post('/login/phone', [AuthController::class, 'login']);
Route::post('/verify/otp', [AuthController::class, 'otp_verify']);
Route::get('/products', [CommanController::class, 'get_products']);
Route::get('/similer-products', [CommanController::class, 'get_similerProducts']);
Route::get('/categories', [CommanController::class, 'get_categories']);
Route::get('/brands', [CommanController::class, 'get_brands']);
Route::get('/diseases', [CommanController::class, 'get_diseases']);
Route::get('/silder-banners', [CommanController::class, 'get_silderBanners']);
Route::post('/product-filter', [CommanController::class, 'productFilter']);

//products
Route::prefix('product')->group(function () {
    Route::get('/tools', [CommanController::class, 'tools']);
});



// Protected routes
Route::middleware(['auth:api', 'api.auth'])->group(function () {
    Route::get('/user/profile', [UserController::class, 'profile']);
    Route::post('retailer', [RetailerController::class, 'store']);

    Route::group(['prefix' => 'product'], function () {
        Route::post('add-to-wishlist', [CartController::class, 'addToWishList']);
        Route::post('add-to-cart', [CartController::class, 'addToCart']);
        Route::get('wishlist', [CartController::class, 'get_wishlist']);
        Route::get('cart', [CartController::class, 'get_cart']);
        Route::delete('/cart/{id}', [CartController::class, 'remove_cart']);
        Route::post('/recent-views', [CartController::class, 'recent_views']);
        Route::get('/recent-views', [CartController::class, 'getRecentViewProducts']);
        Route::put('/cart/update', [CartController::class, 'updateCartQuantity']);
        Route::put('/multiple-cart-updates', [CartController::class, 'updateCartItems']);
    });

    Route::group(['prefix' => 'order'], function () {
        Route::post('shipping-address', [OrderController::class, 'shippingAddress']);
        Route::get('shipping-address', [OrderController::class, 'get_shippingAddress']);
        Route::delete('shipping-address/{addressId}', [OrderController::class, 'delete_shippingAddress']);
        Route::get('/create', [OrderController::class, 'create_order']);
        Route::post('/checkout', [OrderController::class, 'checkout']);
        Route::get('', [OrderController::class, 'myOrder']);
    });

    Route::group(['prefix' => 'discount'], function () {
        Route::get('coupons', [CommanController::class, 'coupons']);
        Route::post('validate', [CommanController::class, 'discount_validate']);
        Route::post('redeem',  [CommanController::class, 'applyRedeem']);
    });
});



Route::get('clear', function () {
    Artisan::call('optimize:clear');
    Artisan::call('storage:link');
    return redirect()->back();
});
