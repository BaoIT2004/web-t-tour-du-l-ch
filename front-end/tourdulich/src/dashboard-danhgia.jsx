import React, { useMemo, useState } from "react";
import "./Dashboard.css";

const INITIAL_REVIEWS = [
  {
    id: 1,
    name: "Khách hàng 1",
    evaluation: "Dịch vụ rất tốt",
    date: "1/12/2025",
    from: "Tour",
  },
  {
    id: 2,
    name: "Khách hàng 2",
    evaluation: "Dịch vụ rất tốt",
    date: "1/12/2025",
    from: "Hotel",
  },
  {
    id: 3,
    name: "Khách hàng 3",
    evaluation: "Dịch vụ rất tốt",
    date: "1/12/2025",
    from: "Tour",
  },
];

const QlReview = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const toggleUserMenu = () => setIsUserMenuOpen((prev) => !prev);

  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [query, setQuery] = useState("");
  const [field, setField] = useState("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return reviews;

    return reviews.filter((r) => {
      const values = {
        name: (r.name || "").toLowerCase(),
        evaluation: (r.evaluation || "").toLowerCase(),
        from: (r.from || "").toLowerCase(),
      };
      if (field === "all") {
        return (
          values.name.includes(q) ||
          values.evaluation.includes(q) ||
          values.from.includes(q)
        );
      }
      return values[field]?.includes(q);
    });
  }, [reviews, query, field]);

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa đánh giá này?")) {
      setReviews((prev) => prev.filter((x) => x.id !== id));
    }
  };

  const handleReply = (name) => {
    alert(`(Demo) Phản hồi cho: ${name}`);
  };

  return (
    <div className="dash-page">

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
          {/* Reviews đang active */}
          <button className="dash-menu-item ">
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

      {/* ==== MAIN ==== */}
      <main className="dash-main">
        <header className="dash-main-header">
          <h1>Reviews</h1>
        </header>

        <section className="dash-main-body">
          <div className="dash-panel">
            {/* thanh search giống Qltour */}
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
                <option value="name">Name</option>
                <option value="evaluation">Evaluation</option>
                <option value="from">From</option>
              </select>
              <button className="dash-btn">
                <i className="fa fa-search" /> search
              </button>
            </div>

            {/* bảng đánh giá */}
            <div className="dash-table-card">
              <table className="dash-table">
                <thead>
                  <tr>
                    <th style={{ width: 56 }}>#</th>
                    <th>Name customer</th>
                    <th>Evaluation</th>
                    <th>Date</th>
                    <th>From</th>
                    <th style={{ width: 80 }} />
                    <th style={{ width: 80 }} />
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r, idx) => (
                    <tr key={r.id}>
                      <td>{idx + 1}.</td>
                      <td>{r.name}</td>
                      <td>{r.evaluation}</td>
                      <td>{r.date}</td>
                      <td>{r.from}</td>
                      <td>
                        <button
                          className="dash-btn dash-btn-icon dash-btn-danger"
                          onClick={() => handleDelete(r.id)}
                        >
                          xóa
                        </button>
                      </td>
                      <td>
                        <button
                          className="dash-btn dash-btn-icon"
                          onClick={() => handleReply(r.name)}
                        >
                          phản hồi
                        </button>
                      </td>
                    </tr>
                  ))}

                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={7} style={{ textAlign: "center", color: "#6b7280" }}>
                        No data
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default QlReview;
