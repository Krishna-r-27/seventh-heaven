import { motion } from "framer-motion";
import Button from "@/Components/Button";
import bannerPng from "@/assets/img/hero.png";
import bannerWebp from "@/assets/img/hero.webp";

export default function HomeBanner() {
    return (
        <section className="relative h-[55vh] sm:h-[65vh] lg:h-[90vh] w-full overflow-hidden">

            {/* BACKGROUND IMAGE (with subtle zoom) */}
            <motion.picture
                className="absolute inset-0 w-full h-full"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 6, ease: "easeOut" }}
            >
                <source srcSet={bannerWebp} type="image/webp" />
                <img
                    src={bannerPng}
                    alt="Dubai Skyline"
                    className="w-full h-full object-cover"
                />
            </motion.picture>

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-blue/40"></div>

            {/* CONTENT */}
            <div className="relative z-10 container mx-auto h-full flex items-center">

                <div className="text-white text-center sm:text-left mx-auto sm:mx-0 max-w-lg">

                    {/* HEADING */}
                    <motion.h1
                        className="font-manrope text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        Making Vacations <br />
                        Memorable
                    </motion.h1>

                    {/* PARAGRAPH */}
                    <motion.p
                        className="mt-4 text-md"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.7 }}
                    >
                        Your dream house is just one step away - let's discover it together
                        today and start living.
                    </motion.p>

                    {/* BUTTON */}
                    <motion.div
                        className="mt-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                    >
                        <Button
                            className="bg-white text-theme"
                            variant="outline"
                            to="/listing"
                        >
                            List With Us
                        </Button>
                    </motion.div>

                </div>

            </div>

        </section>
    );
}