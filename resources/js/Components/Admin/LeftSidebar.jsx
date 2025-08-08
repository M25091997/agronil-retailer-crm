import { Link } from "@inertiajs/react";
import { HousePlus, Settings, KeySquare, List, LucideBoxes } from "lucide-react";
import { useState } from "react";
import { usePage } from "@inertiajs/react";

export default function LeftSidebar({ isExpanded }) {
    const [openDropdowns, setOpenDropdowns] = useState({
        masterkey: false,
        settings: false,
        products: false,
    });

    const { url } = usePage();

    const toggleDropdown = (key) => {
        setOpenDropdowns((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const isActive = (path) => url.startsWith(path);

    return (
        <div className={`sidebar-wrapper ${isExpanded ? 'show' : ''}`}>
            <div data-simplebar className="h-100">
                {/* <!--- Sidemenu --> */}
                <div id="sidebar-menu">
                    {/* <!-- Left Menu Start --> */}
                    <ul className="metismenu list-unstyled mm-show" id="side-menu">
                        <li className="menu-title" data-key="t-menu">
                            Menu
                        </li>
                        <li className={isActive("/dashboard") ? "mm-active" : ""}>
                            <Link
                                href="/dashboard"
                                className={`d-flex align-items-center ${url.startsWith("/dashboard") ? "active" : ""
                                    }`}>
                                <HousePlus />
                                {isExpanded && <span data-key="t-dashboard">Dashboard</span>}
                            </Link>
                        </li>

                        {/* Masterkey Dropdown */}
                        <li>
                            <div
                                className="has-arrow cursor-pointer d-flex align-items-center gap-2 p-2"
                                onClick={() => toggleDropdown("masterkey")}
                            >
                                <KeySquare />
                                <span data-key="t-masterkey">Masterkey</span>
                            </div>
                            {openDropdowns.masterkey && (
                                <ul className="sub-menu" aria-expanded="true">
                                    <li>
                                        <Link href="/admin/categories">Category</Link>
                                    </li>
                                    <li>
                                        <Link href="/admin/sub-categories">
                                            Sub Category
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/admin/brands">
                                            Brands
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/admin/diseases">
                                            Diseases
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/admin/unit-type">
                                            Unit Type
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/admin/base-unit">
                                            Base Unit
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/admin/home-banners">
                                            Home Banners
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </li>

                        {/* Settings Dropdown */}
                        <li>
                            <div
                                className="has-arrow cursor-pointer d-flex align-items-center gap-2 p-2"
                                onClick={() => toggleDropdown("settings")}
                            >
                                <Settings />
                                <span data-key="t-settings">Settings</span>
                            </div>
                            {openDropdowns.settings && (
                                <ul className="sub-menu" aria-expanded="true">
                                    <li>
                                        <Link href="/admin/general-settings">
                                            General
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/admin/user-settings">
                                            Users
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </li>

                        {/* Product Dropdown */}
                        <li>
                            <div
                                className="has-arrow cursor-pointer d-flex align-items-center gap-2 p-2"
                                onClick={() => toggleDropdown("products")}
                            >
                                <LucideBoxes />
                                <span data-key="t-products">Products</span>
                            </div>
                            {openDropdowns.products && (
                                <ul className="sub-menu" aria-expanded="true">
                                    <li>
                                        <Link href="/admin/products">
                                            Product
                                        </Link>
                                    </li>

                                </ul>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
