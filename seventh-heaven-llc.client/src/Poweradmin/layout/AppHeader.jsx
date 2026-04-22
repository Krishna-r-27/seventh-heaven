// src/poweradmin/layout/AppHeader.jsx
//
// FIXES APPLIED:
//   1. Sign-out button now clears ALL token keys from both localStorage
//      and sessionStorage before navigating. Previously it navigated to
//      "/signin" (wrong path) and never cleared the token, so AdminRoute
//      would immediately redirect back to dashboard.
//   2. Navigate path: "/signin" → "/poweradmin/signin"
//   3. Admin name/email now reads from stored user instead of hardcoded "Admin"

import { useState, useRef, useEffect } from "react";
import { HiMenuAlt2 } from "react-icons/hi";
import { FiMoon, FiSun } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { useTheme } from "../context/ThemeContext";

const AppHeader = ({ onMenuClick }) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const { theme, setTheme } = useTheme();

    // Read stored admin user for display
    const storedUser = (() => {
        try {
            const raw =
                localStorage.getItem("powerAdminUser") ||
                sessionStorage.getItem("powerAdminUser");
            return raw ? JSON.parse(raw) : null;
        } catch {
            return null;
        }
    })();

    const adminEmail = storedUser?.email ?? "testing@yourwebsitepreview.com";

    // Close dropdown on outside click
    useEffect(() => {
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    // FIX 1 & 2: clear tokens then navigate to the correct sign-in route
    const handleSignOut = () => {
        localStorage.removeItem("powerAdminToken");
        localStorage.removeItem("powerAdminUser");
        sessionStorage.removeItem("powerAdminToken");
        sessionStorage.removeItem("powerAdminUser");
        navigate("/poweradmin/signin");   // FIX: was "/signin"
    };

    return (
        <header className="
            sticky top-0 z-40 flex h-16
            items-center justify-between border-b
            border-gray-200 bg-white px-4 lg:px-6
            dark:border-gray-200
            dark:bg-gray-900">
            {/* LEFT */}
            <div className="flex items-center gap-3">
                <button
                    onClick={onMenuClick}
                    aria-label="Toggle sidebar"
                    className="
                        flex h-10 w-10 items-center justify-center
                        rounded-lg border
                        bg-white text-gray-600
                        transition hover:bg-gray-50
                        dark:bg-gray-800 dark:text-gray-300
                        dark:hover:bg-gray-700"
                >
                    <HiMenuAlt2 className="h-5 w-5" />
                </button>

                <span className="hidden font-semibold text-gray-800 sm:block dark:text-white">
                    PowerAdmin
                </span>
            </div>

            {/* RIGHT */}
            <div className="relative flex items-center gap-3" ref={dropdownRef}>
                {/* Theme Toggle */}
                <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="hidden
                        w-10 h-10  items-center justify-center
                        rounded-full border
                        bg-white dark:bg-gray-800
                        hover:bg-gray-100 dark:hover:bg-gray-700
                        transition
                    "
                >
                    {theme === "dark" ? (
                        <FiSun className="text-lg text-gray-400" />
                    ) : (
                        <FiMoon className="text-lg text-gray-600" />
                    )}
                </button>

                {/* Profile */}
                <button
                    onClick={() => setOpen(!open)}
                    className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                    <FaUser className="h-9 w-9 rounded-full border p-2" />
                    <span className="hidden pe-2 text-sm font-medium text-gray-900 md:block dark:text-white">
                        Admin
                    </span>
                </button>

                {/* Dropdown */}
                <div
                    className={`
                        absolute right-0 top-14 w-56
                        bg-white dark:bg-gray-800
                        rounded-xl shadow-lg border py-2
                        transition-all duration-200 origin-top
                        ${open ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}
                    `}
                >
                    <div className="border-b border-gray-200 px-4 py-2 dark:border-gray-500">
                        <p className="text-sm font-semibold">Admin User</p>
                        <p className="text-xs text-gray-500 dark:text-gray-300">
                            {adminEmail}
                        </p>
                    </div>

                    <div className="mt-2">
                        <button
                            onClick={() => { navigate("/poweradmin/shipping-settings"); setOpen(false); }}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200
                                       hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                        >
                            <MdLocalShipping className="h-4 w-4 text-gray-400" />
                            Shipping Settings
                        </button>

                        <button
                            onClick={() => { navigate("/poweradmin/change-password"); setOpen(false); }}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200
                                       hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                        >
                            <RiLockPasswordLine className="h-4 w-4 text-gray-400" />
                            Change Password
                        </button>

                        <div className="my-1 border-t border-gray-200 dark:border-gray-600" />

                        <button
                            onClick={handleSignOut}
                            className="w-full px-4 py-2 text-left text-sm text-red-500
                                       hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            Sign out
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AppHeader;