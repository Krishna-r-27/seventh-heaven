import BannerSection from "../components/BannerSection/BannerSection";
import BookNowSection from "../components/BookNow/BookNow";
import { Helmet } from "react-helmet-async";
function BookNow() {
  return (
      <>
          <Helmet>
              <title>Book Holiday Homes in Dubai | Seventh Heaven</title>

              <meta
                  name="description"
                  content="Reserve your fully furnished holiday home or serviced apartment in Dubai with Seventh Heaven. Easy online booking and premium accommodations."
              />

              <meta
                  name="keywords"
                  content="book holiday homes Dubai, Dubai serviced apartments booking, furnished apartment booking Dubai, vacation rental Dubai"
              />

              <link
                  rel="canonical"
                  href="https://www.seventh-heaven.ae/book-now"
              />
          </Helmet>

          <BannerSection
              title="Book Now"
              pageName="Book Now"
          />
          <BookNowSection />
      </>
  );
}

export default BookNow;