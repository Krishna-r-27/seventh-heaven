import BannerSection from "../components/BannerSection/BannerSection";
import ContactSection from "../components/ContactUs/ContactUs";
import { Helmet } from "react-helmet-async";
function ContactUs() {
  return (
      <>
          <Helmet>
              <title>Contact Seventh Heaven Holiday Homes Dubai</title>

              <meta
                  name="description"
                  content="Contact Seventh Heaven Holiday Homes for bookings, property management services, or guest support. We're here to assist you across Dubai."
              />

              <meta
                  name="keywords"
                  content="Dubai holiday homes contact, serviced apartment Dubai, property management Dubai"
              />

              <link
                  rel="canonical"
                  href="https://www.seventh-heaven.ae/contact-us"
              />
          </Helmet>

          <BannerSection
              title="Contact Us"
              pageName="Contact Us"
          />
          <ContactSection />
      </>
  );
}

export default ContactUs;