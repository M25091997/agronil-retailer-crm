import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function CategoryIndex() {
    return (
        <>
            <AuthenticatedLayout>
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                            <h4 className="mb-sm-0 font-size-18">
                                Basic Elements
                            </h4>

                            <div className="page-title-right">
                                <ol className="breadcrumb m-0">
                                    <li className="breadcrumb-item">
                                        <a href="javascript: void(0);">Forms</a>
                                    </li>
                                    <li className="breadcrumb-item active">
                                        Basic Elements
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Textual inputs</h4>
                                <p className="card-title-desc">
                                    Here are examples of{" "}
                                    <code>.form-control</code> applied to each
                                    textual HTML5 <code>&lt;input&gt;</code>{" "}
                                    <code>type</code>.
                                </p>
                            </div>
                            <div className="card-body p-4">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div>
                                            <div className="mb-3">
                                                <label
                                                    for="example-text-input"
                                                    className="form-label"
                                                >
                                                    Text
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    value="Artisanal kale"
                                                    id="example-text-input"
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label
                                                    for="example-search-input"
                                                    className="form-label"
                                                >
                                                    Search
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="search"
                                                    value="How do I shoot web"
                                                    id="example-search-input"
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label
                                                    for="example-email-input"
                                                    className="form-label"
                                                >
                                                    Email
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="email"
                                                    value="bootstrap@example.com"
                                                    id="example-email-input"
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label
                                                    for="example-url-input"
                                                    className="form-label"
                                                >
                                                    URL
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="url"
                                                    value="https://getbootstrap.com"
                                                    id="example-url-input"
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label
                                                    for="example-tel-input"
                                                    className="form-label"
                                                >
                                                    Telephone
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="tel"
                                                    value="1-(555)-555-5555"
                                                    id="example-tel-input"
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label
                                                    for="example-password-input"
                                                    className="form-label"
                                                >
                                                    Password
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="password"
                                                    value="hunter2"
                                                    id="example-password-input"
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label
                                                    for="example-number-input"
                                                    className="form-label"
                                                >
                                                    Number
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="number"
                                                    value="42"
                                                    id="example-number-input"
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    for="example-datetime-local-input"
                                                    className="form-label"
                                                >
                                                    Date and time
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="datetime-local"
                                                    value="2019-08-19T13:45:00"
                                                    id="example-datetime-local-input"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-6">
                                        <div className="mt-3 mt-lg-0">
                                            <div className="mb-3">
                                                <label
                                                    for="example-date-input"
                                                    className="form-label"
                                                >
                                                    Date
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="date"
                                                    value="2019-08-19"
                                                    id="example-date-input"
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label
                                                    for="example-month-input"
                                                    className="form-label"
                                                >
                                                    Month
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="month"
                                                    value="2019-08"
                                                    id="example-month-input"
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label
                                                    for="example-week-input"
                                                    className="form-label"
                                                >
                                                    Week
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="week"
                                                    value="2019-W33"
                                                    id="example-week-input"
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label
                                                    for="example-time-input"
                                                    className="form-label"
                                                >
                                                    Time
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="time"
                                                    value="13:45:00"
                                                    id="example-time-input"
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label
                                                    for="example-color-input"
                                                    className="form-label"
                                                >
                                                    Color picker
                                                </label>
                                                <input
                                                    type="color"
                                                    className="form-control form-control-color mw-100"
                                                    id="example-color-input"
                                                    value="#5156be"
                                                    title="Choose your color"
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">
                                                    Select
                                                </label>
                                                <select className="form-select">
                                                    <option>Select</option>
                                                    <option>
                                                        Large select
                                                    </option>
                                                    <option>
                                                        Small select
                                                    </option>
                                                </select>
                                            </div>

                                            <div>
                                                <label
                                                    for="exampleDataList"
                                                    className="form-label"
                                                >
                                                    Datalists
                                                </label>
                                                <input
                                                    className="form-control"
                                                    list="datalistOptions"
                                                    id="exampleDataList"
                                                    placeholder="Type to search..."
                                                />
                                                <datalist id="datalistOptions">
                                                    <option value="San Francisco"></option>
                                                    <option value="New York"></option>
                                                    <option value="Seattle"></option>
                                                    <option value="Los Angeles"></option>
                                                    <option value="Chicago"></option>
                                                </datalist>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
