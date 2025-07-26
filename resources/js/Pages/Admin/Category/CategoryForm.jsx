import axiosClient from "@/axiosClient";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, usePage } from "@inertiajs/react";
import { useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { router } from '@inertiajs/react';

export default function CategoryForm({ category = null }) {
    const [errors, setErrors] = useState({});
    const fileInputRef = useRef(null);

    const isEditMode = !!category;

    const [form, setForm] = useState({
        name: '',
        image: null,
        description: '',
        is_active: true,
    });

    useEffect(() => {
        if (isEditMode && category) {
            setForm({
                name: category.name || '',
                image: null,
                description: category.description || '',
                is_active: category.is_active ?? true,
            });
        }
    }, [category, isEditMode]);

    const formHandle = async (e) => {
        e.preventDefault();

        console.log(form);

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const formData = new FormData();
        formData.append('name', form.name);
        // formData.append('image', form.image);
        formData.append('description', form.description);
        formData.append('is_active', form.is_active ? 1 : 0);

        if (form.image) {
            formData.append('image', form.image);
        }


        try {
            let response;

            if (isEditMode) {
                formData.append('_method', 'PUT');
                response = await axiosClient.post(`/admin/categories/${category.id}`, formData);
            } else {
                response = await axiosClient.post('/admin/categories', formData);
            }

            toast.success(response.data.message);
            if (!isEditMode) {
                setForm({
                    name: '',
                    image: null,
                    description: '',
                    is_active: '',
                });

                // Reset file input
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            }

            // router.visit('/admin/categories'); // redirect to list


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
    const validate = () => {
        const temp = {};

        if (!form.name) {
            temp.name = 'Category name is required';
        }

        if (!isEditMode && !form.image) {
            temp.image = 'Category image is required';
        }
        return temp;
    };



    return (
        <AuthenticatedLayout>
            <div className="row">
                <div className="col-12">
                    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                        <h4 className="mb-sm-0 font-size-18">
                            Category
                        </h4>

                        <div className="page-title-right">
                            <ol className="breadcrumb m-0">
                                <li className="breadcrumb-item">
                                    <a href="javascript: void(0);">Category</a>
                                </li>
                                <li className="breadcrumb-item active">
                                    Product
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>


            <div className="row">
                <div className="col-lg-6">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Category Details.</h4>
                        </div>

                        <div className="card-body p-4">

                            <form onSubmit={formHandle} encType="multipart/form-data">

                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <label className="form-label">Category Name <span className="text-danger">*</span></label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="name"

                                            value={form.name}
                                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        />
                                        {errors.name && <div className="text-danger">{errors.name}</div>}
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <label className="form-label">Category image <span className="text-danger">*</span></label>
                                        <input
                                            className="form-control"
                                            type="file"
                                            name="image"

                                            ref={fileInputRef}
                                            onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
                                        />
                                        {category?.image && (
                                            <img
                                                src={`/${category.image}`}
                                                alt="Current"
                                                style={{ width: 100, marginTop: 10 }}
                                            />
                                        )}
                                        {errors.image && <div className="text-danger">{errors.image}</div>}

                                    </div>
                                </div>

                                <div className="col-12">
                                    <div className="mb-3">
                                        <label className="form-label">Description</label>
                                        <textarea
                                            name="description"
                                            className="form-control"
                                            rows="3"
                                            value={form.description}
                                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                                        />

                                    </div>
                                </div>
                                <button type="submit" name="submitButton"
                                    className="btn btn-success waves-effect waves-light mt-5 mb-3"> {isEditMode ? 'Update' : 'Create'} </button>
                                <Link href="/admin/categories"> <button type="button" name="submitButton"
                                    className="btn btn-danger waves-effect waves-light mt-5 mb-3"> Cancel</button>
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


        </AuthenticatedLayout>
    );
}
