<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\OrderPayment;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ManageOrderController extends Controller
{
    public function getOrderDetils($invoice_no)
    {
        return  Order::with(['user', 'orderItems', 'payments'])->where('invoice_no', $invoice_no)->first();
    }

    public function orders(Request $request)
    {
        $query = Order::with(['user', 'orderItems'])->latest();
        if ($request->has('status') && $request->status === 'pending') {
            $query->where('status', 'Pending');
        }

        $orders = $query->get();

        return Inertia::render('Admin/Order/OrderList', [
            'orders' => $orders,
        ]);
    }

    public function details($invoice_no)
    {
        return Inertia::render('Admin/Order/Details', [
            'order' => $this->getOrderDetils($invoice_no),
        ]);
    }

    public function payments($invoice_no)
    {
        return Inertia::render('Admin/Order/Payments', [
            'order' => $this->getOrderDetils($invoice_no),
        ]);
    }


    public function settlement(Request $request)
    {
        $validated = $request->validate([
            'order_id' => 'required|exists:orders,id',
            'pay_amount' => 'required|numeric|min:1',
            'payment_method' => 'required|string',
            'payment_slip' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
        ]);

        $order = Order::findOrFail($validated['order_id']);

        // New paid amount
        $paidAmount = $validated['pay_amount'];

        $slip = null;
        if ($request->hasFile('payment_slip')) {
            $slip = $request->file('payment_slip')->store('uploads/payment-slip', 'public');
        }

        $payment = OrderPayment::create([
            'order_id'       => $order->id,
            'transaction_no' => rand(100000, 999999),
            'payment_method' => $validated['payment_method'],
            'payment_type'   => $request->payment_type ?? 'credit',
            'amount'         =>  $paidAmount,
            'payment_slip'   => $slip,
            'status'         => 'pending',
        ]);



        // Calculate new paid and due amounts
        $totalPaid = $order->paid_amount + $paidAmount;
        $dueAmount = $order->total_amount - $totalPaid;

        // Payment status logic
        if ($dueAmount == 0) {
            $status = 'Paid';
        } elseif ($totalPaid > 0 && $dueAmount > 0) {
            $status = 'Partial';
        } else {
            $status = 'Pending';
        }

        // Update order
        $order->update([
            'paid_amount' => $totalPaid,
            'due_amount' => $dueAmount,
            'payment_status' => $status,
        ]);

        return ApiResponse::success("Payment settlement created successfully.", $payment);
    }



    public function updateStatus(Request $request, $id)
    {
        $payment = OrderPayment::findOrFail($id);
        $payment->status = $request->status;
        $payment->save();

        return response()->json([
            'status' => true,
            'message' => 'Payment status updated successfully!'
        ]);
    }

    public function updated_payments($order_id)
    {
        $payments =  OrderPayment::where('order_id', $order_id)->get();
        return response()->json([
            'status' => true,
            'payments' =>  $payments
        ]);
    }

    public function reports()
    {
        return Inertia::render('Admin/Order/Reports', [
            'categories' => Category::whereIsActive()->get(),
        ]);
    }

    public function get_reports(Request $request)
    {
        $query = OrderItem::with(['order', 'order.user', 'product']); // eager load product + order

        // Filter by category_id
        if ($request->filled('category_id')) {
            $query->whereHas('product', function ($q) use ($request) {
                $q->where('category_id', $request->category_id);
            });
        }

        // Filter by sub_category_id
        if ($request->filled('sub_category_id')) {
            $query->whereHas('product', function ($q) use ($request) {
                $q->where('sub_category_id', $request->sub_category_id);
            });
        }

        // Filter by brand_id
        if ($request->filled('brand_id')) {
            $query->whereHas('product', function ($q) use ($request) {
                $q->where('brand_id', $request->brand_id);
            });
        }

        // Filter by disease_id
        if ($request->filled('disease_id')) {
            $query->whereHas('product', function ($q) use ($request) {
                $q->where('disease_id', $request->disease_id);
            });
        }

        $reports = $query->get();

        // Calculate total sales
        $totalSales = $reports->sum(function ($item) {
            return $item->price * $item->quantity;
        });

        // Calculate total sales
        $totalItems = $reports->sum(function ($item) {
            return $item->quantity;
        });

        return response()->json([
            'status'      => true,
            'total_sales' => $totalSales,
            'total_items' => $totalItems,
            'orders'      => $reports,
        ]);
    }
}
