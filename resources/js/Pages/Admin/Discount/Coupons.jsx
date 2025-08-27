import axiosClient from "@/axiosClient";
import PageHeader from "@/Components/Admin/PageHeader";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import { Card, Row, Col, Form, Button, Badge } from "react-bootstrap";
import { toast } from "react-toastify";

export default function BaseUnit({ coupons }) {

    const [couponList, setCouponList] = useState(coupons);
    let isEditMode = false;

    const [errors, setErrors] = useState({});

    const [form, setForm] = useState({
        is_category: false,
        category_id: '',
        name: '',
        title: '',
        code: '',
        amount: '',
        discount_type: '',
        is_all: true,
        user_id: '',
        discount_on: '',
        is_minimun: '',
        order_value: '',
        is_expiry: '',
        expiry_date: '',
        is_limit: '',
        limit: '',
        is_active: true,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return

        console.log(form);


        try {
            let response;

            console.log(form);

            if (isEditMode) {
                response = await axiosClient.put(`/admin/base-unit/${form.id}`, form);
            } else {
                response = await axiosClient.post('/admin/base-unit', form);
            }

            toast.success(response.data.message);
            if (!isEditMode) {
                setBaseUnitList([...baseUnitList, response.data.data]);
                setForm({
                    name: '',
                    base_unit: '',
                    is_active: '',
                    unit_type_id: '',
                });
            } else {
                setBaseUnitList(baseUnitList.map(item =>
                    item.id === response.data.data.id ? response.data.data : item
                ));
            }
            // router.visit('/admin/home-banners');

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

        if (!form.code) temp.code = "Coupan code is required";
        if (!form.discount_type) temp.discount_type = "Discount type is required";
        if (!form.amount) temp.amount = "Discount amount is required";

        setErrors(temp);
        return temp;

    }


    const editHandle = (item) => {
        setBaseUnit(item); // sets the item to edit
        setForm({
            ...form,
            id: item.id,
            name: item.name,
            base_unit: item.base_unit,
            unit_type_id: item.unit_type?.id,
            is_active: item.is_active,
        });
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure, you want to delete this?')) return;

        console.log(id);

        try {
            const response = await axiosClient.delete(`admin/base-unit/${id}`);

            if (response.data.status === true) {
                setBaseUnitList(baseUnitList.filter(item => item.id !== id));
                toast.success(response.data?.message);
            }
        } catch (error) {
            console.error('Delete error:', error);
            toast.error(error.response?.data?.message || 'Something went wrong');
        }
    };



    return (
        <AuthenticatedLayout>
            <PageHeader title="Coupan" menu="Offer & Discount" />
            <Row>
                <Col sm={5}>
                    <Card>
                        <Card.Header> {isEditMode ? 'Update' : 'Add New'} Coupan</Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" name="name" value={form.name || ''} placeholder="" onChange={(e) => setForm({ ...form, name: e.target.value })} />
                                    {errors.name && <div className="text-danger">{errors.name}</div>}
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control type="text" name="name" value={form.name || ''} placeholder="" onChange={(e) => setForm({ ...form, name: e.target.value })} />
                                    {errors.name && <div className="text-danger">{errors.name}</div>}
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Discount type</Form.Label>
                                    <Form.Select aria-label="Default select example" name="category_id" value={form.unit_type_id || ''} onChange={(e) => setForm({ ...form, unit_type_id: e.target.value })}>
                                        <option value="">Choose...</option>

                                    </Form.Select>
                                    {errors.unit_type_id && <div className="text-danger">{errors.unit_type_id}</div>}
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Discount</Form.Label>
                                    <Form.Control type="text" name="name" value={form.name || ''} placeholder="" onChange={(e) => setForm({ ...form, name: e.target.value })} />
                                    {errors.name && <div className="text-danger">{errors.name}</div>}
                                </Form.Group>


                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Limit</Form.Label>
                                    <Form.Control type="text" name="base_unit" value={form.base_unit || ''} placeholder="" onChange={(e) => setForm({ ...form, base_unit: e.target.value })} />
                                    {errors.base_unit && <div className="text-danger">{errors.base_unit}</div>}
                                </Form.Group>

                                <Form.Check
                                    className="mb-5"
                                    type="switch"
                                    id="custom-switch"
                                    label="Is Active"
                                    checked={form.is_active}
                                    onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                                />


                                <Button type="submit" variant="success"
                                    className="btn-sm waves-effect waves-light mb-3">
                                    {isEditMode ? 'Update' : 'Create'}
                                </Button>

                                <Link href="/admin/unit-type"> <Button type="button" variant="danger"
                                    className="btn btn-sm waves-effect waves-light  mb-3"> Cancel</Button>
                                </Link>
                            </Form>

                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={7}>
                    <Card>
                        <Card.Header> Coupan List</Card.Header>

                        <Card.Body>
                            <table id="datatable-buttons" className="table table-bordered dt-responsive nowrap w-100">
                                <thead>
                                    <tr>
                                        <th>Sno</th>
                                        <th>Name</th>
                                        <th>Title</th>
                                        <th>Discount Type</th>
                                        <th>Amount</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                            </table>

                        </Card.Body>
                    </Card>

                </Col>

            </Row>
        </AuthenticatedLayout>
    )
}