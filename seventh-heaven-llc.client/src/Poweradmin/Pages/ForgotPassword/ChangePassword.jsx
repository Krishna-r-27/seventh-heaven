import React, { useState, useEffect } from "react";
import { adminApi } from "../../../services/adminApi";

// ── Password field ────────────────────────────────────────────────────────────
// Defined at module scope so React reuses the same DOM node across renders.
// All state values it needs (value, show, onChange, onToggle) come in as props.
const PasswordField = ({ label, name, value, show, onChange, onToggle }) => (
    <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            {label}
        </label>
        <div className="relative">
            <input
                type={show ? "text" : "password"}
                name={name}
                value={value}
                onChange={onChange}
                required
                autoComplete="new-password"
                className="w-full pr-10 pl-4 py-2.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
                type="button"
                onClick={onToggle}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-xs select-none"
                tabIndex={-1}
            >
                {show ? "Hide" : "Show"}
            </button>
        </div>
    </div>
);

// ── Main page component ───────────────────────────────────────────────────────
const ChangePassword = () => {
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
        } catch (err) {
            const msg =
                err?.response?.data?.message ||
                "Failed to update password. Please try again.";
            setErrorMsg(msg);
        } finally {
            setSaving(false);
        }
    };

    // ── Render ────────────────────────────────────────────────────────────────

    return (
        <div className="p-6 max-w-lg">
            {/* Page heading */}
            <div className="mb-6">
                <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                    Change Password
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Update your admin account password. You will remain logged in after saving.
                </p>
            </div>

            {/* Feedback banners */}
            {successMsg && (
                <div className="mb-4 px-4 py-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm">
                    {successMsg}
                </div>
            )}
            {errorMsg && (
                <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                    {errorMsg}
                </div>
            )}

            {/* Form card */}
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm px-6 py-6">
                <form onSubmit={handleSubmit} noValidate>
                    <PasswordField
                        label="Current Password"
                        name="currentPassword"
                        value={form.currentPassword}
                        show={showPasswords.current}
                        onChange={handleChange}
                        onToggle={() => toggleShow("current")}
                    />
                    <PasswordField
                        label="New Password"
                        name="newPassword"
                        value={form.newPassword}
                        show={showPasswords.new}
                        onChange={handleChange}
                        onToggle={() => toggleShow("new")}
                    />
                    <PasswordField
                        label="Confirm New Password"
                        name="confirmPassword"
                        value={form.confirmPassword}
                        show={showPasswords.confirm}
                        onChange={handleChange}
                        onToggle={() => toggleShow("confirm")}
                    />

                    {/* Password requirements hint */}
                    <p className="text-xs text-gray-400 mt-1 mb-5">
                        Minimum 6 characters. Must differ from your current password.
                    </p>

                    <button
                        type="submit"
                        disabled={saving}
                        className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        {saving ? "Updating…" : "Update Password"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;