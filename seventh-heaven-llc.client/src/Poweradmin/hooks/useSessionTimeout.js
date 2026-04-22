// src/hooks/useSessionTimeout.js
//
// How it works:
//   1. Reads the JWT token from storage and decodes the `exp` claim.
//   2. Schedules a warning timer to fire WARN_BEFORE_MS before expiry.
//   3. When the warning fires, shows the modal and starts a countdown.
//   4. If the user clicks "Stay logged in":
//        - Immediately stops the countdown (prevents race condition)
//        - Calls POST /api/poweradmin/refresh-token with the current token
//        - On success: stores the new token, hides modal, reschedules timers
//        - On failure: logs out
//   5. If the countdown reaches 0 or the user clicks "Sign out": logs out.
//   6. Re-schedules on storage changes (e.g. token replaced after refresh).

import { useState, useEffect, useRef, useCallback } from "react";
import { adminApi } from "../../services/adminApi";

// Show warning this many ms before the token expires
const WARN_BEFORE_MS = 5 * 60 * 1000; // 5 minutes

// ── Helpers ────────────────────────────────────────────────────────────────

function getStoredToken() {
    return (
        localStorage.getItem("powerAdminToken") ||
        sessionStorage.getItem("powerAdminToken") ||
        null
    );
}

function storeNewToken(newToken) {
    // Replace in whichever storage the original was in
    if (localStorage.getItem("powerAdminToken")) {
        localStorage.setItem("powerAdminToken", newToken);
    } else {
        sessionStorage.setItem("powerAdminToken", newToken);
    }
}

function clearAllTokens() {
    localStorage.removeItem("powerAdminToken");
    localStorage.removeItem("powerAdminUser");
    sessionStorage.removeItem("powerAdminToken");
    sessionStorage.removeItem("powerAdminUser");
}

function getTokenExpiry(token) {
    // Decode JWT payload (middle segment) without verifying signature
    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload.exp ? payload.exp * 1000 : null; // convert to ms
    } catch {
        return null;
    }
}

// ── Hook ───────────────────────────────────────────────────────────────────

export function useSessionTimeout(onLogout) {
    const [showModal, setShowModal] = useState(false);
    const [countdown, setCountdown] = useState(300); // seconds, updated per tick
    const [refreshing, setRefreshing] = useState(false);

    const warningTimerRef = useRef(null);
    const logoutTimerRef = useRef(null);
    const countdownRef = useRef(null);

    const clearAllTimers = useCallback(() => {
        clearTimeout(warningTimerRef.current);
        clearTimeout(logoutTimerRef.current);
        clearInterval(countdownRef.current);
    }, []);

    const logout = useCallback(() => {
        clearAllTimers();
        setShowModal(false);
        clearAllTokens();
        onLogout();
    }, [clearAllTimers, onLogout]);

    const scheduleTimers = useCallback(() => {
        clearAllTimers();

        const token = getStoredToken();
        if (!token) return; // not logged in, nothing to schedule

        const expiresAt = getTokenExpiry(token);
        if (!expiresAt) return;

        const now = Date.now();
        const msLeft = expiresAt - now;
        const warnAt = msLeft - WARN_BEFORE_MS;

        if (msLeft <= 0) {
            // Token already expired — log out immediately
            logout();
            return;
        }

        if (warnAt <= 0) {
            // Less than 5 min left — show modal right away
            const secondsLeft = Math.max(0, Math.floor(msLeft / 1000));
            setCountdown(secondsLeft);
            setShowModal(true);
            startCountdown(secondsLeft);
        } else {
            // Schedule warning
            warningTimerRef.current = setTimeout(() => {
                setCountdown(Math.floor(WARN_BEFORE_MS / 1000));
                setShowModal(true);
                startCountdown(Math.floor(WARN_BEFORE_MS / 1000));
            }, warnAt);
        }

        // Hard logout when token actually expires (regardless of modal)
        logoutTimerRef.current = setTimeout(() => {
            logout();
        }, msLeft);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clearAllTimers, logout]);

    function startCountdown(seconds) {
        clearInterval(countdownRef.current);
        let remaining = seconds;
        countdownRef.current = setInterval(() => {
            remaining -= 1;
            setCountdown(remaining);
            if (remaining <= 0) {
                clearInterval(countdownRef.current);
            }
        }, 1000);
    }

    // "Stay logged in" handler
    const handleStayLoggedIn = useCallback(async () => {
        // Stop countdown IMMEDIATELY before the async call
        // This prevents the race condition where the interval fires logout()
        // while the refresh request is still in-flight
        clearInterval(countdownRef.current);
        clearTimeout(logoutTimerRef.current);
        setRefreshing(true);

        try {
            const { data } = await adminApi.post("/poweradmin/refresh-token");
            // Store the new token
            storeNewToken(data.token);
            // Hide modal and reschedule with the new token's expiry
            setShowModal(false);
            setRefreshing(false);
            scheduleTimers();
        } catch {
            // Refresh failed (token expired beyond grace period, server error, etc.)
            logout();
        }
    }, [logout, scheduleTimers]);

    // Mount: schedule on load
    useEffect(() => {
        scheduleTimers();
        return () => clearAllTimers();
    }, [scheduleTimers, clearAllTimers]);

    return {
        showModal,
        countdown,
        refreshing,
        handleStayLoggedIn,
        handleSignOut: logout,
    };
}