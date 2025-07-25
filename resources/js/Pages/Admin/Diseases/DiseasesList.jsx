import CardHeader from "@/Components/Admin/CardHeader";
import PageHeader from "@/Components/Admin/PageHeader";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import { useState } from "react";

export default function DiseasesList({ diseases }) {

    const [diseasesList, setDiseasesList] = useState(diseases)


    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this brand name?')) return;

        try {
            await axiosClient.delete(`/admin/diseases/${id}`);
            alert('Brand name deleted successfully.');

            // Update the list by removing the deleted item
            setDiseasesList(diseasesList.filter(item => item.id !== id));
        } catch (error) {
            console.error('Delete error:', error);
            alert('Failed to delete brand.');
        }
    };


    return (
        <AuthenticatedLayout>
            <PageHeader title="Disease" menu="Product" />
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <CardHeader title="Disease List" btnName="Add Disease" url="/admin/diseases/create" />

                        <div className="card-body">
                            <table id="datatable-buttons" className="table table-bordered dt-responsive nowrap w-100">
                                <thead>
                                    <tr>
                                        <th>Sno</th>
                                        <th>Disease Name</th>
                                        <th>Category </th>
                                        <th>Description</th>
                                        <th>Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {diseasesList.map((diseases, index) => (
                                        <tr key={diseases.id}>
                                            <td>{index + 1}</td>
                                            <td>{diseases.name}</td>
                                            <td>{diseases.name}</td>
                                            <td>{diseases.description}</td>
                                            <td>{new Date(diseases.created_at).toLocaleDateString()}</td>
                                            <td>
                                                <Link href={`/admin/diseases/${diseases.id}/edit`}>
                                                    <button className="btn btn-sm btn-primary me-1">Edit</button>
                                                </Link>
                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => handleDelete(diseases.id)}
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
            </div>

        </AuthenticatedLayout>
    )
}