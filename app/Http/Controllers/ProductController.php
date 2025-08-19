<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Models\BaseUnit;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Disease;
use App\Models\Product;
use App\Models\ProductBulkPrice;
use App\Models\ProductImage;
use App\Models\ProductVariant;
use App\Models\SubCategory;
use App\Models\UnitType;
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
            'products' => Product::with('images')->latest()->get(),

        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Product/ProductForm', [
            'categories' => Category::whereIsActive()->get(),
            'unitTypes' => UnitType::whereIsActive()->get(),
            'baseUnits' => BaseUnit::whereIsActive()->get(),

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

        // return json_decode($validated['product_variant_price']);

        if ($validated['brand_id']) {
            $brand = Brand::find($validated['brand_id'])->value('name');
        }
        if ($validated['disease_id']) {
            $disease = Disease::find($validated['disease_id'])->value('name');
        }

        if ($validated['unit_type_id']) {
            $unitType =  UnitType::find($validated['unit_type_id'])->value('name');
        }

        if ($validated['base_unit_id']) {
            $baseUnit =  BaseUnit::find($validated['base_unit_id'])->value('name');
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
            'unit_type' =>  $unitType ?? '',
            'base_unit_id' => $validated['base_unit_id'],
            'base_unit' =>  $baseUnit ?? '',
            'hsn_code' => $validated['hsn_code'],
            'sort_description' => $validated['sort_description'],
            'description' => $validated['description'],
            'specification' => $validated['specification'],
            'other_information' => $validated['other_information'],
            'is_active' => $request->has("is_active") ? true : false,
        ]);

        // 2. Upload images if any
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                // Store image in 'storage/app/public/products'
                $path = $image->store('uploads/products', 'public');

                ProductImage::create([
                    'product_id' => $product->id,
                    'image_path' => $path,
                ]);
            }
        }

        // 3. Store product variants
        foreach (json_decode($validated['product_variant_price']) as $variant) {
            // return $variant;

            if ($variant->base_unit_id) {
                $baseUnitName =  BaseUnit::find($variant->base_unit_id)->value('name');
            }

            $variantModel = ProductVariant::create([
                'product_id' => $product->id,
                'unit_type_id' =>  $product->unit_type_id,
                'unit_type' =>  $product->unit_type,
                'base_unit_id' => $variant->base_unit_id,
                'base_unit' =>  $baseUnitName,
                'quantity' => $variant->quantity,
                'price' => $variant->price,
                'original_price' => $variant->original_price,
                'unit_rate' => $variant->unit_rate,
                'discount' => $discount ?? 0,
                'stock' =>  0,
                'is_bulk' => $variant->is_bulk,
                'is_active' => true,
            ]);

            // 4. Store bulk prices if present         
            if (!empty($variant->bulk) && $variant->is_bulk) {
                foreach ($variant->bulk as $bulk) {
                    // return  $bulk;
                    ProductBulkPrice::create([
                        'product_variant_id' => $variantModel->id,
                        'product_id' => $product->id,
                        'pieces_per_box' => $bulk->pieces_per_box,
                        'bulk_qty_range' => $bulk->bulk_qty_range,
                        'bulk_price' => $bulk->bulk_price,
                        'total_box_price' => $bulk->total_box_price,
                        'margin' => $bulk->margin,
                        'bulk_stock' => 0,
                        'best_value' => $bulk->best_value ?? false,
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
    public function edit(Product $product)
    {
        $product = Product::with('images', 'variants', 'variants.bulk')->findOrFail($product->id);

        return Inertia::render('Admin/Product/ProductForm', [
            'categories' => Category::whereIsActive()->get(),
            'unitTypes' => UnitType::whereIsActive()->get(),
            'baseUnits' => BaseUnit::whereIsActive()->get(),
            'product' => $product,
        ]);
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
