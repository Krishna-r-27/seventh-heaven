import { motion, useAnimation } from "framer-motion";
import React from "react";
import aboutData from "../../data/AboutUs/aboutData";

const AboutUsSection = () => {
    const controls = useAnimation();
    return (
        <section className="w-full py-8 sm:py-12 md:py-14 lg:py-16">
            <div className="container mx-auto px-4">

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 md:gap-10 items-center">

                    {/* HEADING (mobile) */}
                    <motion.div
                        className="order-1 lg:hidden w-fit"
                        initial="hidden"
                        animate={controls}
                        onViewportEnter={() => controls.start("visible")}
                        onViewportLeave={() => controls.start("hidden")}
                        viewport={{ amount: 0.4 }}
                    >
                        <motion.h2
                            className="text-2xl md:text-3xl font-semibold text-theme"
                            variants={{
                                hidden: { y: 30, opacity: 0 },
                                visible: {
                                    y: 0,
                                    opacity: 1,
                                    transition: { duration: 0.6, ease: "easeOut" }
                                }
                            }}
                        >
                            About <span className="text-gold">Us</span>
                        </motion.h2>

                        <div className="mt-2">
                            <motion.div
                                className="w-[62%] h-[1px] bg-gold"
                                style={{ originX: 0 }}
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
                                className="w-[35%] h-[1px] bg-gold mt-1"
                                style={{ originX: 0 }}
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

                    {/* IMAGE (from LEFT) */}
                    <motion.div
                        className="order-2 lg:order-1"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{
                            duration: 0.9,
                            ease: [0.25, 0.1, 0.25, 1]
                        }}
                        viewport={{ once: true }}
                    >
                        <picture>
                            <source srcSet={aboutData.image.webp} type="image/webp" />
                            <img
                                src={aboutData.image.png}
                                alt="About Us"
                                className="w-full h-[240px] sm:h-[300px] md:h-[340px] lg:h-[480px] object-cover rounded-xl md:rounded-2xl"
                            />
                        </picture>
                    </motion.div>

                    {/* TEXT (from RIGHT) */}
                    <motion.div
                        className="order-3 lg:order-2"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{
                            duration: 0.9,
                            delay: 0.15,
                            ease: [0.25, 0.1, 0.25, 1]
                        }}
                        viewport={{ once: true }}
                    >

                        {/* HEADING (desktop) */}
                        <motion.div
                            className="hidden min-[992px]:inline-block"
                            initial="hidden"
                            animate={controls}
                            onViewportEnter={() => controls.start("visible")}
                            onViewportLeave={() => controls.start("hidden")}
                            viewport={{ amount: 0.4 }}
                        >
                            <motion.h2
                                className="text-2xl md:text-3xl font-semibold text-theme"
                                variants={{
                                    hidden: { y: 30, opacity: 0 },
                                    visible: {
                                        y: 0,
                                        opacity: 1,
                                        transition: { duration: 0.6, ease: "easeOut" }
                                    }
                                }}
                            >
                                About <span className="text-gold">Us</span>
                            </motion.h2>

                            <div className="mt-2">
                                <motion.div
                                    className="w-[62%] h-[1px] bg-gold"
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
                                    className="w-[35%] h-[1px] bg-gold mt-1"
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

                        {/* DESCRIPTION */}
                        <div className="text-theme leading-relaxed space-y-4 text-md lg:text-left mx-auto lg:mx-0 md:mt-4">
                            {aboutData.description.map((para, index) => (
                                <p key={index}>{para}</p>
                            ))}
                        </div>

                    </motion.div>

                </div>

            </div>
        </section>
    );
};

export default AboutUsSection;