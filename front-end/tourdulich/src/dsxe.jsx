import React from "react";
import "./app.css"; 
import { Link } from "react-router-dom";

const TRANSFER_CARS = [
    {
      title: "Hyundai i10 or similar",
      price: 150,
      rating: 5,
      img: "https://phptravels.net/uploads/58mw99nsyz48w084g.png",
    },
    {
      title: "Ford Focus 2023",
      price: 100,
      rating: 5,
      img: "https://phptravels.net/uploads/58mw99nsyz48w084g.png",
    },
    {
      title: "Toyota Camry 2023 full options",
      price: 120,
      rating: 3,
      img: "https://phptravels.net/uploads/uwps0eeblus4ws4ooo.jpg",
    },
  ];
  /* ================== COMPONENTS ================== */
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
/* -------- Hero + Search (Cars) -------- */
function HeroSearch() {
    const [carLocation, setCarLocation] = React.useState("");
    const [carPickup, setCarPickup] = React.useState(() => {
      const d = new Date();
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      return `${d.getFullYear()}-${mm}-${dd}`;
    });
    const [carDropoff, setCarDropoff] = React.useState(() => {
      const d = new Date();
      d.setDate(d.getDate() + 1);
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      return `${d.getFullYear()}-${mm}-${dd}`;
    });
    const [carTravellers, setCarTravellers] = React.useState(1);
    const [openCarGuests, setOpenCarGuests] = React.useState(false);
  
    const carGuestsRef = React.useRef(null);
  
    // Đóng popup travellers khi click ra ngoài
    React.useEffect(() => {
      const handleClickOutside = (e) => {
        if (
          carGuestsRef.current &&
          !carGuestsRef.current.contains(e.target)
        ) {
          setOpenCarGuests(false);
        }
      };
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
  
    return (
      <section className="hero-car">
        <div className="hp-container">
          <h1>Chose your best Car!</h1>
          <p>
          Always safe and always by your side on every journey.
          </p>
  
          {/* ✅ KHUNG TRẮNG BÊN NGOÀI FORM SEARCH */}
          <div className="hp-search">
            <div className="hp-grid-cars">
              {/* City */}
              <label className="hp-hotel-field">
                <input
                  className="hp-hotel-input"
                  placeholder="Search your city"
                  value={carLocation}
                  onChange={(e) => setCarLocation(e.target.value)}
                />
              </label>
  
              {/* Pick up date */}
              <label className="hp-hotel-field">
                <div className="hp-hotel-text">
                  <span className="hp-hotel-label">Pick up date</span>
                  <input
                    type="date"
                    className="hp-hotel-date-input"
                    value={carPickup}
                    onChange={(e) => setCarPickup(e.target.value)}
                  />
                </div>
              </label>
  
              {/* Drop off date */}
              <label className="hp-hotel-field">
                <div className="hp-hotel-text">
                  <span className="hp-hotel-label">Drop off date</span>
                  <input
                    type="date"
                    className="hp-hotel-date-input"
                    value={carDropoff}
                    onChange={(e) => setCarDropoff(e.target.value)}
                  />
                </div>
              </label>
  
              {/* Travellers */}
              <label
                ref={carGuestsRef}
                className="hp-hotel-field hp-tour-people"
                onClick={() => setOpenCarGuests((v) => !v)}
              >
                <span className="hp-hotel-icon">👥</span>
                <div className="hp-tour-people-text">
                  <span className="hp-tour-label-strong">Travellers</span>
                  <span>&nbsp;{carTravellers}</span>
                </div>
                <span className="hp-hotel-chevron">▾</span>
  
                {openCarGuests && (
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
                            setCarTravellers((v) => Math.max(1, v - 1))
                          }
                        >
                          −
                        </button>
                        <span>{carTravellers}</span>
                        <button
                          type="button"
                          onClick={() =>
                            setCarTravellers((v) => v + 1)
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
  

  /* -------- Recommended Cars -------- */
function RecommendedCars() {
    return (
      <section className="hp-cars">
        <div className="hp-container">
          <h2>Recommended Transfer Cars</h2>
  
          <div className="hp-cars-grid">
            {/* Promo tile bên trái */}
            <article className="hp-cars-promo">
              <div
                className="hp-cars-promo-img"
                style={{
                  backgroundImage:
                    "url('https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/07/anh-o-to-11.jpg')",
                }}
              ></div>
  
              <div className="hp-cars-promo-body">
                <h3>Discover great cars for transfers</h3>
                <p>Comfortable rides from airport to your hotel and more.</p>
                <button className="hp-cars-promo-btn">View More</button>
              </div>
            </article>
  
            {/* Các xe gợi ý */}
            {TRANSFER_CARS.map((car, i) => (
              <article key={i} className="hp-car-card">
                <div className="hp-car-img">
                  {car.img ? (
                    <img src={car.img} alt={car.title} />
                  ) : (
                    <div className="hp-car-img-ph">Car image</div>
                  )}
                </div>
                <h3 className="hp-car-title">{car.title}</h3>
                <div className="hp-car-rating">{"★".repeat(car.rating)}</div>
                <div className="hp-car-meta">
                  <span className="hp-car-price">
                    <span className="currency">USD</span>{" "}
                    <strong>{car.price.toFixed(2)}</strong>
                  </span>
                </div>
  
                <button className="hp-car-btn">Book Now</button>
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
  
  export default function XE() {
    return (
      <div className="home-page">
        <Header />
        <HeroSearch/>
        <RecommendedCars />
        <Footer />
      </div>
    );
  }