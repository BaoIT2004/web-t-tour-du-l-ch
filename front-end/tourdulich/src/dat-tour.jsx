import React from "react";
import "./app.css";
import { useParams } from "react-router-dom";

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

      <div>
        <CustomerMenu />
      </div>
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

/* ============ COMPONENT 1: HERO TOUR ============ */
function TourHero({ tour }) {
  if (!tour) return null;

  const [date, setDate] = React.useState("");
  const [adult, setAdult] = React.useState("");
  const [child, setChild] = React.useState("");

  const basePrice = tour.tourPrice || 300000;
  const childPrice = basePrice * 0.5;
  const totalPrice = adult * basePrice + child * childPrice;
  const image = tour.image ? `http://localhost:3000${tour.image}` : "";

  const formatVND = (value) =>
    value.toLocaleString("vi-VN", { minimumFractionDigits: 0 });

  return (
    <section className="tt-main">
      <div className="hp-container">
        <div className="tt-hero-box">
          <div className="tt-hero-grid">
            <div className="tt-hero-image">
              <img src={image} alt={tour.title} />
            </div>

            <div className="tt-hero-form">
              <h2 className="tt-hero-title">{tour.tourName}</h2>
              <div className="tt-form-group tt-price-row">
                <label>Giá tour</label>
                <div className="tt-price-text">
                  {formatVND(basePrice)} VND / người
                </div>
              </div>

              <div className="tt-form-group">
                <label>Ngày đi</label>
                <input
                  type="date"
                  className="tt-input"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <div className="tt-form-group">
                <label>Người lớn ▸ Age 12+</label>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  className="tt-select"
                  value={adult}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "" || /^[0-9]+$/.test(val)) {
                      setAdult(val);
                    }
                  }}
                  placeholder="Nhập số người"
                />

              </div>

              <div className="tt-form-group">
                <label>Trẻ em ▸ Age 12-</label>
                <input
                  type="text"
                  inputMode="numeric" 
                  pattern="[0-9]*"
                  className="tt-select"
                  value={child}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "" || /^[0-9]+$/.test(val)) {
                      setChild(val);
                    }
                  }}
                  placeholder="Nhập số người"
                />

              </div>

              <div className="tt-form-group">
                <label>Tổng cộng</label>
                <div className="tt-price-box">
                  <span>{formatVND(totalPrice)} VND</span>
                  <small>({formatVND(basePrice)} / người)</small>
                </div>
              </div>

              <a
                href={`/thanhtoan?total=${totalPrice}&people=${adult + child}`}
                className="ht-btn-outline"
              >
                Đặt ngay
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} /* ============ COMPONENT 2: NAME SCHEDULE ============ */






/* ============ COMPONENT 3: TOUR SCHEDULE ============ */
function TourSchedule({ tour }) {
  const [openList, setOpenList] = React.useState([1]);
  const toggle = (id) =>
    setOpenList((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const steps = tour.steps || [
    { id: 1, title: "Hành trình ngày 1", content: "Tham quan A, B, C..." },
    { id: 2, title: "Hành trình ngày 2", content: "Khám phá văn hóa..." },
  ];

  return (
    <section>
      <div className="hp-container">
        <div className="tt-section-box">
          <div className="tt-section-header">Tiến trình tour</div>
          <form className="tt-step-form">
            <textarea
              className="tt-step-input"
              placeholder="Hiển thị nội dung lịch trình tour ở đây..."
              rows={1}
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = e.target.scrollHeight + "px";
              }}
              readOnly
            />
          </form>
        </div>
      </div>
    </section>

  );
}



/* ============ COMPONENT 3: TOUR REVIEWS ============ */
function TourReviews({ tour }) {
  const [reviews, setReviews] = React.useState(tour.reviews || []);
  const [showForm, setShowForm] = React.useState(false);
  const [rating, setRating] = React.useState(0);
  const [date, setDate] = React.useState("");
  const [content, setContent] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rating || !date || !content.trim()) return alert("Vui lòng nhập đầy đủ thông tin!");

    const newReview = { id: Date.now(), name: "Khách hàng", rating, content, date };
    setReviews((prev) => [newReview, ...prev]);
    setRating(0); setDate(""); setContent(""); setShowForm(false);
  };

  return (
    <section>
      <div className="hp-container">
        <div className="tt-section-box">
          <div className="tt-section-header">Đánh giá</div>
          <div className="tt-reviews-card">
            {reviews.map((rv) => (
              <div key={rv.id} className="tt-review-item">
                <div className="tt-review-avatar">☺</div>
                <div className="tt-review-body">
                  <div className="tt-review-header">
                    <strong>{rv.name}</strong>
                    <span className="tt-review-date">Ngày đánh giá: {rv.date}</span>
                  </div>
                  <div className="tt-review-stars">
                    {"★".repeat(rv.rating)}{"☆".repeat(5 - rv.rating)}
                  </div>
                  <p>{rv.content}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="tt-btn-light" onClick={() => setShowForm(true)}>+ Thêm đánh giá</button>
        </div>
      </div>

      {showForm && (
        <div className="tt-review-backdrop" onClick={() => setShowForm(false)}>
          <div className="tt-review-modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="tt-review-modal-title">Form đánh giá</h3>
            <form className="tt-review-form" onSubmit={handleSubmit}>
              <label>Đánh giá sao (1–5):</label>
              <div className="tt-review-stars-input">
                {[1,2,3,4,5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={s <= rating ? "tt-star-btn tt-star-btn-active" : "tt-star-btn"}
                    onClick={() => setRating(s)}
                  >★</button>
                ))}
              </div>
              <label>Ngày đánh giá</label>
              <input type="date" className="tt-review-input" value={date} onChange={(e) => setDate(e.target.value)} />
              <label>Nội dung</label>
              <textarea className="tt-review-textarea" value={content} onChange={(e) => setContent(e.target.value)} />
              <div className="tt-review-actions">
                <button type="button" className="tt-btn-light" onClick={() => setShowForm(false)}>Đóng</button>
                <button type="submit" className="tt-btn-primary">Gửi</button>
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
        <div className="hp-footer-col">
          <h3>BTQQ Travel</h3>
          <p>Your trusted partner for flights, hotels, tours and cars.</p>
        </div>
        <div className="hp-footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#">Flights</a></li>
            <li><a href="#">Hotels</a></li>
            <li><a href="#">Tours</a></li>
            <li><a href="#">Cars</a></li>
          </ul>
        </div>
        <div className="hp-footer-col">
          <h4>Support</h4>
          <ul>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Booking Guide</a></li>
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
export default function TourDetail() {
  const { id } = useParams();
  const [tour, setTour] = React.useState(null);

  React.useEffect(() => {
    fetch("http://localhost:3000/api/view-new-tour")
      .then(res => res.json())
      .then(data => {
        const tours = Array.isArray(data.tours) ? data.tours : [];
        const selectedTour = tours.find(t => t.id === Number(id));
        setTour(selectedTour || null);
      })
      .catch(err => console.log("Lỗi fetch tour:", err));
  }, [id]);

  if (!tour) return <div>Đang tải tour...</div>;

  return (
    <div className="home-page">
      <Header />
      <TourHero tour={tour} />
      <TourSchedule tour={tour} />
      <TourReviews tour={tour} />
      <Footer />
    </div>
  );
}
