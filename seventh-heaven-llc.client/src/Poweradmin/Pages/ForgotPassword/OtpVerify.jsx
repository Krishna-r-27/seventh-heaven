import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { verifyOtp } from "../../../services/authService";

const OtpVerify = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [email, setEmail] = useState(location.state?.email || "");
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState("");

    return (
        <div className="min-h-screen bg-gradient-to-tr from-red-100 via-white to-blue-50 flex items-center justify-center p-6">
            <div className="w-full max-w-lg mx-auto shadow-xl rounded-2xl overflow-hidden bg-white/70 backdrop-blur-md">
                <div className="flex flex-col justify-center py-12 px-6 sm:px-10 bg-white bg-opacity-90 backdrop-blur w-full">
                    <div className="space-y-7">

                        {/* Header / Icon */}
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
                                        <rect x="7" y="12" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
                                        <path d="M11 12V9a3 3 0 0 1 6 0v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        <circle cx="14" cy="17" r="1.2" fill="currentColor" />
                                    </svg>
                                )}
                            </div>
                            <h2 className="text-2xl font-bold" style={{ color: "#cf1f1f" }}>
                                Verify OTP
                            </h2>
                            <span className="text-sm mt-1" style={{ color: "#b91c1c", fontWeight: 600 }}>
                                OTP sent to your email
                            </span>
                        </div>

                        {/* Error */}
                        {apiError && (
                            <div
                                role="alert"
                                className="mb-3 text-[15px] p-3 rounded-lg flex items-center gap-2 shadow"
                                style={{
                                    background: "#f8d7da",
                                    borderColor: "#f5c2c7",
                                    color: "#cf1f1f",
                                    fontWeight: 500,
                                    border: "1px solid #f5c2c7"
                                }}
                            >
                                <svg height="18" width="18" fill="none" viewBox="0 0 24 24" className="min-w-[18px]" style={{ color: "#cf1f1f" }}>
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.7" />
                                    <path d="M12 7.5v4m0 2.5v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                                {apiError}
                            </div>
                        )}

                        {/* Hidden email field */}
                        <input type="hidden" value={email} onChange={(e) => setEmail(e.target.value)} />

                        {/* OTP Input */}
                        <div className="space-y-2">
                            <label htmlFor="otp" className="block text-[15px] font-medium" style={{ color: "#444" }}>
                                6-digit OTP
                            </label>
                            <input
                                id="otp"
                                type="text"
                                maxLength="6"
                                placeholder="• • • • • •"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="block w-full px-4 py-2.5 border-2 text-[15px] rounded-lg focus:outline-none focus:ring-4 transition text-center tracking-[0.5em] text-lg font-semibold"
                                style={{
                                    background: "#fff",
                                    borderColor: otp.length === 0 ? "#e5e7eb" : otp.length === 6 ? "#86efac" : "#fca5a5",
                                    boxShadow: "none"
                                }}
                            />
                        </div>

                        {/* Back to Sign In */}
                        <div className="flex items-center justify-between gap-4">
                            <div />
                            <Link
                                to="/poweradmin/signin"
                                className="text-[15px] font-medium hover:underline hover:text-red-500 focus:outline-none focus:ring-1 focus:ring-red-300 transition"
                                style={{ color: "#cf1f1f" }}
                            >
                                Back to Sign In
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <button
                            disabled={loading || otp.length !== 6}
                            onClick={async () => {
                                setApiError("");
                                setLoading(true);
                                try {
                                    const res = await verifyOtp(email, otp);
                                    const token = res?.token;
                                    if (token) {
                                        sessionStorage.setItem("powerAdminToken", token);
                                    }
                                    navigate("/poweradmin/change-password", { replace: true });
                                } catch (ex) {
                                    setApiError(ex?.message || "Invalid OTP. Please try again.");
                                } finally {
                                    setLoading(false);
                                }
                            }}
                            className="w-full flex items-center justify-center gap-2 shadow text-white py-2.5 rounded-lg text-lg font-bold focus:outline-none focus:ring-4 focus:ring-red-200 transition disabled:opacity-50"
                            style={{
                                background: "linear-gradient(90deg, #f44336 0%, #ff6363 100%)",
                                boxShadow: "0 2px 8px #f58080a3",
                                fontWeight: 700,
                                fontSize: "18px",
                                opacity: (loading || otp.length !== 6) ? 0.55 : 1,
                                cursor: (loading || otp.length !== 6) ? "not-allowed" : "pointer"
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
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                </svg>
                            ) : null}
                            <span>{loading ? "Verifying..." : "Verify OTP"}</span>
                        </button>

                        {/* Footer note */}
                        <div className="pt-4 text-center text-[15px]" style={{ color: "#7d7d7d" }}>
                            <span>
                                Didn't receive the OTP?{" "}
                                <a href="#" className="font-medium hover:underline ml-1" style={{ color: "#cf1f1f", textDecoration: "underline dotted" }}>
                                    Resend OTP
                                </a>
                            </span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default OtpVerify;
