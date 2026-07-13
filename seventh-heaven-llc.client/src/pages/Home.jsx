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
import { Helmet } from "react-helmet-async";
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

            <Helmet>
                <title>
                    Luxury Serviced Apartments | Seventh Heaven Holiday Homes Dubai
                </title>

                <meta
                    name="description"
                    content="Book premium holiday homes and fully furnished serviced apartments in Dubai with Seventh Heaven. Enjoy comfortable stays, professional service, and the best locations."
                />

                <meta
                    name="keywords"
                    content="holiday homes Dubai, serviced apartments Dubai, furnished apartments Dubai, vacation rentals Dubai, luxury holiday homes, Seventh Heaven Dubai"
                />

                <link
                    rel="canonical"
                    href="https://www.seventh-heaven.ae/"
                />
            </Helmet>

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