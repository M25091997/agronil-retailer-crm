import axiosClient from "@/axiosClient";
import PageHeader from "@/Components/Admin/PageHeader";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Filter, Search } from "lucide-react";
import { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";

export default function Reports({ orders }) {

    // const [retailerOrders, etailerOrders] = useState(orders);

    const [totalItem, setTotaItem] = useState(0)
    // const [totalSales, setTotalSales] = useState(0)

    const totalQuantity = orders.reduce((sum, order) => sum + order.quantity, 0);
    const totalSales = orders.reduce((sum, order) => sum + parseFloat(order.total), 0);




    return (
        <AuthenticatedLayout>
            <PageHeader title={'Sales Reports'} menu={"Order"} />
            <Row>
                <Card>
                    <Card.Header> Report List</Card.Header>
                    <Card.Body>
                        <div>
                            <label className="text-success">Total Sales: ₹ {totalSales}</label> <br />
                            <label className="text-danger">Total Item: {totalQuantity} </label>
                        </div>

                        <table id="datatable-buttons" className="table table-bordered dt-responsive nowrap w-100">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Order Id</th>
                                    <th>Invoice Id</th>
                                    <th>Seller Name</th>
                                    <th>Phone Numbar</th>
                                    <th>Product Name</th>
                                    <th>SKU</th>
                                    <th>Quantity</th>
                                    <th>Amount</th>
                                    <th>Total</th>



                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order.id}>
                                        <td>{new Date(order.created_at).toLocaleDateString()}</td>
                                        <td>{order.order_id}</td>
                                        <td>{order.order?.invoice_no}</td>
                                        <td>{order.order?.user?.name}</td>
                                        <td>{order.order?.user?.phone}</td>
                                        <td>
                                            <img src={order.product_details?.image} alt="product image" className="img-thumbnail fit-cover border p-1" width="100" height="100" />
                                            <a href="#" className="text-body">{" "}{order.product_details?.name}</a>
                                        </td>


                                        <td>{order.product_details?.sku}</td>
                                        <td>{order.quantity}</td>
                                        <td>{order.price}</td>
                                        <td>{order.total}</td>

                                    </tr>

                                ))}

                                {/* Totals row */}
                                <tr className="fw-bold bg-light">
                                    <td colSpan={7} className="text-end">Totals:</td>
                                    <td>{totalQuantity}</td>
                                    <td></td>
                                    <td>{totalSales.toFixed(2)}</td>
                                </tr>

                            </tbody>

                        </table>

                    </Card.Body>
                </Card>
            </Row>
        </AuthenticatedLayout>
    )
}