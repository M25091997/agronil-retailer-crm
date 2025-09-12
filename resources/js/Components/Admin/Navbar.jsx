import { Link, router } from "@inertiajs/react";
import { Bell, CircleArrowRight, LayoutGrid, Moon, Search, Settings, Sun } from "lucide-react";
import { useState } from "react";
import NotificationDropdown from "./NotificationDropdown";
export default function NavBar({ mobileMenu, setMobileMenu }) {
    const [open, setOpen] = useState(false);
    const [notification, setNotification] = useState(false);

    const logoutHandle = () => {
        router.post('/logout');
    };

    const handleNotificationIcon = () => {
        setNotification(!notification);
    };

    return (
        <div className="navbar-header">
            <div className="d-flex">
                {/* <!-- LOGO --> */}
                <div className="navbar-brand-box">
                    <Link href="/dashboard" className="logo logo-dark">
                        <span className="logo-sm">
                            <img src={BASE_URL + '/admin/assets/images/logo-sm.svg'} alt="logo" height="24" />
                        </span>
                        <span className="logo-lg">
                            <img src={BASE_URL + '/admin/assets/images/logo-sm.svg'} alt="logo" height="24" /> <span className="logo-txt">AGRINOSTAR</span>
                        </span>
                    </Link>

                    <Link href="/dashboard" className="logo logo-light">
                        <span className="logo-sm">
                            <img src={BASE_URL + '/admin/assets/images/logo-sm.svg'} alt="logo" height="24" />
                        </span>
                        <span className="logo-lg">
                            <img src={BASE_URL + '/admin/assets/images/logo-sm.svg'} alt="logo" height="24" /> <span className="logo-txt">AGRINOSTAR </span>
                        </span>
                    </Link>
                </div>

                {/* Desktop toggle button */}
                <button
                    type="button"
                    className="btn btn-sm px-3 font-size-16 header-item d-none d-lg-block"
                    id="vertical-menu-btn-desktop"
                    onClick={() => setMobileMenu(!mobileMenu)}
                >
                    <i className="fa fa-fw fa-bars"></i>
                </button>

                {/* Mobile/Tablet toggle button */}
                <button
                    type="button"
                    className="btn btn-sm px-3 font-size-16 header-item d-block d-lg-none"
                    id="vertical-menu-btn-mobile"
                    onClick={() => setMobileMenu(!mobileMenu)}
                >
                    <i className="fa fa-fw fa-bars"></i>
                </button>


                {/* <!-- App Search--> */}
                <form className="app-search d-none d-lg-block">
                    <div className="position-relative">
                        <input type="text" className="form-control" placeholder="Search" />
                        <button className="btn btn-primary" type="button"><i className="bx bx-search-alt align-middle"></i></button>
                    </div>
                </form>
            </div>

            <div className="d-flex">

                <div className="dropdown d-inline-block d-lg-none ms-2">
                    <button type="button" className="btn header-item" id="page-header-search-dropdown"
                        data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {/* <i data-feather="search" className="icon-lg"></i> */}
                        <Search className="icon-lg" />
                    </button>
                    <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                        aria-labelledby="page-header-search-dropdown">

                        <form className="p-3">
                            <div className="form-group m-0">
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="Search" aria-label="Search Result" />

                                    <button className="btn btn-primary" type="submit"><Search /></button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                {/* 
                <div className="dropdown d-none d-sm-inline-block">
                    <button type="button" className="btn header-item waves-effect" data-bs-toggle="dropdown" aria-haspopup="true"
                        aria-expanded="false">

                        <img className="me-2" src={BASE_URL + '/admin/assets/images/flags/us.jpg'} alt="Header Language" height="16" />

                    </button>
                    <div className="dropdown-menu dropdown-menu-end">

                 
                        <a href="?lang=en" className="dropdown-item notify-item language">
                            <img src={BASE_URL + '/admin/assets/images/flags/us.jpg'} alt="flag" className="me-1" height="12" /> <span className="align-middle"> English </span>
                        </a>

                    </div>
                </div> */}

                <div className="dropdown d-none d-sm-inline-block">
                    <button type="button" className="btn header-item" id="mode-setting-btn">
                        {/* <i data-feather="moon" className="icon-lg layout-mode-dark"></i> */}
                        {/* <i data-feather="sun" className="icon-lg layout-mode-light"></i> */}
                        <Sun className="icon-lg layout-mode-dark" />
                        <Moon className="icon-lg layout-mode-light" />
                    </button>
                </div>

                {/* <div className="dropdown d-none d-lg-inline-block ms-1">
                    <button type="button" className="btn header-item"
                        data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                     
                        <LayoutGrid className="icon-lg" />
                    </button>
                    <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end">
                        <div className="p-2">
                            <div className="row g-0">
                                <div className="col">
                                    <a className="dropdown-icon-item" href="#">
                                        <img src="assets/images/brands/github.png" alt="Github" />
                                        <span>GitHub</span>
                                    </a>
                                </div>
                                <div className="col">
                                    <a className="dropdown-icon-item" href="#">
                                        <img src="assets/images/brands/bitbucket.png" alt="bitbucket" />
                                        <span>Bitbucket</span>
                                    </a>
                                </div>
                                <div className="col">
                                    <a className="dropdown-icon-item" href="#">
                                        <img src="assets/images/brands/dribbble.png" alt="dribbble" />
                                        <span>Dribbble</span>
                                    </a>
                                </div>
                            </div>

                            <div className="row g-0">
                                <div className="col">
                                    <a className="dropdown-icon-item" href="#">
                                        <img src="assets/images/brands/dropbox.png" alt="dropbox" />
                                        <span>Dropbox</span>
                                    </a>
                                </div>

                            </div>
                        </div>
                    </div>
                </div> */}

                <NotificationDropdown />

                <div className="dropdown d-inline-block">
                    <button type="button" className="btn header-item right-bar-toggle me-2">
                        {/* <i data-feather="settings" className="icon-lg"></i> */}
                        <Settings className="icon-lg" />
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
                            src={BASE_URL + '/admin/assets/images/users/avatar-1.jpg'}
                            alt="user-pic"
                        />
                        <span className="d-none d-xl-inline-block ms-1 fw-medium">Admin</span>
                        <i className="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
                    </button>

                    <div className={`dropdown-menu dropdown-menu-end ${open ? 'show' : ''}`}>
                        <Link className="dropdown-item" href="#">
                            <i className="mdi mdi-face-man font-size-16 align-middle me-1"></i> Profile
                        </Link>
                        <Link className="dropdown-item" href="#">
                            <i className="mdi mdi-lock font-size-16 align-middle me-1"></i> Lock screen
                        </Link>
                        <div className="dropdown-divider"></div>
                        <button className="dropdown-item" href="#" onClick={logoutHandle}>
                            <i className="mdi mdi-logout font-size-16 align-middle me-1"></i> Logout
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}