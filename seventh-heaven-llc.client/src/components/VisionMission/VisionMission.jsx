import React from "react";
import data from "../../data/AboutUs/visionMissionData";
import { motion, useAnimation } from "framer-motion";


const VisionMission = () => {
    const controls = useAnimation();
    return (
        <section className="w-full">
            <div className="container mx-auto px-4">

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 items-center">

                    {/* LEFT CONTENT */}
                    <div>
                        <div className="block lg:hidden mb-6 md:mb-8">

                            <picture>
                                <source srcSet={data.image.webp} type="image/webp" />
                                <img
                                    src={data.image.png}
                                    alt="VisionMission"
                                    className="w-full  h-[400px] sm:h-[450px] md:h-[500px]  lg:h-full  object-cover rounded-xl"
                                />
                            </picture>
                        </div>
                        {/* VISION */}
                        <motion.div
                            className="mb-8"
                            initial="hidden"
                            animate={controls}
                            onViewportEnter={() => controls.start("visible")}
                            onViewportLeave={() => controls.start("hidden")}
                            viewport={{ amount: 0.4 }}
                        >
                            <div className="flex items-center gap-4 mb-3">
                                <div className="bg-[#005AA4] p-3 rounded-sm">
                                    <img src={data.vision.icon} alt="vision" className="w-6 h-6" />
                                </div>

                                <motion.h3
                                    className="text-2xl sm:text-3xl font-semibold"
                                    variants={{
                                        hidden: { y: 30, opacity: 0 },
                                        visible: {
                                            y: 0,
                                            opacity: 1,
                                            transition: { duration: 0.8, ease: "easeOut" }
                                        }
                                    }}
                                >
                                    {data.vision.title}
                                </motion.h3>
                            </div>

                            <motion.div
                                className="h-[2px] w-full bg-gold mb-4"
                                style={{ originX: 0 }}
                                variants={{
                                    hidden: { scaleX: 0 },
                                    visible: {
                                        scaleX: 1,
                                        transition: { delay: 0.8, duration: 0.8, ease: "easeOut" }
                                    }
                                }}
                            />

                            <p className="text-theme text-md leading-7">
                                {data.vision.description}
                            </p>
                        </motion.div>

                        {/* MISSION */}
                        <motion.div
                            initial="hidden"
                            animate={controls}
                            onViewportEnter={() => controls.start("visible")}
                            onViewportLeave={() => controls.start("hidden")}
                            viewport={{ amount: 0.4 }}
                        >
                            <div className="flex items-center gap-4 mb-3">
                                <div className="bg-[#005AA4] p-3 rounded-sm">
                                    <img src={data.mission.icon} alt="mission" className="w-6 h-6" />
                                </div>

                                <motion.h3
                                    className="text-2xl sm:text-3xl font-semibold"
                                    variants={{
                                        hidden: { y: 30, opacity: 0 },
                                        visible: {
                                            y: 0,
                                            opacity: 1,
                                            transition: { duration: 0.8, ease: "easeOut" }
                                        }
                                    }}
                                >
                                    {data.mission.title}
                                </motion.h3>
                            </div>

                            <motion.div
                                className="h-[2px] w-full bg-gold mb-4"
                                style={{ originX: 0 }}
                                variants={{
                                    hidden: { scaleX: 0 },
                                    visible: {
                                        scaleX: 1,
                                        transition: { delay: 0.8, duration: 0.8, ease: "easeOut" }
                                    }
                                }}
                            />

                            <ul className="list-disc pl-5 space-y-3 text-theme text-md marker:text-[#C5A553]"> {data.mission.points.map((point, index) => (<li key={index}> {point} </li>))} </ul>
                        </motion.div>

                    </div>

                    {/* RIGHT IMAGE (HIDE ON MOBILE) */}
                    <div className="hidden lg:block mt-6 sm:mt-8 md:mt-10 lg:mt-0 ">
                        
                        <picture>
                            <source srcSet={data.image.webp} type="image/webp" />
                            <img
                                src={data.image.png}
                                alt="VisionMission"
                                className="w-full  h-[400px] sm:h-[450px] md:h-[500px]  lg:h-[600px]  object-cover rounded-2xl"
                            />
                        </picture>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default VisionMission;