import BannerSection from "../components/BannerSection/BannerSection";
import ContactSection from "../components/ContactUs/ContactUs";
function ContactUs() {
  return (
      <>
          <BannerSection
              title="Contact Us"
              pageName="Contact Us"
          />
          <ContactSection />
      </>
  );
}

export default ContactUs;