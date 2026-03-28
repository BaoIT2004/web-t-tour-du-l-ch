// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";


const Dashboard = () => {
  const navigate = useNavigate();

  // State mở/đóng menu
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // State dữ liệu từ API
  const [counts, setCounts] = useState({
    users: 0,
    pages: 0,
    bookings: 0,
    cancelledBookings: 0,
    unpaidBookings: 0,
    pendingTransactions: 0,
  });

  // Lấy dữ liệu từ API
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/count");
        const data = await res.json();
        console.log("API DATA:", data);

        // API: { errCode, toltal, errMessage }
        setCounts((prev) => ({
          ...prev,
          users: data.toltal ?? 0, // dùng đúng field "toltal"
        }));
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchCounts();
  }, []);

  const toggleUserMenu = () => setIsUserMenuOpen((prev) => !prev);

  return (
    <div className="dash-page">
      {/* SIDEBAR */}
      <aside className="dash-sidebar">
        <div className="dash-sidebar-header">
          <div className="dash-sidebar-title">Dashboard</div>
        </div>

        <nav className="dash-sidebar-menu">
          <button className="dash-menu-item">
            <i className="fa-regular fa-bell" />
            Alerts
          </button>
          <button className="dash-menu-item" onClick={() => navigate("/qluser")} >
            <i className="fa-regular fa-user" />
            Users
          </button>
          <button className="dash-menu-item" >
            <i className="fa-regular fa-calendar-check" />
            Bookings
          </button>
          <button className="dash-menu-item">
            <i className="fa-solid fa-receipt" />
            Transactions
          </button>
          <button className="dash-menu-item">
            <i className="fa-solid fa-hotel" />
            Hotels
          </button>
          <button className="dash-menu-item" onClick={() => navigate("/qltour")}>
            <i className="fa-solid fa-route" />
            Tours
          </button>
          <button className="dash-menu-item">
            <i className="fa-solid fa-car-side" />
            Cars
          </button>
          <button className="dash-menu-item">
            <i className="fa-solid fa-comment" />
            Reviews
          </button>
          <button className="dash-menu-item">
            <i className="fa-solid fa-blog" />
            Blogs
          </button>
          <button className="dash-menu-item">
            <i className="fa-solid fa-gear" />
            Settings
          </button>
        </nav>

        <div className="dash-sidebar-footer">
          {/* Nút Admin */}
          <button className="dash-user-info" onClick={toggleUserMenu}>
            <div className="dash-avatar">
              <i className="fa-regular fa-user" />
            </div>
            <div className="dash-avatar-label">
              <span>Admin</span>
              <span>online</span>
            </div>
          </button>

          {/* Menu xổ ra */}
          {isUserMenuOpen && (
            <div className="dash-user-menu">
              <button className="dash-user-menu-item"></button>
              <button className="dash-user-menu-item">Settings</button>
              <button className="dash-user-menu-item">Profile</button>
              <div className="dash-user-menu-divider" />
              <button className="dash-user-menu-item dash-user-menu-logout">
                Logout
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* MAIN */}
      <main className="dash-main">
        <header className="dash-main-header">
          <h1>Dashboard</h1>
        </header>

        <section className="dash-main-body">
          {/* THẺ THỐNG KÊ */}
          <div className="dash-stat-row">
            <div className="dash-stat-card">
              <div className="dash-stat-title">
                Users
                <div className="dash-stat-icon">
                  <i className="fa-regular fa-user" />
                </div>
              </div>
              <div className="dash-stat-value">{counts.users}</div>
            </div>

            <div className="dash-stat-card dash-stat-blue">
              <div className="dash-stat-title">
                Tours
                <div className="dash-stat-icon">
                  <i className="fa-regular fa-file-lines" />
                </div>
              </div>
              <div className="dash-stat-value">{counts.pages}</div>
            </div>

            <div className="dash-stat-card dash-stat-green">
              <div className="dash-stat-title">
                Bookings
                <div className="dash-stat-icon">
                  <i className="fa-regular fa-calendar-check" />
                </div>
              </div>
              <div className="dash-stat-value">{counts.bookings}</div>
            </div>

            <div className="dash-stat-card dash-stat-red">
              <div className="dash-stat-title">
                Cancelled Bookings
                <div className="dash-stat-icon">
                  <i className="fa-regular fa-circle-xmark" />
                </div>
              </div>
              <div className="dash-stat-value">{counts.cancelledBookings}</div>
            </div>

            <div className="dash-stat-card dash-stat-yellow">
              <div className="dash-stat-title">
                Unpaid Bookings
                <div className="dash-stat-icon">
                  <i className="fa-regular fa-credit-card" />
                </div>
              </div>
              <div className="dash-stat-value">{counts.unpaidBookings}</div>
            </div>

            <div className="dash-stat-card dash-stat-purple">
              <div className="dash-stat-title">
                Pending Transactions
                <div className="dash-stat-icon">
                  <i className="fa-regular fa-clock" />
                </div>
              </div>
              <div className="dash-stat-value">
                {counts.pendingTransactions}
              </div>
            </div>
          </div>

          {/* CÁC CHỨC NĂNG QUẢN LÍ */}
          <div className="dash-module-panel">
            <div className="dash-module-panel-header">Chức năng quản lí</div>
            <div className="dash-module-list">
              <button className="dash-module-item">
                <span>
                  <i className="fa-regular fa-star" />
                  Quản lí đánh giá
                </span>
                <i className="fa-solid fa-chevron-right" />
              </button>

              <button className="dash-module-item">
                <span>
                  <i className="fa-regular fa-calendar-check" />
                  Quản lí đặt tour
                </span>
                <i className="fa-solid fa-chevron-right" />
              </button>

              <button className="dash-module-item">
                <span>
                  <i className="fa-solid fa-money-bill-wave" />
                  Quản lí thanh toán
                </span>
                <i className="fa-solid fa-chevron-right" />
              </button>

              <button className="dash-module-item">
                <span>
                  <i className="fa-solid fa-chart-line" />
                  Báo cáo thống kê
                </span>
                <i className="fa-solid fa-chevron-right" />
              </button>

              <button className="dash-module-item" onClick={() => navigate("/qltour")} >
                <span>
                  <i className="fa-solid fa-route" />
                  Quản lí tour
                </span>
                <i className="fa-solid fa-chevron-right" />
              </button>

              <button className="dash-module-item" onClick={() => navigate("/qluser")} >
                <span>
                  <i className="fa-regular fa-user" />
                  Quản lí tài khoản
                </span>
                <i className="fa-solid fa-chevron-right" />
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
