// src/services/adminApi.js
//
// Dedicated axios instance for ALL admin panel API calls.
// Uses ONLY powerAdminToken — never falls back to customerToken.
// On 401: dispatches "session:expired" so the SessionTimeoutModal
// can offer "Stay logged in" before logging the admin out.

import axios from "axios";

function resolveApiBase() {
    const explicit = import.meta.env.VITE_API_BASE;
    if (explicit) return explicit;
    const basePath = import.meta.env.VITE_BASE_PATH || "/";
    const normalized = basePath.endsWith("/") ? basePath : `${basePath}/`;
    return `${normalized}api`;
}

function getAdminToken() {
    return (
        localStorage.getItem("powerAdminToken") ||
        sessionStorage.getItem("powerAdminToken") ||
        null
    );
}

export const adminApi = axios.create({
    baseURL: resolveApiBase(),
    headers: { "Content-Type": "application/json" },
});

// Attach admin Bearer token to every request
adminApi.interceptors.request.use((config) => {
    const token = getAdminToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// On 401: fire session:expired so the modal appears
adminApi.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            window.dispatchEvent(new CustomEvent("session:expired"));
        }
        return Promise.reject(error);
    }
);