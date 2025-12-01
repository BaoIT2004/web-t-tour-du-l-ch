import React from "react";
import "./app.css";

function SimpleHeader() {
  return <header className="simple-header">BTQQ TRAVEL</header>;
}

export default function PaymentPage() {
  const [payMethod, setPayMethod] = React.useState("qr");

  // Lấy total (và people) từ URL: ?total=600000&people=2
  const searchParams = new URLSearchParams(window.location.search);
  const rawTotal = searchParams.get("total");
  const total = rawTotal ? Number(rawTotal) : 0;
  const hasTotal = !Number.isNaN(total) && total > 0;
  const formattedTotal = hasTotal
    ? total.toLocaleString("vi-VN")
    : "000.000";



  return (
    <div className="home-page">
      <SimpleHeader />

      <main className="pay-main">
        <div className="hp-container">
          <h1 className="pay-title">Thanh toán</h1>

          <div className="pay-card">
            {/* ===== Thông tin người đặt ===== */}
            <div className="pay-section">
              <div className="pay-section-title">Thông tin người đặt</div>

              <div className="pay-grid-2">
                <div className="pay-field">
                  <label>First name</label>
                  <input className="pay-input" />
                </div>
                <div className="pay-field">
                  <label>Last name</label>
                  <input className="pay-input" />
                </div>

                <div className="pay-field">
                  <label>Email</label>
                  <input className="pay-input" type="email" />
                </div>
                <div className="pay-field">
                  <label>Phone</label>
                  <input className="pay-input" />
                </div>
              </div>

              <div className="pay-field pay-field-full">
                <label>Address</label>
                <input className="pay-input" />
              </div>
            </div>

            {/* ===== Thông tin du khách ===== */}
            <div className="pay-section">
              <div className="pay-section-title">Thông tin du khách</div>

              <div className="pay-grid-3">
                <div className="pay-field">
                  <label>Danh xưng</label>
                  <select className="pay-input">
                    <option>Anh</option>
                    <option>Chị</option>
                  </select>
                </div>
                <div className="pay-field">
                  <label>First name</label>
                  <input className="pay-input" />
                </div>
                <div className="pay-field">
                  <label>Last name</label>
                  <input className="pay-input" />
                </div>
              </div>

              <div className="pay-field pay-field-full">
                <label>Ghi chú</label>
                <input className="pay-input" />
              </div>
            </div>

            {/* ===== Phương thức thanh toán ===== */}
            <div className="pay-section">
              <div className="pay-section-title">Phương thức thanh toán</div>

              <div className="pay-paymethods">
                <button
                  type="button"
                  className={
                    payMethod === "qr"
                      ? "pay-method-btn pay-method-btn-active"
                      : "pay-method-btn"
                  }
                  onClick={() => setPayMethod("qr")}
                >
                  QR BANKING
                </button>

                <button
                  type="button"
                  className={
                    payMethod === "cash"
                      ? "pay-method-btn pay-method-btn-active"
                      : "pay-method-btn"
                  }
                  onClick={() => setPayMethod("cash")}
                >
                  TIỀN MẶT
                </button>

                <button
                  type="button"
                  className={
                    payMethod === "later"
                      ? "pay-method-btn pay-method-btn-active"
                      : "pay-method-btn"
                  }
                  onClick={() => setPayMethod("later")}
                >
                  TRẢ SAU
                </button>
              </div>

              <div className="pay-total-row">
                <span className="pay-total-label">TOTAL:</span>
                <span className="pay-total-value">
                  {formattedTotal} VND
                </span>
              </div>

            </div>

            {/* ===== Điều khoản + nút thanh toán ===== */}
            <div className="pay-agree-row">
              <label className="pay-agree">
                <input type="checkbox" /> Tôi đồng ý với các điều khoản và
                dịch vụ
              </label>
            </div>

            <div className="pay-submit-row">
              <button className="pay-submit-btn" type="button">
                Thanh toán
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
