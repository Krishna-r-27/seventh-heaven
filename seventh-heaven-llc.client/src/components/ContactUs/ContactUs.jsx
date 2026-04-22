import callIcon from "@img/call-white.svg";
import emailIcon from "@img/email-white.svg";
import ContactForm from "../forms/ContactForm";
import { motion, useAnimation } from "framer-motion";
function ContactUs() {
    const controls = useAnimation();
    return (
        <section className="w-full py-8 sm:py-12 md:py-14 lg:py-16">
            <div className="container mx-auto px-4">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.9,
                        ease: [0.25, 0.1, 0.25, 1]
                    }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-8 lg:gap-24 lg:gap-12 items-start"
                >

                    {/* LEFT SIDE */}
                    <div>
                        <motion.div
                            className="mb-6 inline-block"
                            initial="hidden"
                            animate={controls}
                            onViewportEnter={() => controls.start("visible")}
                            onViewportLeave={() => controls.start("hidden")}
                            viewport={{ amount: 0.4 }}
                        >
                            <motion.h2
                                className="text-2xl md:text-3xl font-semibold text-[#222]"
                                variants={{
                                    hidden: { y: 30, opacity: 0 },
                                    visible: {
                                        y: 0,
                                        opacity: 1,
                                        transition: { duration: 0.6, ease: "easeOut" }
                                    }
                                }}
                            >
                                Get In <span className="text-[#C5A553]">Touch</span>
                            </motion.h2>

                            <div className="mt-2">
                                <motion.div
                                    className="w-[62%] h-[1px] bg-[#C5A553]"
                                    style={{ originX: 0.5 }}
                                    variants={{
                                        hidden: { scaleX: 0 },
                                        visible: {
                                            scaleX: 1,
                                            transition: { delay: 0.6, duration: 0.4 }
                                        }
                                    }}
                                />
                                <motion.div
                                    className="w-[35%] h-[1px] bg-[#C5A553] mt-1"
                                    style={{ originX: 0.5 }}
                                    variants={{
                                        hidden: { scaleX: 0 },
                                        visible: {
                                            scaleX: 1,
                                            transition: { delay: 0.8, duration: 0.4 }
                                        }
                                    }}
                                />
                            </div>
                        </motion.div>

                        {/* Call Box */}
                        <div className="flex items-center gap-4 border border-[#C5A553] rounded-md p-4 mb-5 bg-white">

                            <div className="bg-gold p-4 lg:p-5 rounded-sm">
                                <img src={callIcon} alt="Call" className="w-6 h-6 lg:w-7 lg:h-7" />
                            </div>

                            <div>
                                <h4 className="text-[#005AA4] font-semibold text-xl">
                                    Call on
                                </h4>
                                <p className="text-md text-theme leading-6 mt-1">
                                    <a
                                        href="tel:+971585351003"
                                        className="block hover:text-[#C5A553] transition"
                                    >
                                        +971 58 535 1003
                                    </a>

                                    <a
                                        href="tel:+971565110920"
                                        className="block hover:text-[#C5A553] transition"
                                    >
                                        +971 56 511 0920
                                    </a>
                                </p>
                            </div>
                        </div>

                        {/* Email Box */}
                        <div className="flex items-center gap-4 border border-gold rounded-md p-4 bg-white">

                            <div className="bg-gold p-4 lg:p-5 rounded-sm">
                                <img src={emailIcon} alt="Email" className="w-6 h-6 lg:w-7 lg:h-7" />
                            </div>

                            <div>
                                <h4 className="text-[#005AA4] font-semibold text-xl">
                                    Email on
                                </h4>
                                <a
                                    href="mailto:info@seventh-heaven.ae"
                                    className="text-md text-theme mt-1 inline-block hover:text-gold transition"
                                >
                                    info@seventh-heaven.ae
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE FORM */}
                        <ContactForm />
                </motion.div>
            </div>
        </section>
    );
}

export default ContactUs;