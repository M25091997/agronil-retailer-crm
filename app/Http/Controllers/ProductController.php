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
use Illuminate\Support\Facades\DB;
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

        DB::beginTransaction();
        try {

            if ($validated['brand_id']) {
                $brand = Brand::where('id', $validated['brand_id'])->value('name');
            }
            if ($validated['disease_id']) {
                $disease = Disease::where('id', $validated['disease_id'])->value('name');
            }

            if ($validated['unit_type_id']) {
                $unitType =  UnitType::where('id', $validated['unit_type_id'])->value('name');
            }

            if ($validated['base_unit_id']) {
                $baseUnit =  BaseUnit::where('id', $validated['base_unit_id'])->value('name');
            }

            // 1. Create Product
            $product = Product::create([
                'name' => $validated['name'],
                'category_id' => $validated['category_id'],
                'category' => Category::where('id', $validated['category_id'])->value('name'),
                'sub_category_id' => $validated['sub_category_id'],
                'sub_category' => SubCategory::where('id', $validated['sub_category_id'])->value('name'),
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
                    $baseUnitName =  BaseUnit::where('id', $variant->base_unit_id)->value('name');
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

            DB::commit();

            return response()->json([
                'message' => 'Product added successfully.',
                'status' => true,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => 'Something went wrong!',
                'error' => $e->getMessage(),
            ], 500);
        }
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

    public function update(ProductRequest $request, Product $product)
    {
        $validated = $request->validated();

        DB::beginTransaction();
        try {
            // Get related names
            $brand = $validated['brand_id'] ? Brand::where('id', $validated['brand_id'])->value('name') : null;
            $disease = $validated['disease_id'] ? Disease::where('id', $validated['disease_id'])->value('name') : null;
            $unitType = $validated['unit_type_id'] ? UnitType::where('id', $validated['unit_type_id'])->value('name') : null;
            $baseUnit = $validated['base_unit_id'] ? BaseUnit::where('id', $validated['base_unit_id'])->value('name') : null;

            // 1. Update Product
            $product->update([
                'name' => $validated['name'],
                'category_id' => $validated['category_id'],
                'category' => Category::where('id', $validated['category_id'])->value('name'),
                'sub_category_id' => $validated['sub_category_id'],
                'sub_category' => SubCategory::where('id', $validated['sub_category_id'])->value('name'),
                'brand_id' => $validated['brand_id'],
                'brand' => $brand ?? '',
                'disease_id' => $validated['disease_id'],
                'disease' => $disease ?? '',
                'sku' => $validated['sku'],
                'unit_type_id' => $validated['unit_type_id'],
                'unit_type' => $unitType ?? '',
                'base_unit_id' => $validated['base_unit_id'],
                'base_unit' => $baseUnit ?? '',
                'hsn_code' => $validated['hsn_code'],
                'sort_description' => $validated['sort_description'],
                'description' => $validated['description'],
                'specification' => $validated['specification'],
                'other_information' => $validated['other_information'],
                'is_active' => $request->has("is_active") ? true : false,
            ]);

            // 2. Replace images if new ones uploaded
            if ($request->hasFile('images')) {
                // Delete old images (optional)
                ProductImage::where('product_id', $product->id)->delete();

                foreach ($request->file('images') as $image) {
                    $path = $image->store('uploads/products', 'public');
                    ProductImage::create([
                        'product_id' => $product->id,
                        'image_path' => $path,
                    ]);
                }
            }

            // 3. Remove old variants & bulk prices
            $product->variants()->each(function ($variant) {
                $variant->bulkPrices()->delete();
            });
            $product->variants()->delete();

            // 4. Insert new variants & bulk prices
            foreach (json_decode($validated['product_variant_price']) as $variant) {
                $baseUnitName = $variant->base_unit_id
                    ? BaseUnit::where('id', $variant->base_unit_id)->value('name')
                    : null;

                $variantModel = ProductVariant::create([
                    'product_id' => $product->id,
                    'unit_type_id' => $product->unit_type_id,
                    'unit_type' => $product->unit_type,
                    'base_unit_id' => $variant->base_unit_id,
                    'base_unit' => $baseUnitName,
                    'quantity' => $variant->quantity,
                    'price' => $variant->price,
                    'original_price' => $variant->original_price,
                    'unit_rate' => $variant->unit_rate,
                    'discount' => $variant->discount ?? 0,
                    'stock' => 0,
                    'is_bulk' => $variant->is_bulk,
                    'is_active' => true,
                ]);

                if (!empty($variant->bulk) && $variant->is_bulk) {
                    foreach ($variant->bulk as $bulk) {
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

            DB::commit();

            return response()->json([
                'message' => 'Product updated successfully.',
                'status' => true,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => 'Something went wrong!',
                'error' => $e->getMessage(),
            ], 500);
        }
    }


    public function update_v1(Request $request, Product $product)
    {
        $request->validate([
            'name'        => 'required|string|max:255',
            'code'        => 'required|string|unique:products,code,' . $product->id,
            'price'       => 'required|numeric|min:0',
            'stock'       => 'required|integer|min:0',
            'description' => 'nullable|string',
            'images.*'    => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',

            // Variant validations
            'variants'    => 'nullable|array',
            'variants.*.id'    => 'nullable|exists:product_variants,id',
            'variants.*.color' => 'required_with:variants|string|max:100',
            'variants.*.size'  => 'required_with:variants|string|max:50',
            'variants.*.price' => 'required_with:variants|numeric|min:0',
            'variants.*.stock' => 'required_with:variants|integer|min:0',
            'variants.*.images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        /** -----------------------------
         * 1. Update base product
         * ----------------------------- */
        $product->update($request->except(['images', 'variants']));

        /** -----------------------------
         * 2. Update product images (bulk)
         * ----------------------------- */
        if ($request->hasFile('images')) {
            // Remove old images if you want
            $product->images()->delete();

            foreach ($request->file('images') as $image) {
                $filename = time() . '_' . $image->getClientOriginalName();
                $image->move(public_path('uploads/products'), $filename);

                $product->images()->create([
                    'image_path' => 'uploads/products/' . $filename,
                ]);
            }
        }

        /** -----------------------------
         * 3. Update or add variants
         * ----------------------------- */
        if ($request->has('variants')) {
            foreach ($request->variants as $variantData) {
                if (isset($variantData['id'])) {
                    // Update existing variant
                    $variant = $product->variants()->find($variantData['id']);
                    if ($variant) {
                        $variant->update([
                            'color' => $variantData['color'],
                            'size'  => $variantData['size'],
                            'price' => $variantData['price'],
                            'stock' => $variantData['stock'],
                        ]);

                        // Variant images
                        if (!empty($variantData['images'])) {
                            $variant->images()->delete(); // delete old
                            foreach ($variantData['images'] as $img) {
                                $filename = time() . '_' . $img->getClientOriginalName();
                                $img->move(public_path('uploads/product_variants'), $filename);

                                $variant->images()->create([
                                    'image_path' => 'uploads/product_variants/' . $filename,
                                ]);
                            }
                        }
                    }
                } else {
                    // New variant create
                    $newVariant = $product->variants()->create([
                        'color' => $variantData['color'],
                        'size'  => $variantData['size'],
                        'price' => $variantData['price'],
                        'stock' => $variantData['stock'],
                    ]);

                    if (!empty($variantData['images'])) {
                        foreach ($variantData['images'] as $img) {
                            $filename = time() . '_' . $img->getClientOriginalName();
                            $img->move(public_path('uploads/product_variants'), $filename);

                            $newVariant->images()->create([
                                'image_path' => 'uploads/product_variants/' . $filename,
                            ]);
                        }
                    }
                }
            }
        }

        return response()->json([
            'status'  => true,
            'message' => 'Product updated successfully with variants & images!'
        ]);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(product $product)
    {
        //
    }


    public function active()
    {
        return Inertia::render('Admin/Product/Manage/ActiveProduct', [
            'products' => Product::with('images')->active()->latest()->get(),
        ]);
    }

    public function status(Request $request, Product $product)
    {
        // return $request->all();
        $data = $request->only([
            'top_selling',
            'trending',
            'featured',
            'new_arrival',
            'is_sale',
            'is_active',
        ]);

        $product->update($data);

        return response()->json([
            'status' => true,
            'message' => 'Product status updated successfully!',
            'product' => $product,
        ]);
    }
}
