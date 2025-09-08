import { useState } from "react";
import {
    Card,
    Form,
    Row,
    Col,
    FloatingLabel,
    Button,
} from "react-bootstrap";
import PageHeader from "@/Components/Admin/PageHeader";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import axiosClient from "@/axiosClient";
import { toast } from "react-toastify";

export default function SendNotificationForm({ users }) {
    const [form, setForm] = useState({
        user_id: "",
        type: "system",
        title: "",
        message: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosClient.post('admin/notifications', form);

            if (response.data.status) {
                toast.success(response.data.message)
                setForm({ user_id: "", type: "system", title: "", message: "" });

            }

        } catch (err) {
            console.error(err);
            toast.error(err.message)

        }
    };

    return (
        <AuthenticatedLayout>
            <PageHeader title="Notification" menu="Notification" />

            <Card className="p-4 mt-6 shadow-sm">
                <Card.Header>Send Notification</Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        {/* User ID */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>
                                Select User
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Select
                                    name="user_id"
                                    value={form.user_id}
                                    onChange={handleChange}
                                    required
                                >
                                    <option>Choose...</option>
                                    {users.map((user) => (
                                        <option key={user.id} value={user.id}>{user.name}, ({user.phone})</option>
                                    ))}


                                </Form.Select>
                            </Col>
                        </Form.Group>

                        {/* Type */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>
                                Type
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Select
                                    name="type"
                                    value={form.type}
                                    onChange={handleChange}
                                    required
                                >

                                    <option value="system">System</option>
                                    <option value="order">Order</option>
                                    <option value="payment">Payment</option>
                                    <option value="shipping">Shipping</option>
                                    <option value="product">Product</option>
                                    <option value="offer">Offers</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>

                        {/* Title */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>
                                Title
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    type="text"
                                    name="title"
                                    placeholder="Enter title"
                                    value={form.title}
                                    onChange={handleChange}
                                    required
                                />
                            </Col>
                        </Form.Group>

                        {/* Message */}
                        <Row className="mb-3">
                            <Form.Label column sm={2}>
                                Message
                            </Form.Label>

                            <Col sm={{ span: 10, offset: 2 }}>
                                <FloatingLabel
                                >
                                    <Form.Control
                                        as="textarea"
                                        name="message"
                                        placeholder="Write your message"
                                        style={{ height: "100px" }}
                                        value={form.message}
                                        onChange={handleChange}
                                        required
                                    />
                                </FloatingLabel>
                            </Col>
                        </Row>

                        {/* Submit Button */}
                        <Row>
                            <Col sm={{ span: 10, offset: 2 }}>
                                <Button type="submit" variant="success">
                                    Send Notification
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
        </AuthenticatedLayout>
    );
}
