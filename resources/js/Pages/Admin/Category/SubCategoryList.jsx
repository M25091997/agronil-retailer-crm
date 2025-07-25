import axiosClient from "@/axiosClient";
import PageHeader from "@/Components/Admin/PageHeader";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function SubCategoryList({ subCategories }) {

    const [subCategoryList, setSubCategoryList] = useState(subCategories);

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this sub category?')) return;

        try {
            await axiosClient.delete(`/admin/sub-categories/${id}`);
            alert('Sub Category deleted successfully.');

            // Update the list by removing the deleted item
            setSubCategoryList(subCategoryList.filter(cat => cat.id !== id));
        } catch (error) {
            console.error('Delete error:', error);
            alert('Failed to delete category.');
        }
    }

    return (
        <AuthenticatedLayout>
            <PageHeader title="Sub-Category" menu="Product" />
            <div className="row">
                <div className="col-12">

                    <div className="card">
                        <div className="card-header align-items-center d-flex">
                            <h4 className="card-title mb-0 flex-grow-1">Sub Category List</h4>
                            <div className="flex-shrink-0">
                                <div className="d-flex flex-wrap gap-2 mb-0 my-n1">
                                    <Link href="/admin/sub-categories/create">
                                        <button type="button" className="btn btn-dark waves-effect waves-light d-flex align-items-center gap-1">
                                            <Plus size={16} />
                                            Add Sub Category
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="card-body">
                        <table id="datatable-buttons" className="table table-bordered dt-responsive nowrap w-100">
                            <thead>
                                <tr>
                                    <th>Sno</th>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Icon</th>
                                    <th>Description</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {subCategoryList.map((single, index) => (
                                    <tr key={single.id}>
                                        <td>{index + 1}</td>
                                        <td>{single.name}</td>
                                        <td>{single.category?.name}</td>
                                        <td>
                                            {single.image && (
                                                <img
                                                    src={`/${single.image}`}  // e.g., "uploads/categories/my-icon.png"
                                                    alt={single.name}
                                                    width="100"
                                                    height="100"
                                                />
                                            )}
                                        </td>
                                        <td>{single.description}</td>
                                        <td>{new Date(single.created_at).toLocaleDateString()}</td>
                                        <td>
                                            <Link href={`/admin/sub-categories/${single.id}/edit`}>
                                                <button className="btn btn-sm btn-primary me-1">Edit</button>
                                            </Link>
                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => handleDelete(single.id)}
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

    )
}