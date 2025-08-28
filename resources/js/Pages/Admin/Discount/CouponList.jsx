import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Plus } from "lucide-react";
import { Link } from "@inertiajs/react";
import { useEffect, useState } from 'react';
import axiosClient from "@/axiosClient";
import PageHeader from "@/Components/Admin/PageHeader";
import { Badge, Card, Row } from "react-bootstrap";
import CardHeader from "@/Components/Admin/CardHeader";
import { toast } from "react-toastify";

export default function CouponList({ coupons }) {
    const [couponList, setCouponList] = useState(coupons);

    console.log(couponList);


    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this discount code?')) return;

        try {
            const response = await axiosClient.delete(`/admin/discount/coupons/${id}`);


            // Update the list by removing the deleted item
            if (response.data.status) {
                setCouponList(couponList.filter(item => item.id !== id));
                toast.success(response?.data?.message);

            }

        } catch (error) {
            console.error('Delete error:', error);
            toast.error(error.response?.data?.message || 'Failed to delete');

        }
    };



    return (
        <AuthenticatedLayout>
            <PageHeader title="Added Coupon" menu="Offer & Discount" />
            <Row>
                <Card>
                    <CardHeader title="Coupon List" btnName="Add Coupon" url="/admin/discount/coupons/create" />
                    {/* <Card.Body> */}
                    <table id="datatable-buttons" className="table table-bordered dt-responsive nowrap w-100">
                        <thead>
                            <tr>
                                {/* <th>Sno</th> */}
                                <th>Date</th>
                                <th>Name</th>
                                <th>Title</th>
                                <th>Coupon</th>
                                <th>Discount Type</th>
                                <th>Discount</th>
                                <th>Discount On</th>
                                <th>User</th>
                                <th>Min Order</th>
                                <th>Expire</th>
                                <th>Limit</th>
                                {/* <th>Usage Limit</th> */}
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {couponList.map((coupons, index) => (
                                <tr key={coupons.id}>
                                    <td>{new Date(coupons.created_at).toLocaleDateString()}</td>
                                    <td>{coupons.name}</td>
                                    <td>{coupons.title}</td>
                                    <td>{coupons.code}</td>
                                    <td>{coupons.discount_type}</td>
                                    <td>{coupons.amount}</td>
                                    <td>{coupons.discount_on}</td>
                                    <td>{coupons.is_all}</td>
                                    <td>{coupons.order_value}</td>
                                    <td>{coupons.expiry_date}</td>
                                    <td>{coupons.limit}</td>
                                    {/* <td>{coupons.usage_limit}</td> */}
                                    <td> <Badge bg={coupons.is_active ? 'success' : 'secondary'}>{coupons.is_active ? 'Active' : 'Disabled'}</Badge></td>
                                    <td>
                                        <Link href={`/admin/discount/coupons/${coupons.id}/edit`}>
                                            <button className="btn btn-sm btn-primary me-1">Edit</button>
                                        </Link>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => handleDelete(coupons.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>

                    {/* </Card.Body> */}
                </Card>
            </Row>
        </AuthenticatedLayout>
    );
}
