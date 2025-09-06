import axiosClient from "@/axiosClient";
import PageHeader from "@/Components/Admin/PageHeader";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import { Download, Tags, Codesandbox } from "lucide-react";
import { useState } from "react";
import { Card, Row, Badge, Col, Button, InputGroup, Form } from "react-bootstrap";
import { toast } from "react-toastify";


export default function Details({ order }) {
    console.log(order);

    return (
        <AuthenticatedLayout>
            <PageHeader title="Order Details " menu="Orders" />
            <Row>
                <Card>
                    <Card.Header>Order No : {order.id}</Card.Header>
                    <Card.Body>
                        <Row>
                            <Col sm={6}>
                                <div>
                                    <h5 className="font-size-15 mb-3">Billed To:</h5>
                                    <h5 className="font-size-14 mb-2">{order.shipping_address?.full_name}</h5>
                                    <p className="mb-1">{order.shipping_address?.address_line1}, {order.shipping_address?.address_line2}</p>
                                    <p className="mb-1"> {order.shipping_address?.city}, {order.shipping_address?.state}, Pincode: {order.shipping_address?.postal_code}, {order.shipping_address?.country} </p>
                                    <p className="mb-1">Email: {order.user?.email}</p>
                                    <p>Phone: {order.user?.phone}</p>
                                </div>
                            </Col>
                            <Col sm={6}>
                                <div>
                                    <div>
                                        <h5 className="font-size-15">Order Date:</h5>
                                        <p>{new Date(order.created_at).toLocaleDateString()}</p>
                                    </div>
                                    <div className="mt-4">
                                        <h5 className="font-size-15">Payment Status:</h5>
                                        <p className="mb-1">{order.payment_status}</p>
                                        {/* <p>Due Amount: {order.due_amount}</p> */}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>

                </Card>

                {order.order_items.map((item) => (
                    <Card>
                        <Card.Body className="d-flex px-0">
                            <img
                                src={item.product_details?.image}
                                alt={item.product_details?.name}
                                className="img-thumbnail fit-cover border p-1 mr-3"
                                width="100"
                                height="100"
                            />


                            <div className="col px-3">
                                <div className="d-md-flex justify-content-between">
                                    <a
                                        href={`/product/${item.product_details?.slug}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-800 font-weight-medium"
                                    >
                                        <h5 className="mt-2">{item.product_details?.name}</h5>
                                    </a>

                                    {/* Price + Status */}
                                    <div className="text-md-right mb-md-0 mb-3">
                                        <h5>${item.total}</h5>
                                        <Badge pill variant={item.status == 'pending' ? 'info' : item.status == 'completed' ? 'success' : 'danger'}>
                                            {item.status} <i className="far fa-clock ml-1"></i>
                                        </Badge>
                                    </div>
                                </div>

                                {/* Quantity */}
                                <div className="d-md-flex justify-content-between">
                                    <label>
                                        {item.quantity} x ₹{item.price}
                                    </label>
                                    {/* <label>
                                        <Tags />
                                    </label> */}

                                </div>
                                {item.product_details?.bulk && (
                                    <div className="d-md-flex justify-content-between">

                                        <label>
                                            <Tags style={{ color: 'green' }} title="Bulk" /> Bulk Rate
                                        </label>

                                    </div>

                                )}

                            </div>
                        </Card.Body>
                    </Card>


                ))}

                <Card>
                    <Card.Body className="d-flex px-0">
                        <div>
                            <h5 className="font-size-15 mb-3">Payment Details:</h5>
                            <label>Total Amount: {order.total_amount}</label>
                            <p className="text-success">Paid Amount:  {order.paid_amount}</p>
                            <hr />
                            <label className="text-danger">Due Amount: {order.due_amount}</label>
                        </div>

                    </Card.Body>
                </Card>



            </Row>

        </AuthenticatedLayout>

    )


}