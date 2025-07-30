<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Disease;
use App\Models\product;
use App\Models\ProductBulkPrice;
use App\Models\ProductImage;
use App\Models\ProductVariant;
use App\Models\SubCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Product/ProductList', [
            'products' => [],

        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Product/ProductForm', [
            'categories' => Category::whereIsActive()->get(),

        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductRequest $request)
    {
        $validated = $request->validated();

        // if ($validated->fails()) {
        //     return response()->json([
        //         'errors' =>  $validated->errors(),
        //         'status' => false,
        //     ], 422);
        // }

        if ($validated['brand_id']) {
            $brand = Brand::find($validated['brand_id'])->value('name');
        }
        if ($validated['disease_id']) {
            $disease = Disease::find($validated['disease_id'])->value('name');
        }

        // 1. Create Product
        $product = Product::create([
            'name' => $validated['name'],
            'category_id' => $validated['category_id'],
            'category' => Category::find($validated['category_id'])->value('name'),
            'sub_category_id' => $validated['sub_category_id'],
            'sub_category' => SubCategory::find($validated['sub_category_id'])->value('name'),
            'brand_id' => $validated['brand_id'],
            'brand' => $brand ?? '',
            'disease_id' => $validated['disease_id'],
            'disease' =>  $disease ?? '',
            'sku' => $validated['sku'],
            'unit_type_id' => $validated['unit_type_id'],
            'base_unit-id' => $validated['base_unit_id'],
            'hsn_code' => $validated['hsn_code'],
            'sort_description' => $validated['sort_description'],
            'description' => $validated['description'],
            'specification' => $validated['specification'],
            'other_information' => $validated['other_information'],
            'is_active' => $validated['is_active'],
        ]);

        // 2. Upload images if any
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('products'); // store in storage/app/products
                ProductImage::create([
                    'product_id' => $product->id,
                    'image_path' => $path,
                ]);
            }
        }

        // 3. Store product variants
        foreach ($validated['product_variant_price'] as $variant) {
            $variantModel = ProductVariant::create([
                'product_id' => $product->id,
                'unit_type_id' => $variant['unit_type_id'],
                'unit_type' => $variant['unit_type'],
                'base_unit_id' => $variant['base_unit_id'],
                'base_unit' => $variant['base_unit'],
                'quantity' => $variant['quantity'],
                'price' => $variant['price'],
                'original_price' => $variant['original_price'],
                'unit_rate' => $variant['unit_rate'],
                'discount' => $discount ?? 0,
                'stock' => $variant['stock'] ?? 0,
                'is_bulk' => $variant['is_bulk'],
                'is_active' => true,
            ]);

            // 4. Store bulk prices if present
            if (!empty($variant['bulk'])) {
                foreach ($variant['bulk'] as $bulk) {
                    ProductBulkPrice::create([
                        'product_variant_id' => $variantModel->id,
                        'product_id' => $product->id,
                        'pieces_per_box' => $bulk['pieces_per_box'],
                        'bulk_qty_range' => $bulk['bulk_qty_range'],
                        'bulk_price' => $bulk['bulk_price'],
                        'total_box_price' => $bulk['total_box_price'],
                        'margin' => $bulk['margin'],
                        'bulk_stock' => $bulk['bulk_stock'],
                        'best_value' => $bulk['best_value'] ?? false,
                        'is_active' => true,
                    ]);
                }
            }
        }

        return response()->json(['message' => 'Product added successfully.']);
    }

    /**
     * Display the specified resource.
     */
    public function show(product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(product $product)
    {
        //
    }
}
