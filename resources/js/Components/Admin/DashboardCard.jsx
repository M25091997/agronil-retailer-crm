export default function DashboardCard({ name, qty }) {
    return (
        <div className="card card-h-100">
            {/* <!-- card body --> */}
            <div className="card-body">
                <div className="row align-items-center">
                    <div className="col-6">
                        <span className="text-muted mb-3 lh-1 d-block text-truncate">
                            {name}
                        </span>
                        <h4 className="mb-3">
                            <span className="counter-value" data-target={qty}>
                                {qty}
                            </span>
                        </h4>
                    </div>
                </div>
                <div className="text-nowrap"></div>
            </div>
            {/* <!-- end card body --> */}
        </div>
    );
}
