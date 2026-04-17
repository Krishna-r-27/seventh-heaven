import { useState } from "react";
import BannerSection from "../components/BannerSection/BannerSection";
import { faqs } from "../../src/data/faq";
import { FiPlus, FiMinus } from "react-icons/fi";
import { motion } from "framer-motion";

function FAQ() {
    const [activeIndex, setActiveIndex] = useState(0);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <>
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
                                    className={`font-medium ${activeIndex === index ? "text-gold font-semibold" : "text-theme"
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