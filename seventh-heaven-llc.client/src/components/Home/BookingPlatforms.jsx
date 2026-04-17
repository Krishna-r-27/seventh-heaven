import PlatformsCard from "./PlatformsCard";
import { useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

function BookingPlatforms() {
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    return (
        <section className="w-full py-8 sm:py-12 md:py-14 lg:py-16 bg-gold">
            <div className="container mx-auto px-4">

                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-semibold text-white">
                            Why Partner with
                        </h2>

                        <div className="mt-2">
                            <div className="w-[62%] h-[1px] bg-white"></div>
                            <div className="w-[35%] h-[1px] bg-white mt-1"></div>
                        </div>
                    </div>

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