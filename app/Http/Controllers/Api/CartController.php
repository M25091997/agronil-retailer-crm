<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Product;
use App\Models\RecentView;
use App\Models\WishList;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CartController extends Controller
{
    public function addToCart(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return ApiResponse::error('User is not authenticated.', 401);
        }

        $validator = Validator::make($request->all(), [
            'product_id' => 'required|integer|exists:products,id',
            'product_variant_id' => 'required|integer|exists:product_variants,id',
            'product_bulk_price_id' => 'nullable|integer|exists:product_bulk_prices,id',
            'quantity' => 'nullable|integer|min:1',
            'type' => 'nullable|in:cart,buy_now',
        ]);

        if ($validator->fails()) {
            return ApiResponse::error('Validation failed', $validator->errors(), 422);
        }

        $data = $validator->validated();

        // Check if the cart already has this product
        $cartItem = Cart::where('user_id', $user->id)
            ->where('product_id', $data['product_id'])
            ->where('product_variant_id', $data['product_variant_id'])
            ->where('product_bulk_price_id', $data['product_bulk_price_id'] ?? null)
            ->first();

        if ($cartItem) {
            // Increase quantity
            $cartItem->quantity += $data['quantity'] ?? 1;
            $cartItem->save();
        } else {
            // Create new cart entry
            $cartItem = Cart::create([
                'user_id' => $user->id,
                'product_id' => $data['product_id'],
                'product_variant_id' => $data['product_variant_id'],
                'product_bulk_price_id' => $data['product_bulk_price_id'] ?? null,
                'quantity' => $data['quantity'] ?? 1,
                'type' => $data['type'] ?? 'cart',
                'status' => true,
            ]);
        }

        return ApiResponse::success('Product added to cart successfully.',  $cartItem);
    }

    //update Cart Quantity.
    public function updateCartQuantity(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return ApiResponse::error('User is not authenticated.', 401);
        }

        $validator = Validator::make($request->all(), [
            'cart_id'   => 'required|integer|exists:carts,id',
            'action'    => 'required|string|in:increase,decrease,update',
            'quantity'  => 'nullable|integer|min:1',
        ]);

        if ($validator->fails()) {
            return ApiResponse::error('Validation failed', $validator->errors(), 422);
        }

        $data = $validator->validated();

        $cartItem = Cart::where('id', $data['cart_id'])
            ->where('user_id', $user->id)
            ->first();

        if (!$cartItem) {
            return ApiResponse::error('Cart item not found.', 404);
        }

        // Handle actions
        if ($data['action'] === 'increase') {
            $cartItem->quantity += 1;
        } elseif ($data['action'] === 'decrease') {
            if ($cartItem->quantity > 1) {
                $cartItem->quantity -= 1;
            } else {
                return ApiResponse::error('Quantity cannot be less than 1.', 422);
            }
        } elseif ($data['action'] === 'update') {
            $cartItem->quantity = $data['quantity'];
        }

        $cartItem->save();

        return ApiResponse::success('Cart updated successfully.', $cartItem);
    }


    // update multiple cart updates at once.
    public function updateCartItems(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return ApiResponse::error('User is not authenticated.', 401);
        }

        $validator = Validator::make($request->all(), [
            'carts'               => 'required|array',
            'carts.*.cart_id'     => 'required|integer|exists:carts,id',
            'carts.*.quantity'    => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return ApiResponse::error($validator->errors()->first(), 422);
        }

        foreach ($request->carts as $cart) {
            $cartItem = $user->cart()->findOrFail($cart['cart_id']);
            $cartItem->update(['quantity' => $cart['quantity']]);
        }

        $order = new OrderController();
        return $order->create_order($request);



        return ApiResponse::success('Cart items updated successfully', $result);
    }


    // wishlist
    public function addToWishlist(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return ApiResponse::error('User is not authenticated.', 401);
        }

        $validator = Validator::make($request->all(), [
            'product_id' => 'required|integer|exists:products,id',
            'type' => 'nullable|in:price_drop,normal',
        ]);

        if ($validator->fails()) {
            return ApiResponse::error('Validation failed', $validator->errors(), 422);
        }

        $data = $validator->validated();

        // Check if already in wishlist
        $wishlistItem = WishList::where('user_id', $user->id)
            ->where('product_id', $data['product_id'])
            ->first();

        if ($wishlistItem) {
            // If exists, remove it
            $wishlistItem->delete();
            return ApiResponse::success('Product removed from wishlist.');
        } else {
            // Add new
            $wishlistItem = Wishlist::create([
                'user_id' => $user->id,
                'product_id' => $data['product_id'],
                'type' => $data['type'] ?? 'normal',
            ]);
            return ApiResponse::success('Product added to wishlist.', $wishlistItem);
        }
    }

    public function get_wishlist(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return ApiResponse::error('User is not authenticated.', 401);
        }

        $wishlistItemIds = WishList::where('user_id', $user->id)->pluck('product_id');

        if ($wishlistItemIds->isEmpty()) {
            return ApiResponse::success('No products available in wishlist.', []);
        }

        $products = Product::with(['images', 'variants', 'variants.bulkPrices'])
            ->whereIn('id', $wishlistItemIds)
            ->whereIsActive()->get();

        return ApiResponse::success('Wishlist products', $products);
    }

    public function get_wishlist_v1(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return ApiResponse::error('User is not authenticated.', 401);
        }

        $wishlist =   $user->wishlist()->with(['product', 'product.images', 'product.variants.bulkPrices'])->latest('updated_at')->get();



        // $wishlist = Wishlist::with([
        //     'product.images',
        //     'product.variants',
        //     'product.variants.bulkPrices'
        // ])
        //     ->where('user_id', $user->id)
        //     ->latest('updated_at')
        //     ->get();

        if ($wishlist->isEmpty()) {
            return ApiResponse::success('Your wishlist is empty.', []);
        }

        return ApiResponse::success('Your wishlist products', $wishlist);

        $products =  $user->wishlist->products->with(['images', 'variants', 'variants.bulkPrices'])->get();

        // $wishlistItemIds = WishList::where('user_id', $user->id)->pluck('product_id');

        // if ($wishlistItemIds->isEmpty()) {
        //     return ApiResponse::success('No products available in wishlist.', []);
        // }

        // $products = Product::with(['images', 'variants', 'variants.bulkPrices'])
        //     ->whereIn('id', $wishlistItemIds)
        //     ->whereIsActive()->get();

        return ApiResponse::success('Wishlist products', $products);
    }

    //cart
    public function get_cart(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return ApiResponse::error('User is not authenticated.', 401);
        }

        $cartItems = $user->cart()
            ->with(['product.images', 'product.variants', 'product.variants.bulkPrices'])
            ->get();


        // $cartItems = Cart::with([
        //     'product.images',
        //     'product.variants.bulkPrices'
        // ])
        //     ->where('user_id', $user->id)
        //     ->where('status', true)
        //     ->get();





        // $cartItems = Cart::with([
        //     'product.images',
        //     'variant',
        //     'bulkPrices'
        // ])
        //     ->where('user_id', $user->id)
        //     ->where('status', true)
        //     ->get();



        if ($cartItems->isEmpty()) {
            return ApiResponse::success('No products available in cart.',  []);
        }

        return ApiResponse::success('Cart products', $cartItems);
    }


    public function remove_cart($cart)
    {
        $cartItem = Cart::find($cart);

        if (!$cartItem) {
            return ApiResponse::error('Cart item not found.', 404);
        }

        $cartItem->delete();

        return ApiResponse::success('Cart item removed');
    }

    // public function removeFromCart(Request $request, $id)
    // {
    //     $cartItem = $request->user()->cart()->findOrFail($id);
    //     $cartItem->delete();

    //     return ApiResponse::success('Cart item removed');
    // }

    //     public function clearCart(Request $request)
    // {
    //     $request->user()->cart()->delete();

    //     return ApiResponse::success('Cart cleared');
    // }

    //     public function updateCartItem(Request $request, $id)
    // {
    //     $request->validate([
    //         'quantity' => 'required|integer|min:1',
    //     ]);

    //     $cartItem = $request->user()->cart()->findOrFail($id);
    //     $cartItem->update(['quantity' => $request->quantity]);

    //     return ApiResponse::success('Cart item updated', $cartItem);
    // }

    // public function getCart(Request $request)
    // {
    //     $user = $request->user();

    //     $cartItems = $user->cart()
    //         ->with(['product.images', 'product.variants'])
    //         ->get();

    //     return ApiResponse::success('Cart fetched successfully', $cartItems);
    // }

    // public function addToCart(Request $request)
    // {
    //     $request->validate([
    //         'product_id' => 'required|exists:products,id',
    //         'quantity'   => 'required|integer|min:1',
    //     ]);

    //     $cartItem = $request->user()->cart()->updateOrCreate(
    //         ['product_id' => $request->product_id],
    //         ['quantity'   => \DB::raw("quantity + {$request->quantity}")]
    //     );

    //     return ApiResponse::success('Product added to cart', $cartItem);
    // }

    public function recent_views(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return ApiResponse::error('User is not authenticated.', 401);
        }

        $validator = Validator::make($request->all(), [
            'product_id' => 'required|exists:products,id',
        ]);

        if ($validator->fails()) {
            return ApiResponse::error('Validation failed', $validator->errors(), 422);
        }

        // Create or update the recent view
        RecentView::updateOrCreate(
            [
                'user_id' => $user->id,
                'product_id' => $request->product_id,
            ],
            [
                'ip' => $request->ip(),
                'created_at' => now(),
            ]
        );

        return ApiResponse::success('Product aaded as recently viewed');
    }

    public function getRecentViewProducts(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return ApiResponse::error('User is not authenticated.', 401);
        }

        $products = [];

        $recentProductIds =  $user->recentViews->pluck('product_id')->toArray();

        if (!$recentProductIds) {
            return ApiResponse::success('No product found as recent views.', []);
        }
        $products =  Product::with('images', 'variants', 'variants.bulkPrices')->whereIsActive()
            ->whereIn('id', $recentProductIds)
            ->orderByRaw('FIELD(id, ' . implode(',', $recentProductIds) . ')')
            ->get();

        return ApiResponse::error('product as recent views',  $products);
    }
}
