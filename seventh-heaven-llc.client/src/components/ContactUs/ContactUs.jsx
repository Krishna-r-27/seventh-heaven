import callIcon from "@img/call-white.svg";
import emailIcon from "@img/email-white.svg";
import ContactForm from "../forms/ContactForm";
function ContactUs() {
    return (
        <section className="w-full py-8 sm:py-12 md:py-14 lg:py-16">
            <div className="container mx-auto px-4">

                <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-8 lg:gap-24 lg:gap-12 items-start">

                    {/* LEFT SIDE */}
                    <div>
                        <div className="mb-6 inline-block">
                            <h2 className="text-2xl md:text-3xl font-semibold text-[#222]">
                                Get In <span className="text-[#C5A553]">Touch</span>
                            </h2>

                            {/* underline lines */}
                            <div className="mt-2">
                                <div className="w-[62%] h-[1px] bg-[#C5A553]"></div>
                                <div className="w-[35%] h-[1px] bg-[#C5A553] mt-1"></div>
                            </div>
                        </div>

                        {/* Call Box */}
                        <div className="flex items-center gap-4 border border-[#C5A553] rounded-md p-4 mb-5 bg-white">

                            <div className="bg-[#005AA4] p-4 lg:p-6 rounded-md">
                                <img src={callIcon} alt="Call" className="w-6 h-6 lg:w-8 lg:h-8" />
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

                            <div className="bg-[#005AA4] p-4 lg:p-6 rounded-md">
                                <img src={emailIcon} alt="Email" className="w-6 h-6 lg:w-8 lg:h-8" />
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
                </div>
            </div>
        </section>
    );
}

export default ContactUs;