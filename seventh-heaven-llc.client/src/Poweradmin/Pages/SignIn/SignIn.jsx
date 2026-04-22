// src/poweradmin/pages/SignIn/SignIn.jsx
//
// FIXES APPLIED:
//   1. Absolute imports (/src/...) → relative imports (../../...)
//      This was causing Vite to crash with "Cannot find module" errors.
//   2. Sign-out in AppHeader navigates to "/poweradmin/signin" not "/signin"
//      (Fixed in AppHeader.jsx separately)

import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signIn } from "../../../services/authService";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  // Load saved credentials on component mount
  useEffect(() => {
    // Accessing storage can throw in some secure/private contexts -> guard it
    try {
      const token =
        (typeof localStorage !== "undefined" && localStorage.getItem("powerAdminToken")) ||
        (typeof sessionStorage !== "undefined" && sessionStorage.getItem("powerAdminToken")) ||
        null;

      // Only redirect automatically if we have both a token AND a stored user object.
      // Redirecting on token-only can cause a navigation loop if server rejects the token.
      const user =
        (typeof localStorage !== "undefined" && localStorage.getItem("powerAdminUser")) ||
        (typeof sessionStorage !== "undefined" && sessionStorage.getItem("powerAdminUser")) ||
        null;

      //if (token && user) {
      //  navigate("/poweradmin/dashboard");
      //  return;
      //}

      // Load remembered email and password (only from localStorage)
      const savedEmail =
        typeof localStorage !== "undefined" ? localStorage.getItem("powerAdminEmail") : null;
      const savedPassword =
        typeof localStorage !== "undefined" ? localStorage.getItem("powerAdminPassword") : null;

      if (savedEmail && savedPassword) {
        setEmail(savedEmail);
        setPassword(savedPassword);
        setRemember(true);
      }
    } catch (ex) {
      // Storage access failed (e.g., private browsing). Don't block the page — log and continue.
      // Avoid automatic navigation so we don't trigger location/history floods.
      // eslint-disable-next-line no-console
      console.warn("Storage access failed; continuing without auto-redirect.", ex);
    }
  }, [navigate]);

  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passwordIsValid = password.length >= 6;
  const formIsValid = emailIsValid && passwordIsValid;

  async function handleSubmit(e) {
    e.preventDefault();
    setApiError("");
    setSuccess("");
    if (!formIsValid) {
      setApiError("Please fix validation errors and try again.");
      return;
    }

    setLoading(true);
    try {
      const result = await signIn(email, password);

      // Save or clear remembered credentials based on checkbox
      try {
        if (remember) {
          localStorage.setItem("powerAdminEmail", email);
          localStorage.setItem("powerAdminPassword", password);
        } else {
          localStorage.removeItem("powerAdminEmail");
          localStorage.removeItem("powerAdminPassword");
        }
      } catch {
        // ignore storage errors for remembered credentials
      }

      // Save auth token and user
      try {
        if (remember) {
          localStorage.setItem("powerAdminToken", result.token);
          localStorage.setItem("powerAdminUser", JSON.stringify(result.user));
        } else {
          sessionStorage.setItem("powerAdminToken", result.token);
          sessionStorage.setItem("powerAdminUser", JSON.stringify(result.user));
        }
      } catch {
        // If storage fails (private mode), still proceed but do not persist.
        console.warn("Failed to persist auth token to storage.");
      }

      setSuccess("Signed in successfully.");
      navigate("/poweradmin/dashboard");
    } catch (err) {
      setApiError(err?.message || "Sign in failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  }

  // Clear remembered credentials when remember me is unchecked
  const handleRememberChange = (e) => {
    const isChecked = e.target.checked;
    setRemember(isChecked);

    if (!isChecked) {
      try {
        localStorage.removeItem("powerAdminEmail");
        localStorage.removeItem("powerAdminPassword");
      } catch {
        // ignore
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-red-100 via-white to-blue-50 flex items-center justify-center p-6">
      <div className="w-full max-w-lg mx-auto shadow-xl rounded-2xl overflow-hidden bg-white/70 backdrop-blur-md">
        <div className="flex flex-col justify-center py-12 px-6 sm:px-10 bg-white bg-opacity-90 backdrop-blur w-full">
          <form 
            onSubmit={handleSubmit} 
            aria-label="Poweradmin sign in"
            className="space-y-7"
          >
            <div className="flex flex-col items-center mb-5">
              <div className="bg-gradient-to-br from-red-600 via-red-400 to-red-200 h-14 w-14 flex items-center justify-center rounded-full shadow-md mb-3">
                {loading ? (
                  <svg className="animate-spin w-7 h-7 text-white" viewBox="0 0 28 28" fill="none">
                    <circle cx="14" cy="14" r="12" stroke="currentColor" strokeWidth="3" className="opacity-30"/>
                    <path d="M14 2a12 12 0 0 1 0 24" stroke="currentColor" strokeWidth="3" className="opacity-70"/>
                  </svg>
                ) : (
                  <svg viewBox="0 0 28 28" fill="none" className="w-7 h-7 text-white">
                    <circle cx="14" cy="14" r="14" fill="currentColor" fillOpacity="0.2"/>
                    <path d="M9 13a5 5 0 1 1 10 0v2.5a2.5 2.5 0 0 1-5 0" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  </svg>
                )}
              </div>
              <h2 className="text-2xl font-bold text-red-700" style={{ color: "#cf1f1f" }}>
                Poweradmin Sign In
              </h2>
              <span className="text-sm mt-1" style={{ color: "#b91c1c", fontWeight: 600 }}>
                Admin access only
              </span>
            </div>

            {apiError && (
              <div
                role="alert"
                className="mb-3 text-[15px] text-red-700 bg-red-100 border border-red-300 p-3 rounded-lg flex items-center gap-2 shadow"
                style={{
                  background: "#f8d7da",
                  borderColor: "#f5c2c7",
                  color: "#cf1f1f",
                  fontWeight: 500
                }}
                data-testid="signin-error-box"
              >
                <svg height="18" width="18" fill="none" viewBox="0 0 24 24" className="min-w-[18px]" style={{color: "#cf1f1f"}}>
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.7"/>
                  <path d="M12 7.5v4m0 2.5v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                {apiError}
              </div>
            )}

            {success && (
              <div role="status" className="mb-3 text-[15px] text-green-700 bg-green-100 border border-green-300 p-3 rounded-lg flex items-center gap-2 shadow">
                <svg height="18" width="18" fill="none" viewBox="0 0 24 24" className="min-w-[18px] text-green-600"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.7"/><path d="M8.8 13.2l2.1 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                {success}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="block text-[15px] font-medium" style={{ color: "#444" }}>
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Your Email Address"
                className={`block w-full px-4 py-2.5 border-2 text-[15px] rounded-lg focus:outline-none focus:ring-4 transition ${
                  email.length === 0
                    ? "border-gray-200"
                    : emailIsValid
                    ? "border-green-300 focus:ring-green-100"
                    : "border-red-300 focus:ring-red-100"
                }`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-invalid={!emailIsValid}
                aria-describedby="email-error"
                style={{ background: "#fff", borderColor: email.length === 0 ? "#e5e7eb" : emailIsValid ? "#86efac" : "#fca5a5" }}
              />
              {!emailIsValid && email.length > 0 && (
                <p id="email-error" className="text-xs text-red-600 font-medium mt-1 ml-1">
                  Please enter a valid email address.
                </p>
              )}
            </div>

            <div className="space-y-2 relative">
              <label htmlFor="password" className="block text-[15px] font-medium" style={{ color: "#444" }}>
                Password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Your password"
                className={`block w-full px-4 py-2.5 border-2 text-[15px] rounded-lg focus:outline-none focus:ring-4 transition ${
                  password.length === 0
                    ? "border-gray-200"
                    : passwordIsValid
                    ? "border-green-300 focus:ring-green-100"
                    : "border-red-300 focus:ring-red-100"
                }`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-invalid={!passwordIsValid}
                aria-describedby="password-error"
                style={{ background: "#fff", borderColor: password.length === 0 ? "#e5e7eb" : passwordIsValid ? "#86efac" : "#fca5a5" }}
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-2.5 top-9 text-[15px] text-gray-500 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-red-200 hover:bg-gray-100 transition"
                aria-label={showPassword ? "Hide password" : "Show password"}
                tabIndex={0}
              >
                {showPassword ? (
                  <svg viewBox="0 0 18 18" width={22} height={22} fill="none"><path d="M2 9c1.8-3 4.5-5 7-5s5.2 2 7 5c-1.8 3-4.5 5-7 5s-5.2-2-7-5Z" stroke="#9CA3AF" strokeWidth="1.6"/><circle cx="9" cy="9" r="2.3" stroke="#9CA3AF" strokeWidth="1.4"/></svg>
                ) : (
                  <svg viewBox="0 0 18 18" width={22} height={22} fill="none"><path d="M1 1l16 16M2 9c1.8-3 4.5-5 7-5 1.14 0 2.24.28 3.27.83M14.73 14.17C13.7 14.72 12.6 15 11.47 15c-2.5 0-5.2-2-7-5 1.05-1.75 2.7-3.39 4.5-4.17" stroke="#9CA3AF" strokeWidth="1.6" strokeLinecap="round"/></svg>
                )}
              </button>
              {!passwordIsValid && password.length > 0 && (
                <p id="password-error" className="text-xs text-red-600 font-medium mt-1 ml-1">
                  Password must be at least 6 characters.
                </p>
              )}
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 accent-red-600 border-gray-300 rounded focus:ring-red-300"
                  checked={remember}
                  onChange={handleRememberChange}
                />
                <label htmlFor="remember" className="ml-2 text-gray-600 text-[15px] select-none">
                  Remember me
                </label>
              </div>
              <Link
                to="/poweradmin/forgot-password"
                className="text-[15px] text-red-600 font-medium hover:underline hover:text-red-500 focus:outline-none focus:ring-1 focus:ring-red-300 transition"
                style={{ color: "#cf1f1f" }}
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={!formIsValid || loading}
              className="w-full flex items-center justify-center gap-2 shadow text-white py-2.5 rounded-lg text-lg font-bold focus:outline-none focus:ring-4 transition disabled:opacity-50"
              style={{
                background: "linear-gradient(90deg, #f44336 0%, #ff6363 100%)",
                boxShadow: "0 2px 8px #f58080a3",
                fontWeight: 700,
                fontSize: "20px",
                opacity: (!formIsValid || loading) ? 0.55 : 1,
                cursor: (!formIsValid || loading) ? "not-allowed" : "pointer"
              }}
            >
              <span className="flex items-center gap-2 w-full justify-center">
                {loading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                  </svg>
                ) : null}
                <span>{loading ? "Signing In" : "Sign In"}</span>
              </span>
            </button>

            <div className="pt-4 text-center text-[15px]" style={{ color: "#7d7d7d" }}>
              <span>
                By signing in you agree to the 
                <a href="#" className="text-red-500 hover:underline ml-1 font-medium" style={{ color: "#cf1f1f", fontWeight: 500, textDecoration: "underline dotted" }}>
                  admin usage policy
                </a>.
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}