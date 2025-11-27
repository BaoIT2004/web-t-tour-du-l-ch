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
const ROOM_LIST = [
    {
      id: 1,
  
title: "Phòng thường",
people: "0 người",
price: "000,000 VND",
img: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800",
},
{
id: 2,
title: "Phòng thường",
people: "0 người",
price: "000,000 VND",
img: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800",
},
];

const REVIEW_LIST = [
{
id: 1,
name: "Lê Thanh Hà",
rating: 4,
content: "Dịch vụ rất tốt",
date: "25/11/2025",
},
{
id: 2,
name: "Lê Thanh Hà",
rating: 4,
content: "Dịch vụ rất tốt",
date: "25/11/2025",
},
{
id: 3,
name: "Lê Thanh Hà",
rating: 4,
content: "Dịch vụ rất tốt",
date: "25/11/2025",
},
];

/* ================== COMPONENT 1: HERO ================== */

function HotelHero() {
const [checkIn, setCheckIn] = React.useState("");
const [checkOut, setCheckOut] = React.useState("");
const [guests, setGuests] = React.useState("2 người");
const [roomType, setRoomType] = React.useState("Phòng thường");

return (
<section className="ht-main">
  <div className="hp-container">
    <div className="ht-hero-box">
      <div className="ht-hero-grid">
        {/* ảnh lớn bên trái (ô có X) */}
        <div className="ht-hero-image">
          <img
            src=""
          />
        </div>

        {/* form bên phải */}
        <div className="ht-hero-form">
          <div className="ht-form-group">
            <label>Check in</label>
            <input
              type="date"
              className="ht-input"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>

          <div className="ht-form-group">
            <label>Check out</label>
            <input
              type="date"
              className="ht-input"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>

          <div className="ht-form-group">
            <label>Số người</label>
            <select
              className="ht-select"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            >
              <option>1 người</option>
              <option>2 người</option>
              <option>3 người</option>
              <option>4 người</option>
            </select>
          </div>

          <div className="ht-form-group">
            <label>Loại phòng</label>
            <select
              className="ht-select"
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
            >
              <option>Phòng thường</option>
              <option>Phòng gia đình</option>
              <option>Suite</option>
            </select>
          </div>

          <button className="ht-btn-primary">Tìm</button>
        </div>
      </div>
    </div>
  </div>
</section>
);
}

/* ================== COMPONENT 2: ROOMS ================== */

function HotelRooms() {
return (
<section>
  <div className="hp-container">
    <div className="ht-section-box">
      <div className="ht-section-header">Rooms</div>

      <div className="ht-rooms-card">
        <div className="ht-rooms-header">
          <span>Loại phòng</span>
          <span>Số người</span>
          <span>Giá</span>
          <span></span>
        </div>

        {ROOM_LIST.map((room) => (
          <div key={room.id} className="ht-room-item">
            <img
              className="ht-room-img"
              src={room.img}
              alt={room.title}
            />

            <div className="ht-room-info">
              <h3>{room.title}</h3>
              <p>{room.people}</p>
            </div>

            <div className="ht-room-price">{room.price}</div>

            <button className="ht-btn-outline">Đặt ngay</button>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>
);
}

/* ================== COMPONENT 3: REVIEWS ================== */

function HotelReviews() {
    const [reviews, setReviews] = React.useState(REVIEW_LIST);
  
    // form state
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
        name: "Khách hàng", // bạn có thể thay bằng tên user login sau này
        rating,
        content,
        date,
      };
  
      // thêm vào đầu danh sách
      setReviews((prev) => [newReview, ...prev]);
  
      // reset & đóng form
      setRating(0);
      setDate("");
      setContent("");
      setShowForm(false);
    };
  
    return (
      <section>
        <div className="hp-container">
          <div className="ht-section-box">
            <div className="ht-section-header">Đánh giá</div>
  
            <div className="ht-reviews-card">
              {reviews.map((rv) => (
                <div key={rv.id} className="ht-review-item">
                  <div className="ht-review-avatar">☺</div>
  
                  <div className="ht-review-body">
                    <div className="ht-review-header">
                      <strong>{rv.name}</strong>
                      <span className="ht-review-date">
                        Ngày đánh giá: {rv.date}
                      </span>
                    </div>
  
                    <div className="ht-review-stars">
                      {"★".repeat(rv.rating)}
                      {"☆".repeat(5 - rv.rating)}
                    </div>
  
                    <p>Nội dung: {rv.content}</p>
                  </div>
                </div>
              ))}
            </div>
  
            <div className="ht-review-add">
              <button className="ht-btn-light" onClick={openForm}>
                + Thêm đánh giá
              </button>
            </div>
          </div>
        </div>
  
        {/* ===== FORM ĐÁNH GIÁ ===== */}
        {showForm && (
          <div className="ht-review-backdrop" onClick={closeForm}>
            <div
              className="ht-review-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="ht-review-modal-title">Form đánh giá</h3>
  
              <form className="ht-review-form" onSubmit={handleSubmit}>
                <div className="ht-review-form-row-title">
                  <span className="ht-review-form-icon">💬</span>
                  <span>Viết đánh giá của bạn</span>
                </div>
  
                <label className="ht-review-label">
                  Đánh giá sao (1–5 sao):
                </label>
  
                <div className="ht-review-stars-input">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      className={
                        s <= rating ? "ht-star-btn ht-star-btn-active" : "ht-star-btn"
                      }
                      onClick={() => setRating(s)}
                    >
                      ★
                    </button>
                  ))}
                </div>
  
                <label className="ht-review-label">Ngày đánh giá</label>
                <input
                  type="date"
                  className="ht-review-input"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
  
                <label className="ht-review-label">Ghi nội dung đánh giá</label>
                <textarea
                  className="ht-review-textarea"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
  
                <div className="ht-review-actions">
                  <button
                    type="button"
                    className="ht-btn-light"
                    onClick={closeForm}
                  >
                    Đóng
                  </button>
  
                  <button type="submit" className="ht-btn-primary">
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
        <HotelHero />
        <HotelRooms />
        <HotelReviews />
        <Footer />
      </div>
    );
  }