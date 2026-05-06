import { useEffect, useMemo, useState } from "react";
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

    const bedroomOptions = useMemo(() => {
        const seen = new Set();
        const source = selectedPropertyType
            ? properties.filter((item) => {
                const selected = normalizeFilterValue(selectedPropertyType);
                return normalizeFilterValue(item.propertyType || item.type) === selected;
            })
            : properties;
        return source
            .map((item) => item.bedrooms)
            .filter((b) => b !== null && b !== undefined && !seen.has(b) && seen.add(b))
            .sort((a, b) => Number(a) - Number(b));
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
                        <div className="relative w-full sm:w-auto">
                            <select
                                value={selectedPropertyType}
                                onChange={(event) => {
                                    setSelectedPropertyType(event.target.value);
                                    setSelectedLocation("");
                                    setSelectedBedrooms("");
                                    setCurrentPage(1);
                                }}
                                className="appearance-none border border-theme pl-4 pr-10 py-2 rounded-md w-full bg-white"
                            >
                                <option value="">Property Type</option>
                                {propertyTypeOptions.map((type) => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>

                            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                                <svg className="w-4 h-4 text-theme" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>

                        {/* Bedrooms */}
                        <div className="relative w-full sm:w-auto">
                            <select
                                value={selectedBedrooms}
                                onChange={(event) => {
                                    setSelectedBedrooms(event.target.value);
                                    setCurrentPage(1);
                                }}
                                className="appearance-none border border-theme pl-4 pr-10 py-2 rounded-md w-full bg-white"
                            >
                                <option value="">Bedrooms</option>
                                {bedroomOptions.map((b) => (
                                    <option key={b} value={b}>
                                        {Number(b) === 0 ? "Studio" : b}
                                    </option>
                                ))}
                            </select>

                            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                                <svg className="w-4 h-4 text-theme" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="relative w-full sm:w-auto">
                            <select
                                value={selectedLocation}
                                onChange={(event) => {
                                    setSelectedLocation(event.target.value);
                                    setCurrentPage(1);
                                }}
                                className="appearance-none border border-theme pl-4 pr-10 py-2 rounded-md w-full bg-white"
                            >
                                <option value="">Location</option>
                                {locationOptions.map((loc) => (
                                    <option key={loc} value={loc}>{loc}</option>
                                ))}
                            </select>

                            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                                <svg className="w-4 h-4 text-theme" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
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
