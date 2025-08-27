import Navbar from "@/Components/Admin/NavBar";
import SideMenu from "@/Components/Admin/SideMenu";

import { useEffect, useState } from "react";

export default function AuthenticatedLayout({ children }) {
    const [mobileMenu, setMobileMenu] = useState(false); // false by default

    useEffect(() => {
        const body = document.body;

        if (mobileMenu) {
            body.classList.add("sidebar-enable");
        } else {
            body.classList.remove("sidebar-enable");
        }

        // Cleanup (just in case)
        return () => {
            body.classList.remove("sidebar-enable");
        };
    }, [mobileMenu]);

    return (
        <>
            <div id="layout-wrapper">
                <header id="page-topbar">
                    {/* Pass both state and setter so Navbar can toggle */}
                    <Navbar mobileMenu={mobileMenu} setMobileMenu={setMobileMenu} />
                </header>

                {/* <!-- ========== Left Sidebar Start ========== --> */}
                <div className="vertical-menu">
                    <div data-simplebar className="h-100">
                        {/* Conditionally wrap SideMenu depending on mobileMenu */}
                        {mobileMenu ? (
                            <div className="simplebar-wrapper" style={{ margin: 0 }}>
                                <div className="simplebar-height-auto-observer-wrapper">
                                    <div className="simplebar-height-auto-observer"></div>
                                </div>
                                <div className="simplebar-mask">
                                    <div
                                        className="simplebar-offset"
                                        style={{ right: "-15px", bottom: 0 }}
                                    >
                                        <div
                                            className="simplebar-content-wrapper"
                                            style={{ height: "100%", overflow: "hidden scroll" }}
                                        >
                                            <div className="simplebar-content" style={{ padding: 0 }}>
                                                <SideMenu mobileMenu={mobileMenu} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <SideMenu mobileMenu={mobileMenu} />
                        )}
                    </div>
                </div>

                <div className="main-content">
                    <div className="page-content">
                        <div className="container-fluid">{children}</div>
                    </div>
                </div>
            </div>
        </>
    );
}
