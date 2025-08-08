import Navbar from "@/Components/Admin/NavBar";
import SideMenu from "@/Components/Admin/SideMenu";

import { useState } from "react";

export default function AuthenticatedLayout({ children }) {

    return (
        <>
            <div id="layout-wrapper">
                <header id="page-topbar">
                    <Navbar />
                </header>

                {/* <!-- ========== Left Sidebar Start ========== --> */}
                <div className="vertical-menu">
                    <div data-simplebar className="h-100">
                        {/* <!--- Sidemenu --> */}
                        <SideMenu />
                        {/* <!-- Sidebar --> */}
                    </div>
                </div>

                <div className="main-content">
                    <div className="page-content">
                        <div className="container-fluid">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}
