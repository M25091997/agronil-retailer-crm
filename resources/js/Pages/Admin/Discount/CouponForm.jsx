import axiosClient from "@/axiosClient";
import PageHeader from "@/Components/Admin/PageHeader";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { Card, Row, Col, Form, Button, Badge } from "react-bootstrap";
import { toast } from "react-toastify";

export default function CouponForm({ coupon = null, categories }) {
    let isEditMode = !!coupon;

    console.log(coupon)

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
        is_minimum: false,
        order_value: '',
        is_expiry: false,
        expiry_date: '',
        is_limit: false,
        limit: '',
        is_active: true,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return

        try {
            let response;
            if (isEditMode) {
                response = await axiosClient.put(`/admin/discount/coupons/${coupon.id}`, form);
            } else {
                response = await axiosClient.post('/admin/discount/coupons', form);
            }

            toast.success(response.data.message);
            if (!isEditMode) {
                setForm({
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
                    is_minimum: false,
                    order_value: '',
                    is_expiry: false,
                    expiry_date: '',
                    is_limit: false,
                    limit: '',
                    is_active: true,
                });
            }
            router.visit('/admin/discount/coupons');

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

        if (!form.name) temp.name = "Name code is required";
        if (!form.code) temp.code = "Coupan code is required";
        if (!form.discount_type) temp.discount_type = "Discount type is required";
        if (!form.amount) temp.amount = "Discount amount is required";

        setErrors(temp);

        return Object.keys(temp).length === 0;

    }


    useEffect(() => {
        if (isEditMode && coupon) {
            setForm({
                is_category: coupon.is_category,
                category_id: coupon.category_id,
                name: coupon.name,
                title: coupon.title,
                code: coupon.code,
                amount: coupon.amount,
                discount_type: coupon.discount_type,
                is_all: coupon.is_all,
                user_id: coupon.user_id,
                discount_on: coupon.discount_on,
                is_minimum: coupon.is_minimum,
                order_value: coupon.order_value,
                is_expiry: coupon.is_expiry,
                expiry_date: coupon.expiry_date,
                is_limit: coupon.is_limit,
                limit: coupon.limit,
                is_active: coupon.is_active,
            });

            setIsAll(coupon.is_all)
            setIsLimit(coupon.is_limit)
            setIsExpire(coupon.is_expiry)
            setIsMinimum(coupon.is_minimum)
            setIsCategory(coupon.is_category)

        }

    }, [coupon, isEditMode])


    const [isAll, setIsAll] = useState(true);
    const [isLimit, setIsLimit] = useState(false);
    const [isExpire, setIsExpire] = useState(false);
    const [isMinimum, setIsMinimum] = useState(false);
    const [isCategory, setIsCategory] = useState(false);



    return (
        <AuthenticatedLayout>
            <PageHeader title="Discount Coupon" menu="Offer & Discount" />
            <Row>
                <Col sm={5}>
                    <Card>
                        <Card.Header> {isEditMode ? 'Update' : 'Add New'} Coupon</Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" name="name" value={form.name || ''} placeholder="" onChange={(e) => setForm({ ...form, name: e.target.value })} />
                                    {errors.name && <div className="text-danger">{errors.name}</div>}
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control type="text" name="title" value={form.title || ''} placeholder="" onChange={(e) => setForm({ ...form, title: e.target.value })} />
                                    {errors.title && <div className="text-danger">{errors.title}</div>}
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Discount Code </Form.Label>
                                    <Form.Control type="text" name="code " value={form.code || ''} placeholder="" onChange={(e) => setForm({ ...form, code: e.target.value })} />
                                    {errors.code && <div className="text-danger">{errors.code}</div>}
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Discount type</Form.Label>
                                    <Form.Select aria-label="Default select example" name="discount_type" value={form.discount_type || ''} onChange={(e) => setForm({ ...form, discount_type: e.target.value })}>
                                        <option value="">Choose...</option>
                                        <option value="flat">Flat Amount</option>
                                        <option value="percentage">Percentage Amount</option>
                                    </Form.Select>
                                    {errors.discount_type && <div className="text-danger">{errors.discount_type}</div>}
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Discount</Form.Label>
                                    <Form.Control type="text" name="amount" value={form.amount || ''} placeholder="Enter discount value" onChange={(e) => setForm({ ...form, amount: e.target.value })} />
                                    {errors.amount && <div className="text-danger">{errors.amount}</div>}
                                </Form.Group>

                                <Form.Check
                                    className="mb-3"
                                    type="checkbox"
                                    id="is_all"
                                    checked={isAll} // controlled component
                                    onChange={(e) => {
                                        let checked = e.target.checked;
                                        setIsAll(checked);
                                        setForm({ ...form, is_all: checked });
                                    }}
                                    label="Is all users"
                                />

                                <Form.Check
                                    className="mb-3"
                                    type="checkbox"
                                    id="is_limit"
                                    checked={isLimit} // controlled component
                                    onChange={(e) => {
                                        let checked = e.target.checked;
                                        setIsLimit(checked);
                                        setForm({ ...form, is_limit: checked });
                                    }}
                                    label="Is limited users"
                                />

                                {isLimit && (
                                    <Form.Group className="mb-3">
                                        <Form.Label>Limit</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="limit"
                                            value={form.limit || ''}
                                            placeholder=""
                                            onChange={(e) => setForm({ ...form, limit: e.target.value })}
                                        />
                                        {errors.limit && <div className="text-danger">{errors.limit}</div>}
                                    </Form.Group>
                                )}
                                <Form.Check
                                    className="mb-3"
                                    type="checkbox"
                                    id="is_expiry"
                                    checked={isExpire} // controlled component
                                    onChange={(e) => {
                                        let checked = e.target.checked;
                                        setIsExpire(checked);
                                        setForm({ ...form, is_expiry: checked });
                                    }}
                                    label="Is Expire Date"
                                />


                                {isExpire && (
                                    <Form.Group className="mb-3">
                                        <Form.Label>Expiry Date</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="expiry_date"
                                            value={form.expiry_date || ''}
                                            placeholder=""
                                            onChange={(e) => setForm({ ...form, expiry_date: e.target.value })}
                                        />
                                        {errors.expiry_date && <div className="text-danger">{errors.expiry_date}</div>}
                                    </Form.Group>
                                )}


                                <Form.Check
                                    className="mb-3"
                                    type="checkbox"
                                    id="is_minimum"
                                    checked={isMinimum} // controlled component
                                    onChange={(e) => {
                                        let checked = e.target.checked;
                                        setIsMinimum(checked);
                                        setForm({ ...form, is_minimum: checked });
                                    }}
                                    label="Is Minimum Order"
                                />


                                {isMinimum && (
                                    <Form.Group className="mb-3">
                                        <Form.Label>Order Value</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="order_value"
                                            value={form.order_value || ''}
                                            placeholder=""
                                            onChange={(e) => setForm({ ...form, order_value: e.target.value })}
                                        />
                                        {errors.order_value && <div className="text-danger">{errors.order_value}</div>}
                                    </Form.Group>
                                )}
                                <Form.Check
                                    className="mb-3"
                                    type="checkbox"
                                    id="is_category"
                                    checked={isCategory} // controlled component
                                    onChange={(e) => {
                                        let checked = e.target.checked;
                                        setIsCategory(checked);
                                        setForm({ ...form, is_category: checked });
                                    }}
                                    label="Is specific category"
                                />


                                {isCategory && (
                                    <Form.Group className="mb-3">
                                        <Form.Label>Select category</Form.Label>
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
                                )}


                                <Form.Group className="mb-3">
                                    <Form.Label>Discount On</Form.Label>
                                    <Form.Select
                                        aria-label="Default select example"
                                        name="discount_on"
                                        value={form.discount_on || ''}
                                        onChange={(e) => setForm({ ...form, discount_on: e.target.value })}
                                    >
                                        <option value="">Choose...</option>
                                        <option value="all">All Order</option>
                                        <option value="varient">Varient Order</option>
                                        <option value="bulk">Bulk Order</option>
                                    </Form.Select>

                                    {errors.discount_on && (
                                        <div className="text-danger">{errors.discount_on}</div>
                                    )}
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

                                <Link href="/admin/discount/coupons"> <Button type="button" variant="danger"
                                    className="btn btn-sm waves-effect waves-light  mb-3"> Back</Button>
                                </Link>
                            </Form>

                        </Card.Body>
                    </Card>
                </Col>


            </Row>
        </AuthenticatedLayout>
    )
}