// src/poweradmin/layout/AppLayout.jsx

import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import AppSidebar from "./AppSidebar";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import SessionTimeoutModal from "../components/SessionTimeoutModal";
import { useSessionTimeout } from "../hooks/useSessionTimeout";

const AppLayout = () => {
    const navigate = useNavigate();

    // Mobile sidebar (overlay)
    const [sidebarOpen, setSidebarOpen] = useState(false);
    // Desktop collapse (icons only)
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    // Session timeout — when logout fires, navigate to sign-in
    const {
        showModal,
        countdown,
        refreshing,
        handleStayLoggedIn,
        handleSignOut,
    } = useSessionTimeout(() => navigate("/poweradmin/signin"));

    return (
        <div className="dashboard flex h-screen overflow-hidden bg-gray-50">
            {/* Sidebar */}
            <AppSidebar
                open={sidebarOpen}
                collapsed={sidebarCollapsed}
                onClose={() => setSidebarOpen(false)}
            />

            {/* Content area */}
            <div className="relative flex flex-1 flex-col overflow-hidden">
                {/* Header */}
                <AppHeader
                    onMenuClick={() => {
                        if (window.innerWidth < 1024) {
                            setSidebarOpen(!sidebarOpen);
                        } else {
                            setSidebarCollapsed(!sidebarCollapsed);
                        }
                    }}
                />

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto bg-[#f9fafb] p-6 dark:bg-gray-900">
                    <Outlet />
                </main>

                <AppFooter />
            </div>

            {/* Session timeout modal — rendered at layout level so it's always on top */}
            {showModal && (
                <SessionTimeoutModal
                    countdown={countdown}
                    refreshing={refreshing}
                    onStayLoggedIn={handleStayLoggedIn}
                    onSignOut={handleSignOut}
                />
            )}
        </div>
    );
};

export default AppLayout;