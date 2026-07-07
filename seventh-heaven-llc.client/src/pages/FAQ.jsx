import { useState } from "react";
import BannerSection from "../components/BannerSection/BannerSection";
import { faqs } from "../../src/data/faq";
import { FiPlus, FiMinus } from "react-icons/fi";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

function FAQ() {
    const [activeIndex, setActiveIndex] = useState(0);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <>
            <Helmet>
                <title>Frequently Asked Questions | Seventh Heaven Holiday Homes Dubai</title>

                <meta
                    name="description"
                    content="Find answers to common questions about booking holiday homes, serviced apartments, property management, check-in, and guest services with Seventh Heaven Dubai."
                />

                <meta
                    name="keywords"
                    content="FAQ Seventh Heaven, holiday homes Dubai FAQ, serviced apartments Dubai, property management FAQ, Dubai vacation rentals"
                />

                <link
                    rel="canonical"
                    href="https://www.seventh-heaven.ae/faq"
                />
            </Helmet>
            <BannerSection title="FAQ" pageName="FAQ" />

            <section className="w-full py-8 sm:py-12 md:py-14 lg:py-16">
                <div className="container mx-auto px-4">

                    {faqs.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={`
        group
        border rounded-md mb-4 overflow-hidden transition-all duration-300
        ${activeIndex === index ? "border-gold shadow-sm" : "border-[#D1D5DB]"}
    `}
                        >

                            {/* QUESTION */}
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex items-center justify-between p-4 text-left"
                            >
                                <span
                                    className={`font-medium transition-colors duration-300 ${activeIndex === index
                                            ? "text-gold font-semibold"
                                            : "text-theme group-hover:text-gold"
                                        }`}
                                >
                                    {item.question}
                                </span>

                                <span className="text-gold text-xl">
                                    {activeIndex === index ? (
                                        <FiMinus />
                                    ) : (
                                        <FiPlus />
                                    )}
                                </span>
                            </button>

                            {/* ANSWER */}
                            {activeIndex === index && (
                                <div className="px-4 pb-4 text-theme leading-7">
                                    {item.answer}
                                </div>
                            )}
                        </motion.div>
                    ))}

                </div>
            </section>
        </>
    );
}

export default FAQ;