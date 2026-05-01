// src/routes/PowerAdminRoutes.jsx
import { Routes, Route } from "react-router-dom";

// Admin Route wrapper
import AdminRoute from "./AdminRoute"; // ✅ Correct import

// Layout
import AppLayout from "../poweradmin/layout/AppLayout";

// Admin Pages
import Dashboard from "../poweradmin/pages/Dashboard/Dashboard";
import InquiryTable from "../poweradmin/pages/InquiryManagement/InquiryTable";
import PageContentTable from "../poweradmin/pages/PageContent/PageContentTable";
import AddProduct from "../poweradmin/pages/ProductManagement/AddProduct";
import ViewProduct from "../poweradmin/pages/ProductManagement/ViewProduct";
import AddCategory from "../poweradmin/pages/CategoryManagement/AddCategory";
import ViewCategory from "../poweradmin/pages/CategoryManagement/ViewCategory";
import AddBlog from "../poweradmin/pages/BlogManagement/AddBlog";
import ViewBlog from "../poweradmin/pages/BlogManagement/ViewBlogs";
import BannerManagement from "../poweradmin/pages/BannerManagemnet/BannerManagement";
import BannerForm from "../poweradmin/pages/BannerManagemnet/BannerForm";
import BannerTable from "../poweradmin/pages/BannerManagemnet/BannerTable";
import ShippingSettings from "../poweradmin/pages/ShippingSettings/ShippingSettings";
import AdminChangePassword from "../poweradmin/pages/AdminProfile/AdminChangePassword";
import PaidOrders from "../poweradmin/pages/OrderManagement/PaidOrders";
import UnpaidOrders from "../poweradmin/pages/OrderManagement/UnpaidOrders";
import OrderDetails from "../poweradmin/pages/OrderManagement/OrderDetails";
import AddGemstone from "../poweradmin/pages/GemstoneManagement/AddGemstone";
import ViewGemstones from "../poweradmin/pages/GemstoneManagement/ViewGemstones";

// Auth Pages
import SignIn from "../poweradmin/pages/SignIn/SignIn";
import ForgotPassword from "../Poweradmin/Pages/ForgotPassword/ForgotPassword";
import OtpVerify from "../poweradmin/pages/ForgotPassword/OtpVerify";

// Property pages
import ViewProperty from "./Poweradmin/Pages/PropertyManagement/ViewProperty";
import AddProperty from "./Poweradmin/Pages/PropertyManagement/AddProperty";
import PropertyListing from "./poweradmin/pages/PropertyListing/listing";
import PropertyListingDetail from "./poweradmin/pages/PropertyListing/Details"; 
import PropertyEnquiry from "./poweradmin/pages/PropertyEnquiry/View";
import PropertyEnquiryDetail from "./poweradmin/pages/PropertyEnquiry/EnquiryDetails";
import Enquiry from "./Poweradmin/Pages/ContactUs/ViewEnquiry";
import EnquiryDetail from "./Poweradmin/Pages/ContactUs/ViewDetails";


const PowerAdminRoutes = () => {
    return (
        <Routes>
            {/* Auth Routes (no MainLayout) */}
            <Route path="/poweradmin" element={<SignIn />} />
            <Route path="/poweradmin/forgot-password" element={<ForgotPassword />} />
            <Route path="/poweradmin/verify-otp" element={<OtpVerify />} />

            {/* Protected Admin Routes */}
            <Route
                path="/poweradmin/*"
                element={
                    <AdminRoute>
                        <AppLayout />
                    </AdminRoute>
                }
            >
                {/* Nested Admin Pages */}
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="inquiry" element={<InquiryTable />} />
                <Route path="page-content" element={<PageContentTable />} />
                <Route path="add-product" element={<AddProduct />} />
                <Route path="view-product" element={<ViewProduct />} />
                <Route path="add-category" element={<AddCategory />} />
                <Route path="view-category" element={<ViewCategory />} />
                <Route path="add-blog" element={<AddBlog />} />
                <Route path="view-blog" element={<ViewBlog />} />

                {/* Banner Nested Routes */}
                <Route path="banner" element={<BannerManagement />}>
                    <Route index element={<BannerTable />} />
                    <Route path="add" element={<BannerForm />} />
                    <Route path="edit/:id" element={<BannerForm />} />
                </Route>

                {/* Shipping Settings */}
                <Route path="shipping-settings" element={<ShippingSettings />} />

                {/* Orders */}
                <Route path="paid-orders" element={<PaidOrders />} />
                <Route path="unpaid-orders" element={<UnpaidOrders />} />
                <Route path="orders/:id" element={<OrderDetails />} />

                {/* Admin Change Password */}
                <Route path="change-password" element={<AdminChangePassword />} />

                {/* Properties */}
                <Route path="enquiry" element={<Enquiry />} />
                <Route path="enquiry/detail/:id" element={<EnquiryDetail />} />
                <Route path="properties" element={<ViewProperty />} />
                <Route path="properties/add" element={<AddProperty />} />
                <Route path="properties/edit/:id" element={<AddProperty />} />
                <Route path="property/listing" element={<PropertyListing />} />
                <Route path="property/detail/:id" element={<PropertyListingDetail />} />
                <Route path="property/enquiry" element={<PropertyEnquiry />} />
                <Route path="property/enquiry/detail/:id" element={<PropertyEnquiryDetail />} />

                {/* Gemstones (Info) */}
                <Route path="add-gemstone" element={<AddGemstone />} />
                <Route path="view-gemstones" element={<ViewGemstones />} />
                <Route path="edit-gemstone/:id" element={<AddGemstone />} />
            </Route>
        </Routes>
    );
};

export default PowerAdminRoutes;
