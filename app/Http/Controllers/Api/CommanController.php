<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\Category;
use App\Models\DiscountCoupon;
use App\Models\Disease;
use App\Models\HomeBanner;
use App\Models\Product;
use App\Models\ProductBulkPrice;
use App\Models\ProductVariant;
use App\Models\RecentView;
use App\Models\SubCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use function Laravel\Prompts\error;

class CommanController extends Controller
{
    public function termAndCondition()
    {
        return view('partical.termAndCondition');
    }

    public function privacyPolicy()
    {
        return view('partical.privacyPolicy');
    }

    public function cancellationRefund()
    {
        return view('partical.cancellationRefund');
    }

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

    public function product_search(Request $request)
    {
        $query = Product::with(['images', 'variants', 'variants.bulkPrices'])
            ->where('is_active', true);

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhere('specification', 'like', "%{$search}%")
                    ->orWhere('other_information', 'like', "%{$search}%")
                    ->orWhere('sort_description', 'like', "%{$search}%")
                    ->orWhere('tags', 'like', "%{$search}%")
                    ->orWhere('sku', 'like', "%{$search}%");
            });
        } else {
            return ApiResponse::success('No search term provided', []);
        }

        $products = $query->latest()->take(10)->get();

        return ApiResponse::success('Product search results', $products);
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
            $query->whereIn('sub_category_id', [$request->subcategory_id]);
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



        $products = $query->with('images', 'variants', 'variants.bulkPrices')->where('is_active', true)->get();
        if ($products) {
            return   ApiResponse::success('Product get successfully', $products);
        } else {
            return   ApiResponse::success('Failed to get products');
        }
    }

    public function coupons(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return ApiResponse::error('User is not authenticated.', 401);
        }

        $coupons = DiscountCoupon::where('is_all', true)->orWhereIn('user_id', [$user->id])->active()->get();

        return ApiResponse::success('User discount coupons', $coupons);
    }

    public function discount_validate(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return ApiResponse::error('User is not authenticated.', 401);
        }

        $validator = Validator::make($request->all(), [
            'code'        => 'required|exists:discount_coupons,code',
            'order_value' => 'nullable|numeric|min:1',
            'type'        => 'required|in:cart,buy_now'
        ]);

        if ($validator->fails()) {
            return ApiResponse::error($validator->errors()->first(), $validator->errors(), 422);
        }

        // ✅ Find coupon by code
        $coupon = DiscountCoupon::where('code', $request->code)
            ->where(function ($q) use ($user) {
                $q->where('is_all', true)->orWhere('user_id', $user->id);
            })
            ->active()
            ->first();

        if (!$coupon) {
            return ApiResponse::error('Coupon not valid for this user.', 400);
        }

        // ✅ Check expiry
        if ($coupon->is_expiry && $coupon->expiry_date < now()) {
            return ApiResponse::error('Coupon expired.', 400);
        }

        // ✅ Get order total
        $total = $request->order_value;
        if (!$total) {
            $cartItems = $user->cart()->where('type', $request->type)->get();
            $total = 0;

            foreach ($cartItems as $cart) {
                $price = 0;

                if ($cart->product_variant_id) {
                    $variant = ProductVariant::find($cart->product_variant_id);
                    $price = $variant->price ?? 0;
                } elseif ($cart->product_bulk_price_id) {
                    $bulk = ProductBulkPrice::find($cart->product_bulk_price_id);
                    $price = $bulk->bulk_price ?? 0;
                } else {
                    $product = Product::find($cart->product_id);
                    $price = $product->price ?? 0;
                }

                $subtotal = $price * $cart->quantity;
                $total += $subtotal;
            }
        }

        // ✅ Apply discount
        $discountAmount = 0;
        if ($coupon->discount_type === 'percentage') {
            $discountAmount = ($total * $coupon->amount) / 100;
        } else {
            $discountAmount = $coupon->amount;
        }

        // ✅ Ensure discount does not exceed total
        $discountAmount = min($discountAmount, $total);
        $finalAmount = $total - $discountAmount;

        return ApiResponse::success('Coupon applied successfully.', [
            'original_total' => $total,
            'discount'       => $discountAmount,
            'final_total'    => $finalAmount,
            'coupon'         => $coupon->code
        ]);
    }

    public function applyRedeem(Request $request)
    {

        $user = $request->user();
        if (!$user) {
            return ApiResponse::error('User is not authenticated.', 401);
        }
        $validator = Validator::make($request->all(), [
            'product_amount' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return ApiResponse::error('Validation failed', $validator->errors(), 422);
        }

        $order = new OrderController();
        $points = $user->reward_points;
        $total = $request->product_amount;


        if ($points < 100) {
            return response()->json(['status' => false, 'message' => 'Not enough redeem points!'], 422);
        }

        $redeem = $order->pointCheckout($points, $total);

        return response()->json([
            'redeem_discount' => $redeem['earned'],
        ]);
    }



    public function productFilter(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'category_id'    => 'nullable|exists:categories,id',
            'subcategory_id' => 'nullable|array',
            'subcategory_id.*' => 'nullable|exists:sub_categories,id',
            'brand_id'       => 'nullable|exists:brands,id',
            'disease_id'     => 'nullable|exists:diseases,id',
            'min_price'      => 'nullable|numeric|min:0',
            'max_price'      => 'nullable|numeric|gte:min_price',
            'sort_by'        => 'nullable|string|in:popular,price_high_to_low,price_low_to_high,is_sale',
        ]);

        if ($validator->fails()) {
            return ApiResponse::error($validator->errors()->first(), $validator->errors(), 422);
        }


        // return  $request->all();
        $query = Product::with('images', 'variants', 'variants.bulkPrices')->where('is_active', true); // eager load relations


        // ✅ Category filter
        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }
        // return   $products = $query->get();



        // ✅ Subcategory filter
        if ($request->filled('subcategory_id') && !empty($request->subcategory_id)) {
            $query->whereIn('sub_category_id', $request->subcategory_id);
        }

        // return   $products = $query->get();

        // ✅ Brand filter
        if ($request->filled('brand_id') && !empty($request->brand_id)) {
            $query->whereIn('brand_id', $request->brand_id);
        }


        // ✅ Disease filter (many-to-many relationship)
        if ($request->filled('disease_id') && !empty($request->disease_id)) {

            $query->where('disease_id', $request->disease_id);
            // $query->whereHas('diseases', function ($q) use ($request) {
            //     $q->whereIn('disease_id', (array) $request->disease_id);
            // });
        }

        // 

        // ✅ Price alert filter (min & max price)
        if ($request->filled('min_price') && $request->filled('max_price')) {
            $query->whereHas('variants', function ($q) use ($request) {
                $q->whereBetween('price', [$request->min_price, $request->max_price]);
            });
        }

        // ✅ Sorting
        if ($request->filled('sort_by')) {

            // return $request->sort_by;
            switch ($request->sort_by) {
                case 'popular':
                    $query->orderBy('top_selling', 'desc');
                    break;
                case 'price_high_to_low':
                    $query->withMin('variants', 'price')
                        ->orderBy('variants_min_price', 'desc');
                    break;
                case 'price_low_to_high':
                    $query->withMin('variants', 'price')
                        ->orderBy('variants_min_price', 'asc');
                    break;
                case 'is_sale':
                    $query->where('is_sale', 1);
                    break;
            }
        }

        // ✅ Get paginated result
        // $products = $query->paginate(12);
        $products = $query->get();

        return ApiResponse::success('Products fetched successfully', $products);
    }


    // tools
    public function tools()
    {
        $products = Product::with('images', 'variants', 'variants.bulkPrices')->where('category_id', 3)->whereIsActive()->get();
        if (!$products) {
            return ApiResponse::success('Tools Products', []);
        }

        return ApiResponse::success('Tools Products', $products);
    }

    public function notifications(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return ApiResponse::error('User is not authenticated.', 401);
        }

        // Fetch notifications (latest first) with pagination
        $notifications = $user->notifications()
            ->latest()->take(10)->get();
        // ->paginate(10);

        return ApiResponse::success('User notifications fetched successfully.', $notifications);
    }

    // notification mark as read

    public function read(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return ApiResponse::error('User is not authenticated.', 401);
        }

        $validator = Validator::make($request->all(), [
            'notification_id' => 'nullable|exists:notifications,id',
        ]);

        if ($validator->fails()) {
            return ApiResponse::error($validator->errors()->first(), $validator->errors(), 422);
        }

        // Case 1: Mark a specific notification
        if ($request->filled('notification_id')) {
            $notification = $user->notifications()
                ->where('id', $request->notification_id)
                ->first();

            if (!$notification) {
                return ApiResponse::error('Notification not found.', 404);
            }

            $notification->update(['is_read' => true]);

            return ApiResponse::success('Notification marked as read.', $notification);
        }

        // Case 2: Mark all notifications
        $user->notifications()->update(['is_read' => true]);

        return ApiResponse::success('All notifications marked as read.');
    }


    public function pesticide_products()
    {
        $products = SubCategory::where('category_id', 2)->whereIsActive()->get();

        if ($products) {
            return   ApiResponse::success('Product get successfully', $products);
        } else {
            return   ApiResponse::success('Failed to get products');
        }
    }

    public function crop_products()
    {
        $products = SubCategory::where('category_id', 5)->whereIsActive()->get();
        if ($products) {
            return   ApiResponse::success('Product get successfully', $products);
        } else {
            return   ApiResponse::success('Failed to get products');
        }
    }
}
