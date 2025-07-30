import axiosClient from "@/axiosClient";
import PageHeader from "@/Components/Admin/PageHeader";
import ProductVariantsForm from "@/Components/Admin/ProductVariantsForm";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
// import { ArrowRight, ArrowRightSquareIcon, Plus } from "lucide-react";
import { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
// import Nav from 'react-bootstrap/Nav';

export default function ProductForm({ product = null, categories }) {
    const isEditMode = !!product;
    const [errors, setErrors] = useState({});

    const [subCategories, setSubCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [diseases, setDiseases] = useState([]);

    const [form, setForm] = useState({
        name: '',
        category_id: '',
        sub_category_id: '',
        brand_id: '',
        disease_id: '',
        sku: '',
        unit_type_id: '',
        base_unit_id: '',
        images: null,
        hsn_code: '',
        sort_description: '',
        description: '',
        specification: '',
        other_information: '',
        is_active: false,
        product_variant_price: [],
    });

    const handleVariantChange = (variants) => {
        setForm({ ...form, product_variant_price: variants });
    };


    const handleCategoryChange = async (e) => {
        const categoryId = e.target.value;
        setForm((prev) => ({
            ...prev,
            category_id: categoryId,
            sub_category_id: '',
            brand_id: '',
            disease_id: ''
        }));

        try {
            const response = await axiosClient.get(`/admin/category/dependencies/${categoryId}`);
            setSubCategories(response.data.subcategories);
            setBrands(response.data.brands);
            setDiseases(response.data.diseases);
        } catch (error) {
            console.error("Error loading dependencies:", error);
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return

        const formData = new FormData();

        for (let key in form) {
            if (key === 'product_variant_price') {
                formData.append(key, JSON.stringify(form[key]));
            } else if (key === 'images' && form[key]) {
                for (let i = 0; i < form[key].length; i++) {
                    formData.append('images[]', form[key][i]);
                }
            } else {
                formData.append(key, form[key]);
            }
        }
        // Append image files if multiple
        if (form.images && form.images.length > 0) {
            for (let i = 0; i < form.images.length; i++) {
                formData.append('images[]', form.images[i]);
            }
        }
        formData.append('product_variant_price', JSON.stringify(form.product_variant_price));

        console.log(form.product_variant_price);

        try {
            let response;

            if (isEditMode) {
                formData.append('_method', 'PUT');
                response = await axiosClient.post(`/admin/products/${category.id}`, formData);
            } else {
                response = await axiosClient.post('/admin/products', formData);
            }

            toast.success(response.data.message);
            if (!isEditMode) {
                setForm({
                    name: '',
                    image: null,
                    description: '',
                    is_active: '',
                });

                // Reset file input
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            }

            // router.visit('/admin/categories'); // redirect to list


        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
            if (error.response) {
                console.error('Error response:', error.response.data);
                setErrors(error.response.data.errors || {});
            } else {
                console.error('Unexpected error:', error.message);
            }
        }

    }

    function validate() {
        let temp = {};

        if (!form.name) temp.name = 'Product name is required.';
        if (!form.sku) temp.sku = 'Product sku is required.';
        // if (!form.sort_description) temp.sort_description = 'Product sort description is required.';
        if (!form.category_id) temp.category_id = 'Product category is required.';
        if (!form.sub_category_id) temp.sub_category_id = 'Product sub category is required.';
        if (!isEditMode && !form.images) temp.images = 'Product images is required.';

        setErrors(temp);
        return temp;
    }


    return (
        <AuthenticatedLayout>
            <PageHeader title="Product Details" />

            <Row>
                <Card>
                    <Card.Header>    {isEditMode ? 'Update' : 'Add New'} Product </Card.Header>
                    <Card.Body>
                        <Form onSubmit={handleSubmit} encType="multipart/form-data">
                            <h6 className="text-info mb-3"> Basic Information </h6>
                            <Row>
                                <Col md={4}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Product Name</Form.Label> <span class="text-danger">*</span>
                                        <Form.Control type="text" name="name" placeholder="" autocomplete="off" onChange={(e) => setForm({ ...form, name: e.target.value })} />
                                        {errors.name && <div className="text-danger">{errors.name}</div>}
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Short Description</Form.Label>
                                        <Form.Control as="textarea" name="sort_description" value={form.sort_description || ''} rows={3} onChange={(e) => setForm({ ...form, sort_description: e.target.value })}> </Form.Control>
                                        {errors.sort_description && <div className="text-danger">{errors.sort_description}</div>}
                                    </Form.Group>

                                </Col>
                                <Col md={4}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Product SKU Id</Form.Label> <span class="text-danger">*</span>
                                        <Form.Control type="text" name="sku" value={form.sku || ''} placeholder="" autocomplete="off" onChange={(e) => setForm({ ...form, sku: e.target.value })} />
                                        {errors.sku && <div className="text-danger">{errors.sku}</div>}
                                    </Form.Group>
                                </Col>

                                <Col md={4}>
                                    <Form.Group className="mb-3" controlId="category_id">
                                        <Form.Label>Select Category</Form.Label> <span class="text-danger">*</span>
                                        {/* <Form.Select aria-label="Default select example" name="category_id" value={form.category_id || ''} onChange={(e) => setForm({ ...form, category_id: e.target.value })}> */}
                                        <Form.Select aria-label="Default select example" name="category_id" value={form.category_id || ''} onChange={handleCategoryChange}>
                                            <option value="">Choose...</option>
                                            {categories.map(item => (
                                                <option key={item.id} value={item.id}>
                                                    {item.name}
                                                </option>
                                            ))}
                                        </Form.Select>
                                        {errors.category_id && <div className="text-danger">{errors.category_id}</div>}
                                    </Form.Group>
                                </Col>

                                <Col md={4}>
                                    <Form.Group className="mb-3" controlId="category_id">
                                        <Form.Label>Select Sub Category</Form.Label> <span class="text-danger">*</span>
                                        <Form.Select aria-label="Default select example" name="category_id" value={form.sub_category_id || ''} onChange={(e) => setForm({ ...form, sub_category_id: e.target.value })}>
                                            <option value="">Choose...</option>
                                            {subCategories.map(sub => (
                                                <option key={sub.id} value={sub.id}>{sub.name}</option>
                                            ))}
                                        </Form.Select>
                                        {errors.sub_category_id && <div className="text-danger">{errors.sub_category_id}</div>}
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group className="mb-3" controlId="category_id">
                                        <Form.Label>Select Brand (Optinal)</Form.Label>
                                        <Form.Select aria-label="Default select example" name="brand_id" value={form.brand_id || ''} onChange={(e) => setForm({ ...form, brand_id: e.target.value })}>
                                            <option value="">Choose...</option>
                                            {brands.map(brand => (
                                                <option key={brand.id} value={brand.id}>{brand.name}</option>
                                            ))}
                                        </Form.Select>
                                        {errors.brand_id && <div className="text-danger">{errors.brand_id}</div>}
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group className="mb-3" controlId="category_id">
                                        <Form.Label>Select Disease (Optinal)</Form.Label>
                                        <Form.Select aria-label="Default select example" name="disease_id" value={form.disease_id || ''} onChange={(e) => setForm({ ...form, disease_id: e.target.value })}>
                                            <option value="">Choose...</option>
                                            {diseases.map(dis => (
                                                <option key={dis.id} value={dis.id}>{dis.name}</option>
                                            ))}
                                        </Form.Select>
                                        {errors.disease_id && <div className="text-danger">{errors.disease_id}</div>}
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group className="mb-3" controlId="category_id">
                                        <Form.Label>Select Unit Type</Form.Label>
                                        <Form.Select aria-label="Default select example" name="unit_type" value={form.unit_type_id || ''} onChange={(e) => setForm({ ...form, unit_type: e.target.value })}>
                                            <option value="">Choose...</option>
                                            {categories.map(item => (
                                                <option key={item.id} value={item.id}>
                                                    {item.name}
                                                </option>
                                            ))}
                                        </Form.Select>
                                        {errors.unit_type && <div className="text-danger">{errors.unit_type}</div>}
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group className="mb-3" controlId="category_id">
                                        <Form.Label>Select Base Unit</Form.Label>
                                        <Form.Select aria-label="Default select example" name="base_unit" value={form.base_unit_id || ''} onChange={(e) => setForm({ ...form, base_unit: e.target.value })}>
                                            <option value="">Choose...</option>
                                            {categories.map(item => (
                                                <option key={item.id} value={item.id}>
                                                    {item.name}
                                                </option>
                                            ))}
                                        </Form.Select>
                                        {errors.base_unit && <div className="text-danger">{errors.base_unit}</div>}
                                    </Form.Group>
                                </Col>
                                <Col md={3}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Product Image (Can select more then one)</Form.Label> <span class="text-danger">*</span>
                                        <Form.Control type="file" name="images[]" placeholder="" autocomplete="off" multiple onChange={(e) => setForm({ ...form, images: e.target.files })} />
                                    </Form.Group>
                                    {errors.images && <div className="text-danger">{errors.images}</div>}
                                </Col>
                                <Col md={3}>
                                    <Form.Group className="mb-3" controlId="exampleForm.hsn_code">
                                        <Form.Label>HSN Code (optional)</Form.Label>
                                        <Form.Control type="text" name="hsn_code" placeholder="" autocomplete="off" value={form.hsn_code || ''} onChange={(e) => setForm({ ...form, hsn_code: e.target.value })} />
                                        {errors.hsn_code && <div className="text-danger">{errors.hsn_code}</div>}
                                    </Form.Group>
                                </Col>
                            </Row>
                            <hr></hr>
                            <Row>
                                <h6 className="text-info mb-2 mt-3">Product Details</h6>
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Product Specification</Form.Label>
                                        <Form.Control as="textarea" name="specification" value={form.specification || ''} rows={3} onChange={(e) => setForm({ ...form, specification: e.target.value })}> </Form.Control>
                                        {errors.specification && <div className="text-danger">{errors.specification}</div>}
                                    </Form.Group>

                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Product Detailed  Description</Form.Label>
                                        <Form.Control as="textarea" name="description" value={form.description || ''} rows={3} onChange={(e) => setForm({ ...form, description: e.target.value })}> </Form.Control>
                                        {errors.description && <div className="text-danger">{errors.description}</div>}
                                    </Form.Group>

                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Other Information</Form.Label>
                                        <Form.Control as="textarea" name="other_information" value={form.other_information || ''} rows={3} onChange={(e) => setForm({ ...form, other_information: e.target.value })}> </Form.Control>
                                        {errors.other_information && <div className="text-danger">{errors.other_information}</div>}
                                    </Form.Group>

                                </Col>
                            </Row>

                            <hr></hr>
                            <h6 className="text-info mb-2 mt-3">📦 Product Variant & Pricing</h6>
                            {/* <Row>

                            <Col md="3">
                                <Form.Group className="mb-3" controlId="category_id">
                                    <Form.Label>Select Unit</Form.Label>
                                    <Form.Select aria-label="Default select example" name="category_id" value={form.category_id || ''} onChange={(e) => setForm({ ...form, category_id: e.target.value })}>
                                        <option value="" >Choose...</option>
                                        <option value="1">Kg</option>
                                        <option value="2">Pcs</option>
                                        <option value="3">Doz</option>
                                        <option value="4">Gm</option>
                                        <option value="5">NOS</option>
                                        <option value="6">PIC</option>
                                        <option value="7">MUNNA PCS</option>
                                        <option value="19">Ton</option>
                                        <option value="51">ltr.</option>
                                    </Form.Select>
                                    {errors.category_id && <div className="text-danger">{errors.category_id}</div>}
                                </Form.Group>
                            </Col>


                            <Col md={3}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Quantity or Weight</Form.Label> <span class="text-danger">*</span>
                                    <Form.Control type="text" name="name" placeholder="e.g., 50 ml" autocomplete="off"  />
                                </Form.Group>
                            </Col>

                            <Col md={3}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Unit Value</Form.Label> <span class="text-danger">*</span>
                                    <Form.Control type="text" name="name" placeholder="" autocomplete="off"  />
                                </Form.Group>
                            </Col>


                            <Col md={3}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>MRP (₹)</Form.Label> <span class="text-danger">*</span>
                                    <Form.Control type="text" name="name" placeholder="" autocomplete="off"  />
                                </Form.Group>
                            </Col>

                            <Col md={3}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Selling Price (₹)</Form.Label> <span class="text-danger">*</span>
                                    <Form.Control type="text" name="name" placeholder="" autocomplete="off"  />
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Price/Unit (₹/L or ₹/KG)</Form.Label> <span class="text-danger">*</span>
                                    <Form.Control type="text" name="name" placeholder="" autocomplete="off" />
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Box Qty</Form.Label> <span class="text-danger">*</span>
                                    <Form.Control type="text" name="name" placeholder="" autocomplete="off" />
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Total Box Price</Form.Label> <span class="text-danger">*</span>
                                    <Form.Control type="text" name="name" placeholder="" autocomplete="off" />
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Bulk Price (Optional)</Form.Label> <span class="text-danger">*</span>
                                    <Form.Control type="text" name="name" placeholder="" autocomplete="off" />
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Bulk Range (Optional)</Form.Label> <span class="text-danger">*</span>
                                    <Form.Control type="text" name="name" placeholder="" autocomplete="off" />
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Best Value</Form.Label> <span class="text-danger">*</span>
                                    <Form.Control type="checkbox" name="best_value" placeholder="" autocomplete="off" />
                                </Form.Group>
                            </Col>


                        </Row> */}



                            {/* Pass current variant data and update method */}
                            {/* <ProductVariantsForm
                                variants={form.product_variant_price}
                                onChange={handleVariantChange}
                            /> */}

                            <ProductVariantsForm
                                variants={form.product_variant_price}
                                onChange={(variants) =>
                                    setForm({ ...form, product_variant_price: variants })
                                }
                            />



                            {/* 
                        <Row>

                            <Col md="2">
                                <Form.Group className="mb-3" controlId="category_id">
                                    <Form.Label>Select Base Unit</Form.Label>
                                    <Form.Select aria-label="Default select example" name="category_id" value={form.category_id || ''} onChange={(e) => setForm({ ...form, category_id: e.target.value })}>
                                        <option value="" >Choose...</option>
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
                                    {errors.category_id && <div className="text-danger">{errors.category_id}</div>}
                                </Form.Group>
                            </Col>


                            <Col md={2}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Weight or Pcs </Form.Label> <span class="text-danger">*</span>
                                    <Form.Control type="text" name="name" placeholder="" autocomplete="off"  />
                                </Form.Group>
                            </Col>
                            <Col md={2}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Price per Unit (₹) </Form.Label> <span class="text-danger">*</span>
                                    <Form.Control type="text" name="name" placeholder="" autocomplete="off"  />
                                </Form.Group>
                            </Col>


                            <Col md={2}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Original Price (₹)</Form.Label> <span class="text-danger">*</span>
                                    <Form.Control type="text" name="name" placeholder="" autocomplete="off"  />
                                </Form.Group>
                            </Col>

                            <Col md={2}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>KG Rate (₹/L or ₹/KG)</Form.Label> <span class="text-danger">*</span>
                                    <Form.Control type="text" name="name" placeholder="Auto-calculated	Price/weight × 1000" autocomplete="off"  />
                                </Form.Group>
                            </Col>

                            <Col md={12}>
                                <Form.Group className="mb-3">
                                    <Form.Check
                                        label="This variant avilable in bulk"
                                        feedback="Avilable in bulk"
                                        feedbackType="invalid"
                                        onClick={isAvilableInBulkForm}
                                    />
                                </Form.Group>


                            </Col>

                            {isBulk && (
                                <>
                                    <h6 className="text-info mb-2 mt-3"> 🧮 Bulk Pricing (Optional)</h6>


                                    <Col md={2}>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Label>No. of Pieces/Box</Form.Label> <span class="text-danger">*</span>
                                            <Form.Control type="text" name="name" placeholder="e.g. 30" autocomplete="off"  />
                                        </Form.Group>
                                    </Col>
                                    <Col md={2}>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Label>Bulk Qty Range</Form.Label> <span class="text-danger">*</span>
                                            <Form.Control type="text" name="name" placeholder="" autocomplete="off"  />
                                        </Form.Group>
                                    </Col>

                                    <Col md={2}>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Label>Bulk Price (Optional)</Form.Label> <span class="text-danger">*</span>
                                            <Form.Control type="text" name="name" placeholder="" autocomplete="off"  />
                                        </Form.Group>
                                    </Col>


                                    <Col md={2}>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Label>Total Box Price</Form.Label> <span class="text-danger">*</span>
                                            <Form.Control type="text" name="name" placeholder="Auto unit price × box count" autocomplete="off"  />
                                        </Form.Group>
                                    </Col>
                                    <Col md={2}>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Label>Margin (%)</Form.Label> <span class="text-danger">*</span>
                                            <Form.Control type="text" name="name" placeholder="Auto/Manual" autocomplete="off"  />
                                        </Form.Group>
                                    </Col>
                                    <Col md={1}>
                                        <Form.Group className="mt-10">
                                            <Form.Check
                                                required
                                                label="Best Value Tag"
                                                feedback="Best Value"
                                                feedbackType="invalid"
                                            />
                                        </Form.Group>


                                    </Col>
                                    <Col md={1}>
                                        <Button variant="warning" className="btn-sm"> <Plus /> Add More Bulk</Button>

                                    </Col>

                                </>

                            )}
                            <Row>
                                <Col md={2}>
                                    <Button variant="info" className="btn-sm"><Plus /> Add More Varient</Button>

                                </Col>


                            </Row>





                        </Row> */}


                            <Button type="submit" variant="success"
                                className="btn-sm waves-effect waves-light mb-3">
                                {isEditMode ? 'Update' : 'Save'} Product
                            </Button>

                            <Link href="/admin/home-banners"> <Button type="button" variant="danger"
                                className="btn btn-sm waves-effect waves-light  mb-3"> Cancel</Button>
                            </Link>
                        </Form>
                    </Card.Body>
                </Card>
            </Row>
        </AuthenticatedLayout>
    )
}