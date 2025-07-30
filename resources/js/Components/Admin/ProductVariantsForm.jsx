import { Plus, Trash2 } from 'lucide-react';
import { Row, Col, Form, Button } from 'react-bootstrap';

function ProductVariantsForm({ variants, onChange }) {
    const handleVariantChange = (index, key, value) => {
        const updated = [...variants];
        updated[index][key] = value;
        onChange(updated);
    };

    const handleBulkChange = (variantIndex, bulkIndex, key, value) => {
        const updated = [...variants];
        updated[variantIndex].bulk[bulkIndex][key] = value;
        onChange(updated);
    };

    const addVariant = () => {
        const updated = [
            ...variants,
            {
                base_unit_id: '',
                quantity: '',
                price: '',
                original_price: '',
                unit_rate: '',
                stock: '',
                is_bulk: false,
                bulk: [
                    {
                        pieces_per_box: '',
                        bulk_qty_range: '',
                        bulk_price: '',
                        total_box_price: '',
                        margin: '',
                        bulk_stock: '',
                        best_value: false,
                    },
                ],
            },
        ];
        onChange(updated);
    };

    const addBulkRow = (variantIndex) => {
        const updated = [...variants];
        updated[variantIndex].bulk.push({
            pieces_per_box: '',
            bulk_qty_range: '',
            bulk_price: '',
            total_box_price: '',
            margin: '',
            bulk_stock: '',
            best_value: false,
        });
        onChange(updated);
    };

    const deleteBulkRow = (variantIndex, bulkIndex) => {
        const updated = [...variants];
        if (updated[variantIndex].bulk.length > 1) {
            updated[variantIndex].bulk.splice(bulkIndex, 1);
            onChange(updated);
        }
    };

    return (
        <>
            {variants.map((variant, variantIndex) => (
                <div key={variantIndex} className="mb-4 p-3 border rounded bg-light">
                    <Row>
                        <Col md={2}>
                            <Form.Group>
                                <Form.Label>Select Base Unit</Form.Label>
                                <Form.Select
                                    value={variant.base_unit_id}
                                    onChange={(e) =>
                                        handleVariantChange(variantIndex, 'base_unit_id', e.target.value)
                                    }
                                >
                                    <option value="">Choose...</option>
                                    <option value="1">Kg</option>
                                    <option value="2">Pcs</option>
                                    <option value="3">Doz</option>
                                    <option value="4">Gm</option>
                                    <option value="5">NOS</option>
                                    <option value="6">PIC</option>
                                    <option value="7">MUNNA PCS</option>
                                    <option value="8">Ton</option>
                                    <option value="9">Ltr</option>
                                    <option value="10">Ml</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        <Col md={2}>
                            <Form.Group>
                                <Form.Label>Weight or Pcs</Form.Label>
                                <Form.Control
                                    type="text"
                                    autoComplete="off"
                                    value={variant.quantity}
                                    onChange={(e) =>
                                        handleVariantChange(variantIndex, 'quantity', e.target.value)
                                    }
                                />
                            </Form.Group>
                        </Col>

                        <Col md={2}>
                            <Form.Group>
                                <Form.Label>Price per Unit (₹)</Form.Label>
                                <Form.Control
                                    type="text"
                                    autoComplete="off"
                                    value={variant.price}
                                    onChange={(e) =>
                                        handleVariantChange(variantIndex, 'price', e.target.value)
                                    }
                                />
                            </Form.Group>
                        </Col>

                        <Col md={2}>
                            <Form.Group>
                                <Form.Label>Original Price (₹)</Form.Label>
                                <Form.Control
                                    type="text"
                                    autoComplete="off"
                                    value={variant.original_price}
                                    onChange={(e) =>
                                        handleVariantChange(variantIndex, 'original_price', e.target.value)
                                    }
                                />
                            </Form.Group>
                        </Col>

                        <Col md={2}>
                            <Form.Group>
                                <Form.Label>KG Rate (₹/L or ₹/KG)</Form.Label>
                                <Form.Control
                                    type="text"
                                    autoComplete="off"
                                    placeholder="Auto: Price/weight × 1000"
                                    value={variant.unit_rate}
                                    onChange={(e) =>
                                        handleVariantChange(variantIndex, 'unit_rate', e.target.value)
                                    }
                                />
                            </Form.Group>
                        </Col>

                        <Col md={2}>
                            <Form.Check
                                label="Available in Bulk"
                                checked={variant.is_bulk}
                                onChange={(e) =>
                                    handleVariantChange(variantIndex, 'is_bulk', e.target.checked)
                                }
                            />
                        </Col>
                    </Row>

                    {variant.is_bulk &&
                        variant.bulk.map((bulkRow, bulkIndex) => (
                            <Row key={bulkIndex} className="pt-3">
                                <h6 className="text-info mb-2 mt-3">🧮 Bulk Pricing</h6>
                                <Col md={2}>
                                    <Form.Group>
                                        <Form.Label>No. of Pieces/Box</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={bulkRow.pieces_per_box}
                                            onChange={(e) =>
                                                handleBulkChange(
                                                    variantIndex,
                                                    bulkIndex,
                                                    'pieces_per_box',
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </Form.Group>
                                </Col>

                                <Col md={2}>
                                    <Form.Group>
                                        <Form.Label>Bulk Qty Range</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={bulkRow.bulk_qty_range}
                                            onChange={(e) =>
                                                handleBulkChange(
                                                    variantIndex,
                                                    bulkIndex,
                                                    'bulk_qty_range',
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </Form.Group>
                                </Col>

                                <Col md={2}>
                                    <Form.Group>
                                        <Form.Label>Bulk Price</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={bulkRow.bulk_price}
                                            onChange={(e) =>
                                                handleBulkChange(
                                                    variantIndex,
                                                    bulkIndex,
                                                    'bulk_price',
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </Form.Group>
                                </Col>

                                <Col md={2}>
                                    <Form.Group>
                                        <Form.Label>Total Box Price</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={bulkRow.total_box_price}
                                            onChange={(e) =>
                                                handleBulkChange(
                                                    variantIndex,
                                                    bulkIndex,
                                                    'total_box_price',
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </Form.Group>
                                </Col>

                                <Col md={2}>
                                    <Form.Group>
                                        <Form.Label>Margin (%)</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={bulkRow.margin}
                                            onChange={(e) =>
                                                handleBulkChange(variantIndex, bulkIndex, 'margin', e.target.value)
                                            }
                                        />
                                    </Form.Group>
                                </Col>

                                <Col md={1} className="d-flex align-items-center">
                                    <Form.Check
                                        label="Best Value"
                                        checked={bulkRow.best_value}
                                        onChange={(e) =>
                                            handleBulkChange(
                                                variantIndex,
                                                bulkIndex,
                                                'best_value',
                                                e.target.checked
                                            )
                                        }
                                    />
                                </Col>

                                <Col md={1} className="d-flex gap-1 mt-4">
                                    <Button
                                        variant="warning"
                                        className="btn-sm"
                                        onClick={() => addBulkRow(variantIndex)}
                                    >
                                        <Plus />
                                    </Button>
                                    <Button
                                        variant="danger"
                                        className="btn-sm"
                                        onClick={() => deleteBulkRow(variantIndex, bulkIndex)}
                                        disabled={variant.bulk.length === 1}
                                    >
                                        <Trash2 />
                                    </Button>
                                </Col>
                            </Row>
                        ))}
                </div>
            ))}

            <Row className="mb-3">
                <Col md={2}>
                    <Button
                        variant="info"
                        className="btn-sm waves-effect waves-light mb-3"
                        onClick={addVariant}
                    >
                        <Plus /> Add More Variant
                    </Button>
                </Col>
            </Row>
        </>
    );
}

export default ProductVariantsForm;
