import BannerSection from "../components/BannerSection/BannerSection";
import AboutUsSection from "../components/AboutUs/AboutUsSection";
import VisionMission from "../components/VisionMission/VisionMission";
import SuccessSection from "../components/SuccessStory/SuccessSection";
import CTASection from "../components/Sections/CTASection";
function AboutUs() {
  return (
      <>
          <BannerSection
              title="About Us"
              pageName="About Us"
          />
          <AboutUsSection />
          <VisionMission />
          <SuccessSection />
          <CTASection />
      </>
  );
}

export default AboutUs;