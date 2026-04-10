import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from './Layouts/AppLayout';
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import ScrollToTop from "./components/Common/ScrollToTop";
import ScrollToHash from "./components/Common/ScrollToHash";

function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <ScrollToHash />

            <div className="font-montserrat flex min-h-screen flex-col">


                <main className="flex-grow">

                    <Routes>

                        <Route element={<AppLayout />}>

                            <Route path="/" element={<Home />} />
                            <Route path="/about-us" element={<AboutUs />} />
                            <Route path="/contact-us" element={<ContactUs />} />
                        </Route>



                    </Routes>

                </main>


            </div>

        </BrowserRouter>
    );
}

export default App;