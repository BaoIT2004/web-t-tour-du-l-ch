// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";  // các trang cuộn lên trên 
import TrangChu from "./trangchu.jsx";
import Chuyenbay from "./chuyenbay.jsx";
import Khachsan from "./khachsan.jsx";
import Khachsanchitiet from "./dat-hotel.jsx";
import Tour from "./dstour.jsx";
import XE from "./dsxe.jsx";
import Login from "./login.jsx";
import Signup from "./signup.jsx";
import Dashboard from "./dashboard.jsx";
import Qluser from "./dashboard-user.jsx";
import Qltour from "./dashboard-tour.jsx";
import Dattour from "./dat-tour.jsx";
import Thanhtoan from "./thanhtoan.jsx";
import { AuthProvider } from "./AuthContext.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<TrangChu />} />
          <Route path="/flights" element={<Chuyenbay />} />
          <Route path="/hotels" element={<Khachsan />} />
          <Route path="/kschitiet" element={<Khachsanchitiet />} />
          <Route path="/tours" element={<Tour />} />
          <Route path="/cars" element={<XE />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/qluser" element={<Qluser />} />
          <Route path="/qltour" element={<Qltour />} />
          <Route path="/qltour/id" element={<Qltour />} />
          <Route path="/dattour/:id" element={<Dattour />} />
          <Route path="/thanhtoan" element={<Thanhtoan />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
