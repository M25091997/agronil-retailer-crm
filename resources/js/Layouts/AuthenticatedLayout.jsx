import LeftSidebar from "@/Components/Admin/LeftSidebar";
import Navbar from "@/Components/Admin/Navbar";

export default function AuthenticatedLayout({ children }) {
    return (
        <div id="layout-wrapper">
            <header id="page-topbar">
                <Navbar />
            </header>
            <div className="vertical-menu">
                <div data-simplebar="init" className="h-100">
                    <div className="simplebar-wrapper" style={{ margin: '0px' }}>
                        <div className="simplebar-height-auto-observer-wrapper">
                            <div className="simplebar-height-auto-observer"></div>
                        </div>
                        <div className="simplebar-mask">
                            <div className="simplebar-offset" style={{ right: '-15px', bottom: '0px' }}>
                                <div className="simplebar-content-wrapper" style={{ height: '100%', overflow: 'hidden scroll' }}>
                                    <div className="simplebar-content" style={{ padding: '0px' }}>
                                        <LeftSidebar />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">{children}</div>
                </div>
            </div>
        </div>
    );
}
