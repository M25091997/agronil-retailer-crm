<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BaseUnit extends Model
{
    protected $fillable = ['name', 'base_unit', 'unit_type_id', 'is_active'];

    public function unitType()
    {
        return $this->belongsTo(UnitType::class);
    }

    public function scopeWhereIsActive($query)
    {
        return $query->where('is_active', true);
    }
}
