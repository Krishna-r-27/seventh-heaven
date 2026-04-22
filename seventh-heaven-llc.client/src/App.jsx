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
import './App.css';
import { Routes, Route, Navigate } from "react-router-dom"
import { ThemeProvider } from "./poweradmin/context/ThemeContext";
import AdminRoute from "./routes/AdminRoute";
import SignIn from "./poweradmin/pages/SignIn/SignIn";
import ForgotPassword from "./poweradmin/pages/ForgotPassword/ForgotPassword";
import OtpVerify from "./poweradmin/pages/ForgotPassword/OtpVerify";
import AdminChangePassword from "./poweradmin/pages/ForgotPassword/ChangePassword";

// Admin Panel pages
import AppLayout from "./poweradmin/layout/AppLayout";
import ViewProperty from "./Poweradmin/Pages/PropertyManagement/ViewProperty";
import AddProperty from "./Poweradmin/Pages/PropertyManagement/AddProperty";
import Dashboard from "./poweradmin/pages/Dashboard/Dashboard";

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
                        <Route
                            path="/poweradmin/*"
                            element={
                                <ThemeProvider>
                                    <Routes>
                                        {/* Public admin auth pages — no guard */}
                                        <Route path="signin" element={<SignIn />} />
                                        <Route path="forgot-password" element={<ForgotPassword />} />
                                        <Route path="verify-otp" element={<OtpVerify />} />
                                        <Route path="change-password" element={<AdminChangePassword />} />

                                        <Route path="/" element={<AdminRoute><AppLayout /></AdminRoute>}>

                                            {/* Properties */}
                                            <Route path="dashboard" element={<Dashboard />} />
                                            <Route path="properties" element={<ViewProperty />} />
                                            <Route path="properties/add" element={<AddProperty />} />
                                            <Route path="properties/edit/:id" element={<AddProperty />} />
                                        </Route>
                                    </Routes>
                                </ThemeProvider>

                            }
                        />
                    </Routes>

                </main>


            </div>

        </BrowserRouter>
    
           
        
    );
}

export default App;