import React from "react";
import "./app.css";
import { Link } from "react-router-dom";


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

/* ============ DATA ============ */
const TOUR_STEPS = [
  { id: 1, title: "Hành trình của tour", content: "Ngày 1: Đón khách, tham quan địa điểm A, B, C..." },
  { id: 2, title: "Hành trình của tour", content: "Ngày 2: Khám phá địa phương, trải nghiệm văn hoá..." },
  { id: 3, title: "Hành trình của tour", content: "Ngày 3: Tham quan tự do, mua sắm..." },
  { id: 4, title: "Hành trình của tour", content: "Ngày 4: Check-out, tạm biệt đoàn..." },
  { id: 5, title: "Hành trình của tour", content: "Lịch trình có thể thay đổi linh hoạt theo thời tiết." },
];

const REVIEW_LIST = [
  { id: 1, name: "Lê Thanh Hà", rating: 4, content: "Hướng dẫn viên vui tính, lịch trình hợp lý.", date: "25/11/2025" },
  { id: 2, name: "Lê Thanh Hà", rating: 4, content: "Khách sạn sạch sẽ, xe đưa đón đúng giờ.", date: "25/11/2025" },
  { id: 3, name: "Lê Thanh Hà", rating: 4, content: "Dịch vụ tốt, sẽ quay lại lần sau.", date: "25/11/2025" },
];

/* ============ COMPONENT 1: HERO TOUR ============ */

function TourHero() {
    const [date, setDate] = React.useState("");
    const [people, setPeople] = React.useState(2);
    const basePrice = 300000; // giá / người
    const totalPrice = basePrice * people;  
  
    const formatVND = (value) =>
      value.toLocaleString("vi-VN", { minimumFractionDigits: 0 });
  
    return (
      <section className="tt-main">
        <div className="hp-container">
          <div className="tt-hero-box">
            <div className="tt-hero-grid">
              {/* Ảnh lớn bên trái */}
              <div className="tt-hero-image">
                <img src="" />
              </div>
  
              {/* Form bên phải */}
              <div className="tt-hero-form">
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
                  <label>Số người</label>
                  <select
                    className="tt-select"
                    value={people}
                    onChange={(e) => setPeople(Number(e.target.value))}
                  >
                    <option value={1}>1 người</option>
                    <option value={2}>2 người</option>
                    <option value={3}>3 người</option>
                    <option value={4}>4 người</option>
                    <option value={5}>5 người</option>
                  </select>
                </div>
  
                <div className="tt-form-group">
                  <label>Tổng cộng</label>
                  <div className="tt-price-box">
                    <span>{formatVND(totalPrice)} VND</span>
                    <small>({formatVND(basePrice)} / người)</small>
                  </div>
                </div>
  
                {/* ⬇⬇⬇ CHỈ SỬA DÒNG NÀY */}
                <a
                  href={`/thanhtoan?total=${totalPrice}&people=${people}`}
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
  }
  

/* ============ COMPONENT 2: TIẾN TRÌNH TOUR ============ */

function TourSchedule() {
    const [openList, setOpenList] = React.useState([1]); // mở step 1 mặc định
  
    const toggle = (id) => {
      setOpenList((prev) => {
        // nếu đã mở -> đóng lại
        if (prev.includes(id)) {
          return prev.filter((x) => x !== id);
        }
        // nếu chưa mở -> mở thêm (không đóng cái cũ)
        return [...prev, id];
      });
    };
  
    return (
      <section>
        <div className="hp-container">
          <div className="tt-section-box">
            <div className="tt-section-header">Tiến trình tour</div>
  
            <div className="tt-steps-card">
              {TOUR_STEPS.map((step, index) => (
                <div key={step.id} className="tt-step-item">
                  <button
                    type="button"
                    className={`tt-step-header ${
                      openList.includes(step.id) ? "tt-step-header-open" : ""
                    }`}
                    onClick={() => toggle(step.id)}  // mở/đóng khi nhấp title
                  >
                    <span>
                      {index + 1}. {step.title}
                    </span>
  
                    <span className="tt-step-chevron">
                      {openList.includes(step.id) ? "▾" : "▸"}
                    </span>
                  </button>
  
                  {openList.includes(step.id) && (
                    <div className="tt-step-body">{step.content}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
  

/* ============ COMPONENT 3: ĐÁNH GIÁ ============ */

function TourReviews() {
  const [reviews, setReviews] = React.useState(REVIEW_LIST);
  const [showForm, setShowForm] = React.useState(false);
  const [rating, setRating] = React.useState(0);
  const [date, setDate] = React.useState("");
  const [content, setContent] = React.useState("");

  const openForm = () => setShowForm(true);
  const closeForm = () => setShowForm(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!rating || !date || !content.trim()) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const newReview = {
      id: Date.now(),
      name: "Khách hàng",
      rating,
      content,
      date,
    };

    setReviews((prev) => [newReview, ...prev]);
    setRating(0);
    setDate("");
    setContent("");
    setShowForm(false);
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
                    <span className="tt-review-date">
                      Ngày đánh giá: {rv.date}
                    </span>
                  </div>

                  <div className="tt-review-stars">
                    {"★".repeat(rv.rating)}
                    {"☆".repeat(5 - rv.rating)}
                  </div>

                  <p>Nội dung: {rv.content}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="tt-review-add">
            <button className="tt-btn-light" onClick={openForm}>
              + Thêm đánh giá
            </button>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="tt-review-backdrop" onClick={closeForm}>
          <div
            className="tt-review-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="tt-review-modal-title">Form đánh giá</h3>

            <form className="tt-review-form" onSubmit={handleSubmit}>
              <div className="tt-review-form-row-title">
                <span className="tt-review-form-icon">💬</span>
                <span>Viết đánh giá của bạn</span>
              </div>

              <label className="tt-review-label">
                Đánh giá sao (1–5 sao):
              </label>
              <div className="tt-review-stars-input">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={
                      s <= rating ? "tt-star-btn tt-star-btn-active" : "tt-star-btn"
                    }
                    onClick={() => setRating(s)}
                  >
                    ★
                  </button>
                ))}
              </div>

              <label className="tt-review-label">Ngày đánh giá</label>
              <input
                type="date"
                className="tt-review-input"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />

              <label className="tt-review-label">Ghi nội dung đánh giá</label>
              <textarea
                className="tt-review-textarea"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />

              <div className="tt-review-actions">
                <button
                  type="button"
                  className="tt-btn-light"
                  onClick={closeForm}
                >
                  Đóng
                </button>
                <button type="submit" className="tt-btn-primary">
                  Gửi
                </button>
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

export default function TourDetail() {
  return (
    <div className="home-page">
      <Header />
      <TourHero />
      <TourSchedule />
      <TourReviews />
      <Footer />
    </div>
  );
}
