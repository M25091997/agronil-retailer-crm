<?php

use App\Http\Controllers\BrandController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DiseaseController;
use App\Http\Controllers\HomeBannerController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
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

Route::get('/', function () {
    return Inertia::location('/login');
});

Route::prefix('admin')->middleware('auth')->group(function () {
    Route::get('/', function () {
        return Inertia::render('Dashboard');
    })->name('admin.dashboard');

    // Route::resource('/categories', CategoryController::class);
    Route::resource('/categories', CategoryController::class)->names('admin.categories');
    Route::resource('/sub-categories', SubCategoryController::class);
    Route::resource('/brands', BrandController::class);
    Route::resource('/diseases', DiseaseController::class);
    Route::resource('/unit-type', UnitTypeController::class);
    Route::resource('/home-banners', HomeBannerController::class);
    Route::resource('/products', ProductController::class);

    // api
    Route::get('/category/dependencies/{id}', [CategoryController::class, 'getDependencies']);


    // Route::get('/category', function () {
    //     return Inertia::render('Admin/Category/CategoryList');
    // });
    // Route::get('/category/add', function () {
    //     return Inertia::render('Admin/Category/CategoryAdd');
    // });
});

Route::get('/', function () {
    return Inertia::location('/login');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
