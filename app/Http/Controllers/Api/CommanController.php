<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class CommanController extends Controller
{
    // category
    public function get_categories()
    {
        $categories = Category::with('subCategories')->whereIsActive()->get();
        if ($categories) {
            return   ApiResponse::success('categories details get successfully', [
                'categories' =>  $categories,
            ]);
        } else {
            return   ApiResponse::success('Failed to get categories', [
                'categories' =>  [],
            ]);
        }
    }

    public function get_products()
    {
        $products =  Product::with('images', 'variants', 'variants.bulkPrices')->where('is_active', true)->get();
        if ($products) {
            return   ApiResponse::success('Product details get successfully', [
                'products' =>  $products,
            ]);
        } else {
            return   ApiResponse::success('Failed to get products', [
                'products' =>  [],
            ]);
        }
    }
}
