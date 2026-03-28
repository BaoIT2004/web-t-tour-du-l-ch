import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext.jsx";
import "./app.css";

/* ============ HEADER ============ */
function Header() {
  return (
    <header className="hp-topbar">
      <div className="hp-brand">
        <a
          href="/home"
          style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center", gap: "10px" }}
        >
          <span className="hp-logo"></span>
          <span>BTQQ Travel</span>
        </a>
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
  const [open, setOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const ref = useRef(null);

  useEffect(() => {
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onEsc = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("click", onDoc);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("click", onDoc);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);



  const handleLogout = () => {
    logout();
    setOpen(false);
  };

  return (
    <div className={`hp-dd ${open ? "open" : ""}`} ref={ref}>
      <button
        className="hp-pill"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {user && user.email ? `${user.email} ▾` : "Customer ▾"}
      </button>

      <div className="hp-dd-menu" role="menu">
        {!user ? (
          <>
            <a className="hp-dd-item" href="/login" role="menuitem">
              Đăng nhập
            </a>
            <a className="hp-dd-item" href="/signup" role="menuitem">
              Đăng kí
            </a>
          </>
        ) : (
          <>
            <button className="logout-btn" onClick={handleLogout}>
              Đăng xuất
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/* ============ TOUR HERO ============ */
function TourHero({ tour, startDate, setStartDate }) {
  const [date, setDate] = useState(startDate);
  const [adult, setAdult] = useState("");
  const [child, setChild] = useState("");
  const {user, token } = useContext(AuthContext);
  const navigate = useNavigate();

  console.log("User trong TourHero:", user);

  const basePrice = tour.tourPrice || 300000;
  const childPrice = basePrice * 0.5;
  const totalPrice = adult * basePrice + child * childPrice;
  const people = Number(adult) + Number(child);
  const image = tour.image ? `http://localhost:3000${tour.image}` : "";

  const formatVND = (value) => value.toLocaleString("vi-VN", { minimumFractionDigits: 0 });

  const handleBooking = () => {
    const currentToken = localStorage.getItem("token");

    console.log(currentToken); // Debug

    if (!currentToken || currentToken === "null" || currentToken === "undefined") {
      alert("Bạn cần đăng nhập để đặt tour!");
      navigate("/login");
      return;
    }

    // Kiểm tra người lớn và trẻ em
    if (adult === "" || child === "") {
      alert("Vui lòng nhập số người lớn và trẻ em!");
      return;
    }

    const totalPeople = Number(adult) + Number(child);
    if (totalPeople === 0) {
      alert("Số người phải lớn hơn 0");
      return;
    }

    // THÊM tourId VÀO URL
    navigate(`/thanhtoan?tourId=${tour.id}&total=${totalPrice}&people=${people}&adults=${adult}&children=${child}&date=${date}`);
  };

  return (
    <section className="tt-main">
      <div className="hp-container">
        <div className="tt-hero-box">
          <div className="tt-hero-grid">
            <div className="tt-hero-image">
              <img src={image} alt={tour.tourName} />
            </div>
            <div className="tt-hero-form">
              <h2 className="tt-hero-title">{tour.tourName}</h2>

              <div className="tt-form-group tt-price-row">
                <label>Giá tour</label>
                <div className="tt-price-text">{formatVND(basePrice)} VND / người</div>
              </div>

              <div className="tt-form-group">
                <label>Ngày đi</label>
                <input
                  type="date"
                  className="tt-input"
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                    setStartDate(e.target.value);
                  }}
                />
              </div>

              <div className="tt-form-group">
                <label>Người lớn ▸ Tuổi 12+</label>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  className="tt-select"
                  value={adult}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "" || /^[0-9]+$/.test(val)) setAdult(val);
                  }}
                  placeholder="Nhập số người lớn "
                />
              </div>

              <div className="tt-form-group">
                <label>Trẻ em ▸ Tuổi 12-</label>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  className="tt-select"
                  value={child}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "" || /^[0-9]+$/.test(val)) setChild(val);
                  }}
                  placeholder="Nhập số trẻ em"
                />
              </div>

              <div className="tt-form-group">
                <label>Tổng cộng</label>
                <div className="tt-price-box">
                  <span>{formatVND(totalPrice)} VND</span>
                  <small>({formatVND(basePrice)} / người)</small>
                </div>
              </div>

              <button className="ht-btn-outline" onClick={handleBooking}>
                Đặt ngay
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ TOUR SCHEDULE ============ */
function TourSchedule({ tour, startDate }) {
  const schedules = tour.schedules?.length
    ? tour.schedules
    : [{ schedule: "", startDate: "", note: "", status: "1" }];

  const start = startDate ? new Date(startDate) : null;

  return (
    <section>
      <div className="hp-container">
        <div className="tt-section-box">
          <div className="tt-section-header">Tiến trình tour</div>
          {schedules.map((item, index) => {
            const itemStartDate = start ? new Date(start) : new Date(item.startDate);
            if (start) itemStartDate.setDate(itemStartDate.getDate() + index);
            const itemEndDate = new Date(itemStartDate);
            itemEndDate.setDate(itemEndDate.getDate() + 1);

            return (
              <div key={index} className="day-item" style={{ border: "1px solid #ddd", padding: 12, marginBottom: 12, borderRadius: 6 }}>
                <strong>Ngày {index + 1}</strong>
                <label className="dash-form-label">Lịch trình tour</label>
                <textarea className="dash-input dash-w100" rows={4} placeholder="Không có dữ liệu" value={item.itinerary || ""} readOnly />
                <label className="dash-form-label" style={{ marginTop: 10 }}>Ghi chú</label>
                <textarea className="dash-input dash-w100" rows={2} placeholder="Không có ghi chú" value={item.notes || ""} readOnly />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============ TOUR REVIEWS ============ */
function TourReviews({ tour }) {
  const [reviews, setReviews] = useState(tour.reviews || []);
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rating || !date || !content.trim()) return alert("Vui lòng nhập đầy đủ thông tin!");
    const newReview = { id: Date.now(), name: "Khách hàng", rating, content, date };
    setReviews(prev => [newReview, ...prev]);
    setRating(0); setDate(""); setContent(""); setShowForm(false);
  };

  return (
    <section>
      <div className="hp-container">
        <div className="tt-section-box">
          <div className="tt-section-header">Đánh giá</div>
          {reviews.map(rv => (
            <div key={rv.id} className="tt-review-item">
              <div className="tt-review-avatar">☺</div>
              <div className="tt-review-body">
                <strong>{rv.name}</strong>
                <span className="tt-review-date">Ngày đánh giá: {rv.date}</span>
                <div className="tt-review-stars">{"★".repeat(rv.rating)}{"☆".repeat(5 - rv.rating)}</div>
                <p>{rv.content}</p>
              </div>
            </div>
          ))}
          <button className="tt-btn-light" onClick={() => setShowForm(true)}>+ Thêm đánh giá</button>
        </div>
      </div>

      {showForm && (
        <div className="tt-review-backdrop" onClick={() => setShowForm(false)}>
          <div className="tt-review-modal" onClick={e => e.stopPropagation()}>
            <h3 className="tt-review-modal-title">Form đánh giá</h3>
            <form onSubmit={handleSubmit}>
              <label>Đánh giá sao (1–5):</label>
              <div>
                {[1,2,3,4,5].map(s => (
                  <button key={s} type="button" className={s <= rating ? "tt-star-btn tt-star-btn-active" : "tt-star-btn"} onClick={() => setRating(s)}>★</button>
                ))}
              </div>
              <label>Ngày đánh giá</label>
              <input type="date" value={date} onChange={e => setDate(e.target.value)} />
              <label>Nội dung</label>
              <textarea value={content} onChange={e => setContent(e.target.value)} />
              <div>
                <button type="button" onClick={() => setShowForm(false)}>Đóng</button>
                <button type="submit">Gửi</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

/* ============ FOOTER ============ */
function Footer() {
  return (
    <footer className="hp-footer">
      <div className="hp-container hp-footer-inner">
        <div>
          <h3>BTQQ Travel</h3>
          <p>Your trusted partner for flights, hotels, tours and cars.</p>
        </div>
      </div>
      <div className="hp-footer-bottom">© {new Date().getFullYear()} BTQQ Travel — All rights reserved.</div>
    </footer>
  );
}

/* ============ MAIN PAGE: TOUR DETAIL ============ */
export default function TourDetail() {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [startDate, setStartDate] = useState("");

  useEffect(() => {
    const fetchTour = () => {
      fetch(`http://localhost:3000/api/view-tour?id=${id}`)
        .then(res => res.json())
        .then(data => {
          if (data.errCode === 0) {
            setTour(data.tour);
            if (!startDate && data.tour.schedules?.length > 0) {
              setStartDate(data.tour.schedules[0].startDate.slice(0,10));
            }
          }
        })
        .catch(err => console.log("Lỗi fetch tour:", err));
    };

    fetchTour();

    const onTourUpdated = () => fetchTour();
    window.addEventListener("tourUpdated", onTourUpdated);
    return () => window.removeEventListener("tourUpdated", onTourUpdated);
  }, [id, startDate]);

  if (!tour) return <div>Đang tải tour...</div>;

  return (
    <div className="home-page">
      <Header />
      <TourHero tour={tour} startDate={startDate} setStartDate={setStartDate} />
      <TourSchedule tour={tour} startDate={startDate} />
      <TourReviews tour={tour} />
      <Footer />
    </div>
  );
}