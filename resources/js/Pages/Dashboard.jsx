import axiosClient from "@/axiosClient";
import DashboardCard from "@/Components/Admin/DashboardCard";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";

export default function Dashboard() {

    const [dashboardData, setDashboardData] = useState({
        approvedRetailers: 0,
        pendingRetailers: 0,
        totalProducts: 0,
        superCategories: 0,
        OrderAmount: 0,
        receivedPayment: 0,
    });

    useEffect(() => {
        axiosClient.get('admin/dashboard-data')
            .then(({ data }) => {
                setDashboardData(data);
            })
            .catch(err => {
                console.error("Error fetching dashboard data:", err);
            });
    }, []);


    const { url } = usePage();

    useEffect(() => {
        if (url === "/dashboard" && !localStorage.getItem("dashboardFirstLoad")) {
            localStorage.setItem("dashboardFirstLoad", "true");
            window.location.reload();
        }
    }, [url]);

    return (
        <>
            <AuthenticatedLayout
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Dashboard
                    </h2>
                }
            >
                <Head title="Dashboard" />
                {/* <!-- start page title --> */}
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                            <h4 className="mb-sm-0 font-size-18">Dashboard</h4>

                            <div className="page-title-right">
                                <ol className="breadcrumb m-0">
                                    <li className="breadcrumb-item">
                                        <a href="javascript: void(0);">Minia</a>
                                    </li>
                                    <li className="breadcrumb-item active">
                                        Dashboard
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- end page title --> */}

                <div className="row">
                    <div className="col-xl-3 col-md-6">
                        <DashboardCard name="Total Approved Retailer" qty={dashboardData.approvedRetailers} bgcolor="#b084fd" />
                    </div>
                    <div className="col-xl-3 col-md-6">
                        <DashboardCard name="Total Pending Retailer" qty={dashboardData.pendingRetailers} bgcolor="#ff9cbe" />
                    </div>
                    <div className="col-xl-3 col-md-6">
                        <DashboardCard name="Total Products" qty={dashboardData.totalProducts} bgcolor="#4CAF50" />
                    </div>
                    <div className="col-xl-3 col-md-6">
                        <DashboardCard name="Super Category" qty={dashboardData.superCategories} bgcolor="#2196F3" />
                    </div>

                    <div className="col-xl-3 col-md-6">
                        {/* <!-- card --> */}
                        <div className="card card-h-100" style={{ backgroundColor: '#CDDC39', color: "#fff" }}>
                            {/* <!-- card body --> */}
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col-6">
                                        <span className="text-muted mb-3 lh-1 d-block text-truncate">
                                            Total Sales Order
                                        </span>
                                        <h4 className="mb-3">
                                            <span
                                                className="counter-value"
                                                data-target="6258"
                                            >
                                                ₹ {dashboardData.OrderAmount}
                                            </span>
                                        </h4>
                                    </div>
                                    <div className="col-6">
                                        <div
                                            id="mini-chart2"
                                            data-colors='["#4bee53ff"]'
                                            className="apex-charts mb-2"
                                        ></div>
                                    </div>
                                </div>
                                <div className="text-nowrap">
                                    <span className="badge badge-soft-success ">
                                        ₹ {dashboardData.receivedPayment}
                                    </span>
                                    <span className="ms-1 text-muted font-size-13">
                                        Received Payment
                                    </span>
                                </div>
                            </div>
                            {/* <!-- end card body --> */}
                        </div>
                        {/* <!-- end card --> */}
                    </div>
                    {/* <!-- end col--> */}
                </div>
            </AuthenticatedLayout>
        </>
    );
}
