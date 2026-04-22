import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { verifyOtp } from "../../../services/authService";

const OtpVerify = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [email, setEmail] = useState(location.state?.email || "");
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);

    return (
        <div
            className="min-h-screen flex flex-col
            bg-[#f3f4f6] dark:bg-gray-900
            bg-[radial-gradient(circle,rgba(0,0,0,0.08)_1px,transparent_1px)]
            dark:bg-[radial-gradient(circle,rgba(255,255,255,0.08)_1px,transparent_1px)]
            [background-size:20px_20px]"
        >
            {/* Center Content */}
            <div className="flex flex-1 items-center justify-center">
                <div
                    className="w-full max-w-md rounded-md px-8 py-10 shadow-xl
                    bg-white dark:bg-slate-800"
                >
                    <h2
                        className="text-center text-2xl font-medium mb-2
                        text-blue-800 dark:text-white"
                    >
                        Enter OTP
                    </h2>

                    <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-6">
                        OTP sent to your email
                    </p>

                    {/* Email (hidden in UI, but kept as controlled value) */}
                    <input type="hidden" value={email} onChange={(e) => setEmail(e.target.value)} />

                    {/* OTP input */}
                    <input
                        type="text"
                        maxLength="6"
                        placeholder="Enter 6-digit OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full rounded px-4 py-2 text-center tracking-widest text-lg
                        bg-blue-50 dark:bg-slate-700
                        border border-gray-200 dark:border-slate-600
                        focus:outline-none focus:ring-2
                        focus:ring-blue-800 dark:focus:ring-blue-500"
                    />

                    <button
                        disabled={loading}
                        onClick={async () => {
                            setLoading(true);
                            try {
                                const res = await verifyOtp(email, otp);
                                const token = res?.token;
                                if (token) {
                                    // Use sessionStorage for reset flow; user can persist later via signin remember-me
                                    sessionStorage.setItem("powerAdminToken", token);
                                }
                                // Reuse existing change-password page (no UI changes)
                                navigate("/poweradmin/change-password", { replace: true });
                            } finally {
                                setLoading(false);
                            }
                        }}
                        className="w-full mt-6 px-6 py-2 text-sm font-semibold rounded
                        bg-blue-800 hover:bg-blue-600
                        dark:bg-blue-800 dark:hover:bg-blue-600
                        text-white"
                    >
                        {loading ? "VERIFYING..." : "VERIFY OTP"}
                    </button>

                    <div className="text-center mt-6">
                        <Link
                            to="/poweradmin/signin"
                            className="text-sm text-blue-800 dark:text-blue-300 hover:underline"
                        >
                            Back to Sign In
                        </Link>
                    </div>
                </div>
            </div>            
        </div>
    );
};

export default OtpVerify;
