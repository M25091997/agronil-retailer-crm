import { useState, useEffect, useRef } from "react";
import { Bell, CircleArrowRight } from "lucide-react";
import { Link } from "@inertiajs/react";

export default function NotificationDropdown() {
    const [notification, setNotification] = useState(false);
    const dropdownRef = useRef(null);

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setNotification(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Example notifications
    const notifications = [
        { id: 1, user: "John Doe", message: "New order placed", time: "2m ago", avatar: "/admin/assets/images/users/avatar-1.jpg" },
        { id: 2, user: "Jane Smith", message: "Payment received", time: "10m ago", avatar: "/admin/assets/images/users/avatar-2.jpg" },
    ];

    return (
        <div className="dropdown d-inline-block" ref={dropdownRef}>
            <button
                type="button"
                className="btn header-item noti-icon position-relative"
                aria-haspopup="true"
                aria-expanded={notification}
                onClick={() => setNotification(!notification)}
            >
                <Bell className="icon-lg" />
                {notifications.length > 0 && (
                    <span className="badge bg-danger rounded-pill">{notifications.length}</span>
                )}
            </button>

            {notification && (
                <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0 show">
                    <div className="p-3">
                        <div className="row align-items-center">
                            <div className="col">
                                <h6 className="m-0"> Notifications </h6>
                            </div>
                            <div className="col-auto">
                                <span className="small text-reset text-decoration-underline">
                                    alerts ({notifications.length})
                                </span>
                            </div>
                        </div>
                    </div>

                    <div data-simplebar style={{ maxHeight: "230px" }}>
                        {notifications.map((n) => (
                            <Link href="#!" className="text-reset notification-item" key={n.id}>
                                <div className="d-flex">
                                    <div className="flex-shrink-0 me-3">
                                        <img
                                            src={n.avatar}
                                            className="rounded-circle avatar-sm"
                                            alt="user-pic"
                                        />
                                    </div>
                                    <div className="flex-grow-1">
                                        <h6 className="mb-1">{n.user}</h6>
                                        <div className="font-size-13 text-muted">
                                            <p className="mb-1">{n.message}</p>
                                            <p className="mb-0">
                                                <i className="mdi mdi-clock-outline"></i> <span>{n.time}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="p-2 border-top d-grid">
                        <Link
                            className="btn btn-sm btn-link font-size-14 text-center"
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                console.log("View more clicked");
                            }}
                        >
                            <CircleArrowRight className="me-1" /> <span>View More</span>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
