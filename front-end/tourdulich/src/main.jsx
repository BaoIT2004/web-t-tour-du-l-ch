  // main.jsx
  import React from "react";
  import ReactDOM from "react-dom/client";
  import { BrowserRouter, Routes, Route } from "react-router-dom";
  import TrangChu from "./trangchu.jsx";
  import Chuyenbay from "./chuyenbay.jsx";
  import Khachsan from "./khachsan.jsx";
  import Khachsanchitiet from "./dat-hotel.jsx";
  import Tour from "./dstour.jsx";
  import XE from "./dsxe.jsx";
  import Login from "./login.jsx";
  import Signup from "./signup.jsx";
  import Dashboard from "./dashboard.jsx";
  import Qluser from"./dashboard-user.jsx";
  import Qltour from "./dashboard-tour.jsx";
  import TrangChuUser from "./trangchuUser.jsx";


  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode> 
      <BrowserRouter>
        <Routes> 
          <Route path="/" element={<TrangChu />} />
          <Route path="/home" element={<TrangChu />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/flights" element={<Chuyenbay />} />
          <Route path="/hotels" element={<Khachsan />} />
          <Route path="/kschitiet" element={<Khachsanchitiet />} />
          <Route path="/tours" element={<Tour/>} />
          <Route path="/cars" element={<XE/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/qluser" element={<Qluser/>} />
          <Route path="/qltour" element={<Qltour/>} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
