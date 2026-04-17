import { NavLink } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import { motion } from "framer-motion";

export default function Button({
    children,
    to = "#",
    variant = "primary",
    className = "",
}) {

    const base =
        "relative inline-flex items-center rounded-full font-medium";

    const variants = {
        primary: "bg-primary text-white",
        outline: "border border-gold text-dark",
    };

    return (
        <motion.div
            whileHover={{ y: -2 }} // 🔥 slight lift
            transition={{ duration: 0.25 }}
            className="inline-block"
        >
            <NavLink
                to={to}
                className={`${base} ${variants[variant]} pl-4 pr-[3.25rem] py-2.5 xl:pl-6 xl:pr-[4.25rem] xl:py-3 ${className} shadow-sm hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] transition-all duration-300`}
            >
                {children}

                {/* ICON */}
                <motion.span
                    className={`absolute right-1 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 xl:w-10 xl:h-10 rounded-full ${variant === "primary"
                            ? "bg-white text-primary"
                            : "bg-gold"
                        }`}
                    whileHover={{ rotate: 45, x: 2, y: -2 }} // 🔥 premium motion
                    transition={{ duration: 0.3 }}
                >
                    <FiArrowUpRight className="h-5 w-5" />
                </motion.span>

            </NavLink>
        </motion.div>
    );
}