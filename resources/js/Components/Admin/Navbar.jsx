import { Link } from "@inertiajs/react";

export default function Navbar() {
    return (
        <div className="navbar-header">
            <div className="d-flex">
                {/* <!-- LOGO --> */}
                <div className="navbar-brand-box">
                    <a href="{{('dashboard') }}" className="logo logo-dark">
                        <span className="logo-sm">
                            <img
                                src="{{asset('public/logo.webp')}}"
                                alt=""
                                height="24"
                            />
                        </span>
                        <span className="logo-lg">
                            <img
                                src="{{asset('public/logo.webp')}}"
                                alt=""
                                height="24"
                            />{" "}
                            <span className="logo-txt">AGRONIL RETAILER</span>
                        </span>
                    </a>

                    <a href="{{('dashboard') }}" className="logo logo-light">
                        <span className="logo-sm">
                            <img
                                src="{{asset('public/logo.webp')}}"
                                alt=""
                                height="24"
                            />
                        </span>
                        <span className="logo-lg">
                            <img
                                src="{{asset('public/logo.webp')}}"
                                alt=""
                                height="24"
                            />{" "}
                            <span className="logo-txt">AGRONIL RETAILER</span>
                        </span>
                    </a>
                </div>

                <button
                    type="button"
                    className="btn btn-sm px-3 font-size-16 header-item"
                    id="vertical-menu-btn"
                >
                    <i className="fa fa-fw fa-bars"></i>
                </button>

                {/* <!-- App Search--> */}
                <form className="app-search d-none d-lg-block">
                    <div className="position-relative">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search"
                        />
                        <button className="btn btn-primary" type="button">
                            <i className="bx bx-search-alt align-middle"></i>
                        </button>
                    </div>
                </form>
            </div>

            <div className="d-flex">
                <div className="dropdown d-none d-sm-inline-block">
                    <button
                        type="button"
                        className="btn header-item"
                        id="mode-setting-btn"
                    >
                        <i
                            data-feather="moon"
                            className="icon-lg layout-mode-dark"
                        ></i>
                        <i
                            data-feather="sun"
                            className="icon-lg layout-mode-light"
                        ></i>
                    </button>
                </div>

                {/* <!-- <div className="dropdown d-inline-block">
                <button type="button" className="btn header-item right-bar-toggle me-2">
                    <i data-feather="settings" className="icon-lg"></i>
                </button>
            </div> --> */}

                <div className="dropdown d-inline-block">
                    <button
                        type="button"
                        className="btn header-item topbar-light bg-light-subtle border-start border-end"
                        id="page-header-user-dropdown"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        <img
                            className="rounded-circle header-profile-user"
                            src="asset('public/admin/assets/images/users/profile.png"
                            alt="Header Avatar"
                        />
                        {/* <span className="d-none d-xl-inline-block ms-1 fw-medium">
                                Admin
                            </span> */}
                        {/* <i className="mdi mdi-chevron-down d-none d-xl-inline-block"></i> */}
                    </button>
                    <div className="dropdown-menu dropdown-menu-end">
                        {/* Profile item */}
                        <a
                            href="#"
                            className="dropdown-item"
                            onClick={(e) => {
                                e.preventDefault();
                                // Handle profile click
                            }}
                        >
                            <i className="mdi mdi-face-man font-size-16 align-middle me-1"></i>
                            Profile
                        </a>

                        {/* Logout item */}
                        <a
                            href="#"
                            className="dropdown-item"
                            onClick={(e) => {
                                e.preventDefault();
                                // Handle logout click
                            }}
                        >
                            <i className="mdi mdi-lock font-size-16 align-middle me-1"></i>
                            Logout
                        </a>

                        <div className="dropdown-divider"></div>

                        <form method="POST" action=""></form>
                    </div>

                </div>
            </div>
        </div>
    );
}
