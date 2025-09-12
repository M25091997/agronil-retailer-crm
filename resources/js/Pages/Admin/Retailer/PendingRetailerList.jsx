import axiosClient from "@/axiosClient";
import PageHeader from "@/Components/Admin/PageHeader";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import { Card, Row, Badge } from "react-bootstrap";
import { toast } from "react-toastify";



export default function PendingRetailerList({ retailers }) {
    const [retailerList, setRetailerList] = useState(retailers)
    const [showModal, setShowModal] = useState(false);
    const [modelImage, setModelImage] = useState('');

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this Retailer ?')) return;
        try {

            const response = await axiosClient.delete(`/admin/retailer/${id}`);
            if (response.data.status == true) {
                toast.success(response.data.message);
                setRetailerList(retailerList.filter(item => item.id !== id));
            }

            toast.error(response.data.message);

        } catch (error) {
            console.log(error)
            toast.error(response.data.message);

        }

    }

    const handlePendigButton = async (id) => {
        if (!confirm('Are you sure, you want to approved this retailer ?')) return

        try {
            const response = await axiosClient.get(`/admin/retailer/status-update/${id}`);
            if (response.data.status) {
                toast.success(response.data.message);
                setRetailerList(retailerList.filter(item => item.id !== id));
                // setRetailerList(prevList =>
                //     prevList.map(item =>
                //         item.id === id ? { ...item, status: !item.status } : item
                //     )
                // );
            } else {
                toast.error(response.data.message || 'Something went wrong');
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'Something went wrong');
        }
    };





    return (
        <AuthenticatedLayout>
            <PageHeader title="Pending Retailers" menu="Retailers" />
            <Row>
                <Card>
                    <Card.Header> Retailer List</Card.Header>
                    <Card.Body>
                        <table id="datatable-buttons" className="table table-bordered dt-responsive nowrap w-100">
                            <thead>
                                <tr>
                                    <th>Sno</th>
                                    <th>Retailer Name</th>
                                    <th>Retailer Phone</th>
                                    <th>Retailer Email</th>
                                    <th>Prof Image</th>
                                    <th>Address </th>
                                    <th>City </th>
                                    <th>State </th>
                                    <th>Pincode </th>
                                    <th>Shop Image </th>
                                    <th>Reg. Certificate </th>
                                    <th>Pan Card </th>
                                    <th>Aadhaar Card </th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {retailerList.map((retailer, index) => (
                                    <tr key={retailer.id}>
                                        <td>{index + 1}</td>
                                        <td>{retailer.name}</td>
                                        <td>{retailer.user?.phone}</td>
                                        <td>{retailer.email}</td>

                                        <td>
                                            {retailer?.profile_picture && (
                                                <img
                                                    src={retailer.profile_picture}
                                                    alt="profile_picture"
                                                    width={100}
                                                    height={100}
                                                    className="cursor-pointer rounded shadow"
                                                    onClick={() => {
                                                        setShowModal(true);
                                                        setModelImage(retailer.profile_picture);
                                                    }}
                                                />
                                            )}
                                        </td>

                                        <td>{retailer.address}</td>
                                        <td>{retailer.city}</td>
                                        <td>{retailer.state}</td>
                                        <td>{retailer.pincode}</td>
                                        <td>
                                            {retailer?.shop_image && (
                                                <img
                                                    src={retailer.shop_image}
                                                    alt="shop image"
                                                    width={100}
                                                    height={100}
                                                    className="cursor-pointer rounded shadow"
                                                    onClick={() => {
                                                        setShowModal(true);
                                                        setModelImage(retailer.shop_image);
                                                    }}
                                                />
                                            )}

                                        </td>
                                        <td>
                                            {retailer?.registration_certificate && (
                                                <img
                                                    src={retailer.registration_certificate}
                                                    alt="thumbnail"
                                                    width={100}
                                                    height={100}
                                                    className="cursor-pointer rounded shadow"
                                                    onClick={() => {
                                                        setShowModal(true);
                                                        setModelImage(retailer.registration_certificate);
                                                    }}
                                                />
                                            )}
                                        </td>

                                        {/* <img
                                                    // src={`${import.meta.env.VITE_BASE_URL}${retailer.registration_certificate}`}
                                                    src={retailer.registration_certificate}
                                                    alt="Reg. certificate"
                                                    width="100"
                                                    height="100"
                                                /> */}
                                        <td>
                                            {retailer?.pan_card && (
                                                <img
                                                    src={retailer.pan_card}
                                                    alt="pan_card"
                                                    width={100}
                                                    height={100}
                                                    className="cursor-pointer rounded shadow"
                                                    onClick={() => {
                                                        setShowModal(true);
                                                        setModelImage(retailer.pan_card);
                                                    }}
                                                />
                                            )}
                                        </td>
                                        <td>
                                            {retailer?.aadhaar_card && (
                                                <img
                                                    src={retailer.aadhaar_card}
                                                    alt="aadhaar_card"
                                                    width={100}
                                                    height={100}
                                                    className="cursor-pointer rounded shadow"
                                                    onClick={() => {
                                                        setShowModal(true);
                                                        setModelImage(retailer.aadhaar_card);
                                                    }}
                                                />
                                            )}

                                        </td>
                                        <td>
                                            <Badge pill bg={retailer.status ? 'success' : 'secondary'} style={{ cursor: 'pointer' }} onClick={() => handlePendigButton(retailer.id)}>
                                                {retailer.status ? 'Approved' : 'Pending'}
                                            </Badge>

                                        </td>

                                        <td>
                                            {/* <Link href={`/admin/retailers/${retailer.id}/edit`}>
                                                <button className="btn btn-sm btn-primary me-1">Edit</button>
                                            </Link> */}
                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => handleDelete(retailer.id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Fullscreen Modal */}
                        {showModal && (
                            <div
                                className="modal fade show"
                                style={{ display: "block", backgroundColor: "rgba(0,0,0,0.8)" }}
                                onClick={() => setShowModal(false)}
                            >
                                <div
                                    className="modal-dialog modal-dialog-centered modal-lg"
                                    onClick={(e) => e.stopPropagation()} // prevent close when clicking on image
                                >
                                    <div className="modal-content bg-transparent border-0 shadow-none">
                                        <img
                                            src={modelImage}
                                            alt="full"
                                            className="img-fluid rounded"
                                        />
                                        <button
                                            type="button"
                                            className="btn-close btn-close-white position-absolute top-0 end-0 m-3"
                                            onClick={() => setShowModal(false)}
                                        ></button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Card.Body>
                </Card>
            </Row>
        </AuthenticatedLayout>
    )
}