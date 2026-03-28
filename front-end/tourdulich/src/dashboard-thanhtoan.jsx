import React, { useMemo, useState } from "react";
import "./Dashboard.css";

const INITIAL_PAYMENTS = [
  {
    id: 1,
    customer: "Khách hàng 1",
    service: "Hotel",
    cost: "500.000 vnd",
    date: "1/12/2025",
    state: "Xác nhận",
  },
  {
    id: 2,
    customer: "Khách hàng 2",
    service: "Tour",
    cost: "500.000 vnd",
    date: "1/12/2025",
    state: "Chưa xác nhận",
  },
  {
    id: 3,
    customer: "Khách hàng 3",
    service: "Tour",
    cost: "500.000 vnd",
    date: "1/12/2025",
    state: "Xác nhận",
  },
];

export default function QlPayment() {
  const [payments, setPayments] = useState(INITIAL_PAYMENTS);
  const [query, setQuery] = useState("");
  const [field, setField] = useState("all");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleUserMenu = () => setIsUserMenuOpen((prev) => !prev);

  // ===== SEARCH FILTER =====
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return payments;

    return payments.filter((p) => {
      const values = {
        customer: (p.customer || "").toLowerCase(),
        service: (p.service || "").toLowerCase(),
        cost: (p.cost || "").toLowerCase(),
        state: (p.state || "").toLowerCase(),
      };

      if (field === "all") {
        return Object.values(values).some((v) => v.includes(q));
      }

      return values[field]?.includes(q);
    });
  }, [payments, query, field]);

  // ===== HANDLE CONFIRM =====
  const handleConfirm = (id) => {
    setPayments((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, state: "Xác nhận" } : p
      )
    );
  };

  return (
    <div className="dash-page">
      {/* ========== SIDEBAR giống code dashboard cũ ========== */}
      <aside className="dash-sidebar">
        <div className="dash-sidebar-header">
          <div className="dash-sidebar-title">Dashboard</div>
        </div>

        <nav className="dash-sidebar-menu">
          <button className="dash-menu-item">
            <i className="fa-regular fa-bell" />
            Alerts
          </button>
          <button className="dash-menu-item">
            <i className="fa-regular fa-user" />
            Users
          </button>
          <button className="dash-menu-item">
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
          <button className="dash-menu-item">
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
          <button className="dash-user-info" onClick={toggleUserMenu}>
            <div className="dash-avatar">
              <i className="fa-regular fa-user" />
            </div>
            <div className="dash-avatar-label">
              <span>Admin</span>
              <span>online</span>
            </div>
          </button>

          {isUserMenuOpen && (
            <div className="dash-user-menu">
              <button className="dash-user-menu-item">Dashboard</button>
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

      {/* ========== MAIN CONTENT ========== */}
      <main className="dash-main">
        <header className="dash-main-header">
          {/* Giữ giống dashboard cũ, nếu muốn có thể đổi thành "Payments" */}
          <h1>Tours</h1>
        </header>

        <section className="dash-main-body">
          <div className="dash-panel">
            {/* ===== Toolbar ===== */}
            <div className="dash-toolbar">
              <input
                className="dash-input"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />

              <select
                className="dash-select"
                value={field}
                onChange={(e) => setField(e.target.value)}
              >
                <option value="all">All fields</option>
                <option value="customer">Name customer</option>
                <option value="service">Name service</option>
                <option value="cost">Cost</option>
                <option value="state">State</option>
              </select>

              <button className="dash-btn">
                <i className="fa fa-search" /> search
              </button>
            </div>

            {/* ===== TABLE ===== */}
            <div className="dash-table-wrap">
              <table className="dash-table">
              <thead>
                <tr>
                    <th className="dash-col-center">#</th>
                    <th>Name customer</th>
                    <th>Name service</th>
                    <th>Cost</th>
                    <th>Date</th>
                    <th className="dash-col-state">State</th>        {/* 👈 */}
                    <th className="dash-col-center dash-col-actions"></th> {/* 👈 */}
                </tr>
                </thead>

                <tbody>
                {filtered.map((p, idx) => (
                    <tr key={p.id}>
                    <td className="dash-col-center">{idx + 1}.</td>
                    <td>{p.customer}</td>
                    <td>{p.service}</td>
                    <td>{p.cost}</td>
                    <td>{p.date}</td>
                    <td className="dash-col-state">{p.state}</td>  {/* 👈 */}
                    <td className="dash-col-center dash-col-actions">
                        {p.state === "Chưa xác nhận" ? (
                        <button
                            className="dash-btn dash-btn-primary"
                            style={{ borderRadius: "999px" }}
                            onClick={() => handleConfirm(p.id)}
                        >
                            Xác nhận
                        </button>
                        ) : (
                        <div className="dash-btn-placeholder" />
                        )}
                    </td>
                    </tr>
                ))}
                </tbody>

              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
