import { platforms } from "../../data/Home/bookingPlatforms";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css/navigation";

import "swiper/css";

function PlatformsCard({ prevRef, nextRef }) {
    return (
        <>
            {/* ✅ Desktop Grid (≥ 992px) */}
            <div className="hidden lg:grid grid-cols-5 gap-6 mt-4">
                {platforms.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-md shadow-sm p-6 flex items-center justify-center hover:shadow-md transition"
                    >
                        <picture>
                            <source srcSet={item.webp} type="image/webp" />
                            <img
                                src={item.png}
                                alt={item.name}
                                className="h-12 w-auto object-contain"
                            />
                        </picture>
                    </div>
                ))}
            </div>

            {/* ✅ Mobile + Tablet Slider (< 992px) */}
            <div className="lg:hidden mt-4">
                <Swiper
                    modules={[Autoplay, Navigation]}
                    spaceBetween={16}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    navigation={{
                        prevEl: prevRef?.current,
                        nextEl: nextRef?.current,
                    }}
                    onBeforeInit={(swiper) => {
                        if (swiper.params.navigation && typeof swiper.params.navigation !== "boolean") {
                            swiper.params.navigation.prevEl = prevRef.current;
                            swiper.params.navigation.nextEl = nextRef.current;
                        }
                    }}
                    breakpoints={{
                        0: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                    }}
                >
                    {platforms.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="bg-white rounded-md shadow-sm p-6 flex items-center justify-center">
                                <picture>
                                    <source srcSet={item.webp} type="image/webp" />
                                    <img
                                        src={item.png}
                                        alt={item.name}
                                        className="h-12 w-auto object-contain"
                                    />
                                </picture>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    );
}

export default PlatformsCard;