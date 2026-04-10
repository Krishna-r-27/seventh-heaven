import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToHash = () => {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) {
            setTimeout(() => {
                const element = document.querySelector(hash);
                if (element) {
                    element.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                    });
                }
            }, 400);
        }
    }, [pathname, hash]);

    return null;
};

export default ScrollToHash;