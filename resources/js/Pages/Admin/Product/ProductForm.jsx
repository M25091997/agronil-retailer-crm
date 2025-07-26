import PageHeader from "@/Components/Admin/PageHeader";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { ArrowRight, ArrowRightSquareIcon } from "lucide-react";
import { useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";

export default function ProductForm({ product = null, categories }) {
    const isEditMode = !!product;
    const [errors, setErrors] = useState({});

    const [form, setForm] = useState({
        name: '',
        category_id: '',

    })
    return (
        <AuthenticatedLayout>
            <PageHeader title="Product Details" />

            <Row>
                <Card>
                    <Card.Header>    {isEditMode ? 'Update' : 'Add New'} Product </Card.Header>
                    <Card.Body>
                        <h6 className="text-info mb-3"> Basic Information </h6>
                        <Row>
                            <Col md={4}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Product Name</Form.Label> <span class="text-danger">*</span>
                                    <Form.Control type="text" name="name" placeholder="" autocomplete="off" required="required" />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Product SKU Id</Form.Label> <span class="text-danger">*</span>
                                    <Form.Control type="text" name="name" placeholder="" autocomplete="off" required="required" />
                                </Form.Group>

                            </Col>

                            <Col md={4}>
                                <Form.Group className="mb-3" controlId="category_id">
                                    <Form.Label>Select Category</Form.Label> <span class="text-danger">*</span>
                                    <Form.Select aria-label="Default select example" name="category_id" value={form.category_id || ''} onChange={(e) => setForm({ ...form, category_id: e.target.value })}>
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
                                    <Form.Select aria-label="Default select example" name="category_id" value={form.category_id || ''} onChange={(e) => setForm({ ...form, category_id: e.target.value })}>
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
                                    <Form.Label>Select Brand</Form.Label>
                                    <Form.Select aria-label="Default select example" name="category_id" value={form.category_id || ''} onChange={(e) => setForm({ ...form, category_id: e.target.value })}>
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
                                    <Form.Label>Select Disease</Form.Label>
                                    <Form.Select aria-label="Default select example" name="category_id" value={form.category_id || ''} onChange={(e) => setForm({ ...form, category_id: e.target.value })}>
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
                                    <Form.Label>Select Product Type</Form.Label>
                                    <Form.Select aria-label="Default select example" name="category_id" value={form.category_id || ''} onChange={(e) => setForm({ ...form, category_id: e.target.value })}>
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
                        </Row>
                        <hr></hr>
                        <Row>
                            <h6 className="text-info mb-2 mt-3">Product Details</h6>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Product Specification</Form.Label>
                                    <Form.Control as="textarea" name="description" value={form.description || ''} rows={3} onChange={(e) => setForm({ ...form, description: e.target.value })}> </Form.Control>
                                    {errors.description && <div className="text-danger">{errors.description}</div>}
                                </Form.Group>

                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Product Description</Form.Label>
                                    <Form.Control as="textarea" name="description" value={form.description || ''} rows={3} onChange={(e) => setForm({ ...form, description: e.target.value })}> </Form.Control>
                                    {errors.description && <div className="text-danger">{errors.description}</div>}
                                </Form.Group>

                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Other Information</Form.Label>
                                    <Form.Control as="textarea" name="description" value={form.description || ''} rows={3} onChange={(e) => setForm({ ...form, description: e.target.value })}> </Form.Control>
                                    {errors.description && <div className="text-danger">{errors.description}</div>}
                                </Form.Group>

                            </Col>
                        </Row>

                        <hr></hr>
                        <h6 className="text-info mb-2 mt-3">Product Price</h6>
                        <Row>

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
                                    <Form.Label>Unit Value</Form.Label> <span class="text-danger">*</span>
                                    <Form.Control type="text" name="name" placeholder="" autocomplete="off" required="required" />
                                </Form.Group>
                            </Col>


                            <Col md={3}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Mrp</Form.Label> <span class="text-danger">*</span>
                                    <Form.Control type="text" name="name" placeholder="" autocomplete="off" required="required" />
                                </Form.Group>
                            </Col>

                            <Col md={3}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Price</Form.Label> <span class="text-danger">*</span>
                                    <Form.Control type="text" name="name" placeholder="" autocomplete="off" required="required" />
                                </Form.Group>
                            </Col>


                        </Row>
                        <Row>

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
                                    <Form.Label>Unit Value</Form.Label> <span class="text-danger">*</span>
                                    <Form.Control type="text" name="name" placeholder="" autocomplete="off" required="required" />
                                </Form.Group>
                            </Col>


                            <Col md={3}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Mrp</Form.Label> <span class="text-danger">*</span>
                                    <Form.Control type="text" name="name" placeholder="" autocomplete="off" required="required" />
                                </Form.Group>
                            </Col>

                            <Col md={3}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Price</Form.Label> <span class="text-danger">*</span>
                                    <Form.Control type="text" name="name" placeholder="" autocomplete="off" required="required" />
                                </Form.Group>
                            </Col>


                        </Row>




                    </Card.Body>
                </Card>
            </Row>
        </AuthenticatedLayout>
    )
}