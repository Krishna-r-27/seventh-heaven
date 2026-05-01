import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import AppFooter from "../../layout/AppFooter";
import { forgotPassword } from "../../../services/authService";

/**
 * Beautified Forgot Password page using the same theme as SignIn.jsx
 * - client-side email validation
 * - loading / success / error feedback
 * - matching colors, spacing and accessibility attributes
 */
export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState("");

  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const formIsValid = emailIsValid;

  async function handleSend(e) {
    e?.preventDefault?.();
    setApiError("");
    setSuccess("");
    if (!formIsValid) {
      setApiError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      await forgotPassword(email);
      setSuccess("OTP sent to your email address.");
      // keep existing flow: navigate to OTP verification after a short delay
      setTimeout(() => navigate("/poweradmin/verify-otp", { state: { email } }), 900);
    } catch (ex) {
      setApiError(ex?.message || "Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-red-100 via-white to-blue-50 flex items-center justify-center p-6">
      <div className="w-full max-w-lg mx-auto shadow-xl rounded-2xl overflow-hidden bg-white/70 backdrop-blur-md">
        <div className="flex flex-col justify-center py-12 px-6 sm:px-10 bg-white bg-opacity-90 backdrop-blur w-full">
          <form
            onSubmit={handleSend}
            aria-label="Forgot password"
            className="space-y-7"
          >
            <div className="flex flex-col items-center mb-5">
              <div className="bg-gradient-to-br from-red-600 via-red-400 to-red-200 h-14 w-14 flex items-center justify-center rounded-full shadow-md mb-3">
                {loading ? (
                  <svg className="animate-spin w-7 h-7 text-white" viewBox="0 0 28 28" fill="none">
                    <circle cx="14" cy="14" r="12" stroke="currentColor" strokeWidth="3" className="opacity-30" />
                    <path d="M14 2a12 12 0 0 1 0 24" stroke="currentColor" strokeWidth="3" className="opacity-70" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 28 28" fill="none" className="w-7 h-7 text-white">
                    <circle cx="14" cy="14" r="14" fill="currentColor" fillOpacity="0.2" />
                    <path d="M9 13a5 5 0 1 1 10 0v2.5a2.5 2.5 0 0 1-5 0" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  </svg>
                )}
              </div>
              <h2 className="text-2xl font-bold text-red-700" style={{ color: "#cf1f1f" }}>
                Poweradmin Forgot Password
              </h2>
              <span className="text-sm mt-1" style={{ color: "#b91c1c", fontWeight: 600 }}>
                Enter your email to receive an OTP
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
                data-testid="forgot-error-box"
              >
                <svg height="18" width="18" fill="none" viewBox="0 0 24 24" className="min-w-[18px]" style={{ color: "#cf1f1f" }}>
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.7" />
                  <path d="M12 7.5v4m0 2.5v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
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
                placeholder=""
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

            <div className="flex items-center justify-between gap-4">
              <div />
              <Link
                to="/poweradmin"
                className="text-[15px] text-red-600 font-medium hover:underline hover:text-red-500 focus:outline-none focus:ring-1 focus:ring-red-300 transition"
                style={{ color: "#cf1f1f" }}
              >
                Back to Sign In
              </Link>
            </div>

            <button
              type="submit"
              disabled={!formIsValid || loading}
              className="w-full flex items-center justify-center gap-2 shadow text-white py-2.5 rounded-lg text-lg font-bold focus:outline-none focus:ring-4 focus:ring-red-200 transition disabled:opacity-50"
              style={{
                background: "linear-gradient(90deg, #f44336 0%, #ff6363 100%)",
                boxShadow: "0 2px 8px #f58080a3",
                fontWeight: 700,
                fontSize: "18px",
                opacity: (!formIsValid || loading) ? 0.55 : 1,
                cursor: (!formIsValid || loading) ? "not-allowed" : "pointer"
              }}
            >
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
              <span>{loading ? "Sending..." : "Send OTP"}</span>
            </button>

            <div className="pt-4 text-center text-[15px]" style={{ color: "#7d7d7d" }}>
              <span>
                By requesting an OTP you agree to the
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
