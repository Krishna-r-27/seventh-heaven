import { NavLink } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import { motion } from "framer-motion";

export default function Button({
    children,
    to = "#",
    variant = "primary",
    size = "default",
    className = "",
}) {

    const base =
        "relative inline-flex items-center rounded-full font-medium";

    const variants = {
        primary: "bg-primary text-white",
        outline: "border border-gold text-dark",
    };

    // ✅ SIZE CONTROL (balanced)
    const sizes = {
        default:
            "pl-4 pr-[3.25rem] py-2.5 xl:pl-6 xl:pr-[4.25rem] xl:py-3 text-base",

        sm:
            "pl-4 pr-[3rem] py-2 xl:pl-5 xl:pr-[3.75rem] xl:py-2.5 text-base",
    };

    // ✅ ICON CONTAINER SIZE
    const iconSizes = {
        default: "w-9 h-9 xl:w-10 xl:h-10",
        sm: "w-8 h-8 xl:w-9 xl:h-9",
    };

    // ✅ ICON SIZE
    const iconIconSizes = {
        default: "h-5 w-5",
        sm: "h-4 w-4",
    };

    // ✅ ICON POSITION (important fix)
    const iconRight = {
        default: "right-1.5",
        sm: "right-1",
    };

    return (
        <motion.div
            whileHover={{ y: -2 }}
            transition={{ duration: 0.25 }}
            className="inline-block"
        >
            <NavLink
                to={to}
                className={`${base} ${variants[variant]} ${sizes[size]} ${className} shadow-sm hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] transition-all duration-300`}
            >
                {children}

                {/* ICON */}
                <motion.span
                    className={`absolute ${iconRight[size]} top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full 
                    ${iconSizes[size]} 
                    ${variant === "primary"
                            ? "bg-white text-primary"
                            : "bg-gold"
                        }`}
                    whileHover={{ rotate: 45, x: 2 }}
                    transition={{ duration: 0.3 }}
                >
                    <FiArrowUpRight className={iconIconSizes[size]} />
                </motion.span>

            </NavLink>
        </motion.div>
    );
}