<?php

use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\ManageOrderController;
use App\Http\Controllers\BaseUnitController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DiscountCouponController;
use App\Http\Controllers\DiseaseController;
use App\Http\Controllers\HomeBannerController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RetailerController;
use App\Http\Controllers\RewardSettingController;
use App\Http\Controllers\SubCategoryController;
use App\Http\Controllers\UnitTypeController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/login', function () {
    return Inertia::location('/login');
});


Route::get('/', function () {
    return view('website.welcome');
});
Route::get('/aboutus', function () {
    return view('website.aboutus');
});
Route::get('/retailer', function () {
    return view('website.retailer');
});


Route::prefix('admin')->middleware('auth')->group(function () {
    Route::get('/', function () {
        return Inertia::render('Dashboard');
    })->name('admin.dashboard');

    Route::get('dashboard-data', [AdminDashboardController::class, 'getDashboardData']);

    // Route::resource('/categories', CategoryController::class);
    Route::resource('/categories', CategoryController::class)->names('admin.categories');
    Route::resource('/sub-categories', SubCategoryController::class);
    Route::resource('/brands', BrandController::class);
    Route::resource('/diseases', DiseaseController::class);
    Route::resource('/unit-type', UnitTypeController::class);
    Route::resource('/base-unit', BaseUnitController::class);
    Route::resource('/home-banners', HomeBannerController::class);
    Route::resource('/products', ProductController::class);
    Route::resource('/notifications', NotificationController::class);

    // api
    Route::get('/category/dependencies/{id}', [CategoryController::class, 'getDependencies']);

    Route::prefix('/retailer')->group(function () {
        Route::get('/pending', [RetailerController::class, 'pendingRetailer']);
        Route::get('/approved', [RetailerController::class, 'approvedRetailer']);
        Route::get('/status-update/{retailer}', [RetailerController::class, 'statusUpdate']);
        Route::delete('/{retailer}', [RetailerController::class, 'destroy']);
        Route::get('/{userId}/orders', [RetailerController::class, 'orders']);
    });

    Route::prefix('/orders')->group(function () {
        Route::get('', [ManageOrderController::class, 'orders']);
        Route::get('details/{invoice_no}', [ManageOrderController::class, 'details']);
        Route::get('payments/{invoice_no}', [ManageOrderController::class, 'payments']);
        Route::post('payment/settlement', [ManageOrderController::class, 'settlement']);
        Route::post('payment/{id}/update-status', [ManageOrderController::class, 'updateStatus']);
        Route::get('/details/{order_id}/updated-payments', [ManageOrderController::class, 'updated_payments']);
        Route::get('/reports', [ManageOrderController::class, 'reports']);
        Route::post('/reports', [ManageOrderController::class, 'get_reports']);
    });

    Route::prefix('/discount')->group(function () {
        Route::resource('/coupons', DiscountCouponController::class);
        Route::resource('/rewardsetting', RewardSettingController::class);
    });



    Route::prefix('manage')->group(function () {
        Route::get('activeproduct', [ProductController::class, 'active']);
        Route::get('brandedproduct', [ProductController::class, 'brand']);
        Route::get('populer-product', [ProductController::class, 'populer']);
        Route::get('sale-product', [ProductController::class, 'sale']);
        Route::get('feature-product', [ProductController::class, 'feature']);
        Route::get('trending-product', [ProductController::class, 'trending']);
        Route::get('newarrival-product', [ProductController::class, 'new_arrival']);
        Route::put('update-status/{product}', [ProductController::class, 'status']);
    });


    // Route::get('/category', function () {
    //     return Inertia::render('Admin/Category/CategoryList');
    // });
    // Route::get('/category/add', function () {
    //     return Inertia::render('Admin/Category/CategoryAdd');
    // });
});

// Route::get('/', function () {
//     return Inertia::location('/login');
// });

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
