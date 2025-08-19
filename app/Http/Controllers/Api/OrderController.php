<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\OrderPayment;
use App\Models\Product;
use App\Models\ProductBulkPrice;
use App\Models\ProductVariant;
use App\Models\ShippingAddress;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    public function shippingAddress(Request $request)
    {
        $user = $request->user();
        if (!$user) {
            return ApiResponse::error('User is not authenticated.', 401);
        }

        $validator = Validator::make($request->all(), [
            'id'              => 'nullable|integer|exists:shipping_addresses,id',
            'address_type'    => 'nullable|in:Home,Office,Shop,Ware House,Other',
            'full_name'       => 'required|string|max:255',
            'phone'           => 'nullable|digits:10',
            'alternate_phone' => 'nullable|digits:10',
            'address_line1'   => 'required|string|max:255',
            'address_line2'   => 'nullable|string|max:255',
            'city'            => 'required|string|max:100',
            'state'           => 'required|string|max:100',
            'country'         => 'nullable|string|max:100',
            'postal_code'     => 'required|digits:6',
            'is_default'      => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return ApiResponse::error('Validation failed', $validator->errors(), 422);
        }

        $data = $validator->validated();

        // Ensure user_id is always set
        $data['user_id'] = $user->id;
        $data['phone'] = $request->phone ?? $user->phone;

        // If is_default is true, set others to false
        if (!empty($data['is_default']) && $data['is_default']) {
            ShippingAddress::where('user_id', $user->id)->update(['is_default' => false]);
        }

        // Save or update
        $shippingAddress = ShippingAddress::updateOrCreate(
            ['id' => $data['id'] ?? null, 'user_id' => $user->id],
            $data
        );

        return ApiResponse::success('Shipping address saved successfully.', $shippingAddress);
    }

    public function get_shippingAddress(Request $request)
    {
        $user = $request->user();
        if (!$user) {
            return ApiResponse::error('User is not authenticated.', 401);
        }

        $addresses = $user->shippingAddress()->get();
        // $address = $user->shippingAddress; // returns single model


        return ApiResponse::success('Shipping addresses retrieved successfully.', $addresses);
    }

    public function delete_shippingAddress(Request $request, $addressId)
    {
        $user = $request->user();
        if (!$user) {
            return ApiResponse::error('User is not authenticated.', 401);
        }

        $address = $user->shippingAddress()->where('id', $addressId)->first();

        if (!$address) {
            return ApiResponse::error('Address not found.', 404);
        }

        $address->delete();

        return ApiResponse::success('Shipping address removed successfully.');
    }

    public function create_order(Request $request)
    {
        $user = $request->user();
        if (!$user) {
            return ApiResponse::error('User is not authenticated.', 401);
        }

        $cartItems = $user->cart()
            ->with(['product.images', 'product.variants', 'product.variants.bulkPrices'])
            ->get();

        $total = 0;


        foreach ($cartItems as $cart) {
            $product = Product::find($cart->product_id);
            if (!$product) {
                return ApiResponse::error('Something went wrong.', 400);
            }

            $price = 0;

            if ($cart->product_variant_id) {
                $variant = ProductVariant::find($cart->product_variant_id);
                $price = $variant->price;
            }

            if ($cart->product_bulk_price_id) {
                $bulk = ProductBulkPrice::find($cart->product_bulk_price_id);
                $price = $bulk->bulk_price;
            }

            // // If no variant or bulk, fallback to base product price
            // if (!$cart->product_variant_id && !$cart->product_bulk_price_id) {
            //     $product = Product::find($cart->product_id);
            //     if ($product) {
            //         $price = $product->price;
            //     }
            // }

            $subtotal = $price * $cart->quantity;
            $total += $subtotal;
        }

        $data['cartItems'] = $cartItems;
        $data['shippingCharge'] = 0;
        $data['total_tax'] = 0;
        $data['gst_amount'] = 0;
        $data['discount'] = 0;
        $data['total'] = $total;
        $data['pay_amount'] = number_format(($total * 10) / 100, 2);

        return ApiResponse::success('Order placed successfully.', $data);
    }


    public function checkout(Request $request)
    {
        $user = $request->user();
        if (!$user) {
            return ApiResponse::error('User is not authenticated.', 401);
        }

        $validated = $request->validate([
            'shipping_address_id' => 'required|exists:shipping_addresses,id',
            'payment_method' => 'required|string|in:cod,card,wallet,upi,qrcode,online',
            'pay_amount' => 'nullable|min:0|integer',
            'discount_type' => 'nullable',
            'coupan_code' => 'nullable',
            'payment_slip' => 'required|file|mimes:jpg,jpeg,png,pdf|max:6048',
        ]);



        // Fetch cart items for this user
        // $cartItems = Cart::where('user_id', $user->id)
        //     ->where('status', true)
        //     ->get();
        $cartItems = $user->cart()->get();


        if ($cartItems->isEmpty()) {
            return ApiResponse::error('Your cart is empty.', 400);
        }
        $discount = 0;
        $shippingCharge = 0;
        $total_tax = 0;
        $gst_type = '';
        $gst_amount = 0;


        $address = $user->shippingAddress()
            ->where('id', $request->shipping_address_id)
            ->first(['address_type', 'full_name', 'phone', 'alternate_phone', 'address_line1', 'address_line2', 'city', 'state', 'country', 'postal_code']);

        if (!$address) {
            return ApiResponse::error('Invalid shipping address selected.', 422);
        }
        $slip = null;

        if ($request->hasFile('payment_slip')) {
            $slip = $request->file('payment_slip')->store('uploads/payment-slip', 'public');
        }

        DB::beginTransaction();
        try {
            // Create order
            $order = Order::create([
                'user_id' => $user->id,
                'invoice_no' => 1,
                'status' => 'Pending',
                'shipping_address' => json_encode($address->toArray()),
                'payment_method' => $validated['payment_method'],
                'discount_type' => $request->discount_type,
                'coupon_code' => $request->coupon_code,
                'amount' => 0,
                'shipping_charge' => $shippingCharge,
                'tax' => $total_tax,
                'gst_type' => $gst_type,
                'gst_amount' => $gst_amount,
                'discount' => $discount,
                'total_amount' => 0,
                'paid_amount' => $request->pay_amount,
                'due_amount' => 0,
                'payment_status' => 'Pending',
            ]);

            $total = 0;

            foreach ($cartItems as $cart) {
                $product = Product::find($cart->product_id);
                $bulk = false;


                // if variant or bulk id present in cart → override price
                if ($cart->product_variant_id) {
                    $variant = ProductVariant::find($cart->product_variant_id);
                    $price = $variant->price;
                }

                if ($cart->product_bulk_price_id) {
                    $bulk = ProductBulkPrice::find($cart->product_bulk_price_id);
                    $price = $bulk->bulk_price;
                }

                // prepare snapshot product details
                $product_details = [
                    'id'      => $product->id,
                    'name'      => $product->name,
                    'slug'      => $product->slug,
                    'sku'       => $product->sku ?? null,
                    'hsn_code'  => $product->hsn_code ?? null,
                    'variant'   => $variant ? [
                        'id'    => $variant->id,
                        'base_unit'  => $variant->base_unit,
                        'price' => $variant->price,
                        'original_price	' => $variant->original_price,
                        'is_bulk'  => $variant->is_bulk,
                    ] : null,
                    'bulk'      => $bulk ? [
                        'id'       => $bulk->id,
                        'bulk_price'       => $bulk->bulk_price,
                        'pieces_per_box'  => $bulk->pieces_per_box,
                        'bulk_qty_range'  => $bulk->bulk_qty_range,
                        'total_box_price'  => $bulk->total_box_price,
                    ] : null,
                    'image'     => $product->images[0]->image_path,
                ];

                $subtotal = $price * $cart->quantity;
                $total += $subtotal;

                // Save order item
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $cart->product_id,
                    'product_details' =>  json_encode($product_details),
                    // 'variant_id' => $cart->product_variant_id,
                    // 'bulk_id' => $cart->product_bulk_price_id,
                    'quantity' => $cart->quantity,
                    'price' => $price,
                    'total' => $subtotal,
                ]);
            }

            // Update total
            $finalAmount = ($total + $shippingCharge +  $total_tax +  $gst_amount) - $discount;
            $due_amount   =  $finalAmount - $request->pay_amount;
            if ($due_amount <= 0) {
                $paymentStatus = 'Paid';
            } elseif ($due_amount <  $finalAmount) {
                $paymentStatus = 'Partial';
            } else {
                $paymentStatus = 'Pending';
            }

            $order->update(['amount' => $total, 'total_amount' => $finalAmount, 'due_amount' => $due_amount, 'payment_status' => $paymentStatus, 'invoice_no' => 'INV-' . str_pad($order->id, 6, '0', STR_PAD_LEFT)]);
            // $order->update(['amount' => $total, 'total_amount' => $finalAmount, 'due_amount' => $due_amount, 'payment_status' => $paymentStatus, 'invoice_no' => 1]);



            OrderPayment::create([
                'order_id'       => $order->id,
                'transaction_no' => rand(100000, 999999),
                'payment_method' => $validated['payment_method'],
                'payment_type'   => $request->payment_type ?? 'credit', // or 'credit', 'wallet', etc.
                'amount'         => $request->pay_amount,
                'payment_slip'   => $slip,
                'status'         => 'pending', // based on your logic
            ]);

            // Clear cart
            Cart::where('user_id', $user->id)->delete();

            DB::commit();

            return ApiResponse::success('Order placed successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return ApiResponse::error($e->getMessage(), 500);
        }
    }



    public function create_order_v1(Request $request)
    {
        $user = $request->user();
        if (!$user) {
            return ApiResponse::error('User is not authenticated.', 401);
        }

        $validated = $request->validate([
            'shipping_address_id' => 'required|exists:shipping_addresses,id',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'payment_method' => 'required|string|in:cod,card,wallet',
        ]);

        DB::beginTransaction();
        try {
            // 1. Create Order
            $order = $user->orders()->create([
                'shipping_address_id' => $validated['shipping_address_id'],
                'payment_method' => $validated['payment_method'],
                'status' => 'pending',
                'total_amount' => 0, // update later
            ]);

            $total = 0;

            // 2. Add items to Order
            foreach ($validated['items'] as $item) {
                $product = Product::find($item['product_id']);
                $amount = $product->price * $item['quantity'];
                $total += $amount;

                $order->items()->create([
                    'product_id' => $product->id,
                    'quantity' => $item['quantity'],
                    'price' => $product->price,
                    'subtotal' => $amount,
                ]);
            }

            // 3. Update total
            $order->update(['total_amount' => $total]);

            DB::commit();
            return ApiResponse::success('Order created successfully.', $order->load('items'));
        } catch (\Exception $e) {
            DB::rollBack();
            return ApiResponse::error('Failed to create order. ' . $e->getMessage(), 500);
        }
    }



    public function addPayment(Request $request, $orderId)
    {
        $order = Order::findOrFail($orderId);

        $payment = OrderPayment::create([
            'order_id'      => $order->id,
            'transaction_no' => $request->transaction_no,
            'payment_method' => $request->payment_method,
            'payment_type'  => $request->payment_type,
            'amount'        => $request->amount,
            'payment_slip'  => $request->payment_slip,
            'status'        => 'pending',
            'verified_name' => null,
        ]);

        // Update amounts
        $order->paid_amount += $request->amount;
        $order->due_amount  = max(0, $order->total_amount - $order->paid_amount);

        // Update payment status
        if ($order->paid_amount == 0) {
            $order->payment_status = 'Pending';
        } elseif ($order->due_amount > 0) {
            $order->payment_status = 'Partial';
        } else {
            $order->payment_status = 'Paid';
        }

        $order->save();

        return ApiResponse::success("Payment added successfully", [
            'order'   => $order,
            'payment' => $payment,
        ]);
    }

    // order list
    public function myOrder(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return ApiResponse::error('User is not authenticated.', 401);
        }

        $orders = $user->orders()
            ->with('orderItems', 'payments')
            ->latest()
            ->get();

        if ($orders->isEmpty()) {
            return ApiResponse::success('No orders found.', []);
        }

        return ApiResponse::success('Your orders', $orders);
    }
}
