import React, { useMemo, useState, useEffect } from "react";
import "./Dashboard.css";

// ---- form rỗng cho Add (NEW) ----
const EMPTY_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  address: "",
  phone: "",
  gender: "",
  role: "",
  currency: "",
};

const Qluser = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const toggleUserMenu = () => setIsUserMenuOpen((prev) => !prev);

  // ===== Users list =====
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [field, setField] = useState("all");

  // ====== Add/Edit form ======
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [editUserId, setEditUserId] = useState(null); // null = thêm, khác null = sửa

  // LẤY DỮ LIỆU TỪ NODE QUA CORS
  useEffect(() => {
    fetch("http://localhost:3000/api/getUser")
      .then((res) => res.json())
      .then((data) => {
        console.log("DỮ LIỆU TỪ BACKEND:", data);

        const incoming = data.users;

        if (Array.isArray(incoming)) {
          setUsers(incoming); // đã là mảng
        } else if (incoming) {
          setUsers([incoming]); // là object → cho vào 1 mảng
        } else {
          setUsers([]); // không có gì
        }
      })
      .catch((err) => console.log("Lỗi fetch:", err));
  }, []);

  // ===== FILTER / SEARCH =====
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;

    return users.filter((u) => {
      const roleText =
        u.roleid == 1 ? "admin" :
        u.roleid == 2 ? "customer" : "";

      const values = {
        firstName: (u.firstName || "").toLowerCase(),
        lastName: (u.lastName || "").toLowerCase(),
        email: (u.email || "").toLowerCase(),
        address: (u.address || "").toLowerCase(),
        phone: (u.phonenumber || "").toLowerCase(),
        role: roleText,
      };

      if (field === "all") {
        return Object.values(values).some((v) => v.includes(q));
      }
      return values[field]?.includes(q);
    });
  }, [users, query, field]);

  // Xóa (mới xóa trên FE)
  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa người dùng này?")) {
      setUsers((prev) => prev.filter((x) => x.id !== id));
    }
  };

  const openAdd = () => {
    setForm(EMPTY_FORM);
    setErrors({});
    setEditUserId(null); // chế độ Thêm mới
    setShowAdd(true);
  };

  const openEdit = (user) => {
    setEditUserId(user.id); // chế độ Sửa
    setForm({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      password: "", // không sửa password ở đây
      address: user.address || "",
      phone: user.phonenumber || "",
      gender: user.gender || "",
      role: user.roleid || "",
      currency: "",
    });
    setErrors({});
    setShowAdd(true);
  };

  const closeAdd = () => {
    setShowAdd(false);
    setErrors({});
  };

  const change = (name, value) =>
    setForm((f) => ({
      ...f,
      [name]: value,
    }));

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "First name is required";
    if (!form.lastName.trim()) e.lastName = "Last name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";

    // ✅ Password chỉ bắt buộc khi THÊM MỚI
    if (!form.password?.trim() && !editUserId) {
      e.password = "Password is required";
    }

    if (!form.role) e.role = "User type is required";
    return e;
  };


  // thêm
  // thêm / sửa
