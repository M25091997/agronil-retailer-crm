import axiosClient from "@/axiosClient";
import PageHeader from "@/Components/Admin/PageHeader";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import { Badge, Button, Card, Col, Form, Row, Table } from "react-bootstrap";
import { toast } from "react-toastify";

export default function RewardSetting({ rewardSettings }) {
    const [isEditMode, setIsEditMode] = useState(false);
    const [settings, setSettings] = useState(rewardSettings);
    const [form, setForm] = useState({
        min_order_amount: '',
        points_per_amount: '',
        redeem_value: '',
        is_active: false,
    })


    const [errors, setErrors] = useState({});

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validate()) return

        console.log(form);

        try {
            let response;

            if (!isEditMode) {
                response = await axiosClient.post('/admin/discount/rewardsetting', form);
            } else {
                response = await axiosClient.put(`/admin/discount/rewardsetting/${form.id}`, form);
            }

            toast.success(response.data.message);
            if (!isEditMode) {
                setSettings([...settings, response.data.data]);
                setForm({
                    min_order_amount: '',
                    points_per_amount: '',
                    redeem_value: '',
                    is_active: false,
                });
            } else {
                setSettings(settings.map(item =>
                    item.id === response.data.data.id ? response.data.data : item
                ));
            }


        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
            if (error.response) {
                console.error('Error response:', error.response.data);
                setErrors(error.response.data.errors || {});
            } else {
                console.error('Unexpected error:', error.message);
            }

        }

    };


    const editHandle = (item) => {
        setIsEditMode(true)
        setForm({
            ...form,
            id: item.id,
            min_order_amount: item.min_order_amount,
            points_per_amount: item.points_per_amount,
            redeem_value: item.redeem_value,
            is_active: item.is_active,
        });
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure, you want to delete this?')) return;

        try {
            const response = await axiosClient.delete(`/admin/discount/rewardsetting/${id}`);

            if (response.data.status === true) {
                setSettings(settings.filter(item => item.id !== id));
                toast.success(response.data?.message);
            }
        } catch (error) {
            console.error('Delete error:', error);
            toast.error(error.response?.data?.message || 'Something went wrong');
        }
    };


    function validate() {
        let temp = {};

        if (!form.min_order_amount) temp.min_order_amount = "Min order amount is required";
        if (!form.points_per_amount) temp.points_per_amount = "Pont per amount is required";
        if (!form.redeem_value) temp.redeem_value = "Redeem or point value is required";

        setErrors(temp);

        return Object.keys(temp).length === 0;

    }



    return (
        <AuthenticatedLayout>
            <PageHeader title={"Redeem settings"} menu={"Offer & Discount"} />
            <Row>
                <Col md={5}>
                    <Card>
                        <Card.Header> {isEditMode ? 'Update' : 'Add New'} Redeem Point</Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Min Order Amount</Form.Label>
                                    <Form.Control type="number" value={form.min_order_amount} placeholder="Minimum order value to earn points" onChange={(e) => setForm({ ...form, min_order_amount: e.target.value })} />
                                    {errors.min_order_amount && <div className="text-danger">{errors.min_order_amount}</div>}
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Pont Per Amount</Form.Label>
                                    <Form.Control type="number" value={form.points_per_amount} placeholder="e.g. 1 point for every 100 spent" onChange={(e) => setForm({ ...form, points_per_amount: e.target.value })} />
                                    {errors.points_per_amount && <div className="text-danger">{errors.points_per_amount}</div>}
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Redeem Value</Form.Label>
                                    <Form.Control type="number" value={form.redeem_value} placeholder="e.g. 1 point = 1 ₹" onChange={(e) => setForm({ ...form, redeem_value: e.target.value })} />
                                    {errors.redeem_value && <div className="text-danger">{errors.redeem_value}</div>}
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

                                <Link href="/admin/discount/rewardsetting"> <Button type="button" variant="danger"
                                    className="btn btn-sm waves-effect waves-light  mb-3"> Cancel </Button>
                                </Link>

                            </Form>
                        </Card.Body>

                    </Card>

                </Col>
                <Col md={7}>
                    <Card>
                        <Card.Header>Added Setting</Card.Header>
                        <Card.Body>
                            <Table id="datatable-buttons" className="table table-bordered dt-responsive nowrap w-100">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Min Order</th>
                                        <th>Pont Per Amount</th>
                                        <th>Redeem Value</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {settings.map((setting) => (
                                        <tr key={setting.id}>
                                            <td>{new Date(setting.created_at).toLocaleDateString()}</td>
                                            <td>{setting.min_order_amount}</td>
                                            <td>{setting.points_per_amount}</td>
                                            <td>{setting.redeem_value}</td>
                                            <td> <Badge bg={setting.is_active ? 'success' : 'secondary'}>{setting.is_active ? 'Active' : 'Disabled'}</Badge></td>
                                            <td>
                                                <button className="btn btn-sm btn-primary me-1" onClick={() => editHandle(setting)}>Edit</button>
                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => handleDelete(setting.id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>

                                        </tr>

                                    ))}

                                </tbody>
                            </Table>
                        </Card.Body>

                    </Card>


                </Col>

            </Row>

        </AuthenticatedLayout>
    )
}