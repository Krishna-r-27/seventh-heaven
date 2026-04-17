import React from "react";
import { NavLink } from "react-router-dom";
import footerlogoPng from "@img/footer-seventh-llc-logo.png";
import footerBg from "@img/footer-bg.png";
import footerlogoWebp from "@img/footer-seventh-llc-logo.webp";
import callIconPng from "@img/call-dark-icon.png";
import callIconWebp from "@img/call-dark-icon.webp";
import emailIconPng from "@img/email-dark-icon.png";
import emailIconWebp from "@img/email-dark-icon.webp";

const Footer = () => {
    const quickLinks = [
        { name: "Home", path: "/" },
        { name: "About Us", path: "/about-us" },
        { name: "Our Properties", path: "/book-now" },
        { name: "Contact Us", path: "/contact-us" },
    ];
    return (
        <footer className="bg-cover bg-center bg-no-repeat bg-[#E8EEF7]"
            style={{
                backgroundImage: `url(${footerBg})`
            }}>
            <div className="relative container mx-auto px-4">

                <div className="
                      grid grid-cols-1
                      md:grid-cols-2
                      lg:grid-cols-[2fr_1fr_1fr]
                      gap-8 xl:gap-16
                    ">

                    <div className="text-theme h-full md:col-span-2 lg:col-span-1">
                        <NavLink to="/" end>
                            <picture>
                                <source srcSet={footerlogoWebp} type="image/webp" />
                                <img
                                    src={footerlogoPng}
                                    alt="Seventh Heaven Holiday Homes"
                                    className="h-16 w-auto object-contain lg:h-20 xl:h-24 mt-6 md:mt-8"
                                />
                            </picture>
                        </NavLink>
                        <p className="leading-7 text-base lg:pe-10 lg:mb-8 mt-5">
                            SEVENTH-HEAVEN Holiday Homes is a Dubai-based holiday home management company established in May 2022 by three professionals with over a decade of experience in the real estate industry. Our company focuses on providing high-quality holiday homes and serviced apartments that offer comfort, convenience, and a premium stay experience in Dubai.
                        </p>
                    </div>

                    <div className="mb-0 md:mb-8 lg:mb-0 md:py-6 lg:py-12 ps-4 md:ps-2 xl:ps-10 md:pb-0 md:py-6  lg:md:py-14  lg:py-12 px-4 lg:px-0">

                        <div className="inline-block mb-6">
                            <h3 className="text-blue font-semibold text-lg lg:text-xl">
                                Quick Links
                            </h3>

                            {/* underline */}
                            <div className="mt-2">
                                <div className="w-[60%] h-[2px] bg-blue"></div>
                            </div>
                        </div>

                        <ul className="space-y-4 text-base">
                            {quickLinks.map((item, i) => (
                                <li key={i}>
                                    <NavLink
                                        to={item.path}
                                        end={item.path === "/"}
                                        className={({ isActive }) =>
                                            `group flex items-center gap-3 transition-all duration-300 ${isActive ? "text-gold font-semibold" : "hover:text-gold"
                                            }`
                                        }
                                    >
                                        <span className="w-1.5 h-1.5 bg-current rounded-full"></span>
                                        {item.name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>

                    </div>

                    <div className="pb-7 md:pb-0 md:py-6  lg:md:py-14  lg:py-12 px-4 lg:px-0">
                        <div className="inline-block">
                            <h3 className="text-blue font-semibold text-lg lg:text-xl">
                                Contact Us
                            </h3>
                            <div className="mt-2 mb-6">
                                <div className="w-[60%] h-[2px] bg-blue"></div>
                            </div>
                        </div>

                        <ul className="space-y-5 text-base">

                            {/* EMAIL */}
                            <li className="flex items-start gap-3">
                                <div className="mt-1">
                                    <picture>
                                        <source srcSet={emailIconWebp} type="image/webp" />
                                        <img src={emailIconPng} alt="Email" className="w-5 h-5" />
                                    </picture>
                                </div>

                                <a
                                    href="mailto:info@seventh-heaven.ae"
                                    className="hover:text-gold transition-colors duration-300"
                                >
                                    info@seventh-heaven.ae
                                </a>
                            </li>

                            {/* PHONE */}
                            <li className="flex items-start gap-3">
                                <div className="mt-1">
                                    <picture>
                                        <source srcSet={callIconWebp} type="image/webp" />
                                        <img src={callIconPng} alt="Call" className="w-5 h-5" />
                                    </picture>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <a
                                        href="tel:+971585351003"
                                        className="hover:text-gold transition-colors duration-300"
                                    >
                                        +971 58 535 1003
                                    </a>

                                    <a
                                        href="tel:+971565110920"
                                        className="hover:text-gold transition-colors duration-300"
                                    >
                                        +971 56 511 0920
                                    </a>
                                </div>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>

            <div className="border-t border-theme "></div>
            <div className="relative container mx-auto px-4">
                <div className="flex flex-col lg:flex-row justify-between items-center text-center lg:text-left gap-3 py-5 text-base">

                    <p className=" text-center md:text-left">
                        Copyright &copy; 2026 Seventh Heaven. All Rights Reserved.
                        |{" "}
                        <NavLink
                            to="/sitemap"
                            className={({ isActive }) =>
                                `transition hover:text-gold ${isActive ? "text-gold font-semibold" : ""
                                }`
                            }
                        >
                            Sitemap
                        </NavLink> |{" "}
                        <NavLink
                            to="/faq"
                            className={({ isActive }) =>
                                `transition hover:text-gold ${isActive ? "text-gold font-semibold" : ""
                                }`
                            }
                        >
                            FAQ
                        </NavLink>
                    </p>

                    <p className="">
                        Website Design by{" "}
                        <a
                            href="https://www.dotsandcoms.in/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-gold transition"
                        >
                            D&C
                        </a>
                    </p>

                </div>
            </div>
        </footer>
    );
}

export default Footer;