const saveAdd = async () => {
  const errs = validate();       // chạy validate
  setErrors(errs);               // đẩy lỗi ra form

  if (Object.keys(errs).length > 0) return;  // có lỗi thì dừng

  if (!editUserId) {
    // === THÊM MỚI ===
    try {
      const res = await fetch("http://localhost:3000/api/creat-new-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          password: form.password,
          address: form.address,
          phoneNumber: form.phone,
          gender: form.gender,
        }),
      });

      const data = await res.json();
      console.log("Response từ server:", data);

      if (data.errCode === 1) {
        alert("Email đã tồn tại");
        return;
      }

      if (data.errCode === 0) {
        alert("Thêm thành công");

        // cập nhật list trên FE
        setUsers((prev) => [
          ...prev,
          data.user || {
            id: Date.now(),
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            address: form.address,
            phonenumber: form.phone,
            gender: form.gender,
            roleid: form.role,
            password: form.password,
          },
        ]);

        closeAdd();
      }
    } catch (err) {
      console.error("Lỗi khi gọi API:", err);
      alert("Thêm thất bại");
    }
  } else {
    // === CẬP NHẬT (SỬA) ===
    setUsers((prev) =>
      prev.map((u) =>
        u.id === editUserId
          ? {
              ...u,
              firstName: form.firstName,
              lastName: form.lastName,
              email: form.email,
              address: form.address,
              phonenumber: form.phone,
              gender: form.gender,
              roleid: form.role,
              password: u.password, // giữ nguyên
            }
          : u
      )
    );
    closeAdd();
  }
};


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
            <i className="fa-solid fa-hotel"></i>
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
            <i className="fa-solid fa-comment"></i>
            Reviews
          </button>
          <button className="dash-menu-item">
            <i className="fa-solid fa-blog"></i>
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
          <h1>Users</h1>
        </header>

        <section className="dash-main-body">
          {showAdd ? (
            // ==== FORM ADD/EDIT ====
            <div className="dash-panel">
              <div className="dash-form-actions">
                <button className="dash-btn dash-btn-primary" onClick={saveAdd}>
                  Save
                </button>
                <button className="dash-btn" onClick={closeAdd}>
                  Return
                </button>
              </div>

              <div className="dash-addform">
                <div className="dash-form-grid">
                  {/* First Name* */}
                  <label className="dash-form-label">First Name*</label>
                  <div>
                    <input
                      className="dash-input dash-input-lg dash-w100"
                      value={form.firstName}
                      onChange={(e) => change("firstName", e.target.value)}
                    />
                    {errors.firstName && (
                      <div className="dash-form-error">{errors.firstName}</div>
                    )}
                  </div>

                  {/* Last Name* */}
                  <label className="dash-form-label">Last Name*</label>
                  <div>
                    <input
                      className="dash-input dash-input-lg dash-w100"
                      value={form.lastName}
                      onChange={(e) => change("lastName", e.target.value)}
                    />
                    {errors.lastName && (
                      <div className="dash-form-error">{errors.lastName}</div>
                    )}
                  </div>

                  {/* Email* */}
                  <label className="dash-form-label">Email*</label>
                  <div>
                    <input
                      type="email"
                      className="dash-input dash-input-lg dash-w100"
                      value={form.email}
                      onChange={(e) => change("email", e.target.value)}
                    />
                    {errors.email && (
                      <div className="dash-form-error">{errors.email}</div>
                    )}
                  </div>

                  {/* Password* chỉ khi thêm */}
                  {!editUserId && (
                    <>
                      <label className="dash-form-label">Password*</label>
                      <div>
                        <input
                          type="password"
                          className="dash-input dash-input-lg dash-w100"
                          value={form.password}
                          onChange={(e) => change("password", e.target.value)}
                        />
                        {errors.password && (
                          <div className="dash-form-error">
                            {errors.password}
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  {/* Address */}
                  <label className="dash-form-label">Address</label>
                  <div>
                    <input
                      className="dash-input dash-input-lg dash-w100"
                      value={form.address}
                      onChange={(e) => change("address", e.target.value)}
                    />
                    {errors.address && (
                      <div className="dash-form-error">{errors.address}</div>
                    )}
                  </div>

                  {/* Phone */}
                  <label className="dash-form-label">Phone</label>
                  <div>
                    <input
                      className="dash-input dash-input-lg dash-w100"
                      value={form.phone}
                      onChange={(e) => change("phone", e.target.value)}
                    />
                  </div>

                  {/* Gender */}
                  <label className="dash-form-label">Gender</label>
                  <div>
                    <select
                      className="dash-select dash-select-lg dash-w100"
                      value={form.gender}
                      onChange={(e) => change("gender", e.target.value)}
                    >
                      <option value="">- None -</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* User Type* */}
                  <label className="dash-form-label">User Type*</label>
                  <div>
                    <select
                      className="dash-select dash-select-lg dash-w100"
                      value={form.role}
                      onChange={(e) => change("role", Number(e.target.value))}
                    >
                      <option value="">- None -</option>
                      <option value={1}>Admin</option>
                      <option value={2}>Customer</option>
                    </select>
                    {errors.role && (
                      <div className="dash-form-error">{errors.role}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // ==== TABLE LIST ====
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
                  <option value="firstName">First name</option>
                  <option value="lastName">Last name</option>
                  <option value="email">Email</option>
                  <option value="address">Address</option>
                  <option value="phone">Phone</option>
                  <option value="role">User type</option>
                </select>
                <button className="dash-btn">
                  <i className="fa fa-search" /> search
                </button>
                <button className="dash-btn dash-btn-primary" onClick={openAdd}>
                  + Add
                </button>
              </div>

              <div className="dash-table-card">
                <table className="dash-table">
                  <thead>
                    <tr>
                      <th style={{ width: 56 }}>#</th>
                      <th>First name</th>
                      <th>Last name</th>
                      <th>Email</th>
                      <th>Address</th>
                      <th>Phone</th>
                      <th>User type</th>
                      <th style={{ width: 100, textAlign: "right" }}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((u, idx) => (
                      <tr key={u.id}>
                        <td>{idx + 1}.</td>
                        <td>{u.firstName}</td>
                        <td>{u.lastName}</td>
                        <td>
                          <a className="dash-link" href={`mailto:${u.email}`}>
                            {u.email}
                          </a>
                        </td>
                        <td>{u.address}</td>
                        <td>{u.phonenumber}</td>
                        <td>
                          {u.roleid == 1
                            ? "Admin"
                            : u.roleid == 2
                            ? "Customer"
                            : "Unknown"}
                        </td>
                        <td style={{ textAlign: "right" }}>
                          <button
                            className="dash-btn dash-btn-icon"
                            title="Edit"
                            onClick={() => openEdit(u)}
                          >
                            <i className="fa-regular fa-pen-to-square" />
                          </button>
                          <button
                            className="dash-btn dash-btn-icon dash-btn-danger"
                            title="Delete"
                            onClick={() => handleDelete(u.id)}
                          >
                            <i className="fa-regular fa-trash-can" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filtered.length === 0 && (
                      <tr>
                        <td
                          colSpan={8}
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
};

export default Qluser;
