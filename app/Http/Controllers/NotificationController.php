<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Models\Notification;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Notification/Notification', [
            'users' => User::where('id', '!=', 1)->with("retailer")->get(),
        ]);
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'type'    => 'required|string|in:system,order,payment,shipping,product,offer',
            'title'   => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        $notification = Notification::create([
            'user_id' => $validated['user_id'],
            'type'    => $validated['type'],
            'title'   => $validated['title'],
            'message' => $validated['message'],
            'is_read' => false,
            'data'    => null,
        ]);


        return response()->json([
            'status' => true,
            'message' => 'Notification created successfully',
            'data'    => $notification,
        ], 201);
    }
}
