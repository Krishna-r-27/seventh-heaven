// src/routes/AdminRoute.jsx
//
// Guards all /poweradmin/* pages.
// Requires a valid, unexpired token that also carries role = "Admin".
// A Customer token (even unexpired) is rejected and redirected to signin.

import { Navigate } from "react-router-dom";

function getTokenPayload(token) {
    if (!token) return null;
    try {
        return JSON.parse(atob(token.split(".")[1]));
    } catch {
        return null;
    }
}

function isAdminTokenValid(token) {
    const payload = getTokenPayload(token);
    if (!payload) return false;

    // Check expiry
    if (payload.exp * 1000 <= Date.now()) return false;

    // Check role claim — must be exactly "Admin"
    // ASP.NET Core serialises ClaimTypes.Role to this URI in the JWT payload
    const role =
        payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ||
        payload["role"] ||
        payload["Role"];

    return role === "Admin";
}

const AdminRoute = ({ children }) => {
    const token =
        localStorage.getItem("powerAdminToken") ||
        sessionStorage.getItem("powerAdminToken");

    return isAdminTokenValid(token) ? children : <Navigate to="/poweradmin/signin" replace />;
};

export default AdminRoute;