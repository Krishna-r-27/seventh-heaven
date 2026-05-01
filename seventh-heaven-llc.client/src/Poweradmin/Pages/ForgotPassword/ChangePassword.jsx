import React, { useState, useEffect } from "react";
import { adminApi } from "../../../services/adminApi";
import { useNavigate } from "react-router-dom";

// ── Password field ────────────────────────────────────────────────────────────
const PasswordField = ({ label, id, name, value, show, onChange, onToggle }) => (
    <div className="space-y-2">
        <label htmlFor={id} className="block text-[15px] font-medium" style={{ color: "#444" }}>
            {label}
        </label>
        <div className="relative">
            <input
                id={id}
                type={show ? "text" : "password"}
                name={name}
                value={value}
                onChange={onChange}
                required
                autoComplete="new-password"
                className="block w-full px-4 py-2.5 border-2 text-[15px] rounded-lg focus:outline-none focus:ring-4 focus:ring-red-100 transition pr-16"
                style={{
                    background: "#fff",
                    borderColor: value.length === 0 ? "#e5e7eb" : "#fca5a5",
                }}
            />
            <button
                type="button"
                onClick={onToggle}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold focus:outline-none"
                style={{ color: "#cf1f1f" }}
                tabIndex={-1}
            >
                {show ? "Hide" : "Show"}
            </button>
        </div>
    </div>
);

