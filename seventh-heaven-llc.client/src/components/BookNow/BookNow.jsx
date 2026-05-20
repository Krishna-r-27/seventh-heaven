import { useEffect, useMemo, useState, useRef } from "react";
import PropertyCard from "./PropertyCard";
import prevPng from "@img/previous-icon.png";
import nextPng from "@img/next-icon.png";
import { motion, useAnimation } from "framer-motion";
import { fetchMappedProperties } from "@/services/propertyApi";
import { useLocation } from "react-router-dom";

function BookNow() {
    const controls = useAnimation();
    const location = useLocation();
    const selectedType = location.state?.propertyType;
    const dropdownRefs = useRef({});
   

    const [openDropdown, setOpenDropdown] = useState(null);

    const [properties, setProperties] = useState([]);
    const [selectedPropertyType, setSelectedPropertyType] = useState(selectedType || "");
    const [selectedLocation, setSelectedLocation] = useState("");
    const [selectedBedrooms, setSelectedBedrooms] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 6;

    const normalizeFilterValue = (value = "") =>
        value.toString().trim().toLowerCase().replace(/[\s-]+/g, "");

    const propertyTypeOptions = useMemo(() => {
        const types = properties
            .map((item) => item.propertyType || item.type)
            .filter(Boolean);

        const optionsByValue = new Map();
        ["Apartment", "Villa", "Town House", "Penthouse", ...types].forEach((type) => {
            const key = normalizeFilterValue(type);
            if (key && !optionsByValue.has(key)) {
                optionsByValue.set(key, type);
            }
        });

        return Array.from(optionsByValue.values());
    }, [properties]);

    const locationOptions = useMemo(() => {
        const seen = new Set();
        const source = selectedPropertyType
            ? properties.filter((item) => {
                const selected = normalizeFilterValue(selectedPropertyType);
                return normalizeFilterValue(item.propertyType || item.type) === selected;
            })
            : properties;
        return source
            .map((item) => item.shortLocation)
            .filter((loc) => loc && !seen.has(loc) && seen.add(loc));
    }, [properties, selectedPropertyType]);

    //const bedroomOptions = useMemo(() => {
    //    const seen = new Set();
    //    const source = selectedPropertyType
    //        ? properties.filter((item) => {
    //            const selected = normalizeFilterValue(selectedPropertyType);
    //            return normalizeFilterValue(item.propertyType || item.type) === selected;
    //        })
    //        : properties;
    //    return source
    //        .map((item) => item.bedrooms)
    //        .filter((b) => b !== null && b !== undefined && !seen.has(b) && seen.add(b))
    //        .sort((a, b) => Number(a) - Number(b));
    //}, [properties, selectedPropertyType]);

    const bedroomOptions = useMemo(() => {
        const seen = new Set();

        const source = selectedPropertyType
            ? properties.filter((item) => {
                const selected = normalizeFilterValue(selectedPropertyType);

                return (
                    normalizeFilterValue(item.propertyType || item.type) ===
                    selected
                );
            })
            : properties;

        return source
            .map((item) => item.bedrooms)
            .filter(
                (b) =>
                    b !== null &&
                    b !== undefined &&
                    !seen.has(b) &&
                    seen.add(b)
            )
            .sort((a, b) => {
                // Keep Studio first
                if (a === "Studio") return -1;
                if (b === "Studio") return 1;

                // Sort 1BR, 2BR, 3BR, 4BR+ numerically
                return parseInt(a) - parseInt(b);
            });
    }, [properties, selectedPropertyType]);

    const filteredProperties = useMemo(() => {
        return properties.filter((item) => {
            if (selectedPropertyType) {
                const selected = normalizeFilterValue(selectedPropertyType);
                if (normalizeFilterValue(item.propertyType || item.type) !== selected) return false;
            }
            if (selectedLocation && item.shortLocation !== selectedLocation) return false;
            if (selectedBedrooms && String(item.bedrooms) !== String(selectedBedrooms)) return false;
            return true;
        });
    }, [properties, selectedPropertyType, selectedLocation, selectedBedrooms]);

    const totalPages = Math.max(1, Math.ceil(filteredProperties.length / itemsPerPage));

    const currentData = filteredProperties.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    useEffect(() => {
        const handleClickOutside = (event) => {
            const isInsideAnyDropdown = Object.values(
                dropdownRefs.current
            ).some((ref) => ref?.contains(event.target));

            if (!isInsideAnyDropdown) {
                setOpenDropdown(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    useEffect(() => {
        const loadProperties = async () => {
            try {
                const data = await fetchMappedProperties();
                const visibleProperties = data.filter((item) => item.isVisible !== false);

                setProperties(visibleProperties);
                setCurrentPage(1);
            } catch (error) {
                console.error("Failed to load properties for book now page.", error);
            }
        };

        loadProperties();
    }, []);

    return (
        <section className="w-full py-8 sm:py-12 md:py-14 lg:py-16">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                    {/* Title */}
                    <motion.div
                        className="inline-block"
                        initial="hidden"
                        animate={controls}
                        onViewportEnter={() => controls.start("visible")}
                        onViewportLeave={() => controls.start("hidden")}
                        viewport={{ amount: 0.4 }}
                    >
                        <motion.h2
                            className="text-2xl md:text-3xl font-semibold text-theme"
                            variants={{
                                hidden: { y: 30, opacity: 0 },
                                visible: {
                                    y: 0,
                                    opacity: 1,
                                    transition: { duration: 0.6, ease: "easeOut" }
                                }
                            }}
                        >
                            Choose Your <span className="text-gold">Property</span>
                        </motion.h2>

                        <div className="mt-2">
                            <motion.div
                                className="w-[62%] h-[1px] bg-gold"
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
                                className="w-[35%] h-[1px] bg-gold mt-1"
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

                    {/* Dropdowns */}
                    <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">

                        {/* Property Type */}
                        <div ref={(el) => (dropdownRefs.current.property = el)} className="relative w-full sm:w-[180px]">
                            <button
                                onClick={() =>
                                    setOpenDropdown(
                                        openDropdown === "property" ? null : "property"
                                    )
                                }
                                className="appearance-none border border-theme pl-4 pr-10 py-2 rounded-md w-full bg-white text-left relative"
                            >
                                {selectedPropertyType || "Property Type"}

                                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                                    <svg
                                        className="w-4 h-4 text-theme"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </div>
                            </button>

                            {openDropdown === "property" && (
                                <ul className="absolute left-0 mt-1 w-full min-w-[180px] bg-white border border-gray-300 rounded-md shadow-lg z-50">
                                    <li
                                        className="px-4 py-2 border-b border-gray-300 cursor-pointer hover:bg-gray-100"
                                        onClick={() => {
                                            setSelectedPropertyType("");
                                            setOpenDropdown(null);
                                        }}
                                    >
                                        Property Type
                                    </li>

                                    {propertyTypeOptions.map((type, index) => (
                                        <li
                                            key={type}
                                            onClick={() => {
                                                setSelectedPropertyType(type);
                                                setSelectedLocation("");
                                                setSelectedBedrooms("");
                                                setCurrentPage(1);
                                                setOpenDropdown(null);
                                            }}
                                            className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${selectedPropertyType === type ? "bg-gray-100 font-semibold" : ""
                                                } ${index !== propertyTypeOptions.length - 1
                                                    ? "border-b border-gray-300"
                                                    : ""
                                                }`}
                                        >
                                            {type}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Bedrooms */}
                        <div ref={(el) => (dropdownRefs.current.bedroom = el)} className="relative w-full sm:w-[180px]">
                            <button
                                onClick={() =>
                                    setOpenDropdown(
                                        openDropdown === "bedroom" ? null : "bedroom"
                                    )
                                }
                                className="appearance-none border border-theme pl-4 pr-10 py-2 rounded-md w-full bg-white text-left relative"
                            >
                                {selectedBedrooms
                                    ? Number(selectedBedrooms) === 0
                                        ? "Studio"
                                        : selectedBedrooms
                                    : "Bedrooms"}

                                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                                    <svg
                                        className="w-4 h-4 text-theme"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </div>
                            </button>

                            {openDropdown === "bedroom" && (
                                <ul className="absolute left-0 mt-1 w-full min-w-[180px] bg-white border border-gray-300 rounded-md shadow-lg z-50">
                                    <li
                                        className="px-4 py-2 border-b border-gray-300 cursor-pointer hover:bg-gray-100"
                                        onClick={() => {
                                            setSelectedBedrooms("");
                                            setOpenDropdown(null);
                                        }}
                                    >
                                        Bedrooms
                                    </li>

                                    {bedroomOptions.map((b, index) => (
                                        <li
                                            key={b}
                                            onClick={() => {
                                                setSelectedBedrooms(b);
                                                setCurrentPage(1);
                                                setOpenDropdown(null);
                                            }}
                                            className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${selectedBedrooms === b ? "bg-gray-100 font-semibold" : ""
                                                } ${index !== bedroomOptions.length - 1
                                                    ? "border-b border-gray-300"
                                                    : ""
                                                }`}
                                        >
                                            {Number(b) === 0 ? "Studio" : b}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Location */}
                        <div ref={(el) => (dropdownRefs.current.location = el)} className="relative w-full sm:w-[220px]">
                            <button
                                onClick={() =>
                                    setOpenDropdown(
                                        openDropdown === "location" ? null : "location"
                                    )
                                }
                                className="appearance-none border border-theme pl-4 pr-10 py-2 rounded-md bg-white w-full sm:w-[220px] text-left relative"
                            >
                                <span className="block truncate">
                                    {selectedLocation || "Location"}
                                </span>

                                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                                    <svg
                                        className="w-4 h-4 text-theme"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </div>
                            </button>

                            {openDropdown === "location" && (
                                <ul className="absolute left-0 mt-1 w-full min-w-[220px] bg-white border border-gray-300 rounded-md shadow-lg z-50">
                                    <li
                                        className="px-4 py-2 border-b border-gray-300 cursor-pointer hover:bg-gray-100"
                                        onClick={() => {
                                            setSelectedLocation("");
                                            setOpenDropdown(null);
                                        }}
                                    >
                                        Location
                                    </li>

                                    {locationOptions.map((loc, index) => (
                                        <li
                                            key={loc}
                                            onClick={() => {
                                                setSelectedLocation(loc);
                                                setCurrentPage(1);
                                                setOpenDropdown(null);
                                            }}
                                            className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${selectedLocation === loc ? "bg-gray-100 font-semibold" : ""
                                                } ${index !== locationOptions.length - 1
                                                    ? "border-b border-gray-300"
                                                    : ""
                                                }`}
                                        >
                                            {loc}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                </div>

                <div className="
                        grid
                        grid-cols-1
                        md:grid-cols-2
                        lg:grid-cols-3
                        gap-6
                        mt-8
                    ">
                    {currentData.map((item) => (
                        <PropertyCard key={item.id} property={item} />
                    ))}
                </div>

                {currentData.length === 0 && (
                    <p className="mt-8 text-center text-theme">
                        No properties found for the selected property type.
                    </p>
                )}

                <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">

                    {/* Prev Button */}
                    <button
                        onClick={() => setCurrentPage(p => p - 1)}
                        disabled={currentPage === 1}
                        className="w-9 h-9 rounded-sm border border-gold flex items-center justify-center"
                    >
                        <img src={prevPng} className="w-3 h-3" />
                    </button>

                    {/* Page Numbers */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .slice(0, 4)
                        .map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`w-9 h-9 rounded-sm text-md border flex items-center justify-center
                ${currentPage === page
                                        ? "bg-gold text-white border-gold"
                                        : "border-gold text-black hover:bg-gold hover:text-white"}`}
                            >
                                {page}
                            </button>
                        ))}

                    {/* Next Button */}
                    <button
                        onClick={() => setCurrentPage(p => p + 1)}
                        disabled={currentPage === totalPages}
                        className="w-9 h-9 rounded-sm border border-gold flex items-center justify-center"
                    >
                        <img src={nextPng} className="w-3 h-3" />
                    </button>

                </div>
            </div>
        </section>
    );
}

export default BookNow;
