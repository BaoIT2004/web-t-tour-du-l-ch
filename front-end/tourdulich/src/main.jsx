// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TrangChu from "./trangchu.jsx";
import Chuyenbay from "./chuyenbay.jsx";
import Khachsan from "./khachsan.jsx";
import Tour from "./dstour.jsx";
import XE from "./dsxe.jsx";
import Login from "./login.jsx";
import Signup from "./signup.jsx";
import Dashboard from "./dashboard.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode> 
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<TrangChu />} />
        <Route path="/flights" element={<Chuyenbay />} />
        <Route path="/hotels" element={<Khachsan />} />
        <Route path="/tours" element={<Tour/>} />
        <Route path="/cars" element={<XE/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
