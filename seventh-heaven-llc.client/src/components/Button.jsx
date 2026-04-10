import { NavLink } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";

export default function Button({
    children,
    to = "#",
    variant = "primary",
    className = "",
}) {

    const base =
        "relative inline-flex items-center rounded-full font-medium transition";

    const variants = {
        primary: "bg-primary text-white",
        outline: "border border-gold text-dark",
    };

    return (
        <NavLink
            to={to}
            className={`${base} ${variants[variant]} pl-4 pr-[3.25rem] py-2.5 xl:pl-6 xl:pr-[4.25rem] xl:py-3 ${className}`}
        >
            {children}

            <span
                className={`absolute right-1 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 xl:w-10 xl:h-10 rounded-full ${variant === "primary"
                    ? "bg-white text-primary"
                    : "bg-gold "
                    }`}
            >
                <FiArrowUpRight className="h-8 w-8" />
            </span>

        </NavLink>
    );
}