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
import properties from "@/data/properties";
export default function Home() {
    return (
        <>
            <div key={Date.now()}>
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