// src/services/authService.js
import axios from "axios";

// Keep consistent with api.js/adminApi.js:
// - dev:     VITE_API_BASE=/api (Vite proxy)
// - preview: VITE_API_BASE=/vedic-stones/api
// - prod:    VITE_API_BASE=/api
const API_BASE_URL = import.meta.env.VITE_API_BASE || "/api";

// Get stored token — admin first, then customer.
// Used by api.js for storefront calls that work with EITHER role
// (e.g. cart, wishlist, profile).
export const getToken = () => {
    return (
        localStorage.getItem("powerAdminToken") ||
        sessionStorage.getItem("powerAdminToken") ||
        localStorage.getItem("customerToken") ||
        sessionStorage.getItem("customerToken")
    );
};

// Get ONLY the customer token — never returns an admin token.
// Use this for any storefront call that must be scoped to the logged-in customer
// (e.g. GET /api/orders — backend extracts UserId from the token, so sending
// an admin token returns the admin user's orders, not the customer's).
export const getCustomerToken = () => {
    return (
        localStorage.getItem("customerToken") ||
        sessionStorage.getItem("customerToken") ||
        null
    );  
};

// Sign In (Admin)
export const signIn = async (email, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/poweradmin/signin`, { email, password });
        return response.data;
    } catch (error) {
        console.error("SignIn Error:", error);
        throw error.response?.data || { message: "Server Error" };
    }
};

// Customer Login
export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: error.response?.data?.message || "Login failed" };
    }
};

// Customer Register — creates a pending registration; user must verify via email link or OTP.
export const register = async (email, password, firstName, lastName) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/register`, {
            email,
            password,
            firstName,
            lastName,
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: error.response?.data?.message || "Registration failed" };
    }
};

/** Complete registration after email verification (6-digit code from email). Returns { token, user }. */
export const verifyEmailOtp = async (pendingRegistrationId, otp, email) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/verify-email-otp`, {
            pendingRegistrationId,
            otp: String(otp ?? "").trim(),
            email: email?.trim() || undefined,
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: error.response?.data?.message || "Verification failed" };
    }
};

export const resendVerificationEmail = async ({ pendingRegistrationId, email }) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/resend-verification`, {
            pendingRegistrationId,
            email: email?.trim() || undefined,
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: error.response?.data?.message || "Could not resend email" };
    }
};

// Forgot Password
export const forgotPassword = async (email) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/poweradmin/forgot-password`, { email });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Server Error" };
    }
};

// OTP Verification
export const verifyOtp = async (email, otp) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/poweradmin/verify-otp`, { email, otp });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Server Error" };
    }
};

// Website: Forgot Password (Customer)
export const customerForgotPassword = async (email) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/forgot-password`, { email });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Server Error" };
    }
};

// Website: Reset Password (Customer)
export const customerResetPassword = async ({ email, token, newPassword, confirmPassword }) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/reset-password`, {
            email,
            token,
            newPassword,
            confirmPassword,
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Server Error" };
    }
};

// Update customer profile (firstName, lastName, phone)
// Returns { token, user } — caller should call loginWithToken(token) to refresh context
export const updateProfile = async (data) => {
    const token = getToken();
    try {
        const response = await axios.put(`${API_BASE_URL}/auth/profile`, data, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to update profile" };
    }
};

// Change password for the logged-in customer
export const changePassword = async (currentPassword, newPassword) => {
    const token = getToken();
    try {
        const response = await axios.put(
            `${API_BASE_URL}/auth/change-password`,
            { currentPassword, newPassword },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to change password" };
    }
};