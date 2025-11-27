import React, { useMemo, useState } from "react";
import "./Dashboard.css";

const INITIAL_TOURS = [
  {
    id: 1,
    name: "Bangkok city tour",
    cost: "500.000 vnd",
    location: "Lao",
    img: "",
  },
  {
    id: 2,
    name: "Bangkok city tour",
    cost: "500.000 vnd",
    location: "Lao",
    img: "",
  },
  {
    id: 3,
    name: "Bangkok city tour",
    cost: "500.000 vnd",
    location: "Lao",
    img: "",
  },
];

const EMPTY_FORM = {
  name: "",
  cost: "",
  location: "",
  img: "",
};

const Qltour = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const toggleUserMenu = () => setIsUserMenuOpen((prev) => !prev);

  const [tours, setTours] = useState(INITIAL_TOURS);
  const [query, setQuery] = useState("");
  const [field, setField] = useState("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return tours;
    return tours.filter((t) => {
      const values = {
        name: (t.name || "").toLowerCase(),
        cost: (t.cost || "").toLowerCase(),
        location: (t.location || "").toLowerCase(),
      };
      if (field === "all") return Object.values(values).some((v) => v.includes(q));
      return values[field]?.includes(q);
    });
  }, [tours, query, field]);

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa tour này?")) {
      setTours((prev) => prev.filter((x) => x.id !== id));
    }
  };

  // Add / Edit
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [editTourId, setEditTourId] = useState(null); // null = thêm, khác null = sửa

  const openAdd = () => {
    setForm(EMPTY_FORM);
    setErrors({});
    setEditTourId(null);
    setShowForm(true);
  };

  const openEdit = (tour) => {
    setEditTourId(tour.id);
    setForm({
      name: tour.name || "",
      cost: tour.cost || "",
      location: tour.location || "",
      img: tour.img || "",
    });
    setErrors({});
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setErrors({});
  };

  const change = (name, value) => setForm((f) => ({ ...f, [name]: value }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name tour is required";
    if (!form.cost.trim()) e.cost = "Cost is required";
    if (!form.location.trim()) e.location = "Location is required";
    return e;
  };

  const saveForm = () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    if (!editTourId) {
      // add
      setTours((prev) => [
        ...prev,
        {
          id: Date.now(),
          name: form.name,
          cost: form.cost,
          location: form.location,
          img: form.img,
        },
      ]);
    } else {
      // update
      setTours((prev) =>
        prev.map((t) =>
          t.id === editTourId
            ? {
                ...t,
                name: form.name,
                cost: form.cost,
                location: form.location,
                img: form.img,
              }
            : t
        )
      );
    }

    closeForm();
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
          <i class="fa-solid fa-hotel"></i>
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
          <i class="fa-solid fa-comment"></i>
            Reviews
          </button>
          <button className="dash-menu-item">
          <i class="fa-solid fa-blog"></i>
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

      {/* MAIN */}
      <main className="dash-main">
        <header className="dash-main-header">
          <h1>Tours</h1>
        </header>

        <section className="dash-main-body">
          {showForm ? (
            // ===== FORM ADD / EDIT =====
            <div className="dash-panel">
              <div className="dash-form-actions">
                <button className="dash-btn dash-btn-primary" onClick={saveForm}>Save</button>
                <button className="dash-btn" onClick={closeForm}>Return</button>
              </div>

              <div className="dash-addform">
                <div className="dash-form-grid">
                  {/* Name Tour */}
                  <label className="dash-form-label">Name Tour*</label>
                  <div>
                    <input
                      className="dash-input dash-input-lg dash-w100"
                      value={form.name}
                      onChange={(e) => change("name", e.target.value)}
                    />
                    {errors.name && <div className="dash-form-error">{errors.name}</div>}
                  </div>

                  {/* Cost */}
                  <label className="dash-form-label">Cost*</label>
                  <div>
                    <input
                      className="dash-input dash-input-lg dash-w100"
                      value={form.cost}
                      onChange={(e) => change("cost", e.target.value)}
                      placeholder="500.000 vnd"
                    />
                    {errors.cost && <div className="dash-form-error">{errors.cost}</div>}
                  </div>

                  {/* Location */}
                  <label className="dash-form-label">Location*</label>
                  <div>
                    <input
                      className="dash-input dash-input-lg dash-w100"
                      value={form.location}
                      onChange={(e) => change("location", e.target.value)}
                      placeholder="Lao"
                    />
                    {errors.location && <div className="dash-form-error">{errors.location}</div>}
                  </div>

                  {/* Img URL */}
                  <label className="dash-form-label">Image URL</label>
                  <div>
                    <input
                      className="dash-input dash-input-lg dash-w100"
                      value={form.img}
                      onChange={(e) => change("img", e.target.value)}
                      placeholder="https://..."
                    />
                    <div className="dash-form-hint">Để trống nếu chưa có ảnh, sẽ hiện icon placeholder.</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // ===== LIST VIEW =====
            <div className="dash-panel">
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
                  <option value="name">Name tour</option>
                  <option value="cost">Cost</option>
                  <option value="location">Location</option>
                </select>
                <button className="dash-btn"><i className="fa fa-search" /> search</button>
                <button className="dash-btn dash-btn-primary" onClick={openAdd}>+ Add</button>
              </div>

              <div className="dash-table-card">
                <table className="dash-table">
                  <thead>
                    <tr>
                      <th style={{ width: 56 }}>#</th>
                      <th>Img</th>
                      <th>Name Tour</th>
                      <th>Cost</th>
                      <th>Location</th>
                      <th style={{ width: 100, textAlign: "right" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((t, idx) => (
                      <tr key={t.id}>
                        <td>{idx + 1}.</td>
                        <td>
                          {t.img ? (
                            <img
                              src={t.img}
                              alt={t.name}
                              style={{
                                width: 40,
                                height: 40,
                                objectFit: "cover",
                                borderRadius: 4,
                                border: "1px solid #e5e7eb",
                              }}
                            />
                          ) : (
                            <div
                              style={{
                                width: 40,
                                height: 40,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 4,
                                border: "1px solid #e5e7eb",
                              }}
                            >
                              <i className="fa-regular fa-image" />
                            </div>
                          )}
                        </td>
                        <td>{t.name}</td>
                        <td>{t.cost}</td>
                        <td>{t.location}</td>
                        <td style={{ textAlign: "right" }}>
                          <button
                            className="dash-btn dash-btn-icon"
                            title="Edit"
                            onClick={() => openEdit(t)}
                          >
                            <i className="fa-regular fa-pen-to-square" />
                          </button>
                          <button
                            className="dash-btn dash-btn-icon dash-btn-danger"
                            title="Delete"
                            onClick={() => handleDelete(t.id)}
                          >
                            <i className="fa-regular fa-trash-can" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filtered.length === 0 && (
                      <tr>
                        <td colSpan={6} style={{ textAlign: "center", color: "#6b7280" }}>
                          No data
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Qltour;
