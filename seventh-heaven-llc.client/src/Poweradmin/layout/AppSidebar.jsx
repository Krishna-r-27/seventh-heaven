import { NavLink } from "react-router-dom";
import { useState } from "react";
import { ChevronIcon } from "./SidebarIcons";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { IoImagesOutline } from "react-icons/io5";
import { BsBox } from "react-icons/bs";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { FaRegUserCircle } from "react-icons/fa";
import { RiFileEditLine } from "react-icons/ri";
import { FaWpforms } from "react-icons/fa6";


const baseItem =
    "group flex items-center gap-3 px-4 py-2.5 rounded-lg  font-medium transition-all duration-200";

const activeItem =
    "bg-indigo-50 text-indigo-600 shadow-sm";

const AppSidebar = ({ open, collapsed, onClose }) => {
    const [menuOpen, setMenuOpen] = useState({});

    const toggle = (key) => {
        setMenuOpen((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <>
            {/* Mobile Overlay */}
            {open && (
                <div
                    onClick={onClose}
                    className="fixed inset-0 z-40 bg-black/40 lg:hidden"
                />
            )}

            <aside
                className={`
        fixed top-0 left-0 z-50 lg:static
        flex flex-col
        h-screen
        bg-white dark:bg-gray-900
        text-[#344054] dark:text-gray-100
        border-r border-gray-200 dark:border-gray-200
        transition-all duration-300 ease-in-out

        ${collapsed ? "lg:w-[72px]" : "lg:w-[290px]"}
        w-[290px]

        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
    `}
            >

                {/* Logo */}
                <div className="flex h-20 items-center justify-center border-b border-gray-200 px-4 lg:justify-start dark:border-gray-200">
                    {/* Icon (ONLY when collapsed) */}
                    <NavLink
                        to="/poweradmin/dashboard"
                        className="flex items-center"
                    >
                        {/* Icon logo (collapsed) */}
                        <img
                            src="/img/logo-vedic-stone.png"
                            alt="Logo Icon"
                            className={`
            h-8 w-8 transition-all duration-700
            ${collapsed ? "block" : "hidden"}
        `}
                        />

                        {/* Full logo (expanded) */}
                        <img
                            src="/img/logo-vedic-stone.png"
                            alt="Logo"
                            className={`
            h-19 w-auto transition-all ml-2 duration-700
            ${collapsed ? "hidden" : "block"}
        `}
                        />
                    </NavLink>
                </div>



                {/* Menu */}
                <nav className="sidebar-hide-scroll flex-1 overflow-x-hidden overflow-y-auto px-3 py-4">
                    <p className="mb-3 px-4 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                        {!collapsed && <span>Menu</span>}
                    </p>

                    {/* Dashboard */}
                    <NavLink
                        to="/poweradmin/dashboard"
                        className={({ isActive }) =>
                            `${baseItem} ${isActive ? activeItem : "hover:bg-gray-100 dark:hover:bg-gray-800"}`
                        }
                    >
                        <HiOutlineSquares2X2 className="h-5 w-5" />
                        {!collapsed && <span>Dashboard</span>}
                    </NavLink>


                    {/* Properties Management */}
                    <button
                        onClick={() => toggle("banner")}
                        className={`${baseItem} w-full justify-between hover:bg-gray-100 dark:hover:bg-gray-800 mt-1`}
                    >
                        <div className="flex items-center gap-3">
                            <IoImagesOutline className="h-5 w-5" />
                            {!collapsed && <span>Properties Management</span>}
                        </div>

                        {!collapsed && (
                            <ChevronIcon
                                className={`transition-transform ${menuOpen.banner ? "rotate-90" : ""}`}
                            />
                        )}
                    </button>

                    {menuOpen.banner && !collapsed && (
                        <div className="animate-fadeIn mt-1 ml-4 space-y-1 border-l border-gray-200 pl-3 dark:border-gray-700">
                            <NavLink
                                to="/poweradmin/properties/add"
                                className={({ isActive }) =>
                                    `block px-3 py-2 rounded ${isActive
                                        ? "bg-indigo-50 text-indigo-600"
                                        : "hover:bg-indigo-50 hover:text-indigo-600"
                                    }`
                                }
                            >
                                Add Property
                            </NavLink>

                            <NavLink
                                to="/poweradmin/properties"
                                end
                                className={({ isActive }) =>
                                    `block px-3 py-2 rounded ${isActive
                                        ? "bg-indigo-50 text-indigo-600"
                                        : "hover:bg-indigo-50 hover:text-indigo-600"
                                    }`
                                }
                            >
                                View Properties
                            </NavLink>

                        </div>
                    )}
                                                         
                    {/* Other Items */}
                    {[
                        { to: "/poweradmin/enquiries", label: "Enquiries", Icon: HiOutlineClipboardDocumentList },
                        { to: "/poweradmin/listed-properties", label: "Listed Properties", Icon: HiOutlineClipboardDocumentList },
                        //{ to: "/poweradmin/page-content", label: "Page Content", Icon: RiFileEditLine },
                        /*{ to: "/poweradmin/inquiry", label: "Inquiry Managements", Icon: FaWpforms },*/
                    ].map((item) => {
                        const { Icon } = item; // ✅ THIS LINE

                        return (
                            <NavLink
                                key={item.label}
                                to={item.to}
                                className={({ isActive }) =>
                                    `${baseItem} ${isActive
                                        ? activeItem
                                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                                    } mt-1`
                                }
                            >
                                <Icon className="h-5 w-5" />
                                {!collapsed && <span>{item.label}</span>}
                            </NavLink>
                        );
                    })}

                </nav>
            </aside>
        </>
    );
};

export default AppSidebar;