import BannerSection from "../components/BannerSection/BannerSection";
import BookNowSection from "../components/BookNow/BookNow";
function BookNow() {
  return (
      <>
          <BannerSection
              title="Book Now"
              pageName="Book Now"
          />
          <BookNowSection />
      </>
  );
}

export default BookNow;