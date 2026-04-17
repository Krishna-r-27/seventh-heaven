import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from './Layouts/AppLayout';
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import BookNow from "./pages/BookNow";
import Listing from "./pages/Listing";
import FAQ from "./pages/FAQ";
import Error from "./pages/Error";
import SiteMap from "./pages/SiteMap";
import ThankYou from "./pages/ThankYou";
import ScrollToTop from "./components/Common/ScrollToTop";
import ScrollToHash from "./components/Common/ScrollToHash";
import PropertyDetail from "./components/BookNow/PropertyDetail";

function App() {
    return (
        <BrowserRouter basename="/seventh-heaven-llc">
            <ScrollToTop />
            <ScrollToHash />

            <div className="font-montserrat flex min-h-screen flex-col">


                <main className="flex-grow">

                    <Routes>

                        <Route element={<AppLayout />}>

                            <Route path="/" element={<Home />} />
                            <Route path="/about-us" element={<AboutUs />} />
                            <Route path="/contact-us" element={<ContactUs />} />
                            <Route path="/book-now" element={<BookNow />} />
                            <Route path="/listing" element={<Listing />} />
                            <Route path="/sitemap" element={<SiteMap />} />
                            <Route path="/thank-you" element={<ThankYou />} />
                            <Route path="/faq" element={<FAQ />} />
                            <Route path="/property/:slug" element={<PropertyDetail />} />
                            <Route path="*" element={<Error />} />
                        </Route>

                    </Routes>

                </main>


            </div>

        </BrowserRouter>
    );
}

export default App;