// src/poweradmin/components/SessionTimeoutModal.jsx

const SessionTimeoutModal = ({ countdown, refreshing, onStayLoggedIn, onSignOut }) => {
    const minutes = Math.floor(countdown / 60);
    const seconds = String(countdown % 60).padStart(2, "0");
    const display = minutes > 0 ? `${minutes}:${seconds}` : `0:${seconds}`;

    return (
        // Backdrop
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
            <div className="w-full max-w-sm rounded-2xl bg-white dark:bg-gray-800 shadow-2xl p-6 mx-4">
                {/* Icon */}
                <div className="flex justify-center mb-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
                        <svg className="h-7 w-7 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M12 9v2m0 4h.01M12 3a9 9 0 100 18A9 9 0 0012 3z" />
                        </svg>
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-center text-lg font-semibold text-gray-800 dark:text-white mb-2">
                    Session Expiring Soon
                </h2>

                {/* Body */}
                <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-1">
                    Your session will expire in
                </p>
                <p className="text-center text-3xl font-bold text-amber-500 mb-4 tabular-nums">
                    {display}
                </p>
                <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-6">
                    Click <strong>Stay logged in</strong> to continue your session.
                </p>

                {/* Buttons */}
                <div className="flex gap-3">
                    <button
                        onClick={onSignOut}
                        disabled={refreshing}
                        className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600
                                   px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300
                                   hover:bg-gray-50 dark:hover:bg-gray-700
                                   disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                        Sign out
                    </button>
                    <button
                        onClick={onStayLoggedIn}
                        disabled={refreshing}
                        className="flex-1 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium
                                   text-white hover:bg-indigo-700
                                   disabled:opacity-60 disabled:cursor-not-allowed transition"
                    >
                        {refreshing ? "Refreshing…" : "Stay logged in"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SessionTimeoutModal;