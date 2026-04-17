import { motion } from "framer-motion";
import propertiesData from "@/data/Home/propertiesData";
import { FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function PropertiesSection() {
    return (
        <section className="w-full py-8 sm:py-12 md:py-14 lg:py-16">
            <div className="container mx-auto px-4">

                {/* HEADING */}
                <div className="lg:text-center mb-5 md:mb-8">
                    <div className="inline-block">
                        <h2 className="text-2xl md:text-3xl font-semibold text-theme">
                            Explore Our <span className="text-gold">Properties</span>
                        </h2>

                        <div className="lg:text-center mt-2">
                            <div className="w-[62%] h-[1px] bg-gold lg:mx-auto"></div>
                            <div className="w-[35%] h-[1px] bg-gold mt-1 lg:mx-auto"></div>
                        </div>
                    </div>
                </div>

                {/* CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                    {propertiesData.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.7,
                                delay: index * 0.12,
                                ease: [0.25, 0.1, 0.25, 1] // smooth easing
                            }}
                            viewport={{ once: true }}
                            className="border border-gold/70 rounded-xl p-4 md:p-5 bg-white transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:border-gold"
                        >

                            {/* ICON */}
                            <div className="mb-4 flex justify-center sm:justify-start">
                                <div className={`p-4 rounded-sm ${index === 1 ? "bg-gold" : "bg-blue"}`}>
                                    <picture>
                                        <source srcSet={item.icon.webp} type="image/webp" />
                                        <img
                                            src={item.icon.png}
                                            alt={item.title}
                                            className="w-6 h-6 md:w-7 md:h-7"
                                        />
                                    </picture>
                                </div>
                            </div>

                            {/* TITLE */}
                            <h3 className="text-lg md:text-xl font-bold text-theme text-center sm:text-left">
                                {item.title}
                            </h3>

                            {/* DESCRIPTION */}
                            <p className="text-theme text-md mt-2 text-center sm:text-left">
                                {item.description}
                            </p>

                            {/* FOOTER */}
                            <div className="flex justify-center sm:justify-between items-center gap-4 mt-6 text-md">

                                <span className="text-theme font-semibold">
                                    {item.count}
                                </span>

                                <Link
                                    to="/book-now"
                                    className="flex items-center gap-1 font-semibold text-gold group"
                                >
                                    <span className="relative">
                                        View All

                                        {/* underline animation */}
                                        <span className="absolute left-0 -bottom-[2px] h-[1px] w-0 bg-gold transition-all duration-300 ease-out group-hover:w-full"></span>
                                    </span>

                                    <FiArrowUpRight className="text-lg opacity-70 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                                </Link>

                            </div>

                        </motion.div>
                    ))}

                </div>

            </div>
        </section>
    );
}