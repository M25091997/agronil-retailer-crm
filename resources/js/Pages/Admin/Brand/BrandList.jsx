import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Plus } from "lucide-react";
import { Link } from "@inertiajs/react";
import { useEffect, useState } from 'react';
import axiosClient from "@/axiosClient";
import PageHeader from "@/Components/Admin/PageHeader";

export default function BrandList({ brands }) {
    const [brandList, setBrandList] = useState(brands);


    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this brand name?')) return;

        try {
            await axiosClient.delete(`/admin/brands/${id}`);
            alert('Brand name deleted successfully.');

            // Update the list by removing the deleted item
            setBrandList(brandList.filter(item => item.id !== id));
        } catch (error) {
            console.error('Delete error:', error);
            alert('Failed to delete brand.');
        }
    };



    return (
        <AuthenticatedLayout>
            <PageHeader title="Brands" menu="Product" />


            <div className="row">
                <div className="col-12">

                    <div className="card">
                        <div className="card-header align-items-center d-flex">
                            <h4 className="card-title mb-0 flex-grow-1">Brand List</h4>
                            <div className="flex-shrink-0">
                                <div className="d-flex flex-wrap gap-2 mb-0 my-n1">
                                    <Link href="/admin/brands/create">
                                        <button type="button" className="btn btn-dark waves-effect waves-light d-flex align-items-center gap-1">
                                            <Plus size={16} />
                                            Add Brand
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
                                    <th>Brand Name</th>
                                    <th>Category Name</th>
                                    <th>Icon</th>
                                    <th>Description</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {brandList.map((brand, index) => (
                                    <tr key={brand.id}>
                                        <td>{index + 1}</td>
                                        <td>{brand.name}</td>
                                        <td>{brand.name}</td>
                                        <td>
                                            {brand.image && (
                                                <img
                                                    src={brand.image}
                                                    alt={brand.name}
                                                    width="100"
                                                    height="100"
                                                />
                                            )}
                                        </td>
                                        <td>{brand.description}</td>
                                        <td>{new Date(brand.created_at).toLocaleDateString()}</td>
                                        <td>
                                            <Link href={`/admin/brands/${brand.id}/edit`}>
                                                <button className="btn btn-sm btn-primary me-1">Edit</button>
                                            </Link>
                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => handleDelete(brand.id)}
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
