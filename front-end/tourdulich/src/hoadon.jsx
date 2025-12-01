import React from "react";
import "./app.css"; 

/* ================== DATA ĐƠN HÀNG ================== */
const ORDERS = [
  {
    id: 1,
    title: "Ha Long bay Cruise",
    date: "2/12/2025",
    status: "chưa thanh toán",
    type: "Tour",
    total: "000.000 vnd",
    img: "", 
  },
  {
    id: 2,
    title: "Ha Long bay Cruise",
    date: "2/12/2025",
    status: "đã thanh toán",
    type: "Tour",
    total: "000.000 vnd",
    img: "",
  },
];

/* ================== HEADER ================== */
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
      <button className="hp-pill" onClick={() => setOpen((v) => !v)}>
        Customer ▾
      </button>

      <div className="hp-dd-menu" role="menu">
        <a className="hp-dd-item" href="/login">Login</a>
        <a className="hp-dd-item" href="/signup">Signup</a>
      </div>
    </div>
  );
}

/* ================== ORDER CARD ================== */
function OrderCard({ order }) {
  return (
    <div className="order-card">
      <div className="order-card-left">
        <div className="order-thumb">
          <img src={order.img} alt={order.title} className="order-img" />
        </div>
      </div>

      <div className="order-card-middle">
        <p><strong>Tên :</strong> {order.title}</p>
        <p><strong>Ngày đặt :</strong> {order.date}</p>
        <p><strong>Trạng thái :</strong> {order.status}</p>
      </div>

      <div className="order-card-right">
        <p className="order-total">Tổng : {order.total}</p>

        <div className="order-actions">
          <button className="order-btn order-btn-outline">Chi tiết</button>
          <button className="order-btn order-btn-ghost">Huỷ đơn hàng</button>
        </div>
      </div>
    </div>
  );
}

/* ================== MIDDLE SECTION ================== */
function OrdersSection() {
  return (
    <main className="hp-containerbill">
      <h1 className="order-page-title">Đơn hàng của bạn</h1>

      <div className="order-list">
        {ORDERS.map((order) => (
          <React.Fragment key={order.id}>
            <OrderCard order={order} />
            <div className="order-divider"></div>
          </React.Fragment>
        ))}
      </div>
    </main>
  );
}

/* ================== EXPORT CHÍNH ================== */
export default function Tour() {
  return (
    <div className="home-page">
      <Header />
      <OrdersSection />
    </div>
  );
}
