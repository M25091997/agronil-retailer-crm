import axiosClient from "@/axiosClient";
import CardHeader from "@/Components/Admin/CardHeader";
import PageHeader from "@/Components/Admin/PageHeader";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import Badge from 'react-bootstrap/Badge';
import { toast } from 'react-toastify';

export default function HomeBannerList({ banners }) {

    const [bannerList, setBannerList] = useState(banners);

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this banner image?')) return;

        try {
            await axiosClient.delete(`/admin/home-banners/${id}`);

            setBannerList(bannerList.filter(item => item.id !== id));
            toast.success('Banner deleted successfully.');
        } catch (error) {
            console.error('Delete error:', error);
            toast.error('Failed to delete banner.');

        }
    };


    return (
        <AuthenticatedLayout>
            <PageHeader title="Home Banner" menu="Slider" />
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <CardHeader title={'Home Banner'} btnName="Add Banner" url="/admin/home-banners/create" />
                    </div>


                    <div className="card-body">
                        <table id="datatable-buttons" className="table table-bordered dt-responsive nowrap w-100">
                            <thead>
                                <tr>
                                    <th>Sno</th>
                                    <th>Title</th>
                                    <th>Banner</th>
                                    <th>Category</th>
                                    <th>Description</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bannerList.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>{item.title}</td>
                                        <td>
                                            {item.image && (
                                                <img
                                                    src={`/${item.image}`}
                                                    alt={item.name}
                                                    width="200"
                                                    height="100"
                                                />
                                            )}
                                        </td>
                                        <td>{item.category?.name}</td>
                                        <td>{item.description}</td>
                                        <td> <Badge bg={item.is_active ? 'success' : 'secondary'}>{item.is_active ? 'Active' : 'Disabled'}</Badge></td>
                                        {/* <td>{new Date(item.created_at).toLocaleDateString()}</td> */}
                                        <td>
                                            <Link href={`/admin/home-banners/${item.id}/edit`}>
                                                <button className="btn btn-sm btn-primary me-1">Edit</button>
                                            </Link>
                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => handleDelete(item.id)}
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