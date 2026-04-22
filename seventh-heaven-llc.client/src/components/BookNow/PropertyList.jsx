import { useRef, useEffect, useState } from "react";
import PropertyCard from "./PropertyCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { motion, useAnimation } from "framer-motion";

function PropertyList({ data }) {
    const swiperRef = useRef(null);

    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const checkScreen = () => {
            setIsDesktop(window.innerWidth >= 992);
        };

        checkScreen(); // initial
        window.addEventListener("resize", checkScreen);

        return () => window.removeEventListener("resize", checkScreen);
    }, []);

    const showButtons = !isDesktop || data.length > 3;

    const controls = useAnimation();

    return (
        <section className="w-full py-8 sm:py-12 md:py-14 lg:py-16 bg-[#E8EEF7] mt-8 sm:mt-12 md:mt-14 lg:mt-16">
            <div className="container mx-auto px-4">

                {/* HEADER */}
                <div className="flex items-center justify-between">
                    <motion.div
                        className="inline-block"
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
                            Choose Your <span className="text-gold">Property</span>
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
                    {showButtons && (
                    <div className="flex gap-3">
                        {/* PREV */}
                        <button
                            onClick={() => swiperRef.current?.slidePrev()}
                            className="
                                w-10 h-10 
                                flex items-center justify-center 
                                rounded-full 
                                bg-white 
                                text-gold 
                                shadow-md 
                                hover:bg-gold hover:text-white 
                                transition-all duration-300
                            "
                        >
                            <FiChevronLeft size={18} />
                        </button>

                        {/* NEXT */}
                        <button
                            onClick={() => swiperRef.current?.slideNext()}
                            className="
                                w-10 h-10 
                                flex items-center justify-center 
                                rounded-full 
                                bg-white 
                                text-gold 
                                shadow-md 
                                hover:bg-gold hover:text-white 
                                transition-all duration-300
                            "
                        >
                            <FiChevronRight size={18} />
                        </button>
                    </div>
                    )}
                </div>

                {/* SLIDER */}
                <div className="mt-8">
                    <Swiper
                        modules={[Autoplay]}
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                        spaceBetween={20}

                        loop={true}

                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                        }}

                        breakpoints={{
                            0: { slidesPerView: 1 },
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                    >
                        {data.map((item) => (
                            <SwiperSlide key={item.id}>
                                <PropertyCard property={item} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

            </div>
        </section>
    );
}

export default PropertyList;