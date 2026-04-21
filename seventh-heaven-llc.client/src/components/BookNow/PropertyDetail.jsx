import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Autoplay } from "swiper/modules";
import BannerSection from "../BannerSection/BannerSection";
import properties from "@/data/properties";
import EnquiryNow from "../forms/EnquiryNow";
import arrowWebp from "@img/list-arrow.webp";
import arrowPng from "@img/list-arrow.png";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

function PropertyDetail() {
    const { slug } = useParams();

    const swiperRef = useRef(null);

    const [isLargeScreen, setIsLargeScreen] = useState(false);

    const property = properties.find(p => p.slug === slug);

    const totalImages = property?.images.length || 0;

    const showButtons =
        (isLargeScreen && totalImages > 3) || // desktop
        (!isLargeScreen && totalImages > 2);  // mobile/tablet


    if (!property) {
        return <p className="p-6">Property not found</p>;
    }

    useEffect(() => {
        Fancybox.bind("[data-fancybox='gallery']", {
            Thumbs: {
                autoStart: true,
            },
        });

        return () => {
            Fancybox.destroy();
        };
    }, []);

    useEffect(() => {
        const checkScreen = () => {
            setIsLargeScreen(window.innerWidth > 992); // ✅ strictly > 992
        };

        checkScreen();
        window.addEventListener("resize", checkScreen);

        return () => window.removeEventListener("resize", checkScreen);
    }, []);
   
    return (
        <>
            <BannerSection title="Book Now" pageName="Book Now" />

            <section className="w-full py-8 sm:py-12 md:py-14 lg:py-16">
                <div className="container mx-auto px-4">
                    <div className="inline-block">
                        <h2 className="text-2xl md:text-3xl font-semibold text-theme">
                            {(() => {
                                const words = property.title.split(" ");

                                if (words.length === 1) {
                                    return words[0];
                                }

                                const lastWord = words.pop();

                                return (
                                    <>
                                        {words.join(" ")}{" "}
                                        <span className="text-gold">{lastWord}</span>
                                    </>
                                );
                            })()}
                        </h2>

                        <div className="mt-2">
                            <div className="w-[62%] h-[1px] bg-gold"></div>
                            <div className="w-[35%] h-[1px] bg-gold mt-1"></div>
                        </div>
                    </div>
                   
                    <div className="mb-6 md:mb-10 mt-5 md:mt-6 relative">

                        {/* LEFT BUTTON */}
                        {showButtons && (
                            <button
                                onClick={() => swiperRef.current?.slidePrev()}
                                className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 
                                    w-10 h-10 flex items-center justify-center 
                                    rounded-full border border-gold text-gold bg-white shadow"
                            >
                                <FaArrowLeft />
                            </button>
                        )}

                        {/* RIGHT BUTTON */}
                        {showButtons && (
                            <button
                                onClick={() => swiperRef.current?.slideNext()}
                                className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 
                                    w-10 h-10 flex items-center justify-center 
                                    rounded-full border border-gold text-gold bg-white shadow"
                            >
                                <FaArrowRight />
                            </button>
                        )}

                        {/* SWIPER */}
                        <Swiper
                            modules={[Autoplay]}
                            onSwiper={(swiper) => (swiperRef.current = swiper)}
                            loop={property.images.length > 3}
                            spaceBetween={20}
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            speed={900} // 🔥 smoother slide transition
                            breakpoints={{
                                0: { slidesPerView: 1 },
                                769: { slidesPerView: 2 },
                                992: { slidesPerView: 3 },
                            }}
                        >
                            {property.images.map((img, i) => (
                                <SwiperSlide key={i}>

                                    {/* SLIDE ANIMATION */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.8,
                                            delay: i * 0.1,
                                            ease: [0.25, 0.1, 0.25, 1]
                                        }}
                                        viewport={{ once: true }}
                                    >
                                        <a
                                            href={img}
                                            data-fancybox="gallery"
                                            className="block overflow-hidden rounded-lg"
                                        >

                                            {/* IMAGE */}
                                            <motion.img
                                                src={img}
                                                className="w-full h-[450px] object-cover rounded-lg"

                                                /* 🔥 cinematic slow zoom */
                                                initial={{ scale: 1.05 }}
                                                animate={{ scale: 1 }}
                                                transition={{ duration: 2.5, ease: "easeOut" }}

                                                /* 🔥 very subtle hover (optional) */
                                                whileHover={{ scale: 1.03 }}
                                            />

                                        </a>
                                    </motion.div>

                                </SwiperSlide>
                            ))}
                        </Swiper>

                    </div>
                  
                  
                    <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-4 lg:gap-6 mt-5">

                        <div className="lg:pe-18">
                            <div className="bg-white border border-gold rounded-xl py-4 md:py-5 px-4 lg:px-6 mb-6">

                                <div className="flex flex-wrap md:gap-6 gap-3 mb-4 text-theme">
                                    <p className="text-theme">
                                        <span className="font-semibold">Spacious:</span> <span className="text-theme">{property.type}</span>
                                    </p>

                                    <p>
                                        <span className="font-semibold">Location:</span> <span className="text-theme">{property.location}</span>
                                    </p>
                                </div>

                                {/* Title */}
                                <div className="inline-block md:mt-2">
                                    <h2 className="text-xl md:text-2xl font-semibold text-theme">
                                        Amenities
                                    </h2>

                                    <div className="mt-2">
                                        <div className="w-[62%] h-[1px] bg-gold"></div>
                                        <div className="w-[35%] h-[1px] bg-gold mt-1"></div>
                                    </div>
                                </div>

                                {/* Amenities Row */}
                                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 lg:gap-x-10 lg:gap-y-2">

                                    {property.amenities.map((item, i) => (
                                        <div key={i} className="flex items-center gap-2 mt-4">

                                            {/* Icon */}
                                            <img
                                                src={item.icon}
                                                alt={item.name}
                                                className="w-6 h-6"
                                            />

                                            {/* Name */}
                                            <span className="text-theme font-medium">
                                                {item.name}
                                            </span>

                                        </div>
                                    ))}

                                </div>

                            </div>
                        

                            <div>
                                {property.description.map((para, i) => (
                                    <p key={i} className="text-theme leading-7 mb-2">
                                        {para}
                                    </p>
                                ))}
                            </div>

                            <div className="my-8">

                                <div className="inline-block">
                                    <h2 className="text-xl md:text-2xl font-semibold text-theme">
                                        Nearest Location
                                    </h2>

                                    <div className="mt-2">
                                        <div className="w-[62%] h-[1px] bg-gold"></div>
                                        <div className="w-[35%] h-[1px] bg-gold mt-1"></div>
                                    </div>
                                </div>

                                <p className="text-theme text-md font-semibold mt-4">
                                    {property.nearestLocation}
                                </p>
                            </div>

                            <div className="mb-8">
                                <div className="inline-block">
                                    <h2 className="text-xl md:text-2xl font-semibold text-theme">
                                        House Rules
                                    </h2>

                                    <div className="mt-2">
                                        <div className="w-[62%] h-[1px] bg-gold"></div>
                                        <div className="w-[35%] h-[1px] bg-gold mt-1"></div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                                    {property.houseRules.map((rule, i) => (
                                        <div key={i} className="flex items-center gap-2">

                                            <picture>
                                                <source srcSet={arrowWebp} type="image/webp" />
                                                <img src={arrowPng} alt="arrow" className="w-4 h-4" />
                                            </picture>

                                            <p className="text-theme font-semibold">{rule}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-8">
                                <div className="inline-block">
                                    <h2 className="text-xl md:text-2xl font-semibold text-theme">
                                        Cancellation Policy
                                    </h2>

                                    <div className="mt-2">
                                        <div className="w-[62%] h-[1px] bg-gold"></div>
                                        <div className="w-[35%] h-[1px] bg-gold mt-1"></div>
                                    </div>
                                </div>

                                <div className="space-y-3 mt-4">
                                    {property.cancellationPolicy.map((item, i) => (
                                        <div key={i} className="flex items-start gap-2">

                                            <picture>
                                                <source srcSet={arrowWebp} type="image/webp" />
                                                <img src={arrowPng} alt="arrow" className="w-4 h-4 mt-1" />
                                            </picture>

                                            <p className="text-theme">
                                                {item.split(/(\d+%|\d+\s+days)/g).map((part, i) => {
                                                    if (/^\d+%$/.test(part) || /^\d+\s+days$/.test(part)) {
                                                        return (
                                                            <span key={i} className="font-semibold">
                                                                {part}
                                                            </span>
                                                        );
                                                    }
                                                    return <span key={i}>{part}</span>;
                                                })}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="rounded-md overflow-hidden mb-6">
                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(property.location)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block"
                                >
                                    <iframe
                                        src={`https://maps.google.com/maps?q=${encodeURIComponent(property.location)}&output=embed`}
                                        className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] pointer-events-none"
                                        loading="lazy"
                                    ></iframe>
                                </a>
                            </div>
                        </div>

                        <div>
                            <div className="lg:sticky lg:top-24">
                                <EnquiryNow />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default PropertyDetail;