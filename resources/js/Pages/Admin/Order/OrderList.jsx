import axiosClient from "@/axiosClient";
import PageHeader from "@/Components/Admin/PageHeader";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import { Download, HandCoins } from "lucide-react";
import { useState } from "react";
import { Card, Row, Badge } from "react-bootstrap";
import { toast } from "react-toastify";


export default function OrderList({ orders }) {
    const [orderList, setOrderList] = useState(orders);
    console.log(orderList);

    return (
        <AuthenticatedLayout>
            <PageHeader title="Order" menu="Orders" />
            <Row>
                <Card>
                    <Card.Header> Order List</Card.Header>
                    <Card.Body>
                        <table id="datatable-buttons" className="table table-bordered dt-responsive nowrap w-100">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Invoice Id</th>
                                    <th>User Name</th>
                                    <th>Phone Numbar</th>
                                    <th>Items</th>
                                    <th>Status</th>
                                    <th>Total</th>
                                    <th>Payment</th>
                                    <th>Invoice</th>


                                </tr>
                            </thead>
                            <tbody>
                                {orderList.map((order) => (
                                    <tr key={order.id}>
                                        <td>{new Date(order.created_at).toLocaleDateString()}</td>
                                        <Link className="text-primary" href={"/admin/orders/details/" + order.invoice_no}>
                                            #{order.invoice_no ?? "-"}
                                        </Link>
                                        <td>{order.user?.name ?? "-"}</td>
                                        <td>{order.user?.phone ?? "-"}</td>
                                        <td>{order.order_items ? order.order_items.length : 0}</td>
                                        <td>
                                            <div class="badge badge-soft-warning font-size-12">{order.payment_status}</div>
                                        </td>
                                        <td>₹{order.amount}</td>
                                        <td>
                                            <Link className="text-success" href={"/admin/orders/payments/" + order.invoice_no}><HandCoins /></Link>
                                        </td>
                                        <td>
                                            <button type="button" class="btn btn-soft-light btn-sm w-xs waves-effect btn-label waves-light"><i class="bx bx-download label-icon"></i> Pdf</button>
                                            {/* <Download /> */}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>

                    </Card.Body>
                </Card>
            </Row>

        </AuthenticatedLayout>

    )


}