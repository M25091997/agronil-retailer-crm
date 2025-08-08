import LeftSidebar from "@/Components/Admin/LeftSidebar";
import Navbar from "@/Components/Admin/Navbar";
import { useState } from "react";

export default function AuthenticatedLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    return (
        <div id="layout-wrapper">
            <header id="page-topbar">
                <Navbar onChange={() => setIsSidebarOpen((prev) => !prev)} />
            </header>
            <div className="vertical-menu">
                <div data-simplebar="init" className="h-100">
                    <div className="simplebar-wrapper" style={{ margin: '0px' }}>
                        <div className="simplebar-height-auto-observer-wrapper">
                            <div className="simplebar-height-auto-observer"></div>
                        </div>
                        <div className="simplebar-mask">
                            <div className="simplebar-offset" style={{ right: isSidebarOpen ? '-15px' : '0px', bottom: '0px' }}>
                                <div className="simplebar-content-wrapper" style={{ height: '100%', overflow: isSidebarOpen ? 'hidden scroll' : 'hidden' }}>
                                    <div className="simplebar-content" style={{ padding: '0px' }}>
                                        <LeftSidebar isExpanded={isSidebarOpen} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Backdrop for mobile */}
            {isSidebarOpen && (
                <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)}></div>
            )}

            <div className="main-content flex-grow-1 p-3">
                <div className="page-content">
                    <div className="container-fluid">{children}</div>
                </div>
            </div>
        </div>
    );
}
