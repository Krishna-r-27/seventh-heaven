const AppFooter = () => {
    return (
        <footer className="bg-gray-100 dark:bg-gray-900 text-neutral-600 dark:text-neutral-400">
            <div className="max-w-7xl mx-auto px-4 py-2 text-center text-base">
                &copy; 2026 All Rights Reserved &middot; Powered by{" "}
                <a
                    href="https://www.dotsandcoms.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-neutral-900 dark:text-white hover:underline underline-offset-4 transition"
                >
                    DNC
                </a>
            </div>
        </footer>
    );
};

export default AppFooter;

