import React, { useState } from "react";
import "./app.css"; // dùng chung css tổng

const TABS = ["Flights", "Hotels", "Tours", "Cars", "Visa"];

const featuredFlights = [
  { city: "Lahore", airline: "Pakistan International", price: 100 },
  { city: "Dubai", airline: "Emirates", price: 150 },
  { city: "Kuala Lumpur", airline: "Malaysia Airlines", price: 200 },
  { city: "Dubai", airline: "Turkish Airlines", price: 620 },
  { city: "Berlin", airline: "Turkish Airlines", price: 480 },
  { city: "Istanbul", airline: "Turkish Airlines", price: 600 },
];

const HOTELS = [
  { title: "Movenpick Grand Al Bustan", city: "Dubai", country: "United Arab Emirates", price: 200, rating: 5, img: "" },
  { title: "Four Points by Sheraton Bur Dubai", city: "Dubai", country: "United Arab Emirates", price: 260, rating: 4, img: "" },
  { title: "Armani Hotel Dubai", city: "Dubai", country: "United Arab Emirates", price: 100, rating: 3, img: "" },
  {title: "Hilton Dubai Creek",city: "Dubai",country: "United Arab Emirates",price: 180,rating: 4,img: "",},
  
];
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
  

/* ---------------- Dropdown Customer ---------------- */
function CustomerMenu() {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onEsc = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("click", onDoc);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("click", onDoc);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  return (
    <div className={`hp-dd ${open ? "open" : ""}`} ref={ref}>
      <button className="hp-pill" onClick={() => setOpen(v => !v)} aria-haspopup="menu" aria-expanded={open}>
        Customer ▾
      </button>
      <div className="hp-dd-menu" role="menu">
        <a className="hp-dd-item" href="/login" role="menuitem">Login</a>
        <a className="hp-dd-item" href="/signup" role="menuitem">Signup</a>
      </div>
    </div>
  );
}

