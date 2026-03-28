import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext.jsx";
import "./app.css";

function SimpleHeader() {
  return <header className="simple-header">BTQQ TRAVEL</header>;
}

function TourSchedule({ tour, startDate }) {
  console.log("=== TourSchedule Debug ===");
  console.log("1. Tour object:", tour);
  console.log("2. tour.schedules:", tour?.schedules);
  console.log("3. schedules length:", tour?.schedules?.length);
  console.log("4. startDate:", startDate);
  
  const schedules = tour.schedules?.length
    ? tour.schedules
    : [{ schedule: "", startDate: "", note: "", status: "1" }];

  console.log("5. Final schedules array:", schedules);

  const start = startDate ? new Date(startDate) : null;

  return (
    <section>
      <div className="tour-container">
        <div className="tour-section-box">
          <div className="tour-section-header">Tiến trình tour</div>
          {schedules.map((item, index) => {
            // ✅ LOG ĐỂ XEM TẤT CẢ FIELD NAMES
            console.log(`Item ${index} - ALL FIELDS:`, Object.keys(item));
            console.log(`Item ${index} - FULL OBJECT:`, item);
            
            const itemStartDate = start ? new Date(start) : new Date(item.startDate);
            if (start) itemStartDate.setDate(itemStartDate.getDate() + index);
            const itemEndDate = new Date(itemStartDate);
            itemEndDate.setDate(itemEndDate.getDate() + 1);

            return (
              <div key={index} style={{ border: "1px solid #ddd", padding: 12, marginBottom: 12, borderRadius: 6, background: '#f9f9f9' }}>
                <strong style={{ display: 'block', marginBottom: '10px' }}>Ngày {index + 1}</strong>
                
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Lịch trình tour</label>
                <textarea 
                  rows={4} 
                  placeholder="Không có dữ liệu" 
                  value={item.schedule || item.itinerary || item.description || item.content || ""} 
                  readOnly 
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                />
                
                <label style={{ display: 'block', fontWeight: 'bold', marginTop: '10px', marginBottom: '5px' }}>Ghi chú</label>
                <textarea 
                  rows={2} 
                  placeholder="Không có ghi chú" 
                  value={item.note || item.notes || item.remark || item.comment || ""} 
                  readOnly 
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function PaymentPage() {
  const navigate = useNavigate();
  const { token, user, loading } = useContext(AuthContext);

  // Lấy thông tin từ URL
  const searchParams = new URLSearchParams(window.location.search);
  const rawTotal = searchParams.get("total");
  const rawPeople = searchParams.get("people");
  const tourId = searchParams.get("tourId");

  const urlAdults = searchParams.get("adults"); // Lấy số người lớn từ URL
  const urlChildren = searchParams.get("children"); // Lấy số trẻ em từ URL
  const urlDate = searchParams.get("date"); // Lấy ngày đi từ URL

  const total = rawTotal ? Number(rawTotal) : 0;
  const people = rawPeople ? Number(rawPeople) : 0;
  const hasTotal = !Number.isNaN(total) && total > 0;
  const formattedTotal = hasTotal ? total.toLocaleString("vi-VN") : "000.000";

  // States cho form
  const [payMethod, setPayMethod] = useState("qr");
  const [date, setDate] = useState(urlDate || "");
  const [startDate, setStartDate] = useState("");
  const [agreed, setAgreed] = useState(false);

  // Thông tin người đặt
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // Thông tin du khách
  const [adults, setAdults] = useState(urlAdults || ""); //  Set giá trị từ URL
  const [children, setChildren] = useState(urlChildren || ""); //  Set giá trị từ URL
  const [notes, setNotes] = useState("");
  
  // State cho tour
  const [tourData, setTourData] = useState(null);

  // Fetch tour từ API
  useEffect(() => {
    if (!tourId) {
      console.log("Không có tourId");
      return;
    }

    console.log("TourId:", tourId);

    const fetchTour = () => {
      console.log("Bắt đầu fetch tour...");
      fetch(`http://localhost:3000/api/view-tour?id=${tourId}`)
        .then(res => res.json())
        .then(data => {
          if (data.errCode === 0) {
            setTourData(data.tour);
            
            // Sửa lỗi null.slice()
            if (!startDate && data.tour.schedules?.length > 0) {
              const firstScheduleDate = data.tour.schedules[0].startDate;
              if (firstScheduleDate) {
                setStartDate(firstScheduleDate.slice(0, 10));
              }
            }
          } else {
            console.log("Lỗi:", data.message);
          }
        })
        .catch(err => console.log("Lỗi fetch tour:", err));
    };

    fetchTour();

    const onTourUpdated = () => {
      console.log("🔄 Tour updated event triggered");
      fetchTour();
    };
    window.addEventListener("tourUpdated", onTourUpdated);
    return () => window.removeEventListener("tourUpdated", onTourUpdated);
  }, [tourId]); // Bỏ startDate khỏi dependencies để tránh loop

  // Cập nhật form khi user load xong
  useEffect(() => {
    if (!loading && user) {
      const savedUser = JSON.parse(localStorage.getItem("user"));
      if (savedUser) {
        setFirstName(savedUser.firstName || "");
        setLastName(savedUser.lastName || "");
        setEmail(savedUser.email || "");
        setPhone(savedUser.phonenumber || "");
        setAddress(savedUser.address || "");
      }
    }
  }, [loading, user]);

  console.log("Render - tourData:", tourData);
  console.log("Render - date:", date);

  if (loading) {
    console.log("Still loading...");
    return null;
  }

  const handleBooking = async () => {
    if (!token) {
      alert("Bạn cần đăng nhập để đặt tour!");
      navigate("/login");
      return;
    }

    if (!firstName.trim() || !lastName.trim()) {
      alert("Vui lòng nhập họ tên!");
      return;
    }

    if (!email.trim() || !phone.trim()) {
      alert("Vui lòng nhập email và số điện thoại!");
      return;
    }

    if (!date) {
      alert("Vui lòng chọn ngày đặt tour!");
      return;
    }

    if (!adults || Number(adults) < 1) {
      alert("Số lượng người lớn phải ít nhất là 1!");
      return;
    }

    if (!agreed) {
      alert("Vui lòng đồng ý với điều khoản dịch vụ!");
      return;
    }

    const bookingData = {
      userId: user?.id,
      tourId: tourId ? Number(tourId) : null,
      bookingDate: date,
      totalAdults: Number(adults),
      totalChildren: Number(children) || 0,
      notes: notes || "",
      acceptTerms: agreed,
      totalPrice: total,
      statusid: 1
    };

    console.log("Booking Data:", bookingData);
    console.log("Token:", token);

    try {
      const response = await fetch("http://localhost:3000/api/creat-new-booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(bookingData)
      });

      const result = await response.json();

      if (result.errCode === 0) {
        alert("Đặt tour thành công!");
        navigate("/my-bookings");
      } else {
        alert(result.message || "Có lỗi xảy ra khi đặt tour!");
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("Không thể kết nối đến server. Vui lòng thử lại!");
    }
  };

  return (
    <div className="home-page">
      <SimpleHeader />

      <main className="pay-main">
        <div className="hp-container">
          <h1 className="pay-title">Thanh toán</h1>

          <div className="pay-card">
            <div className="pay-section">
              <div className="pay-section-title">Thông tin người đặt</div>

              <div className="pay-grid-2">
                <div className="pay-field">
                  <label>Tên</label>
                  <input 
                    className="pay-input" 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="pay-field">
                  <label>Họ</label>
                  <input 
                    className="pay-input" 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>

                <div className="pay-field">
                  <label>Email</label>
                  <input 
                    className="pay-input" 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="pay-field">
                  <label>Số điện thoại</label>
                  <input 
                    className="pay-input" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="pay-field pay-field-full">
                <label>Địa chỉ</label>
                <input 
                  className="pay-input" 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div className="pay-field pay-field-full">
                <label>Ngày đặt</label>
                <input
                  type="date"
                  className="tt-input"
                  value={date}
                  onChange={(e) => {
                    console.log("Date changed to:", e.target.value);
                    setDate(e.target.value);
                    setStartDate(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="pay-section">
              <div className="pay-section-title">Thông tin du khách</div>

              <div className="pay-grid-3">
                <div className="pay-field">
                  <label>Số lượng người lớn</label>
                  <input 
                    className="pay-input" 
                    type="number"
                    min="1"
                    value={adults}
                    onChange={(e) => setAdults(e.target.value)}
                  />
                </div>
                <div className="pay-field">
                  <label>Số lượng trẻ em</label>
                  <input 
                    className="pay-input" 
                    type="number"
                    min="0"
                    value={children}
                    onChange={(e) => setChildren(e.target.value)}
                  />
                </div>
              </div>

              <div className="pay-field pay-field-full">
                <label>Ghi chú</label>
                <input 
                  className="pay-input" 
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ghi chú đặc biệt (nếu có)"
                />
              </div>
            </div>

            {/* ===== Tiến trình tour ===== */}
            {console.log("Before render TourSchedule - tourData:", tourData)}
            {tourData ? (
              <TourSchedule tour={tourData} startDate={date} />
            ) : (
              <div style={{padding: 20, background: '#f0f0f0', margin: '20px 0', border: '1px solid #ccc', borderRadius: '8px', textAlign: 'center'}}>
                <p style={{margin: 0, color: '#666'}}>Đang tải thông tin tour...</p>
              </div>
            )}

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
                <span className="pay-total-label">Tổng:</span>
                <span className="pay-total-value">
                  {formattedTotal} VND
                </span>
              </div>
            </div>

            <div className="pay-agree-row">
              <label className="pay-agree">
                <input 
                  type="checkbox" 
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                /> Tôi đồng ý với các điều khoản và dịch vụ
              </label>
            </div>

            <div className="pay-submit-row">
              <button 
                className="pay-submit-btn" 
                type="button"
                onClick={handleBooking}
              >
                Đặt ngay
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}