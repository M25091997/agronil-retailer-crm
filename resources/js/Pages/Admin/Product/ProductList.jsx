import CardHeader from "@/Components/Admin/CardHeader";
import PageHeader from "@/Components/Admin/PageHeader";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";

export default function ProductList({ products }) {

    const [productList, setProductList] = useState(products)
    return (
        <AuthenticatedLayout>
            <PageHeader title="All Product" menu="Product" />

            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <CardHeader title="Product List" btnName="Add Product" url="/admin/products/create" />

                        <div className="card-body">
                            <table id="datatable-buttons" className="table table-bordered dt-responsive nowrap w-100">
                                <thead>
                                    <tr>
                                        <th>Sno</th>
                                        <th>SKU</th>
                                        <th>Product Name</th>
                                        <th>Image</th>
                                        <th>Category </th>
                                        <th>Type</th>
                                        <th>Brand </th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productList.map((diseases, index) => (
                                        <tr key={diseases.id}>
                                            <td>{index + 1}</td>
                                            <td>{diseases.name}</td>
                                            <td>
                                                {diseases.image && (
                                                    <img
                                                        src={`/${diseases.image}`}
                                                        alt={diseases.name}
                                                        width="100"
                                                        height="100"
                                                    />
                                                )}
                                            </td>
                                            <td>{diseases.category?.name}</td>
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