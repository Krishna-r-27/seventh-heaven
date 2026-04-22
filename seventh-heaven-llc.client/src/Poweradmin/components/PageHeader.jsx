import React from "react";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

const PageHeader = ({ title, breadcrumbs = [] }) => {
    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

            {/* Page Title */}
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
                {title}
            </h1>

            {/* Breadcrumb */}
            <nav>
                <ol className="flex items-center text-slate-500 dark:text-slate-400">
                    {breadcrumbs.map((item, index) => (
                        <li key={index} className="flex items-center">
                            {item.href ? (
                                <Link
                                    to={item.href}
                                    className="hover:text-slate-800 dark:hover:text-white transition"
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <span className="text-slate-800 dark:text-white font-medium">
                                    {item.label}
                                </span>
                            )}

                            {/* Arrow */}
                            {index < breadcrumbs.length - 1 && (
                                <IoIosArrowForward className="mx-2 text-xs opacity-70" />

                            )}
                        </li>
                    ))}
                </ol>
            </nav>
        </div>
    );
};

export default PageHeader;
