import PageHeader from "@/Components/Admin/PageHeader";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Landmark } from "lucide-react";
import { useEffect, useState } from "react";
import { Row, Card, Col, Button } from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axiosClient from "@/axiosClient";
import { toast } from "react-toastify";

export default function Payments({ order: initialOrder }) {

    const [order, setOrder] = useState(initialOrder);
    const [payments, setPayments] = useState(order.payments);

    // useEffect(() => {
    //     if (!initialOrder?.invoice_no) return;

    //     axiosClient
    //         .get(`/admin/orders/details/${initialOrder.id}/updated-payments`)
    //         .then((res) => {
    //             setPayments(res.data.payments);
    //         })
    //         .catch((err) => {
    //             console.error(err);
    //         });
    // }, [initialOrder]);


    const [show, setShow] = useState(false);
    const [payAmount, setPayAmount] = useState("");
    const [paymentSlip, setPaymentSlip] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append("order_id", order.id);
            formData.append("pay_amount", payAmount);
            if (paymentSlip) {
                formData.append("payment_slip", paymentSlip);
            }
            formData.append("payment_method", "manual"); // or card, wallet, etc.

            await axiosClient.post("/admin/orders/payment/settlement", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            alert("Payment settlement request submitted!");
            setShow(false);
        } catch (error) {
            console.error(error);
            alert("Something went wrong!");
        }
    };


    const handleStatusChange = async (id, newStatus) => {

        if (!confirm('Are you sure you want to change?')) return;

        try {
            const response = await axiosClient.post(`/admin/orders/payment/${id}/update-status`, {
                status: newStatus
            });

            if (response.data.status === true) {
                toast.success(response.data.message);
                setPayments(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p));
            } else {
                toast.error(response.data.message || "Failed to update status");
            }
        } catch (error) {
            console.error("Error updating payment status:", error);
            toast.error("Something went wrong!");
        }
    };


    return (
        <AuthenticatedLayout>
            <PageHeader title={'Payment Details'} menu={'Orders'} />
            <Row>
                <Card>
                    <Card.Header>Order No : {order.id}</Card.Header>
                    <Card.Body>
                        <Row>
                            <Col sm={4}>
                                <div>
                                    <h5 className="font-size-15 mb-3">Billed To:</h5>
                                    {/* <h5 className="font-size-14 mb-2">Retailer : {order.shipping_address?.full_name}</h5> */}
                                    <h5 className="font-size-14 mb-2">{order.shipping_address?.full_name}</h5>
                                    <p className="mb-1">{order.shipping_address?.address_line1}, {order.shipping_address?.address_line2}</p>
                                    <p className="mb-1"> {order.shipping_address?.city}, {order.shipping_address?.state}, Pincode: {order.shipping_address?.postal_code}, {order.shipping_address?.country} </p>
                                    <p className="mb-1">Email: {order.user?.email}</p>
                                    <p>Phone: {order.user?.phone}</p>
                                </div>
                            </Col>
                            <Col sm={4}>
                                <div>
                                    <div>
                                        <h5 className="font-size-15">Order Date:</h5>
                                        <p>{new Date(order.created_at).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <h5 className="font-size-15">Order Amount:</h5>
                                        <p>₹{order.total_amount}</p>
                                    </div>
                                    <div className="mt-4">
                                        <h5 className="font-size-15">Payment Status:</h5>
                                        <p className="mb-1">{order.payment_status}</p>
                                        {/* <p>Due Amount: {order.due_amount}</p> */}
                                    </div>
                                </div>
                            </Col>
                            <Col sm={4}>
                                <div>
                                    <h5 className="font-size-15 mb-3">Retailer:</h5>
                                    {/* <h5 className="font-size-14 mb-2">Retailer : {order.shipping_address?.full_name}</h5> */}
                                    <h5 className="font-size-14 mb-2">Name : {order.user?.seller?.name}</h5>
                                    <p className="mb-1">{order.user?.seller?.address}</p>
                                    <p className="mb-1"> {order.user?.seller?.city}, {order.user?.seller?.state}, Pincode: {order.user?.seller?.pincode} </p>
                                    <p className="mb-1">Email: {order.user?.seller?.email}</p>
                                    <p>Phone: {order.user?.phone}</p>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>

                </Card>

                <Card>
                    <Card.Header as={'h5'} className="d-flex justify-content-between align-items-center">
                        <span>Payment Ledger</span>

                        <Button variant="success" size="sm" onClick={handleShow}>
                            <Landmark /> Due Amount Settlement
                        </Button>


                    </Card.Header>
                    <div>
                        <label className="text-success">Paid Amount: ₹{order.paid_amount}</label> <br />
                        <label className="text-danger">Due Amount: ₹{order.due_amount}</label>
                    </div>

                    <Card.Body className="d-flex px-0">
                        <table id="datatable-buttons" className="table table-bordered dt-responsive nowrap w-100">

                            <thead>
                                <tr>
                                    <th>Payment Date</th>
                                    <th>Transaction No</th>
                                    <th>Payment Method</th>
                                    <th>Payment Type</th>
                                    <th>Amount</th>
                                    <th>Payment Slip</th>
                                    <th>Status</th>
                                    {/* <th>Action</th> */}
                                    {/* <th>Verified By</th> */}
                                    {/* <th>Payment</th>
                                    <th>Invoice</th> */}


                                </tr>
                            </thead>
                            <tbody>
                                {payments.map((payment) => (
                                    <tr key={payment.id}>
                                        <td>{new Date(payment.created_at).toLocaleDateString()}</td>
                                        <td>{payment.transaction_no}</td>
                                        <td>{payment.payment_method}</td>
                                        <td>{payment.payment_type}</td>
                                        <td>₹{payment.amount}</td>
                                        <td>
                                            <a href={payment.payment_slip} target="_blank">
                                                <button type="button" class="btn btm-xs btn-light waves-effect">
                                                    <i class="bx bx-hourglass bx-spin font-size-16 align-middle me-2"></i> View Slip
                                                </button>
                                            </a>
                                        </td>
                                        {/* <td>
                                            <div class="badge badge-soft-warning font-size-12">{payment.status}</div>
                                        </td> */}
                                        <td>
                                            <Dropdown>
                                                <Dropdown.Toggle id="dropdown-basic"
                                                    className={`btn btn-sm dropdown-toggle ${payment.status === "verified"
                                                        ? "btn-success"
                                                        : payment.status === "rejected"
                                                            ? "btn-danger"
                                                            : "btn-warning"
                                                        }`}>
                                                    {payment.status}
                                                    <i class="mdi mdi-chevron-down"></i>
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item onClick={() => handleStatusChange(payment.id, 'verified')}>
                                                        Verified
                                                    </Dropdown.Item>
                                                    <Dropdown.Item onClick={() => handleStatusChange(payment.id, 'rejected')}>
                                                        Rejected
                                                    </Dropdown.Item>
                                                    {/* <Dropdown.Item onClick={() => handleStatusChange(payment.id, 'Other')}>
                                                        Other
                                                    </Dropdown.Item> */}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </td>
                                        {/* <td>
                                            <Link className="text-success" href={"/admin/orders/payments/" + order.invoice_no}><HandCoins /></Link>
                                        </td>
                                        <td>
                                            <button type="button" class="btn btn-soft-light btn-sm w-xs waves-effect btn-label waves-light"><i class="bx bx-download label-icon"></i> Pdf</button>
                                     
                                        </td> */}
                                    </tr>
                                ))}
                            </tbody>


                        </table>

                        {/* <div>
                            <h5 className="font-size-15 mb-3">Payment Details:</h5>
                            <label>Total Amount: {order.total_amount}</label>
                            <p className="text-success">Paid Amount:  {order.paid_amount}</p>
                            <hr />
                            <label className="text-danger">Due Amount: {order.due_amount}</label>
                        </div> */}

                    </Card.Body>
                </Card>
            </Row>

            {/* model */}
            <Modal show={show} onHide={handleClose} className="mt-5">
                <Modal.Header closeButton>
                    <Modal.Title>Payment Settlement</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Total Due Amount</Form.Label>
                            <Form.Control
                                type="text"
                                value={order.due_amount}
                                readOnly
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Paying Amount</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter amount"
                                value={payAmount}
                                onChange={(e) => setPayAmount(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Payment Slip (Optional)</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={(e) => setPaymentSlip(e.target.files[0])}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>

        </AuthenticatedLayout>
    )
}