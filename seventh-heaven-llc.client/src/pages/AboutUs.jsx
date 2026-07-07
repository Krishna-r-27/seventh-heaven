import BannerSection from "../components/BannerSection/BannerSection";
import AboutUsSection from "../components/AboutUs/AboutUsSection";
import VisionMission from "../components/VisionMission/VisionMission";
import SuccessSection from "../components/SuccessStory/SuccessSection";
import CTASection from "../components/Sections/CTASection";
import { Helmet } from "react-helmet-async";
function AboutUs() {
  return (
      <>
          <Helmet>
              <title>About Seventh Heaven Holiday Homes Dubai</title>

              <meta
                  name="description"
                  content="Learn about Seventh Heaven Holiday Homes, a trusted Dubai holiday home company offering premium serviced apartments, property management, and exceptional guest experiences."
              />

              <meta
                  name="keywords"
                  content="about Seventh Heaven, Dubai holiday homes, property management Dubai, serviced apartments, holiday rental company Dubai"
              />

              <link
                  rel="canonical"
                  href="https://www.seventh-heaven.ae/about-us"
              />
          </Helmet>

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