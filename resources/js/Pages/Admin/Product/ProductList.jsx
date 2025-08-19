import CardHeader from "@/Components/Admin/CardHeader";
import PageHeader from "@/Components/Admin/PageHeader";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import { Badge } from "react-bootstrap"

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
                                        <th>Unit</th>
                                        <th>Brand </th>
                                        <th>Diseases </th>
                                        <th>HSN Code </th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productList.map((product, index) => (
                                        <tr key={product.id}>
                                            <td>{index + 1}</td>
                                            <td>{product.sku}</td>
                                            <td>{product.name}</td>
                                            <td>
                                                {product.images[0] && (
                                                    <img
                                                        src={product.images[0].image_path}
                                                        alt={product.name}
                                                        width="100"
                                                        height="100"
                                                    />
                                                )}
                                            </td>
                                            <td>{product.category}</td>
                                            <td>{product.base_unit}</td>
                                            <td>{product.brand}</td>
                                            <td>{product.disease}</td>
                                            <td>{product.hsn_code}</td>
                                            <td> <Badge bg={product.is_active ? 'success' : 'secondary'}>{product.is_active ? 'Active' : 'Disabled'}</Badge></td>
                                            {/* <td>{new Date(product.created_at).toLocaleDateString()}</td> */}
                                            <td>
                                                <Link href={`/admin/products/${product.id}/edit`}>
                                                    <button className="btn btn-sm btn-primary me-1">Edit</button>
                                                </Link>
                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => handleDelete(product.id)}
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