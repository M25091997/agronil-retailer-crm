<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Disease;
use App\Models\HomeBanner;
use App\Models\Product;
use App\Models\RecentView;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CommanController extends Controller
{
    // category
    public function get_categories()
    {
        $categories = Category::with('subCategories')->whereIsActive()->get();
        if ($categories) {
            return   ApiResponse::success('categories details get successfully',  $categories);
        } else {
            return   ApiResponse::success('Failed to get categories');
        }
    }

    public function get_products()
    {
        $products =  Product::with('images', 'variants', 'variants.bulkPrices')->where('is_active', true)->get();
        if ($products) {
            return   ApiResponse::success('Product details get successfully', $products);
        } else {
            return   ApiResponse::success('Failed to get products');
        }
    }

    public function get_similerProducts(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'sub_category_id' => 'required|integer|exists:sub_categories,id'
        ]);


        if ($validator->fails()) {
            return ApiResponse::error('Validation failed', $validator->errors(), 422);
        }
        $data = $validator->validated();

        $products =  Product::with('images', 'variants', 'variants.bulkPrices')->whereIsActive()->where('sub_category_id',   $data['sub_category_id'])->get();

        if ($products) {
            return   ApiResponse::success('Similer poduct get successfully', $products);
        } else {
            return   ApiResponse::success('Failed to get products');
        }
    }




    public function get_brands()
    {
        $brands = Brand::whereIsActive()->get();

        if ($brands) {
            return   ApiResponse::success('Brands details  get successfully', $brands);
        } else {
            return   ApiResponse::success('Failed to get brands');
        }
    }
    public function get_diseases()
    {
        $diseases = Disease::whereIsActive()->get();

        if ($diseases) {
            return   ApiResponse::success('Disease details  get successfully', $diseases);
        } else {
            return   ApiResponse::success('Failed to get disease');
        }
    }


    public function get_silderBanners()
    {
        $banners = HomeBanner::whereIsActive()->get();

        if ($banners) {
            return   ApiResponse::success('Banner details  get successfully', $banners);
        } else {
            return   ApiResponse::success('Failed to get banners');
        }
    }

    public function product_filter(Request $request)
    {
        $query = Product::query();

        // Filter by category
        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        // Filter by subcategory
        if ($request->filled('subcategory_id')) {
            $query->where('subcategory_id', $request->subcategory_id);
        }

        // Filter by brand
        if ($request->filled('brand_id')) {
            $query->whereHas('brands', function ($q) use ($request) {
                $q->where('brand_id', $request->brand_id);
            });
        }

        // Filter by disease (many-to-many relation)
        if ($request->filled('disease_id')) {
            $query->whereHas('diseases', function ($q) use ($request) {
                $q->where('disease_id', $request->disease_id);
            });
        }

        // // Price range filter
        // if ($request->filled('min_price')) {
        //     $query->where('price', '>=', $request->min_price);
        // }
        // if ($request->filled('max_price')) {
        //     $query->where('price', '<=', $request->max_price);
        // }

        // // Status filter
        // if ($request->filled('status')) {
        //     $query->where('status', $request->status);
        // }

        // Search by product name
        if ($request->filled('search')) {
            $query->where('tags', 'LIKE', "%$request->search%")
                ->orWhere('name', 'LIKE', "%$request->search%");
        }

        // Sorting
        if ($request->filled('sort_by') && in_array($request->sort_by, ['price', 'name', 'created_at'])) {
            $direction = $request->get('sort_order', 'asc');
            $query->orderBy($request->sort_by, $direction);
        }

        $products = $query->with(['category', 'subcategory', 'brand', 'diseases'])->paginate(10);

        return response()->json([
            'success' => true,
            'data' => $products
        ]);
    }
}
