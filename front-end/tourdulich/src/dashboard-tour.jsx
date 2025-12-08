import React, { useState, useMemo, useEffect ,useRef } from "react";
import { useSearchParams,useNavigate } from "react-router-dom";
import "./Dashboard.css";

// ==========================
// CONSTANTS
// ==========================
const INITIAL_TOURS = [];

const EMPTY_FORM = {
  tourName: "",
  tourPrice: "",
  description: "",
  img: null,
  policy: "",
  included: "",
  excluded: "",
  activeid: 1,
  itinerary: [],
};

// ==========================
// COMPONENT
// ==========================
const Qltour = () => {
  // STATE

  const navigate = useNavigate(); 
  const [tours, setTours] = useState(INITIAL_TOURS);
  const [selectedTour, setSelectedTour] = useState(null); // lưu tour đang chọn
  const [query, setQuery] = useState("");
  const [field, setField] = useState("all");

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [itineraryErrors, setItineraryErrors] = useState([]);
  const [editTourId, setEditTourId] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const toggleUserMenu = () => setIsUserMenuOpen((prev) => !prev);

  const [params] = useSearchParams();
  const id = params.get("id");
  useEffect(() => {
    if (id) {
      handleViewTourDetail(id); // load tour chi tiết khi URL có ?id=
    }
  }, [id]);

  const wrapperRef = useRef(null);
  useEffect(() => {
    if (wrapperRef.current) {
      wrapperRef.current.scrollTop = wrapperRef.current.scrollHeight;
    }
  }, [form.itinerary]);
  // EFFECT: LOAD TOURS
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/view-new-tour");
        const data = await res.json();
        setTours(data.tours || []);
      } catch (err) {
        console.error("Lỗi load tours:", err);
      }
    };
    fetchTours();
  }, []);