// ── Main page component ───────────────────────────────────────────────────────
const ChangePassword = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false,
    });

    const [saving, setSaving] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        document.title = "Change Password | PowerAdmin";
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setSuccessMsg("");
        setErrorMsg("");
    };

    const toggleShow = (field) => {
        setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const validate = () => {
        if (!form.currentPassword) return "Current password is required.";
        if (!form.newPassword || form.newPassword.length < 8)
            return "New password must be at least 8 characters.";
        if (form.newPassword !== form.confirmPassword)
            return "New password and confirm password do not match.";
        if (form.currentPassword === form.newPassword)
            return "New password must be different from the current password.";
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationError = validate();
        if (validationError) {
            setErrorMsg(validationError);
            return;
        }

        setSaving(true);
        setSuccessMsg("");
        setErrorMsg("");

        try {
            await adminApi.post("/poweradmin/change-password", {
                currentPassword: form.currentPassword,
                newPassword: form.newPassword,
                confirmPassword: form.confirmPassword,
            });

            setSuccessMsg("Password updated successfully.");
            setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
            navigate("/poweradmin", {
                state: { message: "Password updated successfully. Please sign in again." }
            });
        } catch (err) {
            const msg =
                err?.response?.data?.message ||
                "Failed to update password. Please try again.";
            setErrorMsg(msg);
        } finally {
            setSaving(false);
        }
    };

    const formIsValid =
        form.currentPassword.length > 0 &&
        form.newPassword.length >= 8 &&
        form.confirmPassword.length > 0;

    // ── Render ────────────────────────────────────────────────────────────────
    return (
        <div className="min-h-screen bg-gradient-to-tr from-red-100 via-white to-blue-50 flex items-center justify-center p-6">
            <div className="w-full max-w-lg mx-auto shadow-xl rounded-2xl overflow-hidden bg-white/70 backdrop-blur-md">
                <div className="flex flex-col justify-center py-12 px-6 sm:px-10 bg-white bg-opacity-90 backdrop-blur w-full">
                    <form onSubmit={handleSubmit} noValidate className="space-y-7">

                        {/* Header / Icon */}
                        <div className="flex flex-col items-center mb-5">
                            <div className="bg-gradient-to-br from-red-600 via-red-400 to-red-200 h-14 w-14 flex items-center justify-center rounded-full shadow-md mb-3">
                                {saving ? (
                                    <svg className="animate-spin w-7 h-7 text-white" viewBox="0 0 28 28" fill="none">
                                        <circle cx="14" cy="14" r="12" stroke="currentColor" strokeWidth="3" className="opacity-30" />
                                        <path d="M14 2a12 12 0 0 1 0 24" stroke="currentColor" strokeWidth="3" className="opacity-70" />
                                    </svg>
                                ) : (
                                    <svg viewBox="0 0 28 28" fill="none" className="w-7 h-7 text-white">
                                        <circle cx="14" cy="14" r="14" fill="currentColor" fillOpacity="0.2" />
                                        <rect x="7" y="13" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
                                        <path d="M10 13v-3a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        <circle cx="14" cy="17.5" r="1.2" fill="currentColor" />
                                    </svg>
                                )}
                            </div>
                            <h2 className="text-2xl font-bold" style={{ color: "#cf1f1f" }}>
                                Change Password
                            </h2>
                            <span className="text-sm mt-1" style={{ color: "#b91c1c", fontWeight: 600 }}>
                                Update your admin account password
                            </span>
                        </div>

                        {/* Success banner */}
                        {successMsg && (
                            <div role="status" className="text-[15px] p-3 rounded-lg flex items-center gap-2 shadow border" style={{ background: "#dcfce7", borderColor: "#bbf7d0", color: "#166534" }}>
                                <svg height="18" width="18" fill="none" viewBox="0 0 24 24" className="min-w-[18px]" style={{ color: "#16a34a" }}>
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.7" />
                                    <path d="M8.8 13.2l2.1 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                {successMsg}
                            </div>
                        )}

                        {/* Error banner */}
                        {errorMsg && (
                            <div role="alert" className="text-[15px] p-3 rounded-lg flex items-center gap-2 shadow" style={{ background: "#f8d7da", border: "1px solid #f5c2c7", color: "#cf1f1f", fontWeight: 500 }}>
                                <svg height="18" width="18" fill="none" viewBox="0 0 24 24" className="min-w-[18px]" style={{ color: "#cf1f1f" }}>
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.7" />
                                    <path d="M12 7.5v4m0 2.5v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                                {errorMsg}
                            </div>
                        )}

                        {/* Password fields */}
                        <PasswordField
                            label="Current Password"
                            id="currentPassword"
                            name="currentPassword"
                            value={form.currentPassword}
                            show={showPasswords.current}
                            onChange={handleChange}
                            onToggle={() => toggleShow("current")}
                        />
                        <PasswordField
                            label="New Password"
                            id="newPassword"
                            name="newPassword"
                            value={form.newPassword}
                            show={showPasswords.new}
                            onChange={handleChange}
                            onToggle={() => toggleShow("new")}
                        />
                        <PasswordField
                            label="Confirm New Password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={form.confirmPassword}
                            show={showPasswords.confirm}
                            onChange={handleChange}
                            onToggle={() => toggleShow("confirm")}
                        />

                        {/* Hint */}
                        <p className="text-xs mt-1" style={{ color: "#9ca3af" }}>
                            Minimum 8 characters. Must differ from your current password.
                        </p>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={saving || !formIsValid}
                            className="w-full flex items-center justify-center gap-2 shadow text-white py-2.5 rounded-lg text-lg font-bold focus:outline-none focus:ring-4 focus:ring-red-200 transition"
                            style={{
                                background: "linear-gradient(90deg, #f44336 0%, #ff6363 100%)",
                                boxShadow: "0 2px 8px #f58080a3",
                                fontWeight: 700,
                                fontSize: "18px",
                                opacity: (saving || !formIsValid) ? 0.55 : 1,
                                cursor: (saving || !formIsValid) ? "not-allowed" : "pointer",
                            }}
                        >
                            {saving ? (
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                </svg>
                            ) : null}
                            <span>{saving ? "Updating…" : "Update Password"}</span>
                        </button>

                        {/* Footer note */}
                        <div className="pt-4 text-center text-[15px]" style={{ color: "#7d7d7d" }}>
                            <span>
                                You will remain logged in after saving.
                            </span>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
