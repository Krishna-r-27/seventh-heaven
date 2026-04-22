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
        <Routes>
            {/*<Route path="/forgot-password" element={<ForgotPassword />} />*/}
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
    );
}

export default App;