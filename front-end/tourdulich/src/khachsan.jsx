import React from "react";
import "./app.css"; 
import { Link } from "react-router-dom";

/* ================== CONSTANTS ================== */
const HOTELS = [
    {
      title: "Movenpick Grand Al Bustan",
      city: "Dubai",
      country: "United Arab Emirates",
      price: 200,
      rating: 5,
      img: "",
    },
    {
      title: "Four Points by Sheraton Bur Dubai",
      city: "Dubai",
      country: "United Arab Emirates",
      price: 260,
      rating: 4,
      img: "",
    },
    {
      title: "Armani Hotel Dubai",
      city: "Dubai",
      country: "United Arab Emirates",
      price: 100,
      rating: 3,
      img: "",
    },
    {
      title: "Hilton Dubai Creek",
      city: "Dubai",
      country: "United Arab Emirates",
      price: 180,
      rating: 4,
      img: "",
    },
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
    const [hotelLocation, setHotelLocation] = React.useState("");
    const [hotelCheckin, setHotelCheckin] = React.useState(() => {
      const d = new Date();
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      return `${d.getFullYear()}-${mm}-${dd}`;
    });
    const [hotelCheckout, setHotelCheckout] = React.useState(() => {
      const d = new Date();
      d.setDate(d.getDate() + 1);
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      return `${d.getFullYear()}-${mm}-${dd}`;
    });
  
    const [hotelRooms, setHotelRooms] = React.useState(1);
    const [hotelTravellers, setHotelTravellers] = React.useState(2);
    const [openGuests, setOpenGuests] = React.useState(false);
    const hotelGuestsRef = React.useRef(null);
  
    const changeHotelGuest = (type, delta) => {
      if (type === "rooms") {
        setHotelRooms((v) => Math.max(1, v + delta));
      } else if (type === "travellers") {
        setHotelTravellers((v) => Math.max(1, v + delta));
      }
    };
  
    return (
      <section className="hero-ks">
        <div className="hp-container-cb">
          <h1>Every flight is an opportunity to explore.</h1>
          <p>Choose your flight today, reach your dreams tomorrow.</p>
  
          {/* ✅ KHUNG TRẮNG BÊN NGOÀI, GIỐNG CODE FLIGHT */}
          <div className="hp-search">
            <div className="hp-grid-hotels">
              {/* Location */}
              <label className="hp-hotel-field hp-hotel-loc">
                <input
                  className="hp-hotel-input"
                  placeholder="Where are you going?"
                  value={hotelLocation}
                  onChange={(e) => setHotelLocation(e.target.value)}
                />
              </label>
  
              {/* Checkin */}
              <label className="hp-hotel-field">
                <div className="hp-hotel-text">
                  <span className="hp-hotel-label">Checkin</span>
                  <input
                    type="date"
                    className="hp-hotel-date-input"
                    value={hotelCheckin}
                    onChange={(e) => setHotelCheckin(e.target.value)}
                  />
                </div>
              </label>
  
              {/* Checkout */}
              <label className="hp-hotel-field">
                <div className="hp-hotel-text">
                  <span className="hp-hotel-label">Checkout</span>
                  <input
                    type="date"
                    className="hp-hotel-date-input"
                    value={hotelCheckout}
                    onChange={(e) => setHotelCheckout(e.target.value)}
                  />
                </div>
              </label>
  
              {/* Travellers & Rooms */}
              <label
                ref={hotelGuestsRef}
                className="hp-hotel-field hp-hotel-people"
                onClick={() => setOpenGuests((v) => !v)}
              >
                <div className="hp-hotel-people-text">
                  <span className="hp-hotel-label">Travellers</span>
                  <strong>{hotelTravellers}</strong>
                  <span className="hp-hotel-label rooms-label">Rooms</span>
                  <strong>{hotelRooms}</strong>
                </div>
  
                <span className="hp-hotel-chevron">▾</span>
  
                {openGuests && (
                  <div
                    className="hp-guests-popover"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Rooms */}
                    <div className="hp-guest-row">
                      <span className="hp-guest-label">Rooms</span>
                      <div className="hp-guest-counter">
                        <button
                          type="button"
                          onClick={() => changeHotelGuest("rooms", -1)}
                        >
                          −
                        </button>
                        <span>{hotelRooms}</span>
                        <button
                          type="button"
                          onClick={() => changeHotelGuest("rooms", 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
  
                    {/* Travellers */}
                    <div className="hp-guest-row">
                      <span className="hp-guest-label">Travellers</span>
                      <div className="hp-guest-counter">
                        <button
                          type="button"
                          onClick={() =>
                            changeHotelGuest("travellers", -1)
                          }
                        >
                          −
                        </button>
                        <span>{hotelTravellers}</span>
                        <button
                          type="button"
                          onClick={() =>
                            changeHotelGuest("travellers", 1)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </label>
  
              <button className="hp-search-btn" type="button">
                🔎
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  

  //------------------------------featuredHotels--------------------------------------------------------------------//
  function FeaturedHotels() {
    const [start, setStart] = React.useState(0);
    const visible = 4;
  
    const maxStart = Math.max(0, HOTELS.length - visible);
    const next = () => setStart((s) => (s >= maxStart ? 0 : s + visible));
    const prev = () => setStart((s) => (s <= 0 ? maxStart : s - visible));
  
    const slice = HOTELS.slice(start, start + visible);
    if (slice.length < visible) {
      slice.push(...HOTELS.slice(0, visible - slice.length));
    }
  
    return (
      <section className="hp-hotels" style={{marginTop:"80px",paddingBottom:"90px"}}>
        <div className="hp-container">
          <div className="hp-hotels-head">
            <div>
              <h2>Featured Hotels</h2>
              <p>These alluring destinations are picked just for you.</p>
            </div>
            <div className="hp-hotels-nav">
              <button onClick={prev} aria-label="Previous">
                ‹
              </button>
              <button onClick={next} aria-label="Next">
                ›
              </button>
            </div>
          </div>
  
          <div className="hp-hotels-grid">
            {slice.map((h, i) => (
              <article key={i} className="hp-hotel-card">
                <div className="hp-hotel-img">
                  {h.img ? (
                    <img src={h.img} alt={h.title} />
                  ) : (
                    <div className="hp-hotel-img-ph">Image</div>
                  )}
                </div>
                <div className="hp-hotel-meta">
                  <div className="hp-hotel-price">
                    <span className="currency">USD</span>{" "}
                    <strong>{h.price.toFixed(2)}</strong>{" "}
                    <span className="per">/ Night</span>
                    <span className="bolt"></span>
                    <span className="rating">⭐ {h.rating}</span>
                  </div>
                  <h3 className="hp-hotel-title">{h.title}</h3>
                  <div className="hp-hotel-loc">
                    <span className="city">{h.city}</span>{" "}
                    <span className="country">{h.country}</span>
                  </div>
                </div>
              </article>
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
  

  export default function Khachsan() {
    return (
      <div className="home-page">
        <Header />
        <HeroSearch />
        <FeaturedHotels />
        <Footer />
      </div>
    );
  }