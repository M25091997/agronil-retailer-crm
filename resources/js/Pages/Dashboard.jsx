import DashboardCard from "@/Components/Admin/DashboardCard";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard() {
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
                        <DashboardCard name="Category" qty="10" />
                    </div>
                    <div className="col-xl-3 col-md-6">
                        <DashboardCard name="Product" qty="10" />
                    </div>
                    <div className="col-xl-3 col-md-6">
                        <DashboardCard name="Retailer" qty="10" />
                    </div>
                    <div className="col-xl-3 col-md-6">
                        <DashboardCard name="Super Category" qty="10" />
                    </div>

                    <div className="col-xl-3 col-md-6">
                        {/* <!-- card --> */}
                        <div className="card card-h-100">
                            {/* <!-- card body --> */}
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col-6">
                                        <span className="text-muted mb-3 lh-1 d-block text-truncate">
                                            Number of Trades
                                        </span>
                                        <h4 className="mb-3">
                                            <span
                                                className="counter-value"
                                                data-target="6258"
                                            >
                                                0
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
                                    <span className="badge badge-soft-danger text-danger">
                                        -29 Trades
                                    </span>
                                    <span className="ms-1 text-muted font-size-13">
                                        Since last week
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
