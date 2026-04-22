import React from "react";
import { Link } from "react-router-dom";
import aboutData from "../../data/Home/aboutUsData";
import aboutBgPng from "@img/about-bg.png";
import aboutBgWebp from "@img/about-bg.webp";
import roomViewPng from "@img/room-view.png";
import roomViewWebp from "@img/room-view.webp";
import propertyRoomPng from "@img/property-room.png";
import propertyRoomWebp from "@img/property-room.webp";
import { motion, useAnimation } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

const AboutUs = () => {
    const controls = useAnimation();
    return (
        <section className="relative w-full overflow-hidden">

            {/* ✅ Background (FULL WIDTH) */}
            <div className="hidden lg:block absolute inset-0 z-0 opacity-30 pointer-events-none">
                <picture>
                    <source srcSet={aboutBgWebp} type="image/webp" />
                    <img
                        src={aboutBgPng}
                        alt="background pattern"
                        className="absolute left-0 top-0 h-full w-auto object-cover"
                    />
                </picture>
            </div>

            {/* ✅ Content */}
            <div className="relative z-10 container mx-auto px-4">

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 md:gap-10 items-center">

                    {/* HEADING (ONLY for mobile + tablet) */}
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
                                hidden: { y: 40, opacity: 0 },
                                visible: {
                                    y: 0,
                                    opacity: 1,
                                    transition: { duration: 0.6 }
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

                    <div className="order-2 lg:order-1">
                        <motion.div
                            initial={{ opacity: 0, scale: 1.03 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            viewport={{ once: true }}
                        >
                            <picture>
                                <source srcSet={aboutData.image.webp} type="image/webp" />
                                <img
                                    src={aboutData.image.png}
                                    alt="About Us"
                                    className="w-full h-[240px] sm:h-[300px] md:h-[340px] lg:h-[480px] object-cover rounded-xl"
                                />
                            </picture>
                        </motion.div>
                    </div>

                    {/* TEXT */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="order-3 lg:order-2"
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
                            {/* TITLE */}
                            <motion.h2
                                className="text-2xl md:text-3xl font-semibold text-theme"
                                variants={{
                                    hidden: { y: 40, opacity: 0 },
                                    visible: {
                                        y: 0,
                                        opacity: 1,
                                        transition: { duration: 0.6 }
                                    }
                                }}
                            >
                                About <span className="text-gold">Us</span>
                            </motion.h2>

                            {/* LINES */}
                            <div className="mt-2">

                                {/* LINE 1 */}
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

                                {/* LINE 2 */}
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

                        <div className="flex justify-center sm:justify-between items-center gap-4 mt-5 text-md">

                            <Link
                                to="/about-us"
                                className="flex items-center gap-1 font-semibold text-blue group"
                            >
                                <span className="relative">
                                    Know More

                                    {/* underline animation */}
                                    <span className="absolute left-0 -bottom-[2px] h-[1px] w-0 bg-blue transition-all duration-300 ease-out group-hover:w-full"></span>
                                </span>

                                <FiArrowUpRight className="text-lg opacity-70 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                            </Link>

                        </div>

                        <div className="flex gap-5 mt-7">

                            {/* Image 1 */}
                            <div className="w-50 h-50 rounded-lg overflow-hidden">
                                <picture>
                                    <source srcSet={roomViewWebp} type="image/webp" />
                                    <img
                                        src={roomViewPng}
                                        alt="room view"
                                        className="w-full h-full object-cover"
                                    />
                                </picture>
                            </div>

                            {/* Image 2 */}
                            <div className="w-50 h-50 rounded-lg overflow-hidden">
                                <picture>
                                    <source srcSet={propertyRoomWebp} type="image/webp" />
                                    <img
                                        src={propertyRoomPng}
                                        alt="property room"
                                        className="w-full h-full object-cover"
                                    />
                                </picture>
                            </div>

                        </div>

                    </motion.div>

                </div>

            </div>
        </section>
    );
};

export default AboutUs;