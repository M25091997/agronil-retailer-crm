import axiosClient from "@/axiosClient";
import { Link } from "@inertiajs/react";
import React, { useState } from 'react';
import { router } from '@inertiajs/react';

export default function Navbar({ onChange }) {
    const [open, setOpen] = useState(false);

    const logoutHandle = () => {
        router.post('/logout');
    };


    return (
        <div className="navbar-header">
            <div className="d-flex">
                {/* <!-- LOGO --> */}
                <div className="navbar-brand-box">
                    {/* <!-- dark mode --> */}
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

                    {/* <!-- light mode --> */}
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
                    onClick={onChange}>
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

                <div className="dropdown d-inline-block">
                    <button type="button" className="btn header-item right-bar-toggle me-2">
                        <i data-feather="settings" className="icon-lg"></i>
                    </button>
                </div>

                <div className="dropdown d-inline-block">
                    <button
                        type="button"
                        className={`btn header-item topbar-light bg-light-subtle border-start border-end ${open ? 'show' : ''}`}
                        onClick={() => setOpen(!open)}
                    >
                        <img
                            className="rounded-circle header-profile-user"
                            src="assets/images/users/avatar-1.jpg"
                            alt="Header Avatar"
                        />
                        <span className="d-none d-xl-inline-block ms-1 fw-medium">Shawn L.</span>
                        <i className="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
                    </button>

                    <div className={`dropdown-menu dropdown-menu-end ${open ? 'show' : ''}`}>
                        <a className="dropdown-item" href="apps-contacts-profile.php">
                            <i className="mdi mdi-face-man font-size-16 align-middle me-1"></i> Profile
                        </a>
                        <a className="dropdown-item" href="auth-lock-screen.php">
                            <i className="mdi mdi-lock font-size-16 align-middle me-1"></i> Lock screen
                        </a>
                        <div className="dropdown-divider"></div>
                        <button className="dropdown-item" href="#" onClick={logoutHandle}>
                            <i className="mdi mdi-logout font-size-16 align-middle me-1"></i> Logout
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
