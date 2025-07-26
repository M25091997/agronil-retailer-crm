import PageHeader from "@/Components/Admin/PageHeader";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, router } from "@inertiajs/react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import { useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import axiosClient from "@/axiosClient";

export default function HomeBannerForm({ categories, banner = null }) {

    const isEditMode = !!banner;
    const fileInputRef = useRef(null);

    const [errors, setErrors] = useState({});

    const [form, setForm] = useState({
        title: '',
        category_id: '',
        btn_txt: '',
        image: null,
        url: '',
        description: '',
        is_active: true,
    });

    useEffect(() => {
        if (isEditMode && banner) {
            setForm({
                title: banner.title || '',
                category_id: banner.category_id || '',
                btn_txt: banner.btn_txt || '',
                image: null,
                url: banner.url || '',
                description: banner.description || '',

                is_active: true,
            });
        }

    }, [isEditMode, banner])

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(form);

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }



        const formData = new FormData();
        formData.append('title', form.title);
        formData.append('btn_txt', form.btn_txt);
        formData.append('category_id', form.category_id);
        formData.append('description', form.description);
        formData.append('is_active', form.is_active ? 1 : 0);

        if (form.image) {
            formData.append('image', form.image);
        }
        try {
            let response;

            if (isEditMode) {
                formData.append('_method', 'PUT');
                response = await axiosClient.post(`/admin/home-banners/${banner.id}`, formData);
            } else {
                response = await axiosClient.post('/admin/home-banners', formData);
            }

            toast.success(response.data.message);
            if (!isEditMode) {
                setForm({
                    title: '',
                    category_id: '',
                    image: null,
                    description: '',
                    is_active: '',
                });

                // Reset file input
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }

            }
            router.visit('/admin/home-banners');

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

        if (!form.category_id) temp.category_id = 'Category is required.';
        if (!form.title) temp.title = 'Banner title is required.';

        if (!isEditMode && !form.image) temp.image = 'Banner image is required';




        return temp;
    }

    return (
        <AuthenticatedLayout>
            <PageHeader title="Banner Details" menu="Slider" />

            {/* <Container className="mt-4"> */}
            <Row>
                <Col sm={6}>
                    <Card>
                        <Card.Header>    {isEditMode ? 'Update' : 'Add New'} Banner</Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit} encType="multipart/form-data">
                                <Form.Group className="mb-3" controlId="category_id">
                                    <Form.Label>Select Category</Form.Label>
                                    <Form.Select aria-label="Default select example" name="category_id" value={form.category_id || ''} onChange={(e) => setForm({ ...form, category_id: e.target.value })}>
                                        <option value="">Choose...</option>
                                        {categories.map(item => (
                                            <option key={item.id} value={item.id}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                    {errors.category_id && <div className="text-danger">{errors.category_id}</div>}
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control type="text" name="title" value={form.title || ''} placeholder="" onChange={(e) => setForm({ ...form, title: e.target.value })} />
                                    {errors.title && <div className="text-danger">{errors.title}</div>}
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="file">
                                    <Form.Label>Upload Banner</Form.Label>
                                    <Form.Control type="file" name="image" ref={fileInputRef} placeholder="" onChange={(e) => setForm({ ...form, image: e.target.files[0] })} />
                                    {banner?.image && (
                                        <img
                                            src={`/${banner.image}`}
                                            alt="Current"
                                            style={{ width: 100, marginTop: 10 }}
                                        />
                                    )}

                                    {errors.image && <div className="text-danger">{errors.image}</div>}
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as="textarea" name="description" value={form.description || ''} rows={3} onChange={(e) => setForm({ ...form, description: e.target.value })}> </Form.Control>
                                    {errors.description && <div className="text-danger">{errors.description}</div>}
                                </Form.Group>


                                <Button type="submit" variant="success"
                                    className="btn-sm waves-effect waves-light mb-3">
                                    {isEditMode ? 'Update' : 'Create'}
                                </Button>

                                <Link href="/admin/home-banners"> <Button type="button" variant="danger"
                                    className="btn btn-sm waves-effect waves-light  mb-3"> Cancel</Button>
                                </Link>
                            </Form>


                        </Card.Body>
                    </Card>



                </Col>

            </Row>
            {/* </Container> */}





        </AuthenticatedLayout >
    )
}