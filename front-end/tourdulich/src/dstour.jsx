import React from "react";
import "./app.css"; 
import { Link } from "react-router-dom";

/* ================== CONSTANTS ================== */
const TOURS = [
    {
      title: "Desert Safari Adventure",
      city: "Dubai",
      country: "United Arab Emirates",
      price: 120,
      rating: 5,
      img: "",
    },
    {
      title: "Halong Bay Cruise",
      city: "Ha Long",
      country: "Vietnam",
      price: 200,
      rating: 4,
      img: "",
    },
    {
      title: "Bangkok City Tour",
      city: "Bangkok",
      country: "Thailand",
      price: 150,
      rating: 4,
      img: "",
    },
    {
      title: "Singapore Night Safari",
      city: "Singapore",
      country: "Singapore",
      price: 180,
      rating: 5,
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


/* -------- Hero + Search (Tours) -------- */
function HeroSearch() {
    const [tourLocation, setTourLocation] = React.useState("");
    const [tourDate, setTourDate] = React.useState(() => {
      const d = new Date();
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      return `${d.getFullYear()}-${mm}-${dd}`;
    });
    const [tourTravellers, setTourTravellers] = React.useState(1);
    const [openTourGuests, setOpenTourGuests] = React.useState(false);
  
    const tourGuestsRef = React.useRef(null);
  
    // Đóng popup Travellers khi click ra ngoài
    React.useEffect(() => {
      const handleClickOutside = (e) => {
        if (
          tourGuestsRef.current &&
          !tourGuestsRef.current.contains(e.target)
        ) {
          setOpenTourGuests(false);
        }
      };
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
  
    return (
      <section className="hero-tour">
        <div className="hp-container-cb">
          <h1>Search for best Tours</h1>
          <p>Find amazing experiences around the world.</p>
  
          {/* Khung trắng search giống bên Flights */}
          <div className="hp-search">
            <div className="hp-grid-tours">
              {/* City */}
              <label className="hp-hotel-field hp-tour-city">
                <input
                  className="hp-hotel-input"
                  placeholder="Search your city"
                  value={tourLocation}
                  onChange={(e) => setTourLocation(e.target.value)}
                />
              </label>
  
              {/* Date */}
              <label className="hp-hotel-field">
                <div className="hp-hotel-text">
                  <span className="hp-hotel-label">Date</span>
                  <input
                    type="date"
                    className="hp-hotel-date-input"
                    value={tourDate}
                    onChange={(e) => setTourDate(e.target.value)}
                  />
                </div>
              </label>
  
              {/* Travellers */}
              <label
                ref={tourGuestsRef}
                className="hp-hotel-field hp-tour-people"
                onClick={() => setOpenTourGuests((v) => !v)}
              >
                <span className="hp-hotel-icon"></span>
                <div className="hp-tour-people-text">
                  <span className="hp-tour-label-strong">Travellers</span>
                  <span>&nbsp;{tourTravellers}</span>
                </div>
                <span className="hp-hotel-chevron">▾</span>
  
                {openTourGuests && (
                  <div
                    className="hp-guests-popover"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="hp-guest-row">
                      <span className="hp-guest-label">Travellers</span>
                      <div className="hp-guest-counter">
                        <button
                          type="button"
                          onClick={() =>
                            setTourTravellers((v) => Math.max(1, v - 1))
                          }
                        >
                          −
                        </button>
                        <span>{tourTravellers}</span>
                        <button
                          type="button"
                          onClick={() =>
                            setTourTravellers((v) => v + 1)
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
  
//------------------populartour--------------------//
  function PopularTours() {
    const [start, setStart] = React.useState(0);
    const visible = 4;
  
    const maxStart = Math.max(0, TOURS.length - visible);
    const next = () => setStart((s) => (s >= maxStart ? 0 : s + visible));
    const prev = () => setStart((s) => (s <= 0 ? maxStart : s - visible));
  
    const slice = TOURS.slice(start, start + visible);
    if (slice.length < visible) {
      slice.push(...TOURS.slice(0, visible - slice.length));
    }
  
    return (
      <section className="hp-tours">
        <div className="hp-container">
          <div className="hp-hotels-head">
            <div>
              <h2>Popular Tours</h2>
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
  
          <div className="hp-tours-grid">
            {slice.map((t, i) => (
              <article
                key={i}
                className="hp-tour-card"
                style={{ backgroundImage: `url(${t.img || ""})` }}
              >
                <div className="hp-tour-overlay">
                  <div className="hp-tour-city">{t.city}</div>
  
                  <div className="hp-tour-info">
                    <h3 className="hp-tour-title">{t.title}</h3>
                    <p className="hp-tour-price">USD {t.price.toFixed(2)}</p>
                    <hr />
                    <div className="hp-tour-bottom">
                      <div className="hp-tour-rating">
                        {"⭐".repeat(t.rating)}
                      </div>
                      <button className="hp-tour-btn">Chi tiết →</button>
                    </div>
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


  export default function Tour() {
    return (
      <div className="home-page">
        <Header />
        <HeroSearch/>
        <PopularTours />
        <Footer />
      </div>
    );
  }