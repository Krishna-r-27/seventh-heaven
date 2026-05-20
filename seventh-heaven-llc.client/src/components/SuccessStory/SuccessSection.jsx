import React from "react";
import data from "../../data/AboutUs/successData";
import { motion, useAnimation } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Navigation } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

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
                                className="w-full h-[400px] sm:h-[450px] md:h-[500px]  lg:h-[400px] object-cover rounded-2xl"
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

                        <div className="space-y-6 flex flex-col items-start max-w-[650px]">

                            <Swiper
                                modules={[Autoplay, Navigation]}
                                slidesPerView={1}
                                spaceBetween={30}
                                loop={true}
                                autoplay={{
                                    delay: 4000,
                                    disableOnInteraction: false,
                                }}
                                navigation={{
                                    prevEl: ".custom-prev",
                                    nextEl: ".custom-next",
                                }}
                                className="w-full"
                            >

                                {data.reviews.map((item, index) => (

                                    <SwiperSlide key={index}>

                                        <div className="rounded-2xl border border-gold p-6 inline-block">

                                            {/* QUOTE IMAGE */}
                                            <img
                                                src={data.quoteImg}
                                                alt="Quote"
                                                className="w-auto mb-4 lg:mb-5"
                                            />

                                            {/* REVIEW TEXT */}
                                            <p className="text-theme font-medium italic text-[16px] leading-[30px]">
                                                {item.review}
                                            </p>

                                            {/* NAME SECTION */}
                                            <div className="mt-5 flex items-center gap-3">

                                                {/* FIRST LETTER BOX */}
                                                <div className="w-10 h-10 rounded-full bg-[#C5A553] text-white flex items-center justify-center text-lg font-semibold uppercase">
                                                    {item.name.charAt(0)}
                                                </div>

                                                {/* FULL NAME */}
                                                <h4 className="font-semibold text-theme text-md">
                                                    {item.name}
                                                </h4>

                                            </div>

                                        </div>

                                    </SwiperSlide>

                                ))}

                            </Swiper>

                            {/* ICONS */}
                            <div className="w-full flex items-center justify-center gap-3">

                                {/* PREV */}
                                <button className="custom-prev w-8 h-8 rounded-full border border-[#C5A553] text-[#C5A553] flex items-center justify-center hover:bg-[#C5A553] hover:text-white transition-all duration-300">
                                    <FiChevronLeft size={18} />
                                </button>

                                {/* NEXT */}
                                <button className="custom-next w-8 h-8 rounded-full border border-[#C5A553] text-[#C5A553] flex items-center justify-center hover:bg-[#C5A553] hover:text-white transition-all duration-300">
                                    <FiChevronRight size={18} />
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
};

export default SuccessSection;