import axiosClient from "@/axiosClient";
import PageHeader from "@/Components/Admin/PageHeader";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Filter, Search } from "lucide-react";
import { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";

export default function Reports({ categories }) {

    const [form, setForm] = useState({
        category_id: '',
        sub_category_id: '',
        brand_id: '',
        disease_id: ''
    })

    const [subCategories, setSubCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [diseases, setDiseases] = useState([]);
    const [orders, setOrders] = useState([]);

    const [totalItem, setTotaItem] = useState(0)
    const [totalSales, setTotalSales] = useState(0)

    const handleCategoryChange = async (e) => {
        const categoryId = e.target.value;
        setForm((prev) => ({
            ...prev,
            category_id: categoryId,
            sub_category_id: '',
            brand_id: '',
            disease_id: ''
        }));

        try {
            const response = await axiosClient.get(`/admin/category/dependencies/${categoryId}`);
            setSubCategories(response.data.subcategories);
            setBrands(response.data.brands);
            setDiseases(response.data.diseases);
        } catch (error) {
            console.error("Error loading dependencies:", error);
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosClient.post('admin/orders/reports', form);
            if (response.data.status) {
                console.log(response.data.orders);
                setOrders(response.data.orders)
                setTotalSales(response.data.total_sales)
                setTotaItem(response.data.total_items)
            }
        } catch (error) {
            console.error("Error on submit:", error);
        }
    }



    return (
        <AuthenticatedLayout>
            <PageHeader title={'Sales Reports'} menu={"Order"} />
            <Row>
                <Card>
                    <Card.Header>Search Order</Card.Header>
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>Select Category</Form.Label>
                                    <Form.Select defaultValue="Choose..." onChange={handleCategoryChange}>
                                        <option value="">Choose...</option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>{category.name}</option>

                                        ))}

                                    </Form.Select>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>Select Sub Category</Form.Label>
                                    <Form.Select defaultValue="Choose..." onChange={(e) => setForm({ ...form, sub_category_id: e.target.value })}>
                                        <option value="">Choose...</option>
                                        {subCategories.map(sub => (
                                            <option key={sub.id} value={sub.id}>{sub.name}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label>Select Brands</Form.Label>
                                    <Form.Select defaultValue="Choose..." onChange={(e) => setForm({ ...form, brand_id: e.target.value })}>
                                        <option value="">Choose...</option>
                                        {brands.map(brand => (
                                            <option key={brand.id} value={brand.id}>{brand.name}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label>Select Diseases</Form.Label>
                                    <Form.Select defaultValue="Choose..." onChange={(e) => setForm({ ...form, disease_id: e.target.value })}>
                                        <option value="">Choose...</option>
                                        {diseases.map(dis => (
                                            <option key={dis.id} value={dis.id}>{dis.name}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Row>

                            <Button variant="success" type="submit" className="btn-sm float-end">
                                <Filter size={16} />  Search
                            </Button>
                        </Form>

                    </Card.Body>
                </Card>

                <Card>
                    <Card.Header> Report List</Card.Header>
                    <Card.Body>
                        <div>
                            <label className="text-success">Total Sales: ₹ {totalSales}</label> <br />
                            <label className="text-danger">Total Item: {totalItem} </label>
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

                            </tbody>

                        </table>

                    </Card.Body>
                </Card>
            </Row>
        </AuthenticatedLayout>
    )
}