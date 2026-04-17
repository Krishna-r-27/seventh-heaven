import ListProperty from "../forms/ListProperty";
import listingImg from "@img/high-angle-view-swimming-pool.png"; 
import WhyPartnerSection from "./WhyPartnerSection";
import { motion } from "framer-motion";
function Listing() {
    return (
        <section className="w-full">
            <div className="container mx-auto px-3 md:px-4">

                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 1,
                        ease: [0.25, 0.1, 0.25, 1]
                    }}
                    viewport={{ once: true }}
                    className="flex flex-col lg:flex-row gap-8 items-start pt-8 sm:pt-12 md:pt-14 lg:pt-16"
                >
                    <div className="w-full lg:w-1/2 order-1 lg:order-2">

                        <div className="inline-block lg:mt-3">
                            <h2 className="text-2xl md:text-3xl font-semibold text-theme">
                                List Your <span className="text-gold">Property</span>
                            </h2>

                            <div className="mt-2">
                                <div className="w-[62%] h-[1px] bg-gold"></div>
                                <div className="w-[35%] h-[1px] bg-gold mt-1"></div>
                            </div>
                        </div>

                        <div className="mt-6 rounded-xl overflow-hidden">
                            <picture>
                                <source srcSet={listingImg} type="image/webp" />
                                <img
                                    src={listingImg}
                                    alt="listing"
                                    className="w-full h-[220px] sm:h-[260px] md:h-[300px] lg:h-auto object-cover rounded-none lg:rounded-xl"
                                />
                            </picture>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2 order-2 lg:order-1">
                            <ListProperty />
                    </div>
                </motion.div>

                <WhyPartnerSection />
            </div>
        </section>
    );
}

export default Listing;