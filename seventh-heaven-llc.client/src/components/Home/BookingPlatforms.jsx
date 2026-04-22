import PlatformsCard from "./PlatformsCard";
import { useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { motion, useAnimation } from "framer-motion";

function BookingPlatforms() {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const controls = useAnimation();

    return (
        <section className="w-full py-8 sm:py-12 md:py-14 lg:py-16 bg-gold">
            <div className="container mx-auto px-4">

                <div className="flex items-center justify-between">
                    <motion.div
                        className="w-fit"
                        initial="hidden"
                        animate={controls}
                        onViewportEnter={() => controls.start("visible")}
                        onViewportLeave={() => controls.start("hidden")}
                        viewport={{ amount: 0.4 }}
                    >
                        <motion.h2
                            className="text-2xl md:text-3xl font-semibold text-white"
                            variants={{
                                hidden: { y: 30, opacity: 0 },
                                visible: {
                                    y: 0,
                                    opacity: 1,
                                    transition: { duration: 0.6, ease: "easeOut" }
                                }
                            }}
                        >
                            Our Partners
                        </motion.h2>

                        <div className="mt-2">

                            <motion.div
                                className="w-[62%] h-[1px] bg-white"
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
                                className="w-[35%] h-[1px] bg-white mt-1"
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

                    {/* ✅ Circle Navigation Buttons */}
                    <div className="flex gap-3">
                        <button
                            ref={prevRef}
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-gold shadow hover:bg-black hover:text-white transition"
                        >
                            <FiChevronLeft size={20} />
                        </button>

                        <button
                            ref={nextRef}
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-gold shadow hover:bg-black hover:text-white transition"
                        >
                            <FiChevronRight size={20} />
                        </button>
                    </div>
                </div>

                <p className="text-white text-md mt-4">
                    We feature your property on multiple short and medium term booking channels at the same time.
                </p>

                <PlatformsCard prevRef={prevRef} nextRef={nextRef} />
            </div>
        </section>
    );
}

export default BookingPlatforms;