const handleViewTourDetail = async (id) => {
  console.log("ID tour:", id); // đây là ID tour bạn click
  try {
    const res = await fetch(`http://localhost:3000/api/view-tour?id=${id}`);
    const data = await res.json();
     console.log("API Response:", data);

    if (data.errCode === 0) {
      // Hiển thị chi tiết   tour
      console.log("Tour detail:", data.tour);
      openEdit(data.tour);
    } else {
      alert(data.errMessage || "Không tìm thấy tour");
    }
  } catch (err) {
    console.error(err);
    alert("Lỗi server!");
  }
};


  // FILTERED TOURS
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return tours;

    return tours.filter((t) => {
      const values = {
        tourName: (t.tourName || "").toString().toLowerCase(),
        tourPrice: (t.tourPrice || "").toString().toLowerCase(),
        description: (t.description || "").toString().toLowerCase(),
      };
      return field === "all"
        ? Object.values(values).some((v) => v.includes(q))
        : values[field]?.includes(q);
    });
  }, [tours, query, field]);

  // HELPERS
  const change = (key, value) => setForm((p) => ({ ...p, [key]: value }));

  const validate = () => {
  const formErrors = {};
  const itineraryErrors = [];

  // Validate form chính
  if (!form.tourName?.trim()) formErrors.tourName = "Tên tour là bắt buộc";
  if (!String(form.tourPrice || "").trim()) formErrors.tourPrice = "Giá tour là bắt buộc";
  if (!form.description?.trim()) formErrors.description = "Mô tả tour là bắt buộc";
  const today = new Date();
  today.setHours(0, 0, 0, 0); // để so sánh chuẩn

  // Validate lịch trình
  form.itinerary.forEach((item, index) => {
    const err = {};


    const start = item.startDate ? new Date(item.startDate) : null;
    const end = item.endDate ? new Date(item.endDate) : null;
    
    if (!start) err.startDate = "Vui lòng chọn ngày đi";
    if (!end) err.endDate = "Vui lòng chọn ngày về";

    if (item.startDate && item.endDate && item.startDate > item.endDate) { // Ngày về < ngày đi
      err.endDate = "Ngày về phải lớn hơn hoặc bằng ngày đi";
    } else if (start && start <= today) {
      err.startDate = "Ngày đi không được nhỏ hơn ngày hiện tại"; // Ngày đi < hôm nay
    } else if (end && end <= today) {
      err.endDate = "Ngày về không được nhỏ hơn ngày hiện tại";    // Ngày về < hôm nay
    }

    itineraryErrors[index] = err;
  });

  // Lưu lỗi vào state
  setErrors(formErrors);
  setItineraryErrors(itineraryErrors);

  // Nếu có lỗi → return false
  const hasFormError = Object.keys(formErrors).length > 0;
  const hasItineraryError = itineraryErrors.some((x) => Object.keys(x).length > 0);

  return !(hasFormError || hasItineraryError); // true = hợp lệ
};

  // FORM HANDLERS
  const openAdd = () => {
    setForm({ ...EMPTY_FORM });
    setErrors({});
    setEditTourId(null);
    setPreviewImage(null);
    setShowForm(true);
  };

  const openEdit = (tour) => {
    console.log("Open edit tour:", tour);
    setEditTourId(tour.id ?? null);

    const formattedItinerary = (tour.schedules || []).map((it) => ({
      schedule: it.itinerary ?? "",
      note: it.notes ?? "",
      startDate: it.startDate ? it.startDate.substring(0, 10) : "",
      endDate: it.endDate ? it.endDate.substring(0, 10) : "",
      status: it.status ?? "1",
    }));


    setForm({
      tourName: tour.tourName ?? "",
      tourPrice: tour.tourPrice ?? "",
      description: tour.description ?? "",
      img: null,
      policy: tour.policy ?? "",
      included: tour.included ?? "",
      excluded: tour.excluded ?? "",
      activeid: tour.activeid !== undefined ? Number(tour.activeid) : 1,
      itinerary: formattedItinerary,
    });

    setErrors({});
    setPreviewImage(null);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setErrors({});
    setEditTourId(null);
    setForm({ ...EMPTY_FORM });
    setPreviewImage(null);
  };

  // ITINERARY HANDLERS
  const addDay = () =>
    change("itinerary", [
      ...(form.itinerary || []),
      { schedule: "", startDate: "", endDate: "", status: "1", note: "" },
    ]);

  const removeDay = (index) => {
    const list = [...(form.itinerary || [])];
    list.splice(index, 1);
    change("itinerary", list);
  };

    const handleItineraryChange = (index, key, value) => {
    const newItinerary = form.itinerary.map((item, i) =>
      i === index ? { ...item, [key]: value } : item
    );
    setForm((prev) => ({ ...prev, itinerary: newItinerary }));
  };

  const handleImgChange = (e) => {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      change("img", file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // CRUD OPERATIONS
  const handleDelete = async (tourId) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa tour này không?")) return;
    try {
      const res = await fetch(`http://localhost:3000/api/delete-tour?id=${tourId}`, { method: "DELETE" });
      const data = await res.json();
      if (data.errCode === 0) {
        setTours((prev) => prev.filter((x) => x.id !== tourId));
        alert("Xóa tour thành công");
      } else {
        alert(data.errMessage || "Xóa tour thất bại");
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi server!");
    }
  };

  const saveForm = async () => {
    const isValid = validate();

    if (!isValid) {
      alert("Vui lòng kiểm tra thông tin trước khi lưu!");
      return;
    } else {
      const e = validate();
      setErrors(e);
      if (Object.keys(e).length) return;

      if (editTourId) {
        const updated = await updateTour();
        if (updated && form.img) await handleUpdateImage();
      } else {
        const newTour = await createTour();
        if (newTour?.id && form.img) {
          setEditTourId(newTour.id);
          await handleUpdateImage();
        }
      }
    }

  };

  const createTour = async () => {
    try {
      const formData = new FormData();
      Object.entries({
        tourName: form.tourName,
        tourPrice: form.tourPrice,
        description: form.description,
        policy: form.policy,
        included: form.included,
        excluded: form.excluded,
        activeid: form.activeid,
        itinerary: JSON.stringify(form.itinerary || []),
      }).forEach(([k, v]) => formData.append(k, v));

      if (form.img) formData.append("image", form.img);

      const res = await fetch("http://localhost:3000/api/creat-new-tour", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok || data.errCode !== 0) {
        alert(data.errMessage || "Tạo tour thất bại!");
        return null;
      }

      setTours((prev) => [...prev, data.tour || { id: Date.now(), ...form, image: form.img ? URL.createObjectURL(form.img) : null }]);
      alert("Tạo tour mới thành công!");
      closeForm();
      return data.tour;
    } catch (err) {
      console.error("createTour error:", err);
      alert("Lỗi kết nối server!");
      return null;
    }
  };

  const updateTour = async () => {
    try {
      const payload = {
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

      const res = await fetch("http://localhost:3000/api/update-tour", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok || data.errCode !== 0) {
        alert(data.errMessage || "Cập nhật tour thất bại!");
        return false;
      }

      setTours((prev) =>
        prev.map((t) =>
          t.id === editTourId
            ? { ...t, ...(data.tour || {}), image: form.img ? URL.createObjectURL(form.img) : t.image }
            : t
        )
      );

      alert("Cập nhật tour thành công!");
      closeForm();
      return true;
    } catch (err) {
      console.error("updateTour error:", err);
      alert("Lỗi kết nối server!");
      return false;
    }
  };

  const handleUpdateImage = async () => {
    if (!form.img || !editTourId) return false;
    try {
      const formData = new FormData();
      formData.append("id", editTourId);
      formData.append("image", form.img);

      const res = await fetch("http://localhost:3000/api/update-tour-image", { method: "PUT", body: formData });
      const data = await res.json();

      if (data.errCode === 0) {
        setPreviewImage(null);
        setTours((prev) =>
          prev.map((t) => (t.id === editTourId ? { ...t, image: URL.createObjectURL(form.img) } : t))
        );
        return true;
      }
      return false;
    } catch (err) {
      console.error("Update image error:", err);
      return false;
    }
  };

  // ===================== RENDER =====================
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
          <button className="dash-user-info" onClick={toggleUserMenu}>
            <div className="dash-avatar"><i className="fa-regular fa-user" /></div>
            <div className="dash-avatar-label"><span>Admin</span><span>online</span></div>
          </button>
          {isUserMenuOpen && (
            <div className="dash-user-menu">
              <button className="dash-user-menu-item">Dashboard</button>
              <button className="dash-user-menu-item">Settings</button>
              <button className="dash-user-menu-item">Profile</button>
              <div className="dash-user-menu-divider" />
              <button className="dash-user-menu-item dash-user-menu-logout">Logout</button>
            </div>
          )}
        </div>
      </aside>

      <main className="dash-main">
        <header className="dash-main-header"><h1>Tours</h1></header>
        {/** chi tiết */}
        <section className="dash-main-body">
          {showForm ? (
            <div className="dash-panel">
              <div className="dash-form-actions">
                <button className="dash-btn dash-btn-primary" onClick={saveForm}>Save</button>
                <button className="dash-btn" onClick={closeForm}>Return</button>
              </div>

              <div className="dash-addform">
                {/* FORM GRID */}
                <div className="dash-form-grid">
                  <label className="dash-form-label">Name Tour</label>
                  <div>
                    <input className="dash-input dash-input-lg dash-w100" value={form.tourName} onChange={(e) => change("tourName", e.target.value)} />
                    {errors.tourName && <div className="dash-form-error">{errors.tourName}</div>}
                  </div>

                  <label className="dash-form-label">Tour Price</label>
                  <div>
                    <input className="dash-input dash-input-lg dash-w100" value={form.tourPrice} onChange={(e) => change("tourPrice", e.target.value)} />
                    {errors.tourPrice && <div className="dash-form-error">{errors.tourPrice}</div>}
                  </div>

                  <label className="dash-form-label">Description</label>
                  <div>
                    <input className="dash-input dash-input-lg dash-w100" value={form.description} onChange={(e) => change("description", e.target.value)} />
                    {errors.description && <div className="dash-form-error">{errors.description}</div>}
                  </div>

                  <label className="dash-form-label">Choose Image</label>
                  <div>
                    <input type="file" accept="image/*" className="dash-input dash-input-lg dash-w100" onChange={handleImgChange} />
                    {previewImage && <div style={{ marginTop: 8 }}><img src={previewImage} alt="preview" style={{ width: 140, borderRadius: 6 }} /></div>}
                  </div>

                  <label className="dash-form-label">Policy</label>
                  <input className="dash-input dash-input-lg dash-w100" value={form.policy} onChange={(e) => change("policy", e.target.value)} />

                  <label className="dash-form-label">Included</label>
                  <input className="dash-input dash-input-lg dash-w100" value={form.included} onChange={(e) => change("included", e.target.value)} />

                  <label className="dash-form-label">Excluded</label>
                  <input className="dash-input dash-input-lg dash-w100" value={form.excluded} onChange={(e) => change("excluded", e.target.value)} />

                  <label className="dash-form-label">Status</label>
                  <select className="dash-input dash-input-lg dash-w100" value={form.activeid} onChange={(e) => change("activeid", Number(e.target.value))}>
                    <option value={1}>Active</option>
                    <option value={0}>Not Active</option>
                  </select>
                </div>

                {/* ITINERARY */}
                <h3 style={{ marginTop: 20 }}>Nhập lịch trình tour</h3>
                <div id="form-wrapper">
                  {(form.itinerary?.length
                    ? form.itinerary
                    : [{ schedule: "", startDate: "", endDate: "", note: "", status: "1" }]
                  ).map((item, index) => (
                    <div
                      className="day-item"
                      key={index}
                      style={{ border: "1px solid #ddd", padding: 12, marginBottom: 12, borderRadius: 6 }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <strong>Ngày {index + 1}</strong>
                        <button
                          type="button"
                          className="dash-btn dash-btn-sm dash-btn-danger"
                          onClick={() => {
                            const list = [...(form.itinerary || [])];
                            list.splice(index, 1);
                            setForm((prev) => ({ ...prev, itinerary: list }));
                          }}
                        >
                          Xóa
                        </button>
                      </div>

                      <label className="dash-form-label">Lịch trình tour</label>
                      <textarea
                        className="dash-input dash-w100"
                        rows={4}
                        placeholder="Nhập mô tả..."
                        value={item.schedule}
                        onChange={(e) => {
                          const list = [...(form.itinerary || [])];
                          list[index] = { ...list[index], schedule: e.target.value };
                          setForm((prev) => ({ ...prev, itinerary: list }));
                        }}
                      />

                      <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                        <div style={{ flex: 1 }}>
                          <label className="dash-form-label">Ngày đi</label>
                          <input
                            type="date"
                            className="dash-input dash-w100"
                            value={item.startDate}
                            onChange={(e) => {
                              const list = [...(form.itinerary || [])];
                              list[index] = { ...list[index], startDate: e.target.value };
                              setForm((prev) => ({ ...prev, itinerary: list }));
                            }}
                          />
                          {itineraryErrors[index]?.startDate && (
                            <div className="dash-form-error">
                              {itineraryErrors[index].startDate}
                            </div>
                          )}

                        </div>
                        <div style={{ flex: 1 }}>
                          <label className="dash-form-label">Ngày về</label>
                          <input
                            type="date"
                            className="dash-input dash-w100"
                            value={item.endDate}
                            onChange={(e) => {
                              const list = [...(form.itinerary || [])];
                              list[index] = { ...list[index], endDate: e.target.value };
                              setForm((prev) => ({ ...prev, itinerary: list }));
                            }}
                          />
                          {itineraryErrors[index]?.endDate && (
                            <div className="dash-form-error">
                              {itineraryErrors[index].endDate}
                            </div>
                          )}

                        </div>
                      </div>

                      <label className="dash-form-label">Ghi chú</label>
                      <textarea
                        className="dash-input dash-w100"
                        rows={2}
                        placeholder="Ghi chú thêm..."
                        value={item.note}
                        onChange={(e) => {
                          const list = [...(form.itinerary || [])];
                          list[index] = { ...list[index], note: e.target.value };
                          setForm((prev) => ({ ...prev, itinerary: list }));
                        }}
                      />
                    </div>
                  ))}

                  <button
                    type="button"
                    className="dash-btn dash-btn-sm dash-btn-primary"
                    onClick={() => {
                      setForm((prev) => ({
                        ...prev,
                        itinerary: [
                          ...(prev.itinerary || []),
                          { schedule: "", startDate: "", endDate: "", note: "", status: "1" },
                        ],
                      }));
                    }}
                  >
                    + Thêm lịch trình
                  </button>
                </div>

              </div>
            </div>
          ) : (
            // TABLE VIEW
            <div className="dash-panel">
              <div className="dash-toolbar">
                <input className="dash-input" placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)} />
                <select className="dash-select" value={field} onChange={(e) => setField(e.target.value)}>
                  <option value="all">All fields</option>
                  <option value="tourName">Name</option>
                  <option value="tourPrice">Price</option>
                  <option value="description">Description</option>
                </select>
                <button className="dash-btn dash-btn-primary" onClick={openAdd}>+ Add</button>
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
                      <th style={{ textAlign: "right" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.length === 0 ? (
                      <tr><td colSpan={7}
                        style={{ textAlign: "center", padding: 20 }}>
                        No data
                      </td>
                      </tr>
                    ) : (
                      filtered.map((t, idx) => (
                        <tr key={t.id ?? idx}>
                          <td>{idx + 1}.</td>
                          <td>
                            {t.image ? (
                              <img
                                src={t.image.startsWith("http") ? t.image : `http://localhost:3000${t.image}`}
                                alt={t.tourName || t.name}
                                style={{ width: 40, height: 40, borderRadius: 4, objectFit: "cover" }}
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
                            {Number(t.activeid) === 1 ? (
                              <span
                                style={{
                                  padding: "4px 8px",
                                  background: "#d1fae5",
                                  color: "#065f46",
                                  borderRadius: 4,
                                  fontSize: 12,
                                  fontWeight: 600,
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
                                  borderRadius: 4,
                                  fontSize: 12,
                                  fontWeight: 600,
                                }}
                              >
                                Not Active
                              </span>
                            )}
                          </td>
                          <td style={{ textAlign: "right" }}>
                            <button className="dash-btn dash-btn-icon" onClick={() => {
                              handleViewTourDetail(t.id);      // gọi API hoặc lấy dữ liệu tour
                             // navigate(`/qluser/${t.id}`);    // chuyển hướng
                            }}>
                              <i className="fa-regular fa-pen-to-square" />
                            </button>
                            <button className="dash-btn dash-btn-icon dash-btn-danger" onClick={() => handleDelete(t.id)}>
                              <i className="fa-regular fa-trash-can" />
                            </button>
                          </td>
                        </tr>
                      ))
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
