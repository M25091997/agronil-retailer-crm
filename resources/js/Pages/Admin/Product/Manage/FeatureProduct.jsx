import axiosClient from "@/axiosClient";
import CardHeader from "@/Components/Admin/CardHeader";
import PageHeader from "@/Components/Admin/PageHeader";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import { Badge } from "react-bootstrap"
import { toast } from "react-toastify";

export default function FeatureProduct({ products }) {

    const [productList, setProductList] = useState(products)

    const handleStatus = async (key, value, productId) => {
        try {
            const response = await axiosClient.put(`/admin/manage/update-status/${productId}`, {
                [key]: !value,
            });

            if (response.data.status) {
                toast.success(response.data?.message)

                // setProductList(productList.map((prod) =>
                //     // prod.id === productId ? response.data.product : prod
                //     prod.id === productId ? { ...prod, [key]: !value } : prod
                // ));
                setProductList(productList.filter(prod => prod.id !== productId));
            }

        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
            console.error('Error response:', error.response.data);
        }
    };


    return (
        <AuthenticatedLayout>
            <PageHeader title="Feature Product" menu="Product" />

            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <CardHeader title="Product List" url="#" />

                        <div className="card-body">
                            <table id="datatable-buttons" className="table table-bordered dt-responsive nowrap w-100">
                                <thead>
                                    <tr>
                                        <th>Sno</th>
                                        <th>SKU</th>
                                        <th>Product Name</th>
                                        <th>Image</th>
                                        <th>Status</th>
                                        <th>Category </th>
                                        <th>Brand </th>
                                        <th>Diseases </th>
                                        <th>HSN Code </th>
                                        <th>Status</th>

                                        {/* <th>Stock</th> */}
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
                                            <td> <Badge bg={product.is_active ? 'success' : 'secondary'}>{product.is_active ? 'Active' : 'Disabled'}</Badge></td>
                                            <td>{product.category}/{product.sub_category}</td>
                                            <td>{product.brand}</td>
                                            <td>{product.disease}</td>
                                            <td>{product.hsn_code}</td>

                                            <td>
                                                <div className="square-switch">
                                                    <input type="checkbox" id={`featured${product.id}`} switch="bool" onChange={() => handleStatus('featured', product.featured, product.id)} checked={product.featured} />
                                                    <label htmlFor={`featured${product.id}`} data-on-label="Yes" data-off-label="No"></label>
                                                </div>
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