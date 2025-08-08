import axiosClient from "@/axiosClient";
import PageHeader from "@/Components/Admin/PageHeader";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { Card, Row, Col, Form, Button, Badge, Toast } from "react-bootstrap";
import { toast } from "react-toastify";

export default function UnitType({ unitTypes, }) {

    const [unitType, setUnitType] = useState(null);
    let isEditMode = !!unitType;

    const [unitTypeList, setUnitTypeList] = useState(unitTypes);
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({
        name: '',
        unit: '',
        is_active: true,

    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            let response;

            console.log(form);

            if (isEditMode) {
                // form.append('_method', 'PUT');
                // response = await axiosClient.post(`/admin/unit-type/${form.id}`, form);
                response = await axiosClient.put(`/admin/unit-type/${form.id}`, form);
            } else {
                response = await axiosClient.post('/admin/unit-type', form);
            }

            toast.success(response.data.message);
            if (!isEditMode) {
                setUnitTypeList([...unitTypeList, response.data.data]);
                setForm({
                    name: '',
                    unit: '',
                    is_active: true,
                });
            } else {
                setUnitTypeList(unitTypeList.map(item =>
                    item.id === response.data.data.id ? response.data.data : item
                ));
            }
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
        if (!form.name) temp.name = 'Unit name is required.';
        if (!form.unit) temp.unit = 'Unit is required.';

        setErrors(temp);
        return temp;
    }

    // const fetchUnitTypes = async () => {
    //     try {
    //         const response = await axiosClient.get('/admin/unit-type');
    //         setUnitTypeList(response.data.data); // adjust based on your API response
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };


    const handleDelete = async (id) => {
        if (!confirm('Are you sure, you want to delete this?')) return;

        console.log(id);

        try {
            const response = await axiosClient.delete(`admin/unit-type/${id}`);

            if (response.data.status === true) {
                setUnitTypeList(unitTypeList.filter(item => item.id !== id));
                toast.success(response.data?.message);
            }
        } catch (error) {
            console.error('Delete error:', error);
            toast.error(error.response?.data?.message || 'Something went wrong');
        }
    };

    const editHandle = (item) => {
        setUnitType(item); // sets the item to edit
        setForm({
            ...form,
            id: item.id,
            name: item.name,
            unit: item.unit,
            is_active: item.is_active,
        });
    };
    return (
        <AuthenticatedLayout>
            <PageHeader title="Unit Types" menu="Product" />

            <Row>
                <Col sm={5}>
                    <Card>
                        <Card.Header>    {isEditMode ? 'Update' : 'Add New'}  Unit Type</Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" name="name" value={form.name || ''} placeholder="Ex: Kilogram" onChange={(e) => setForm({ ...form, name: e.target.value })} />
                                    {errors.name && <div className="text-danger">{errors.name}</div>}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Unit</Form.Label>
                                    <Form.Control type="text" name="unit" value={form.unit || ''} placeholder="Ex: Kg" onChange={(e) => setForm({ ...form, unit: e.target.value })} />
                                    {errors.unit && <div className="text-danger">{errors.unit}</div>}
                                </Form.Group>

                                <Button type="submit" variant="success"
                                    className="btn-sm waves-effect waves-light mb-3">
                                    {isEditMode ? 'Update' : 'Create'}
                                </Button>

                                <Link href="/admin/unit-type"> <Button type="button" variant="danger"
                                    className="btn btn-sm waves-effect waves-light  mb-3"> Cancel</Button>
                                </Link>
                            </Form>


                        </Card.Body>

                    </Card>

                </Col>
                <Col sm={7}>
                    <Card>
                        <Card.Header>
                            Unit Type List
                        </Card.Header>
                        <Card.Body>
                            <table id="datatable-buttons" className="table table-bordered dt-responsive nowrap w-100">
                                <thead>
                                    <tr>
                                        <th>Sno</th>
                                        <th>Name</th>
                                        <th>Unit</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {unitTypeList.map((item, index) => (
                                        <tr key={item.id}>
                                            <td>{index + 1}</td>
                                            <td>{item.name}</td>
                                            <td>{item.unit}</td>

                                            <td> <Badge bg={item.is_active ? 'success' : 'secondary'}>{item.is_active ? 'Active' : 'Disabled'}</Badge></td>
                                            {/* <td>{new Date(item.created_at).toLocaleDateString()}</td> */}
                                            <td>
                                                {/* <Link href={`/admin/home-banners/${item.id}/edit`}> */}
                                                <button className="btn btn-sm btn-primary me-1" onClick={() => editHandle(item)}>Edit</button>
                                                {/* </Link> */}
                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => handleDelete(item.id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </Card.Body>

                    </Card>

                </Col>

            </Row>

        </AuthenticatedLayout>
    )
}