<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;


class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Category/CategoryList', [
            'categories' => Category::latest()->get(),

        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Category/CategoryForm');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'        => 'required|string|max:255',
            'image'        => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:6048',
            'description' => 'nullable|string',
            'is_active' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        // If passed validation, save the category
        $category = new Category();
        $category->name = $request->name;
        $category->user_id = auth()->user()->id;

        // $category->slug = $this->generateUniqueSlug($request->name);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('uploads/categories'), $filename);
            $category->image = 'uploads/categories/' . $filename;
        }

        $category->description = $request->description ?? '';
        $category->is_active = $request->has('is_active') ? true : false;
        $category->save();

        return response()->json(['message' => 'Category created successfully.'], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        return Inertia::render('Admin/Category/CategoryForm', [
            'category' => $category,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        $validator = Validator::make($request->all(), [
            'name'        => 'required|string|max:255',
            'image'       => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:6048',
            'description' => 'nullable|string',
            'is_active'   => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $validator->validated();

        // Handle image upload if a new image is submitted
        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('uploads/categories');
        }

        $category->update($data);

        return response()->json([
            'message' => 'Category updated successfully.',
            'category' => $category
        ]);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        // Optional: delete image file too if stored
        if ($category->image && Storage::exists($category->image)) {
            Storage::delete($category->image);
        }

        $category->delete();

        return response()->json(['message' => 'Category deleted successfully.']);
    }
}
