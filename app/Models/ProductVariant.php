<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductVariant extends Model
{
    protected $fillable = ['product_id', 'unit_type_id', 'unit_type', 'base_unit_id', 'base_unit', 'quantity', 'price', 'original_price', 'unit_rate', 'discount', 'stock', 'is_bulk', 'is_active', 'user_id'];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function bulkPrices()
    {
        return $this->hasMany(ProductBulkPrice::class, 'product_variant_id');
    }
    public function bulk()
    {
        return $this->hasMany(ProductBulkPrice::class);
    }
}