/* ---------------- Featured Hotels ---------------- */
function FeaturedHotels() {
    const [start, setStart] = React.useState(0);
    const visible = 4; // <-- hiển thị 4 thẻ
  
    const maxStart = Math.max(0, HOTELS.length - visible);
  
    // cuộn theo "trang" 4 thẻ; nếu muốn cuộn 1 thẻ mỗi lần, đổi +1/-1
    const next = () => setStart((s) => (s >= maxStart ? 0 : s + visible));
    const prev = () => setStart((s) => (s <= 0 ? maxStart : s - visible));
  
    // cắt 4 phần tử; nếu gần cuối thiếu thì nối từ đầu để đủ 4
    const slice = HOTELS.slice(start, start + visible);
    if (slice.length < visible) slice.push(...HOTELS.slice(0, visible - slice.length));
  
    return (
      <section className="hp-hotels">
        <div className="hp-container">
          <div className="hp-hotels-head">
            <div>
              <h2>Featured Hotels</h2>
              <p>These alluring destinations are picked just for you.</p>
            </div>
            <div className="hp-hotels-nav">
              <button onClick={prev} aria-label="Previous">‹</button>
              <button onClick={next} aria-label="Next">›</button>
            </div>
          </div>
  
          <div className="hp-hotels-grid">
            {slice.map((h, i) => (
              <article key={i} className="hp-hotel-card">
                <div className="hp-hotel-img">
                  {h.img ? <img src={h.img} alt={h.title}/> : <div className="hp-hotel-img-ph">Image</div>}
                </div>
                <div className="hp-hotel-meta">
                  <div className="hp-hotel-price">
                    <span className="currency">USD</span>{" "}
                    <strong>{h.price.toFixed(2)}</strong>{" "}
                    <span className="per">/ Night</span>
                    <span className="bolt">⚡</span>
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
//---------------------------populartours-----------------------//
  function PopularTours() {
    const [start, setStart] = React.useState(0);
    const visible = 4;
  
    const maxStart = Math.max(0, TOURS.length - visible);
    const next = () => setStart((s) => (s >= maxStart ? 0 : s + visible));
    const prev = () => setStart((s) => (s <= 0 ? maxStart : s - visible));
  
    const slice = TOURS.slice(start, start + visible);
    if (slice.length < visible)
      slice.push(...TOURS.slice(0, visible - slice.length));
  
    return (
      <section className="hp-tours">
        <div className="hp-container">
          <div className="hp-hotels-head">
            <div>
              <h2>Popular Tours</h2>
              <p>These alluring destinations are picked just for you.</p>
            </div>
  
            <div className="hp-hotels-nav">
              <button onClick={prev} aria-label="Previous">‹</button>
              <button onClick={next} aria-label="Next">›</button>
            </div>
          </div>
  
          <div className="hp-tours-grid">
            {slice.map((t, i) => (
                <article key={i} className="hp-tour-card" style={{ backgroundImage: `url(${t.img || ""})` }}>
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
  
  

/* ---------------- Trang chủ ---------------- */
export default function TrangChu() {
  const [activeTab, setActiveTab] = useState("Flights");
  const [tripType, setTripType] = useState("oneway");
  const [cabin, setCabin] = useState("economy");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState(() => {
    const d = new Date();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${d.getFullYear()}-${mm}-${dd}`;
  });
  const [travellers, setTravellers] = useState(1);

  const swap = () => { setFrom(to); setTo(from); };

  return (
    <div className="home-page">
      {/* Header */}
      <header className="hp-topbar">
        <div className="hp-brand">
          <span className="hp-logo"></span>
          <span>BTQQ Travel</span>
          <span className="hp-brand-sub"></span>
        </div>

        <nav className="hp-nav">
          <a href="#">Flights</a>
          <a href="#">Hotels</a>
          <a href="#">Tours</a>
          <a href="#">Cars</a>
          <a href="#">Visa</a>
          <a href="#">Blogs</a>
        </nav>

        <div>
          <CustomerMenu />
        </div>
      </header>

      {/* Hero */}
      <section className="hp-hero">
        <div className="hp-container">
          <h1>Your Trip Starts Here!</h1>
          <p>Let us help you plan your next journey — the one that will leave a lifetime of memories.</p>

          {/* Tabs */}
          <div className="hp-tabs">
            {TABS.map((t) => (
              <button
                key={t}
                className={`hp-tab ${t === activeTab ? "hp-active" : ""}`}
                onClick={() => setActiveTab(t)}
              >
                {iconFor(t)} {t}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="hp-search">
            <div className="hp-search-top">
              <div className="hp-chip">
                <span></span>
                <select value={tripType} onChange={(e) => setTripType(e.target.value)}>
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
                <input placeholder="Flying From" value={from} onChange={(e) => setFrom(e.target.value)} />
              </label>

              <button className="hp-swap" onClick={swap} title="Swap">⇄</button>

              <label className="hp-field">
                <span></span>
                <input placeholder="Destination To" value={to} onChange={(e) => setTo(e.target.value)} />
              </label>

              <label className="hp-field">
                <span></span>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </label>

              <label className="hp-field hp-inline">
                <span>Hành khách</span>
                <input
                  type="number"
                  min={1}
                  value={travellers}
                  onChange={(e) => setTravellers(Math.max(1, +e.target.value))}
                />
              </label>

              <button className="hp-search-btn">🔎</button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Flights */}
      <section className="hp-featured">
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
                <div className="hp-card-price">From USD {f.price.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Hotels – đặt NGAY BÊN DƯỚI */}
      <FeaturedHotels />
      <PopularTours />
    </div>
  );
}

function iconFor(tab) {
  switch (tab) {
    case "Flights": return "✈️";
    case "Hotels":  return "🏨";
    case "Tours":   return "🗺️";
    case "Cars":    return "🚗";
    case "Visa":    return "🛂";
    default:        return null;
  }
}
