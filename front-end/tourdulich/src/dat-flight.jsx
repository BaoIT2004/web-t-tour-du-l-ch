import React from "react";
import "./app.css";

/* ============ HEADER ============ */
function Header() {
  return (
    <header className="hp-topbar">
      <div className="hp-brand">
        <a
          href="/home"
          style={{
            textDecoration: "none",
            color: "inherit",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span className="hp-logo"></span>
          <span>BTQQ Travel</span>
        </a>
        <span className="hp-brand-sub"></span>
      </div>

      <nav className="hp-nav">
        <a href="/flights">Flights</a>
        <a href="/hotels">Hotels</a>
        <a href="/tours">Tours</a>
        <a href="/cars">Cars</a>
        <a href="/blogs">Blogs</a>
      </nav>

      <CustomerMenu />
    </header>
  );
}

function CustomerMenu() {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onEsc = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("click", onDoc);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("click", onDoc);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  return (
    <div className={`hp-dd ${open ? "open" : ""}`} ref={ref}>
      <button
        className="hp-pill"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        Customer ▾
      </button>
      <div className="hp-dd-menu" role="menu">
        <a className="hp-dd-item" href="/login" role="menuitem">
          Login
        </a>
        <a className="hp-dd-item" href="/signup" role="menuitem">
          Signup
        </a>
      </div>
    </div>
  );
}

/* ============ DATA ============ */
const FLIGHTS = [
    {
      id: 1,
      airline: "Vietnam Airlines",
      cabin: "phổ thông",
      price: 300_000,
    },
    {
      id: 2,
      airline: "Vietnam Airlines",
      cabin: "phổ thông",
      price: 300_000,
    },
    {
      id: 3,
      airline: "Vietnam Airlines",
      cabin: "thương gia",
      price: 600_000,
    },
  ];
  
/* ============ MAIN CONTENT ============ */

function FlightList() {
  const routeFrom = "Berlin";
  const routeTo = "London";
  const today = new Date();
  const departDate =
    String(today.getDate()).padStart(2, "0") +
    "/" +
    String(today.getMonth() + 1).padStart(2, "0") +
    "/" +
    today.getFullYear();


  const formatVND = (v) =>
    v.toLocaleString("vi-VN", { minimumFractionDigits: 0 });

  return (
    <main className="fl-main">
      <div className="hp-container">
        <div className="fl-card">
        <div className="fl-summary-bar"
                style={{
                    background: "#e5e7eb",
                    padding: "28px 50px",
                    minHeight: "80px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: "18px",
                    boxSizing: "border-box",
                }}
                >
                <span className="fl-route">
                    {routeFrom} → {routeTo}
                </span>
                <span className="fl-date">{departDate}</span>
                </div>

          {/* Bảng danh sách chuyến bay */}
          <div className="fl-table">
            <div className="fl-head-row">
              <span>Tên hãng hàng không</span>
              <span>Hạng vé</span>
              <span>Giá tiền</span>
              <span></span>
            </div>

            {FLIGHTS.map((f) => (
              <div key={f.id} className="fl-row">
                <span className="fl-airline">{f.airline}</span>
                <span className="fl-cabin">{f.cabin}</span>
                <span className="fl-price">
                  {formatVND(f.price)} vnd
                </span>

                {/* gửi total sang trang thanh toán (1 người) */}
                <a
                  href={`/payment?total=${f.price}&people=1`}
                  className="ht-btn-outline fl-book-btn"
                >
                  Đặt ngay
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

/* ============ FOOTER ============ */

function Footer() {
  return (
    <footer className="hp-footer">
      <div className="hp-container hp-footer-inner">
        <div className="hp-footer-col">
          <h3>BTQQ Travel</h3>
          <p>Your trusted partner for flights, hotels, tours and cars.</p>
        </div>

        <div className="hp-footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a href="#">Flights</a>
            </li>
            <li>
              <a href="#">Hotels</a>
            </li>
            <li>
              <a href="#">Tours</a>
            </li>
            <li>
              <a href="#">Cars</a>
            </li>
          </ul>
        </div>

        <div className="hp-footer-col">
          <h4>Support</h4>
          <ul>
            <li>
              <a href="#">Help Center</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
            <li>
              <a href="#">Booking Guide</a>
            </li>
          </ul>
        </div>

        <div className="hp-footer-col">
          <h4>Follow Us</h4>
          <div className="hp-footer-social">
            <a href="#">🌐</a>
            <a href="#">📘</a>
            <a href="#">📸</a>
            <a href="#">🎵</a>
          </div>
        </div>
      </div>

      <div className="hp-footer-bottom">
        © {new Date().getFullYear()} BTQQ Travel — All rights reserved.
      </div>
    </footer>
  );
}

/* ============ PAGE EXPORT ============ */

export default function FlightBooking() {
  return (
    <div className="home-page">
      <Header />
      <FlightList />
      <Footer />
    </div>
  );
}
