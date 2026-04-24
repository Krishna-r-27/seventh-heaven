import { useEffect, useState } from "react";
import HomeBanner from "../Layouts/HomeBanner";
import PropertiesSection from "../components/Home/PropertiesSection";
import BookingPlatforms from "../components/Home/BookingPlatforms";
import AboutUsSection from "../components/Home/AboutUs";
import PropertyManagement from "../components/Home/PropertyManagement";
import ChooseProperty from "../components/Home/GuestServices";
import CTASection from "../components/Sections/CTASection";
import SuccessStory from "../components/SuccessStory/SuccessSection";
import WhyPartnerSection from "../components/Listing/WhyPartnerSection";
import PropertyList from "../components/BookNow/PropertyList";
import { fetchMappedProperties } from "@/services/propertyApi";
export default function Home() {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        const loadProperties = async () => {
            try {
                const data = await fetchMappedProperties();
                setProperties(data.filter((item) => item.isVisible !== false));
            } catch (error) {
                console.error("Failed to load properties for home page.", error);
            }
        };

        loadProperties();
    }, []);

    return (
        <>
            <div>
                <HomeBanner />
                <PropertiesSection />
                <AboutUsSection />
                <PropertyList data={properties} />
                <PropertyManagement />
                <SuccessStory />
                <ChooseProperty />
                <BookingPlatforms />
                <WhyPartnerSection />
                <CTASection />
            </div>
        </>
    );
}