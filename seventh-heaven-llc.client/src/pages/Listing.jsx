import BannerSection from "../components/BannerSection/BannerSection";
import ListingSection from "../components/Listing/Listing";
function Listing() {
  return (
      <>
          <BannerSection
              title="Listing"
              pageName="Listing"
          />
          <ListingSection />
      </>
  );
}

export default Listing;