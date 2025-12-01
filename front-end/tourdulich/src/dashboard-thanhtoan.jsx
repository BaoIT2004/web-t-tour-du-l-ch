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

const EMPTY_FORM = {
  customer: "",
  service: "",
  cost: "",
  date: "",
  state: "",
};

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

  // ===== HANDLERS LIST =====
  const handleDetail = (payment) => {
    // tạm thời show alert, sau này bạn có thể đổi sang modal
    alert(
      `Chi tiết giao dịch:\n• Khách: ${payment.customer}\n• Dịch vụ: ${payment.service}\n• Giá: ${payment.cost}\n• Ngày: ${payment.date}\n• Trạng thái: ${payment.state}`
    );
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xoá giao dịch này?")) {
      setPayments((prev) => prev.filter((p) => p.id !== id));
    }
  };

  // ===== ADD / EDIT FORM =====
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [editPaymentId, setEditPaymentId] = useState(null); // null = thêm, khác null = sửa

  const openEdit = (payment) => {
    setEditPaymentId(payment.id);
    setForm({
      customer: payment.customer || "",
      service: payment.service || "",
      cost: payment.cost || "",
      date: payment.date || "",
      state: payment.state || "",
    });
    setErrors({});
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setErrors({});
  };

  const change = (name, value) => {
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validate = () => {
    const e = {};
    if (!form.customer.trim()) e.customer = "Customer is required";
    if (!form.service.trim()) e.service = "Service is required";
    if (!form.cost.trim()) e.cost = "Cost is required";
    if (!form.date.trim()) e.date = "Date is required";
    if (!form.state.trim()) e.state = "State is required";
    return e;
  };

  const saveForm = () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    if (!editPaymentId) {
      // nếu sau này bạn muốn có nút Add payment thì dùng nhánh này
      setPayments((prev) => [
        ...prev,
        {
          id: Date.now(),
          customer: form.customer,
          service: form.service,
          cost: form.cost,
          date: form.date,
          state: form.state,
        },
      ]);
    } else {
      // update
      setPayments((prev) =>
        prev.map((p) =>
          p.id === editPaymentId
            ? {
                ...p,
                customer: form.customer,
                service: form.service,
                cost: form.cost,
                date: form.date,
                state: form.state,
              }
            : p
        )
      );
    }

    closeForm();
  };

  return (
    <div className="dash-page">
      {/* ========== SIDEBAR ========== */}
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
          <h1>Transactions</h1>
        </header>

        <section className="dash-main-body">
          {showForm ? (
            /* ===== FORM EDIT PAYMENT (giống Qltour) ===== */
            <div className="dash-panel">
              <div className="dash-form-actions">
                <button
                  className="dash-btn dash-btn-primary"
                  onClick={saveForm}
                >
                  Save
                </button>
                <button className="dash-btn" onClick={closeForm}>
                  Return
                </button>
              </div>

              <div className="dash-addform">
                <div className="dash-form-grid">
                  {/* Customer */}
                  <label className="dash-form-label">Name customer*</label>
                  <div>
                    <input
                      className="dash-input dash-input-lg dash-w100"
                      value={form.customer}
                      onChange={(e) => change("customer", e.target.value)}
                    />
                    {errors.customer && (
                      <div className="dash-form-error">{errors.customer}</div>
                    )}
                  </div>

                  {/* Service */}
                  <label className="dash-form-label">Name service*</label>
                  <div>
                    <input
                      className="dash-input dash-input-lg dash-w100"
                      value={form.service}
                      onChange={(e) => change("service", e.target.value)}
                    />
                    {errors.service && (
                      <div className="dash-form-error">{errors.service}</div>
                    )}
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
                    {errors.cost && (
                      <div className="dash-form-error">{errors.cost}</div>
                    )}
                  </div>

                  {/* Date */}
                  <label className="dash-form-label">Date*</label>
                  <div>
                    <input
                      className="dash-input dash-input-lg dash-w100"
                      value={form.date}
                      onChange={(e) => change("date", e.target.value)}
                      placeholder="1/12/2025"
                    />
                    {errors.date && (
                      <div className="dash-form-error">{errors.date}</div>
                    )}
                  </div>

                  {/* State */}
                  <label className="dash-form-label">State*</label>
                  <div>
                    <select
                      className="dash-input dash-input-lg dash-w100"
                      value={form.state}
                      onChange={(e) => change("state", e.target.value)}
                    >
                      <option value="">-- chọn trạng thái --</option>
                      <option value="Xác nhận">Xác nhận</option>
                      <option value="Chưa xác nhận">Chưa xác nhận</option>
                    </select>
                    {errors.state && (
                      <div className="dash-form-error">{errors.state}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* ===== LIST TABLE ===== */
            <div className="dash-panel">
              {/* Toolbar search */}
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

              {/* Table */}
              <div className="dash-table-wrap">
                <table className="dash-table">
                  <thead>
                    <tr>
                      <th className="dash-col-center">#</th>
                      <th>Name customer</th>
                      <th>Name service</th>
                      <th>Cost</th>
                      <th>Date</th>
                      <th className="dash-col-state">State</th>
                      <th className="dash-col-center dash-col-actions">
                        Actions
                      </th>
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
                        <td className="dash-col-state">{p.state}</td>
                        <td className="dash-col-center dash-col-actions">
                          {/* Chi tiết */}
                          <button
                            className="dash-btn dash-btn-secondary"
                            onClick={() => handleDetail(p)}
                          >
                            <i className="fa-solid fa-circle-info" /> Chi tiết
                          </button>

                          {/* Sửa -> mở form giống Qltour */}
                          <button
                            className="dash-btn dash-btn-secondary"
                            onClick={() => openEdit(p)}
                          >
                            <i className="fa-regular fa-pen-to-square" />
                          </button>

                          {/* Xoá */}
                          <button
                            className="dash-btn dash-btn-danger"
                            onClick={() => handleDelete(p.id)}
                          >
                            <i className="fa-regular fa-trash-can" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filtered.length === 0 && (
                      <tr>
                        <td
                          colSpan={7}
                          style={{ textAlign: "center", color: "#6b7280" }}
                        >
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
}
