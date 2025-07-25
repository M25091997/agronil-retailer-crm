import axiosClient from "@/axiosClient";
import PageHeader from "@/Components/Admin/PageHeader";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function SubCategoryForm({ subCategory = null, categories }) {

    const isEditMode = !!subCategory;




    const [errors, setErrors] = useState({});

    const [form, setForm] = useState({
        name: '',
        category_id: '',
        image: '',
        description: '',
        is_active: true
    });


    useEffect(() => {
        if (isEditMode && subCategory) {
            setForm({
                name: subCategory.name || '',
                category_id: subCategory.category_id || '',
                image: null,
                description: subCategory.description || '',
                is_active: subCategory.is_active ?? true,
            });

        }

    }, [subCategory, isEditMode])


    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(form);

        if (!validate()) return;

        const formData = new FormData();
        formData.append('name', form.name);
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
                response = await axiosClient.post(`/admin/sub-categories/${subCategory.id}`, formData);
            } else {
                response = await axiosClient.post('/admin/sub-categories', formData);
            }

            alert(response.data.message || 'Operation successful.');
            // Optional: reset form or redirect
        } catch (error) {
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

        if (!form.name?.trim()) temp.name = 'Sub category name is required';
        if (!form.category_id) temp.category_id = 'Category is required';

        if (!isEditMode && !form.image)
            temp.image = 'Category image is required';

        setErrors(temp);

        return Object.keys(temp).length === 0;
    };




    return (
        <AuthenticatedLayout>
            <PageHeader title="Sub Category" menu="Product" />
            <div className="row">
                <div className="col-lg-6">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Sub Category Details.</h4>
                        </div>

                        <div className="card-body p-4">
                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <div class="form-group">
                                            <label for="exampleFormControlSelect1">Select Category</label>
                                            <select class="form-control" name="category_id" id="exampleFormControlSelect1" value={form.category_id || ''}
                                                onChange={(e) => setForm({ ...form, category_id: e.target.value })}>
                                                <option value="">Choose...</option>
                                                {categories.map((category) => (
                                                    <option key={category.id} value={category.id}>
                                                        {category.name}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.category_id && <div className="text-danger">{errors.category_id}</div>}

                                        </div>
                                    </div>
                                </div>


                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <div class="form-group">
                                            <label className="form-label"> Name <span className="text-danger">*</span></label>
                                            <input
                                                type="text"
                                                name="name"
                                                className="form-control"
                                                value={form.name}
                                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                            />
                                            {errors.name && <div className="text-danger">{errors.name}</div>}
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <label className="form-label">Category image <span className="text-danger">*</span></label>
                                        <input
                                            type="file"
                                            name="image"
                                            className="form-control"
                                            onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
                                        />
                                        {subCategory?.image && (
                                            <img
                                                src={`/${subCategory.image}`}
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
                                <Link href="/admin/sub-categories"> <button type="button" name="submitButton"
                                    className="btn btn-danger waves-effect waves-light mt-5 mb-3"> Cancel</button>
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>

    )
}