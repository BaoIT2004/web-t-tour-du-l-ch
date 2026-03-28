import React from "react";
import "./app.css"; // dùng chung css tổng



/* ================== CONSTANTS ================== */

const TABS = ["Flights", "Hotels", "Tours", "Cars"];

const featuredFlights = [
  { city: "Lahore to Dubai", airline: "Pakistan International", price: 100 },
  { city: "Dubai to T1", airline: "Emirates", price: 150 },
  { city: "Kuala Lumpur to Khuenua", airline: "Malaysia Airlines", price: 200 },
  { city: "Dubai to Sanghai", airline: "Turkish Airlines", price: 620 },
  { city: "Berlin to London", airline: "Turkish Airlines", price: 480 },
  { city: "Istanbul to Vitas", airline: "Turkish Airlines", price: 600 },
];

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

/* -------- Hero + Tabs + Search -------- */
function HeroSearch() {
  const [activeTab, setActiveTab] = React.useState("Flights");

  /* ========== STATE CHO FLIGHTS (giữ mẫu cũ) ========== */
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

  /* ========== STATE CHO HOTELS ========== */
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

  /* ========== STATE CHO TOURS ========== */
  const [tourLocation, setTourLocation] = React.useState("");
  const [tourDate, setTourDate] = React.useState(() => {
    const d = new Date();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${d.getFullYear()}-${mm}-${dd}`;
  });
  const [tourTravellers, setTourTravellers] = React.useState(1);
  const [openTourGuests, setOpenTourGuests] = React.useState(false);

  /* ========== STATE CHO CARS ========== */
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

  /* ========== REF ĐỂ BẮT CLICK RA NGOÀI (đóng popover) ========== */
  const hotelGuestsRef = React.useRef(null);
  const tourGuestsRef = React.useRef(null);
  const carGuestsRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        hotelGuestsRef.current &&
        !hotelGuestsRef.current.contains(e.target)
      ) {
        setOpenGuests(false);
      }
      if (
        tourGuestsRef.current &&
        !tourGuestsRef.current.contains(e.target)
      ) {
        setOpenTourGuests(false);
      }
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

  /* ========== HÀM ĐỔI SỐ LƯỢNG HOTEL ========== */
  const changeHotelGuest = (type, delta) => {
    if (type === "rooms") {
      setHotelRooms((v) => Math.max(1, v + delta));
    } else if (type === "travellers") {
      setHotelTravellers((v) => Math.max(1, v + delta));
    }
  };

  return (
    <section className="hp-hero">
      <div className="hp-container">
        <h1>Your Trip Starts Here!</h1>
        <p>
          Let us help you plan your next journey — the one that will leave a
          lifetime of memories.
        </p>

        {/* Tabs */}
        <div className="hp-tabs">
          {TABS.map((t) => (
            <button
              key={t}
              className={`hp-tab ${t === activeTab ? "hp-active" : ""}`}
              onClick={() => setActiveTab(t)}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="hp-search">
          {/* =============== FLIGHTS =============== */}
          {activeTab === "Flights" && (
            <>
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
                  <select
                    value={cabin}
                    onChange={(e) => setCabin(e.target.value)}
                  >
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
            </>
          )}

          {/* =============== HOTELS =============== */}
          {activeTab === "Hotels" && (
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
                          onClick={() => changeHotelGuest("rooms", -1)}
                        >
                          −
                        </button>
                        <span>{hotelRooms}</span>
                        <button
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
                          onClick={() =>
                            changeHotelGuest("travellers", -1)
                          }
                        >
                          −
                        </button>
                        <span>{hotelTravellers}</span>
                        <button
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

              <button className="hp-search-btn">🔎</button>
            </div>
          )}

          {/* =============== TOURS =============== */}
          {activeTab === "Tours" && (
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
                <span className="hp-hotel-icon">👥</span>
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
                          onClick={() =>
                            setTourTravellers((v) => Math.max(1, v - 1))
                          }
                        >
                          −
                        </button>
                        <span>{tourTravellers}</span>
                        <button
                          onClick={() => setTourTravellers((v) => v + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </label>

              <button className="hp-search-btn">🔎</button>
            </div>
          )}

          {/* =============== CARS =============== */}
          {activeTab === "Cars" && (
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
                          onClick={() =>
                            setCarTravellers((v) => Math.max(1, v - 1))
                          }
                        >
                          −
                        </button>
                        <span>{carTravellers}</span>
                        <button
                          onClick={() => setCarTravellers((v) => v + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </label>

              <button className="hp-search-btn">🔎</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}




/* -------- Featured Flights -------- */
function FeaturedFlights() {
  return (
    <section className="hp-featured">
      <div className="hp-container">
        <h2>Chuyến bay nổi bật</h2>
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

/* -------- Featured Hotels -------- */
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
    <section className="hp-hotels">
      <div className="hp-container">
        <div className="hp-hotels-head">
          <div>
            <h2>Khách sạn nổi bật</h2>
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

/* -------- Popular Tours -------- */
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
            <h2>Tour phổ biến</h2>
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

/* -------- Recommended Cars -------- */
function RecommendedCars() {
  return (
    <section className="hp-cars">
      <div className="hp-container">
        <h2>Xe trung chuyển được đề xuất</h2>

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

/* ================== PAGE ROOT ================== */

export default function TrangChu() {
  return (
    <div className="home-page">
      <Header />
      <HeroSearch />
      <FeaturedFlights />
      <FeaturedHotels />
      <PopularTours />
      <RecommendedCars />
      <Footer />
    </div>
  );
}


