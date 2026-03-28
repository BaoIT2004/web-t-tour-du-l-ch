import React from "react";
import "./app.css"; 
import { Link } from "react-router-dom";

/* ================== CONSTANTS ================== */
const featuredFlights = [
    { city: "Lahore to Dubai", airline: "Pakistan International", price: 100 },
    { city: "Dubai to T1", airline: "Emirates", price: 150 },
    { city: "Kuala Lumpur to Khuenua", airline: "Malaysia Airlines", price: 200 },
    { city: "Dubai to Sanghai", airline: "Turkish Airlines", price: 620 },
    { city: "Berlin to London", airline: "Turkish Airlines", price: 480 },
    { city: "Istanbul to Vitas", airline: "Turkish Airlines", price: 600 },
    { city: "Lahore to Dubai", airline: "Pakistan International", price: 100 },
    { city: "Dubai to T1", airline: "Emirates", price: 150 },
    { city: "Kuala Lumpur to Khuenua", airline: "Malaysia Airlines", price: 200 },
    { city: "Dubai to Sanghai", airline: "Turkish Airlines", price: 620 },
    { city: "Berlin to London", airline: "Turkish Airlines", price: 480 },
    { city: "Istanbul to Vitas", airline: "Turkish Airlines", price: 600 }
  ];

//--------------------------header---------------------------------//
/* -------- Header -------- */
function Header() {
  return (
    <header className="hp-topbar">
      <div className="hp-brand">
        {/* Click logo / BTQQ Travel → luôn về trang chủ và reload */}
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
        {/* Mỗi click ở đây đều chuyển trang + load lại từ đầu */}
        <a href="/flights">Flights</a>
        <a href="/hotels">Hotels</a>
        <a href="/tours">Tours</a>
        <a href="/cars">Cars</a>
        <a href="/blogs">Blogs</a> {/* hoặc "#" nếu chưa có trang blogs */}
      </nav>

      <div>
        <CustomerMenu />
      </div>
    </header>
  );
}

/* -------- Dropdown Customer -------- */
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

  /* -------- Hero + Tabs + Search -------- */
function HeroSearch() {
    
    const [tripType, setTripType] = React.useState("oneway");
    const [cabin, setCabin] = React.useState("economy");
    const [from, setFrom] = React.useState("");
    const [to, setTo] = React.useState("");
    const [date, setDate] = React.useState(() => {
      const d = new Date();
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      return `${d.getFullYear()}-${mm}-${dd}`;
    });
    const [travellers, setTravellers] = React.useState(1);
  
    const swap = () => {
      setFrom(to);
      setTo(from);
    };
  
    return (
      <section className=" hero-bg">
        <div className="hp-container-cb">
          <h1>Search for best Flights</h1>
          <p>
          Hope your flight is smooth and safe. Enjoy your flight.
          </p>
  
          {/* Search */}
          <div className="hp-search">
            <div className="hp-search-top">
              <div className="hp-chip">
                <span></span>
                <select
                  value={tripType}
                  onChange={(e) => setTripType(e.target.value)}
                >
                  <option value="oneway">One Way</option>
                  <option value="round">Round Trip</option>
                </select>
              </div>
              <div className="hp-chip">
                <span></span>
                <select value={cabin} onChange={(e) => setCabin(e.target.value)}>
                  <option value="economy">Economy</option>
                  <option value="premium">Premium Economy</option>
                  <option value="business">Business</option>
                  <option value="first">First</option>
                </select>
              </div>
            </div>
  
            <div className="hp-grid">
              <label className="hp-field">
                <span></span>
                <input
                  placeholder="Flying From"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                />
              </label>
  
              <button className="hp-swap" onClick={swap} title="Swap">
                ⇄
              </button>
  
              <label className="hp-field">
                <span></span>
                <input
                  placeholder="Destination To"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                />
              </label>
  
              <label className="hp-field">
                <span></span>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </label>
  
              <label className="hp-field hp-inline">
                <span>Hành khách</span>
                <input
                  type="number"
                  min={1}
                  value={travellers}
                  onChange={(e) =>
                    setTravellers(Math.max(1, +e.target.value))
                  }
                />
              </label>
  
              <button className="hp-search-btn">🔎</button>
            </div>
          </div>
        </div>
      </section>
    );
  }


  /* -------- Featured Flights -------- */
function FeaturedFlights() {
    return (
      <section className="hp-featured-cb"style={{paddingBottom:"80px"}}>
        <div className="hp-container">
          <h2>Featured Flights</h2>
          <p>These alluring destinations are picked just for you.</p>
  
          <div className="hp-cards">
            {featuredFlights.map((f, i) => (
              <div className="hp-card" key={i}>
                <div className="hp-card-head">
                  <h3>{f.city}</h3>
                  <span>✈️</span>
                </div>
                <div className="hp-card-sub">{f.airline}</div>
                <div className="hp-card-price">
                  From USD {f.price.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* -------- Footer -------- */
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
  

  export default function Chuyenbay() {
    return (
      <div className="home-page">
        <Header />
        <HeroSearch />
        <FeaturedFlights />
        <Footer />
      </div>
    );
  }