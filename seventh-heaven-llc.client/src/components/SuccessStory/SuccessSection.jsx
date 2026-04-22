import React from "react";
import data from "../../data/AboutUs/successData";
import { motion, useAnimation } from "framer-motion";

const SuccessSection = () => {
    const controls = useAnimation();

    return (
        <section className="w-full py-8 sm:py-12 md:py-14 lg:py-16 bg-[#E8EEF7] my-8 sm:my-12 md:my-14 lg:my-16">
            <div className="container mx-auto px-4">

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 items-center">

                    {/* LEFT IMAGE (HIDDEN ON MOBILE) */}
                    <div className="hidden lg:block">
                        <picture>
                            <source srcSet={data.image.webp} type="image/webp" />
                            <img
                                src={data.image.png}
                                alt="Success"
                                className="w-full h-[400px] sm:h-[450px] md:h-[500px]  lg:h-full object-cover rounded-2xl"
                            />
                        </picture>
                    </div>

                    {/* RIGHT CONTENT */}
                    <div className=" flex flex-col items-center items-start text-left">

                        {/* HEADING */}
                        <motion.div
                            className="w-fit"
                            initial="hidden"
                            animate={controls}
                            onViewportEnter={() => controls.start("visible")}
                            onViewportLeave={() => controls.start("hidden")}
                            viewport={{ amount: 0.4 }}
                        >
                            {/* TITLE */}
                            <motion.h2
                                className="text-2xl md:text-3xl font-semibold text-theme inline-block"
                                variants={{
                                    hidden: { y: 30, opacity: 0 },
                                    visible: {
                                        y: 0,
                                        opacity: 1,
                                        transition: { duration: 0.6, ease: "easeOut" }
                                    }
                                }}
                            >
                                <span>{data.title} </span>
                                <span className="text-[#C5A553]">{data.highlight}</span>
                            </motion.h2>

                            {/* LINES */}
                            <div className="mt-2">

                                <motion.div
                                    className="w-[62%] h-[1px] bg-[#C5A553]"
                                    style={{ originX: 0.5 }}
                                    variants={{
                                        hidden: { scaleX: 0, opacity: 0 },
                                        visible: {
                                            scaleX: 1,
                                            opacity: 1,
                                            transition: { delay: 0.6, duration: 0.4 }
                                        }
                                    }}
                                />

                                <motion.div
                                    className="w-[35%] h-[1px] bg-[#C5A553] mt-1"
                                    style={{ originX: 0.5 }}
                                    variants={{
                                        hidden: { scaleX: 0, opacity: 0 },
                                        visible: {
                                            scaleX: 1,
                                            opacity: 1,
                                            transition: { delay: 0.8, duration: 0.4 }
                                        }
                                    }}
                                />
                            </div>
                        </motion.div>

                        {/* SUBTEXT */}
                        <p className="text-theme text-md my-6">
                            {data.subtitle}
                        </p>

                        {/* STATS */}
                        <div className="space-y-5 flex flex-col items-start w-full">
                            {data.stats.map((item, index) => (
                                <React.Fragment key={index}>

                                    <div className="flex items-center gap-4 md:gap-6 w-full justify-start">

                                        {/* ICON */}
                                        <div className="bg-gold p-3 md:p-4 rounded-sm flex-shrink-0">
                                            <img src={item.icon} alt="" className="w-5 h-5 md:w-6 md:h-6" />
                                        </div>

                                        {/* TEXT */}
                                        <div>
                                            <h3 className="text-xl md:text-2xl font-semibold text-blue">
                                                {item.value}
                                            </h3>
                                            <p className="text-theme text-md">
                                                {item.label}
                                            </p>
                                        </div>

                                    </div>

                                    {index !== data.stats.length - 1 && (
                                        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#797979] to-transparent"></div>
                                    )}

                                </React.Fragment>
                            ))}
                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
};

export default SuccessSection;