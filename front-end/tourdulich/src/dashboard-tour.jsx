  import React, { useState, useMemo, useEffect } from "react";
  import "./Dashboard.css";
  import { useNavigate } from "react-router-dom";

  const INITIAL_TOURS = [];

  const EMPTY_FORM = {
    tourName: "",
    tourPrice: "",
    description: "",
    img: null,
    policy: "",
    included: "",
    excluded: "",
    activeid: "1",
    itinerary: [],
  };


  const Qltour = () => {
    const navigate = useNavigate();

    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const toggleUserMenu = () => setIsUserMenuOpen((prev) => !prev);

    const [tours, setTours] = useState(INITIAL_TOURS);
    const [query, setQuery] = useState("");
    const [field, setField] = useState("all");

    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState(EMPTY_FORM);
    const [errors, setErrors] = useState({});
    const [editTourId, setEditTourId] = useState(null);

    // ==== FILTER LIST =====
    const filtered = useMemo(() => {
      const q = query.trim().toLowerCase();
      if (!q) return tours;
      return tours.filter((t) => {
        const values = {
          tourName: (t.tourName || "").toLowerCase(),
          tourPrice: (t.tourPrice || "").toLowerCase(),
          description: (t.description || "").toLowerCase(),
        };
        if (field === "all") return Object.values(values).some((v) => v.includes(q));
        return values[field]?.includes(q);
      });
    }, [tours, query, field]);

    // === LOAD DATA FROM BACKEND ===
    useEffect(() => {
      fetch("http://localhost:3000/api/view-new-tour")
        .then((res) => res.json())
        .then((data) => {
          const incoming = data.tours;
          if (Array.isArray(incoming)) setTours(incoming);
          else if (incoming) setTours([incoming]);
          else setTours([]);
        })
        .catch((err) => console.log("Lỗi fetch:", err));
    }, []);

    // ==== COMMON HANDLERS =====
    const change = (name, value) =>
      setForm((f) => ({
        ...f,
        [name]: value,
      }));

    const validate = () => {
      const e = {};
      if (!form.tourName.trim()) e.tourName = "Name tour is required";
      if (!String(form.tourPrice || "").trim()) e.tourPrice = "Tour price is required";
      if (!form.description.trim()) e.description = "Description is required";
      return e;
    };

    // Xóa tour

    const handleDelete = async (id) => {

      try {
        const res = await fetch("http://localhost:3000/api/delete-tour", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });

        const data = await res.json();
        console.log(data);

        if (data.errCode === 0) {
          setTours((prev) => prev.filter((x) => x.id !== id));
          alert("Xóa thành công");
        } else {
          alert("Xóa không thành công");
        }
      } catch (e) {
        console.error("Delete Error:", e);
        alert("Lỗi server!");
      }
    };

    const openAdd = () => {
      setForm(EMPTY_FORM);
      setErrors({});
      setEditTourId(null);
      setShowForm(true);
    };

    const openEdit = (tour) => {
      setEditTourId(tour.id);
      setForm({
        tourName: tour.tourName || "",
        tourPrice: tour.tourPrice || "",
        description: tour.description || "",
        img: null,
        policy: tour.policy || "",
        included: tour.included || "",
        excluded: tour.excluded || "",
        activeid: tour.activeid || "",
        itinerary: tour.itinerary || [],
      });
      setErrors({});
      setShowForm(true);
    };

    const closeForm = () => {
      setShowForm(false);
      setErrors({});
      setEditTourId(null);
    };
    // ==== ITINERARY HANDLERS =====
    const addDay = () => {
      const newItem = {
        schedule: "",
        startDate: "",
        endDate: "",
        status: "1",
        note: "",
      };
      change("itinerary", [...(form.itinerary || []), newItem]);
    };

    const removeDay = (index) => {
      const list = [...(form.itinerary || [])];
      list.splice(index, 1);
      change("itinerary", list);
    };

    const handleItineraryChange = (index, field, value) => {
      const list = [...(form.itinerary || [])];
      list[index] = {
        ...list[index],
        [field]: value,
      };
      change("itinerary", list);
    };

    // ==== SAVE FORM (CREATE / UPDATE) =====
    const saveForm = async () => {
      const e = validate();
      setErrors(e);
      if (Object.keys(e).length) return;

      //        CREATE
      if (!editTourId) {
        try {
          const formData = new FormData();

          if (form.img) formData.append("image", form.img);

          formData.append("tourName", form.tourName);
          formData.append("tourPrice", form.tourPrice);
          formData.append("description", form.description);
          formData.append("policy", form.policy);
          formData.append("included", form.included);
          formData.append("excluded", form.excluded);
          formData.append("activeid", form.activeid);
          formData.append("itinerary", JSON.stringify(form.itinerary || []));

          const res = await fetch("http://localhost:3000/api/creat-new-tour", {
            method: "POST",
            body: formData,
          });

          const data = await res.json();
          console.log("CREATE result:", data);

          if (data.errCode === 0) {
            alert("Thêm tour thành công!");

            setTours((prev) => [...prev, data.tour]); // backend phải trả về tour mới

            closeForm();
          } else {
            alert(data.errMessage || "Thêm tour thất bại");
          }
        } catch (err) {
          console.error(err);
          alert("Lỗi kết nối server!");
        }
        return;
      }
      //UPDATE
      else {
        try {
          const body = {
            id: editTourId,
            tourName: form.tourName,
            tourPrice: form.tourPrice,
            description: form.description,
            policy: form.policy,
            included: form.included,
            excluded: form.excluded,
            activeid: form.activeid,
            itinerary: form.itinerary || [],
          };

          // Gửi JSON trước
          const res = await fetch("http://localhost:3000/api/update-tour", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });

          const data = await res.json();
          console.log("UPDATE result:", data);

          if (data.errCode !== 0) {
            alert(data.errMessage || "Cập nhật thất bại");
            return;
          }

          // Nếu có ảnh mới thì upload ảnh riêng
          if (form.img) {
            const imgForm = new FormData();
            imgForm.append("id", editTourId);
            imgForm.append("image", form.img);

            await fetch("http://localhost:3000/api/update-tour-image", {
              method: "PUT",
              body: imgForm,
            });
          }

          // UPDATE list FE
          setTours((prev) =>
            prev.map((t) =>
              t.id === editTourId
                ? {
                  ...t,
                  tourName: form.tourName,
                  tourPrice: form.tourPrice,
                  description: form.description,
                  image: form.img ? `/image/${form.img.name}` : t.image,
                  policy: form.policy,
                  included: form.included,
                  excluded: form.excluded,
                  activeid: form.activeid,
                  itinerary: form.itinerary || [],
                }
                : t
            )
          );


          alert("Cập nhật tour thành công!");
          // Cập nhật FE list
          setTours((prev) =>
            prev.map((u) =>
              u.id === editTourId
                ? {
                  ...u,
                  tourName: form.tourName,
                  tourPrice: form.tourPrice,
                  description: form.description,
                  image: form.img ? `/image/${form.img.name}` : "",
                  policy: form.policy,
                  included: form.included,
                  excluded: form.excluded,
                  activeid: form.activeid,
                  itinerary: form.itinerary || [],
                }
                : u
            )
          );

          closeForm();
        } catch (err) {
          console.error(err);
          alert("Lỗi kết nối server!");
        }
      }
    }

    // ===== UPDATE (LOCAL) =====

    return (
      <div className="dash-page">
        {/* --- SIDEBAR --- */}
        <aside className="dash-sidebar">
          <div className="dash-sidebar-header">
            <div className="dash-sidebar-title">Dashboard</div>
          </div>

          <nav className="dash-sidebar-menu">
            <button className="dash-menu-item">
              <i className="fa-solid fa-route" /> Tours
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

        {/* --- MAIN --- */}
        <main className="dash-main">
          <header className="dash-main-header">
            <h1>Tours</h1>
          </header>

          <section className="dash-main-body">
            {showForm ? (
              // ===== FORM ADD / EDIT =====
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
                    {/* Name */}
                    <label className="dash-form-label">Name Tour</label>
                    <div>
                      <input
                        className="dash-input dash-input-lg dash-w100"
                        value={form.tourName}
                        onChange={(e) => change("tourName", e.target.value)}
                      />

                      {errors.tourName && (
                        <div className="dash-form-error">{errors.tourName}</div>
                      )}
                    </div>

                    {/* Price */}
                    <label className="dash-form-label">Tour Price</label>
                    <div>
                      <input
                        className="dash-input dash-input-lg dash-w100"
                        value={form.tourPrice}
                        onChange={(e) => change("tourPrice", e.target.value)}
                      />
                      {errors.tourPrice && (
                        <div className="dash-form-error">{errors.tourPrice}</div>
                      )}
                    </div>

                    {/* Description */}
                    <label className="dash-form-label">Description</label>
                    <div>
                      <input
                        className="dash-input dash-input-lg dash-w100"
                        value={form.description}
                        onChange={(e) =>
                          change("description", e.target.value)
                        }
                      />
                      {errors.description && (
                        <div className="dash-form-error">
                          {errors.description}
                        </div>
                      )}
                    </div>

                    {/* IMG */}
                    <label className="dash-form-label">Choose Image</label>
                    <div>
                      <input
                        className="dash-input dash-input-lg dash-w100"
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={(e) =>
                          change("img", e.target.files?.[0] || null)
                        }
                      />
                    </div>

                    {/* Policy */}
                    <label className="dash-form-label">Policy</label>
                    <div>
                      <input
                        className="dash-input dash-input-lg dash-w100"
                        value={form.policy}
                        onChange={(e) => change("policy", e.target.value)}
                      />
                    </div>

                    {/* Included */}
                    <label className="dash-form-label">Included</label>
                    <div>
                      <input
                        className="dash-input dash-input-lg dash-w100"
                        value={form.included}
                        onChange={(e) => change("included", e.target.value)}
                      />
                    </div>

                    {/* Excluded */}
                    <label className="dash-form-label">Excluded</label>
                    <div>
                      <input
                        className="dash-input dash-input-lg dash-w100"
                        value={form.excluded}
                        onChange={(e) => change("excluded", e.target.value)}
                      />
                    </div>

                    {/* Active */}
                    <label className="dash-form-label">Status</label>
                    <div>
                      <select
                        className="dash-input dash-input-lg dash-w100"
                        value={form.activeid}
                        onChange={(e) => change("activeid", Number(e.target.value))}
                      >
                        <option value={1}>Active</option>
                        <option value={0}>Not Active</option>
                      </select>

                    </div>
                  </div>

                  {/* Thêm lịch trình */}
                  <h3 style={{ marginTop: 20 }}>Nhập lịch trình tour</h3>
                  <div id="form-wrapper">
                    {(form.itinerary || []).map((item, index) => (
                      <div
                        className="day-item"
                        key={index}
                        style={{
                          border: "1px solid #ddd",
                          padding: 12,
                          marginBottom: 12,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <strong>Lịch trình {index + 1}</strong>
                          <button
                            type="button"
                            className="dash-btn dash-btn-sm dash-btn-danger"
                            onClick={() => handleDelete(t.id)}
                          >
                            Xóa
                          </button>
                        </div>

                        {/* Lịch trình tour */}
                        <label
                          className="dash-form-label"
                          style={{ marginTop: 8 }}
                        >
                          Lịch trình tour
                        </label>
                        <textarea
                          className="dash-input dash-w100"
                          placeholder="Nhập mô tả lịch trình..."
                          rows={6}            // số dòng hiển thị ban đầu
                          value={item.schedule}
                          onChange={(e) =>
                            handleItineraryChange(index, "schedule", e.target.value)
                          }
                        />


                        { }
                        <div
                          style={{
                            display: "flex",
                            gap: 12,
                            marginTop: 8,
                          }}
                        >
                          <div style={{ flex: 1 }}>
                            <label className="dash-form-label">Ngày đi</label>
                            <input
                              type="date"
                              className="dash-input dash-w100"
                              value={item.startDate}
                              onChange={(e) =>
                                handleItineraryChange(
                                  index,
                                  "startDate",
                                  e.target.value
                                )
                              }
                            />
                          </div>

                          <div style={{ flex: 1 }}>
                            <label className="dash-form-label">Ngày về</label>
                            <input
                              type="date"
                              className="dash-input dash-w100"
                              value={item.endDate}
                              onChange={(e) =>
                                handleItineraryChange(
                                  index,
                                  "endDate",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>
                        {/* Ghi chú */}
                        <label
                          className="dash-form-label"
                          style={{ marginTop: 8 }}
                        >
                          Ghi chú
                        </label>
                        <textarea
                          className="dash-input dash-w100"
                          rows={2}
                          placeholder="Ghi chú thêm..."
                          value={item.note}
                          onChange={(e) =>
                            handleItineraryChange(
                              index,
                              "note",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="dash-btn dash-btn-sm"
                    onClick={addDay}
                  >
                    + Thêm lịch trình
                  </button>
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
                    <option value="tourName">Name</option>
                    <option value="tourPrice">Price</option>
                    <option value="description">Description</option>
                  </select>


                  <button
                    className="dash-btn dash-btn-primary"
                    onClick={openAdd}
                  >
                    + Add
                  </button>
                </div>

                <div className="dash-table-card">
                  <table className="dash-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Img</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      {filtered.map((t, idx) => (
                        <tr key={t.id}>
                          <td>{idx + 1}.</td>

                          <td>
                            {t.image ? (
                              <img
                                src={`http://localhost:3000${t.image}`}
                                alt={t.tourName || t.name}
                                style={{
                                  width: 40,
                                  height: 40,
                                  borderRadius: 4,
                                  objectFit: "cover",
                                }}
                              />
                            ) : (
                              <div
                                style={{
                                  width: 40,
                                  height: 40,
                                  border: "1px solid #ccc",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <i className="fa-regular fa-image" />
                              </div>
                            )}
                          </td>

                          <td>{t.tourName}</td>
                          <td>{t.tourPrice}</td>
                          <td>{t.description}</td>
                          <td>
                            {t.activeid === 1 ? (
                              <span
                                style={{
                                  padding: "4px 8px",
                                  background: "#d1fae5",
                                  color: "#065f46",
                                  borderRadius: "4px",
                                  fontSize: "12px",
                                  fontWeight: "600",
                                }}
                              >
                                Active
                              </span>
                            ) : (
                              <span
                                style={{
                                  padding: "4px 8px",
                                  background: "#fee2e2",
                                  color: "#991b1b",
                                  borderRadius: "4px",
                                  fontSize: "12px",
                                  fontWeight: "600",
                                }}
                              >
                                Not Active
                              </span>
                            )}
                          </td>


                          <td style={{ textAlign: "right" }}>
                            <button
                              className="dash-btn dash-btn-icon"
                              onClick={() => openEdit(t)}
                            >
                              <i className="fa-regular fa-pen-to-square" />
                            </button>

                            <button
                              className="dash-btn dash-btn-icon dash-btn-danger"
                              onClick={() => handleDelete(t.id)}
                            >
                              <i className="fa-regular fa-trash-can" />
                            </button>
                          </td>
                        </tr>
                      ))}

                      {filtered.length === 0 && (
                        <tr>
                          <td colSpan={7} style={{ textAlign: "center", padding: 20 }}>
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
