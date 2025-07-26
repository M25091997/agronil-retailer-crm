import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Plus } from "lucide-react";
import { Link } from "@inertiajs/react";
import { useEffect, useState } from 'react';
import axiosClient from "@/axiosClient";
import PageHeader from "@/Components/Admin/PageHeader";
import { toast } from 'react-toastify';
import CardHeader from "@/Components/Admin/CardHeader";

export default function CategoryList({ categories }) {
    const [categoryList, setCategoryList] = useState(categories);

    // const [categories, setCategories] = useState([]);



    // useEffect(() => {
    //     axiosClient.get('/admin/categories')
    //         .then(response => {
    //             setCategories(response.data.categories); // update according to your API response
    //         })
    //         .catch(error => {
    //             console.error('Error fetching categories:', error);
    //         });

    // }, []);


    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this category?')) return;

        try {
            await axiosClient.delete(`/admin/categories/${id}`);
            // alert('Category deleted successfully.');
            toast.success('Category deleted successfully');

            // Update the list by removing the deleted item
            setCategoryList(categoryList.filter(cat => cat.id !== id));
        } catch (error) {
            console.error('Delete error:', error);
            alert('Failed to delete category.');
        }
    };



    return (
        <AuthenticatedLayout>
            <PageHeader title="Category" menu="Product" />


            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <CardHeader title={'Category List'} btnName="Add Category" url="/admin/categories/create" />
                    </div>


                    <div className="card-body">
                        <table id="datatable-buttons" className="table table-bordered dt-responsive nowrap w-100">
                            <thead>
                                <tr>
                                    <th>Sno</th>
                                    <th>Category Name</th>
                                    <th>Icon</th>
                                    <th>Description</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categoryList.map((category, index) => (
                                    <tr key={category.id}>
                                        <td>{index + 1}</td>
                                        <td>{category.name}</td>
                                        <td>
                                            {category.image && (
                                                <img
                                                    src={`/${category.image}`}  // e.g., "uploads/categories/my-icon.png"
                                                    alt={category.name}
                                                    width="100"
                                                    height="100"
                                                />
                                            )}
                                        </td>
                                        <td>{category.description}</td>
                                        <td>{new Date(category.created_at).toLocaleDateString()}</td>
                                        <td>
                                            <Link href={`/admin/categories/${category.id}/edit`}>
                                                <button className="btn btn-sm btn-primary me-1">Edit</button>
                                            </Link>
                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => handleDelete(category.id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
