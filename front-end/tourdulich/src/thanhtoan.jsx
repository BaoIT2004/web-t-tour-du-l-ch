import React from "react";
import "./app.css";

function SimpleHeader() {
  return <header className="simple-header">BTQQ TRAVEL</header>;
}

export default function PaymentPage() {
  const [payMethod, setPayMethod] = React.useState("qr");

  // State lưu thông tin người đặt
  const [customer, setCustomer] = React.useState({
    first: "",
    last: "",
    email: "",
    phone: "",
    address: ""
  });

  // Ghi chú
  const [note, setNote] = React.useState("");

  // State checkbox đồng ý điều khoản
  const [agree, setAgree] = React.useState(false);

  // State lỗi
  const [errors, setErrors] = React.useState({});

  // Popup hóa đơn
  const [invoice, setInvoice] = React.useState(null);
  const [showInvoice, setShowInvoice] = React.useState(false);

  // Lấy total từ URL
  const searchParams = new URLSearchParams(window.location.search);
  const rawTotal = searchParams.get("total");
  const total = rawTotal ? Number(rawTotal) : 0;
  const formattedTotal = !Number.isNaN(total)
    ? total.toLocaleString("vi-VN")
    : "000.000";

  // Validate khi nhấn thanh toán
  const handleSubmit = () => {
    const newErrors = {};

    if (!customer.first) newErrors.customerFirst = "Vui lòng nhập First name";
    if (!customer.last) newErrors.customerLast = "Vui lòng nhập Last name";
    if (!customer.email) newErrors.customerEmail = "Vui lòng nhập Email";
    if (!customer.phone) newErrors.customerPhone = "Vui lòng nhập Phone";
    if (!customer.address) newErrors.customerAddress = "Vui lòng nhập Address";
    if (!agree) newErrors.agree = "Bạn phải đồng ý với điều khoản và dịch vụ";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    const invoiceData = {
      customer: { ...customer },
      note,
      payMethod,
      total: formattedTotal,
      createdAt: new Date().toLocaleString("vi-VN")
    };

    setInvoice(invoiceData);
    setShowInvoice(true);
  };

  // Nhấn "Xác nhận" trong popup hóa đơn
  const handleConfirmInvoice = () => {
    alert("Thanh toán thành công!");

    // Reset form
    setCustomer({
      first: "",
      last: "",
      email: "",
      phone: "",
      address: ""
    });
    setNote("");
    setAgree(false);
    setErrors({});
    setPayMethod("qr");
    setInvoice(null);
    setShowInvoice(false);
  };

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
                  <input
                    className="pay-input"
                    value={customer.first}
                    onChange={(e) =>
                      setCustomer({ ...customer, first: e.target.value })
                    }
                  />
                  {errors.customerFirst && (
                    <span className="error-text">{errors.customerFirst}</span>
                  )}
                </div>

                <div className="pay-field">
                  <label>Last name</label>
                  <input
                    className="pay-input"
                    value={customer.last}
                    onChange={(e) =>
                      setCustomer({ ...customer, last: e.target.value })
                    }
                  />
                  {errors.customerLast && (
                    <span className="error-text">{errors.customerLast}</span>
                  )}
                </div>

                <div className="pay-field">
                  <label>Email</label>
                  <input
                    className="pay-input"
                    value={customer.email}
                    onChange={(e) =>
                      setCustomer({ ...customer, email: e.target.value })
                    }
                  />
                  {errors.customerEmail && (
                    <span className="error-text">{errors.customerEmail}</span>
                  )}
                </div>

                <div className="pay-field">
                  <label>Phone</label>
                  <input
                    className="pay-input"
                    value={customer.phone}
                    onChange={(e) =>
                      setCustomer({ ...customer, phone: e.target.value })
                    }
                  />
                  {errors.customerPhone && (
                    <span className="error-text">{errors.customerPhone}</span>
                  )}
                </div>
              </div>

              <div className="pay-field pay-field-full">
                <label>Address</label>
                <input
                  className="pay-input"
                  value={customer.address}
                  onChange={(e) =>
                    setCustomer({ ...customer, address: e.target.value })
                  }
                />
                {errors.customerAddress && (
                  <span className="error-text">{errors.customerAddress}</span>
                )}
              </div>
            </div>

            {/* ===== Thông tin bổ sung ===== */}
            <div className="pay-section">
              <div className="pay-section-title">Thông tin bổ sung</div>

              <div className="pay-field pay-field-full">
                <label>Ghi chú</label>
                <input
                  className="pay-input"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
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
                <span className="pay-total-value">{formattedTotal} VND</span>
              </div>
            </div>

            {/* ===== Checkbox ===== */}
            <div className="pay-agree-row">
              <label className="pay-agree">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                />{" "}
                Tôi đồng ý với các điều khoản và dịch vụ
              </label>
              {errors.agree && (
                <span className="error-text">{errors.agree}</span>
              )}
            </div>

            <div className="pay-submit-row">
              <button className="pay-submit-btn" onClick={handleSubmit}>
                Thanh toán
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* ===== POPUP HÓA ĐƠN ===== */}
      {showInvoice && invoice && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-title">Hóa đơn thanh toán</div>

            <div className="modal-section">
              <strong>Thời gian:</strong> {invoice.createdAt}
            </div>

            <div className="modal-section">
              <strong>Họ tên người đặt:</strong>{" "}
              {invoice.customer.first} {invoice.customer.last}
            </div>

            <div className="modal-section">
              <strong>Email:</strong> {invoice.customer.email}
            </div>

            <div className="modal-section">
              <strong>Số điện thoại:</strong> {invoice.customer.phone}
            </div>

            <div className="modal-section">
              <strong>Địa chỉ:</strong> {invoice.customer.address}
            </div>

            <div className="modal-section">
              <strong>Ghi chú:</strong> {invoice.note || "Không có"}
            </div>

            <div className="modal-section">
              <strong>Phương thức thanh toán:</strong>{" "}
              {invoice.payMethod === "qr"
                ? "QR BANKING"
                : invoice.payMethod === "cash"
                ? "TIỀN MẶT"
                : "TRẢ SAU"}
            </div>

            <div className="modal-section">
              <strong>Tổng tiền:</strong> {invoice.total} VND
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="modal-confirm-btn"
                onClick={handleConfirmInvoice}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
