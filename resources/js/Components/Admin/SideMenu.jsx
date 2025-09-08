import { Link, usePage } from "@inertiajs/react";
import { Cog, House, Image, ShoppingBag, Users, Gift, Boxes, LayoutList, BellPlus } from "lucide-react";
import { useState } from "react";

export default function SideMenu({ mobileMenu }) {
    const [openDropdowns, setOpenDropdowns] = useState({
        masterkey: false,
        settings: false,
        products: false,
        banners: false,
        retailer: false,
        offers: false,
        manageProduct: false,
    });

    const toggleDropdown = (key) => {
        setOpenDropdowns((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const { url } = usePage();

    return (
        <div id="sidebar-menu" className="mm-active">
            <ul className="metismenu list-unstyled" id="side-menu">
                <li className="menu-title" data-key="t-menu">Menu</li>

                <li>
                    <Link href="/dashboard" className={url.startsWith("/dashboard") ? "active" : ""}>
                        <House />
                        <span data-key="t-dashboard">Dashboard</span>
                    </Link>
                </li>

                {/* Master Key */}
                <li className={openDropdowns.masterkey ? "mm-active" : ""}>
                    <a
                        href="javascript:void(0);"
                        className={openDropdowns.masterkey ? "has-arrow mm-active" : "has-arrow"}
                        onClick={() => toggleDropdown("masterkey")}
                    >
                        <Cog />
                        <span data-key="t-apps">Master Key</span>
                    </a>
                    {openDropdowns.masterkey && (
                        <ul className="sub-menu" aria-expanded="false">
                            <li><Link href="/admin/categories">Category</Link></li>
                            <li><Link href="/admin/sub-categories">Sub Category</Link></li>
                            <li><Link href="/admin/brands">Brands</Link></li>
                            <li><Link href="/admin/diseases">Diseases</Link></li>
                            <li><Link href="/admin/unit-type">Unit Type</Link></li>
                            <li><Link href="/admin/base-unit">Base Unit</Link></li>
                        </ul>
                    )}
                </li>

                {/* Banners */}
                <li className={openDropdowns.banners ? "mm-active" : ""}>
                    <a
                        href="javascript:void(0);"
                        className={openDropdowns.banners ? "has-arrow mm-active" : "has-arrow"}
                        onClick={() => toggleDropdown("banners")}
                    >
                        <Image />
                        <span data-key="t-pages">Banners</span>
                    </a>
                    {openDropdowns.banners && (
                        <ul className="sub-menu" aria-expanded="false">
                            <li><Link href="/admin/home-banners">Home Banners</Link></li>
                        </ul>
                    )}
                </li>

                {/* Products */}
                <li className={openDropdowns.products ? "mm-active" : ""}>
                    <a
                        href="javascript:void(0);"
                        className={openDropdowns.products ? "has-arrow mm-active" : "has-arrow"}
                        onClick={() => toggleDropdown("products")}
                    >
                        <ShoppingBag />
                        <span data-key="t-authentication">Product</span>
                    </a>
                    {openDropdowns.products && (
                        <ul className="sub-menu" aria-expanded="false">
                            <li><Link href="/admin/products">Products</Link></li>
                        </ul>
                    )}
                </li>

                {/* Retailer */}
                <li className={openDropdowns.retailer ? "mm-active" : ""}>
                    <a
                        href="javascript:void(0);"
                        className={openDropdowns.retailer ? "has-arrow mm-active" : "has-arrow"}
                        onClick={() => toggleDropdown("retailer")}
                    >
                        <Users />
                        <span data-key="t-authentication">Retailer</span>
                    </a>
                    {openDropdowns.retailer && (
                        <ul className="sub-menu" aria-expanded="false">
                            <li><Link href="/admin/retailer/pending">Pending Retailer</Link></li>
                            <li><Link href="/admin/retailer/approved">Approval Retailer</Link></li>
                        </ul>
                    )}
                </li>

                {/* Offers */}
                <li className={openDropdowns.offers ? "mm-active" : ""}>
                    <a
                        href="javascript:void(0);"
                        className={openDropdowns.offers ? "has-arrow mm-active" : "has-arrow"}
                        onClick={() => toggleDropdown("offers")}
                    >
                        <Gift />
                        <span data-key="t-authentication">Offer & Discount</span>
                    </a>
                    {openDropdowns.offers && (
                        <ul className="sub-menu" aria-expanded="false">
                            <li><Link href="/admin/discount/coupons">Coupon Code</Link></li>
                            <li><Link href="/admin/discount/rewardsetting">Reward Setting</Link></li>
                        </ul>
                    )}
                </li>

                {/* Manage Product */}
                <li className={openDropdowns.manageProduct ? "mm-active" : ""}>
                    <a
                        href="javascript:void(0);"
                        className={openDropdowns.manageProduct ? "has-arrow mm-active" : "has-arrow"}
                        onClick={() => toggleDropdown("manageProduct")}
                    >
                        <LayoutList />
                        <span data-key="t-authentication">Manage Product</span>
                    </a>
                    {openDropdowns.manageProduct && (
                        <ul className="sub-menu" aria-expanded="false">
                            <li><Link href="/admin/manage/activeproduct">Active Product</Link></li>
                            <li><Link href="/admin/manage/brandedproduct">Branded Product</Link></li>
                            <li><Link href="/admin/manage/populer-product">Populer Product</Link></li>
                            <li><Link href="/admin/manage/sale-product">Product On Sale</Link></li>
                            <li><Link href="/admin/manage/feature-product">Feature Product</Link></li>
                            <li><Link href="/admin/manage/trending-product">Trending Product</Link></li>
                            <li><Link href="/admin/manage/newarrival-product">New Arrival Product</Link></li>
                        </ul>
                    )}
                </li>

                {/* Orders */}
                <li className="menu-title mt-2" data-key="t-components">Orders</li>
                <li className={openDropdowns.orders ? "mm-active" : ""}>
                    <a
                        href="javascript:void(0);"
                        className={openDropdowns.orders ? "has-arrow mm-active" : "has-arrow"}
                        onClick={() => toggleDropdown("orders")}
                    >
                        <Boxes />
                        <span data-key="t-authentication">Product Order</span>
                    </a>
                    {openDropdowns.orders && (
                        <ul className="sub-menu" aria-expanded="false">
                            <li><Link href="/admin/orders?status=pending">New Order</Link></li>
                            <li><Link href="/admin/orders">All Orders</Link></li>
                            <li><Link href="/admin/orders/reports">Sales Report</Link></li>
                        </ul>
                    )}
                </li>

                <li><Link href="/admin/notifications"><BellPlus /> Notifications</Link></li>
            </ul>
        </div>
    );
}
