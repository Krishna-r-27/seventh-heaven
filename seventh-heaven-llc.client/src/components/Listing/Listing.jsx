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

                        <div className="rounded-xl overflow-hidden">
                            <picture>
                                <source srcSet={listingImg} type="image/webp" />
                                <img
                                    src={listingImg}
                                    alt="listing"
                                    className="w-full h-[250px] sm:h-[300px] md:h-[340px] lg:h-[1088px] object-cover rounded-none lg:rounded-xl"
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