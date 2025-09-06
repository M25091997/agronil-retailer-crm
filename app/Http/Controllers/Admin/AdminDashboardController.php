<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Retailer;
use App\Models\Product;
use App\Models\Category;
use App\Models\Order;
use App\Models\OrderPayment;

class AdminDashboardController extends Controller
{
    public function getDashboardData()
    {
        return response()->json([
            'approvedRetailers' => Retailer::where('status', 1)->count(),
            'pendingRetailers'  => Retailer::where('status', 0)->count(),
            'totalProducts'     => Product::count(),
            'superCategories'   => Category::count(),
            'OrderAmount' => Order::sum('total_amount'),
            'receivedPayment' => OrderPayment::where('status', 'verified')->sum('amount'),
        ]);
    }
}
