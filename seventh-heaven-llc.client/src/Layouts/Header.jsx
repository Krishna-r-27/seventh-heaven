import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import logoPng from "@img/Seventh-Heaven-Holiday-Homes.png";
import logoWebp from "@img/Seventh-Heaven-Holiday-Homes.webp";
import Button from "@/Components/Button";

const navItems = [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/about-us" },
    { label: "Our Properties", path: "/our-properties" },
    { label: "Contact Us", path: "/contact-us" },
];

const Header = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
    }, [isOpen]);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 992) setIsOpen(false);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            {/* NAVBAR */}

            <nav className={`fixed top-0 left-0 w-full z-50 bg-white transition-shadow ${scrolled ? "shadow-nav" : ""}`}>

                <div className="container mx-auto flex items-center justify-between py-4 lg:py-5">

                    {/* LOGO */}

                    <NavLink to="/" className="flex shrink-0 items-center">

                        <picture>
                            <source srcSet={logoWebp} type="image/webp" />
                            <img
                                src={logoPng}
                                alt="Seventh Heaven Holiday Homes"
                                className="h-9 w-auto object-contain lg:h-9 xl:h-12"
                            />
                        </picture>

                    </NavLink>


                    {/* NAV + BUTTONS */}

                    <div className="hidden items-center gap-6 lg:flex">

                        {/* NAV LINKS */}

                        <ul className="flex items-center gap-6 xl:gap-8">

                            {navItems.map(({ label, path }) => (

                                <li key={label}>

                                    <NavLink
                                        to={path}
                                        end={path === "/"}
                                        className={({ isActive }) =>
                                            `font-medium text-body-sm whitespace-nowrap relative pb-1 transition-colors ${isActive
                                                ? "text-primary after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[2px] after:bg-primary"
                                                : "text-dark hover:text-primary"
                                            }`
                                        }
                                    >
                                        {label}
                                    </NavLink>

                                </li>

                            ))}

                        </ul>


                        {/* BUTTONS */}

                        <div className="flex items-center gap-3">

                            <Button variant="outline" to="/list-with-us">
                                List With Us
                            </Button>

                            <Button variant="primary" to="/inquire">
                                Inquire Now
                            </Button>

                        </div>

                    </div>


                    {/* MOBILE MENU BUTTON */}

                    <button
                        onClick={() => setIsOpen(true)}
                        className="lg:hidden p-2 text-dark"
                        aria-label="Open Menu"
                    >

                        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <line x1="3" y1="12" x2="21" y2="12" />
                            <line x1="3" y1="18" x2="21" y2="18" />
                        </svg>

                    </button>

                </div>

            </nav>


            {/* OVERLAY */}

            <div
                onClick={() => setIsOpen(false)}
                className={`fixed inset-0 bg-dark-overlay z-[60] transition-opacity lg:hidden ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
            />


            {/* MOBILE DRAWER */}

            <div className={`
        fixed top-0 right-0 h-screen w-[300px] z-[70]
        bg-white shadow-card-lg flex flex-col
        transform transition-transform duration-300
        lg:hidden
        ${isOpen ? "translate-x-0" : "translate-x-full"}
      `}>

                {/* Drawer Header */}

                <div className="flex items-center justify-between border-b border-gray-light px-6 py-4">

                    <NavLink to="/" onClick={() => setIsOpen(false)}>

                        <picture>
                            <source srcSet={logoWebp} type="image/webp" />
                            <img src={logoPng} alt="Logo" className="h-9 w-auto" />
                        </picture>

                    </NavLink>

                    <button onClick={() => setIsOpen(false)}>

                        <svg width="22" height="22" fill="none">
                            <path d="M17 5L5 17M5 5L17 17" stroke="currentColor" strokeWidth="2" />
                        </svg>

                    </button>

                </div>


                {/* Scrollable Links */}

                <div className="flex flex-1 flex-col gap-2 overflow-y-auto px-6 py-6">

                    {navItems.map(({ label, path }) => (

                        <NavLink
                            key={label}
                            to={path}
                            end={path === "/"}
                            onClick={() => setIsOpen(false)}
                            className={({ isActive }) =>
                                `px-3 py-3 rounded-md text-body-sm font-medium transition ${isActive
                                    ? "text-primary bg-bg-ice"
                                    : "text-dark hover:bg-gray-light hover:text-primary"
                                }`
                            }
                        >
                            {label}
                        </NavLink>

                    ))}

                </div>


                {/* Drawer Buttons */}

                <div className="flex flex-col gap-3 border-t border-gray-light px-6 py-5">

                    <Button variant="outline" to="/list-with-us">
                        List With Us
                    </Button>

                    <Button variant="primary" to="/inquire">
                        Inquire Now
                    </Button>

                </div>

            </div>


            {/* NAVBAR OFFSET */}

            <div className="pt-20 lg:pt-24" />

        </>
    );
};

export default Header;