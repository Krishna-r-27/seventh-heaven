import { motion, useAnimation } from "framer-motion";
import { propertyManagement } from "../../data/Home/propertyManagement";
import PropertyManagementCard from "./PropertyManagementCard";

function PropertyManagement() {
    const controls = useAnimation();
    return (
        <section className="w-full pt-8 sm:pt-12 md:pt-14 lg:pt-16">
            <div className="container mx-auto px-4">

                {/* Heading */}
                <div className="lg:text-center mb-5 md:mb-6">
                    <motion.div
                        className="inline-block"
                        initial="hidden"
                        animate={controls}
                        onViewportEnter={() => controls.start("visible")}
                        onViewportLeave={() => controls.start("hidden")}
                        viewport={{ amount: 0.4 }}
                    >
                        <motion.h2
                            className="text-2xl md:text-3xl font-semibold text-theme text-left lg:text-center"
                            variants={{
                                hidden: { y: 40, opacity: 0 },
                                visible: {
                                    y: 0,
                                    opacity: 1,
                                    transition: { duration: 0.6 }
                                }
                            }}
                        >
                            End-to-End{" "}
                            <span className="text-gold">
                                Property Management
                            </span>
                        </motion.h2>

                        <div className="lg:text-center mt-2">

                            <motion.div
                                className="w-[62%] h-[1px] bg-gold lg:mx-auto"
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
                                className="w-[35%] h-[1px] bg-gold mt-1 lg:mx-auto"
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
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 60, scale: 0.98 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                        duration: 0.8,
                        ease: [0.25, 0.1, 0.25, 1],
                    }}
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid 
            grid-cols-2 
            sm:grid-cols-4 
            md:grid-cols-5 
            lg:grid-cols-7 
            gap-5"
                >
                    {propertyManagement.map((item, index) => (
                        <PropertyManagementCard key={index} item={item} />
                    ))}
                </motion.div>

            </div>
        </section>
    );
}

export default PropertyManagement;