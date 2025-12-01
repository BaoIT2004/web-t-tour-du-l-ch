// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TrangChu from "./trangchu.jsx";
import Chuyenbay from "./chuyenbay.jsx";
import Chuyenbaychitiet from "./dat-flight.jsx";
import Khachsan from "./khachsan.jsx";
import Khachsanchitiet from "./dat-hotel.jsx";
import Tour from "./dstour.jsx";
import Tourchitiet from "./dat-tour.jsx";
import XE from "./dsxe.jsx";
import Login from "./login.jsx";
import Signup from "./signup.jsx";
import Thanhtoan from  "./thanhtoan.jsx"
import Dashboard from "./dashboard.jsx";
import Qluser from"./dashboard-user.jsx";
import Qltour from "./dashboard-tour.jsx";
import Qldanhgia from "./dashboard-danhgia.jsx"
import QlThanhtoan from "./dashboard-thanhtoan.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode> 
    <BrowserRouter>
      <Routes> 
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<TrangChu />} />
        <Route path="/flights" element={<Chuyenbay />} />
        <Route path="/cbchitiet" element={<Chuyenbaychitiet />} />
        <Route path="/hotels" element={<Khachsan />} />
        <Route path="/kschitiet" element={<Khachsanchitiet />} />
        <Route path="/tours" element={<Tour/>} />
        <Route path="/tourchitiet" element={<Tourchitiet />} />
        <Route path="/cars" element={<XE/>} />
        <Route path="/thanhtoan" element={<Thanhtoan/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/qluser" element={<Qluser/>} />
        <Route path="/qltour" element={<Qltour/>} />
        <Route path="/qldanhgia" element={<Qldanhgia/>} />
        <Route path="/qlthanhtoan" element={<QlThanhtoan/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
