import BannerSection from "../components/BannerSection/BannerSection";
import ListingSection from "../components/Listing/Listing";
import { Helmet } from "react-helmet-async";
function Listing() {
  return (
      <>
          <Helmet>
              <title>Holiday Homes & Serviced Apartments in Dubai</title>

              <meta
                  name="description"
                  content="Browse premium holiday homes and fully furnished serviced apartments across Dubai. Find the perfect accommodation with Seventh Heaven."
              />

              <meta
                  name="keywords"
                  content="Dubai holiday homes, serviced apartments Dubai, furnished apartments Dubai, vacation rentals Dubai, holiday home listings"
              />

              <link
                  rel="canonical"
                  href="https://www.seventh-heaven.ae/listing"
              />
          </Helmet>

          <BannerSection
              title="Listing"
              pageName="Listing"
          />
          <ListingSection />
      </>
  );
}

export default Listing;