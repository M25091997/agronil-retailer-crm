import { Link, router } from "@inertiajs/react";
import { Bell, CircleArrowRight, LayoutGrid, Moon, Search, Settings, Sun } from "lucide-react";
import { useState } from "react";
export default function NavBar() {
    const [open, setOpen] = useState(false);

    const logoutHandle = () => {
        router.post('/logout');
    };


    return (
        <div className="navbar-header">
            <div className="d-flex">
                {/* <!-- LOGO --> */}
                <div className="navbar-brand-box">
                    <Link href="/dashboard" className="logo logo-dark">
                        <span className="logo-sm">
                            <img src="assets/images/logo-sm.svg" alt="" height="24" />
                        </span>
                        <span className="logo-lg">
                            <img src="assets/images/logo-sm.svg" alt="" height="24" /> <span className="logo-txt">AGRINOSTAR</span>
                        </span>
                    </Link>

                    <Link href="/dashboard" className="logo logo-light">
                        <span className="logo-sm">
                            <img src="assets/images/logo-sm.svg" alt="" height="24" />
                        </span>
                        <span className="logo-lg">
                            <img src="assets/images/logo-sm.svg" alt="" height="24" /> <span className="logo-txt">AGRINOSTAR </span>
                        </span>
                    </Link>
                </div>

                <button type="button" className="btn btn-sm px-3 font-size-16 header-item" id="vertical-menu-btn">
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

                <div className="dropdown d-none d-sm-inline-block">
                    <button type="button" className="btn header-item waves-effect" data-bs-toggle="dropdown" aria-haspopup="true"
                        aria-expanded="false">

                        <img className="me-2" src="assets/images/flags/us.jpg" alt="Header Language" height="16" />

                    </button>
                    <div className="dropdown-menu dropdown-menu-end">

                        {/* <!-- item--> */}
                        <a href="?lang=en" className="dropdown-item notify-item language">
                            <img src="assets/images/flags/us.jpg" alt="user-image" className="me-1" height="12" /> <span className="align-middle"> English </span>
                        </a>

                    </div>
                </div>

                <div className="dropdown d-none d-sm-inline-block">
                    <button type="button" className="btn header-item" id="mode-setting-btn">
                        {/* <i data-feather="moon" className="icon-lg layout-mode-dark"></i> */}
                        {/* <i data-feather="sun" className="icon-lg layout-mode-light"></i> */}
                        <Sun className="icon-lg layout-mode-dark" />
                        <Moon className="icon-lg layout-mode-light" />
                    </button>
                </div>

                <div className="dropdown d-none d-lg-inline-block ms-1">
                    <button type="button" className="btn header-item"
                        data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {/* <i data-feather="grid" className="icon-lg"></i>
                                     */}
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
                </div>

                <div className="dropdown d-inline-block">
                    <button type="button" className="btn header-item noti-icon position-relative" id="page-header-notifications-dropdown"
                        data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {/* <i data-feather="bell" className="icon-lg"></i> */}
                        <Bell className="icon-lg" />
                        <span className="badge bg-danger rounded-pill" style={{ top: '-12px' }}>5</span>
                    </button>
                    <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                        aria-labelledby="page-header-notifications-dropdown">
                        <div className="p-3">
                            <div className="row align-items-center">
                                <div className="col">
                                    <h6 className="m-0"> Notifications </h6>
                                </div>
                                <div className="col-auto">
                                    <a href="#!" className="small text-reset text-decoration-underline"> alert (1)</a>
                                </div>
                            </div>
                        </div>
                        <div data-simplebar style={{ maxHeight: '230px' }}>
                            <a href="#!" className="text-reset notification-item">
                                <div className="d-flex">
                                    <div className="flex-shrink-0 me-3">
                                        <img src="assets/images/users/avatar-3.jpg" className="rounded-circle avatar-sm" alt="user-pic" />
                                    </div>
                                    <div className="flex-grow-1">
                                        <h6 className="mb-1">etwet</h6>
                                        <div className="font-size-13 text-muted">
                                            <p className="mb-1">456</p>
                                            <p className="mb-0"><i className="mdi mdi-clock-outline"></i> <span>1h ago</span></p>
                                        </div>
                                    </div>
                                </div>
                            </a>

                        </div>
                        <div className="p-2 border-top d-grid">
                            <a className="btn btn-sm btn-link font-size-14 text-center" href="javascript:void(0)">
                                {/* <i className="mdi mdi-arrow-right-circle me-1"></i> */}
                                <CircleArrowRight className="me-1" />  <span>View More</span>
                            </a>
                        </div>
                    </div>
                </div>

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
                            src="assets/images/users/avatar-1.jpg"
                            alt="Header Avatar"
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