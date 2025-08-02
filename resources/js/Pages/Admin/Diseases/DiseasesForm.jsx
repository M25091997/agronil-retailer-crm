import axiosClient from "@/axiosClient";
import CardHeader from "@/Components/Admin/CardHeader";
import FormSubmitButton from "@/Components/Admin/FormSubmitButton";
import PageHeader from "@/Components/Admin/PageHeader";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useEffect, useState } from "react";

export default function DiseasesForm({ categories, disease = null }) {

    const isEditMode = !!disease;

    const [errors, setErrors] = useState({});

    const [form, setForm] = useState({
        name: '',
        category_id: '',
        image: null,
        description: '',
        is_active: true,
    });


    useEffect(() => {
        if (isEditMode && disease) {
            setForm({
                name: disease.name,
                category_id: disease.category_id,
                image: null,
                description: disease.description,
                is_active: disease.is_active || '',
            })
        }

    }, [isEditMode, disease]);


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
                response = await axiosClient.post(`/admin/diseases/${disease.id}`, formData);
            } else {
                response = await axiosClient.post('/admin/diseases', formData);
            }

            alert(response.data.message || 'Saved successfully');
            setForm({
                name: '',
                category_id: '',
                description: '',
                is_active: true,
            });
            // Optional: reset form or redirect
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                console.error('Unexpected error:', error);
            }
        }
    };

    const validate = () => {
        const temp = {};
        if (!form.category_id) temp.category_id = "Category is required";
        if (!form.name) temp.name = "Disease Name is required";

        setErrors(temp)
        return Object.keys(temp).length === 0;
    }
    return (
        <AuthenticatedLayout>
            <PageHeader title="Diseases" menu="Product" />
            <div className="row">
                <div className="col-6">
                    <div className="card">
                        <CardHeader title="Disease Details" />

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
                                            <label htmlFor="name" className="form-label"> Disease Name <span className="text-danger">*</span></label>
                                            <input
                                                type="text"
                                                name="name"
                                                id="name"
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
                                        <label className="form-label">Disease image <span className="text-danger">*</span></label>
                                        <input
                                            type="file"
                                            name="image"
                                            className="form-control"
                                            onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
                                        />
                                        {disease?.image && (
                                            <img
                                                src={`/${disease.image}`}
                                                alt="Current"
                                                style={{ width: 100, marginTop: 10 }}
                                            />
                                        )}
                                        {errors.image && <div className="text-danger">{errors.image}</div>}

                                    </div>
                                </div>


                                <div className="col-12">
                                    <div className="mb-3">
                                        <label className="form-label">About Disease</label>
                                        <textarea
                                            name="description"
                                            className="form-control"
                                            rows="3"
                                            value={form.description}
                                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                                        />

                                    </div>
                                </div>
                                <FormSubmitButton isEditMode={isEditMode} cancelUrl="/admin/diseases" />
                            </form>
                        </div>
                    </div>

                </div>
            </div>

        </AuthenticatedLayout>

    )
}