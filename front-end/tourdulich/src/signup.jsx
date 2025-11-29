import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ dùng React Router
import "./App.css";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName,  setLastName]  = useState("");
  const [email,     setEmail]     = useState("");
  const [password,  setPassword]  = useState("");
  const [address,   setAddress]   = useState("");
  const [phone,     setPhone]     = useState("");
  const [sex,       setSex]       = useState(""); // "Male" | "Female" | ""
  const [agree,     setAgree]     = useState(false);
  const [errors,    setErrors]    = useState({});

  const navigate = useNavigate(); // ✅

  const validate = () => {
    const e = {};
    if (!firstName.trim()) e.firstName = "Please enter first name.";
    if (!lastName.trim())  e.lastName  = "Please enter last name.";
    if (!email.trim())     e.email     = "Please enter email.";
    else if (!/^\S+@\S+\.\S+$/.test(email)) e.email = "Email is not valid.";
    if (!password)         e.password  = "Please enter password.";
    else if (password.length < 6) e.password = "Min 6 characters.";
    if (!address.trim())   e.address   = "Please enter address.";
    if (!phone.trim())     e.phone     = "Please enter phone number.";
    if (!sex)              e.sex       = "Please choose sex.";
    if (!agree)            e.agree     = "You must agree to the Terms & Privacy.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;

    // TODO: gọi API signup tại đây
    alert("Đăng kí thành công !");

    // reset form
    setFirstName(""); setLastName("");
    setEmail(""); setPassword("");
    setAddress(""); setPhone("");
    setSex(""); setAgree(false);
    setErrors({});

    // ✅ Chuyển về trang đăng nhập
    navigate("/login");
    // Hoặc nếu KHÔNG dùng react-router:
    // window.location.href = "/login";
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <h1 className="signup-header">Signup</h1>
        <p className="signup-subtitle">Create your account to start your journey</p>

        {/* Lưới 2 cột */}
        <form onSubmit={handleSubmit} noValidate className="signup-grid">
          {/* First / Last */}
          <div className="signup-field" style={{ paddingRight: "20px" }}>
            <label>First Name</label>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {errors.firstName && <p className="signup-err">{errors.firstName}</p>}
          </div>

          <div className="signup-field" style={{ paddingRight: "20px" }}>
            <label>Last Name</label>
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            {errors.lastName && <p className="signup-err">{errors.lastName}</p>}
          </div>

          {/* Email / Password */}
          <div className="signup-field" style={{ paddingRight: "20px" }}>
            <label>Email</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="signup-err">{errors.email}</p>}
          </div>

          <div className="signup-field" style={{ paddingRight: "20px" }}>
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="signup-err">{errors.password}</p>}
          </div>

          {/* Address (full width) */}
          <div className="signup-field signup-col-2" style={{ paddingRight: "20px" }}>
            <label>Address</label>
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            {errors.address && <p className="signup-err">{errors.address}</p>}
          </div>

          {/* Phone / Sex */}
          <div className="signup-field" style={{ paddingRight: "20px" }}>
            <label>Phone Number</label>
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {errors.phone && <p className="signup-err">{errors.phone}</p>}
          </div>

          <div className="signup-field">
            <label>Sex</label>
            <select value={sex} onChange={(e) => setSex(e.target.value)}>
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
            </select>
            {errors.sex && <p className="signup-err">{errors.sex}</p>}
          </div>

          {/* Checkbox Terms & Privacy (đặt ngay trên nút) */}
          <div className="signup-col-2">
            <div className="options">
              <label className="remember-me" style={{ gap: 8 }}>
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                />
                I agree to the <a href="#" className="reset-link">Terms</a> &{" "}
                <a href="#" className="reset-link">Privacy</a>
              </label>
            </div>
            {/* ✅ lỗi nằm ngay dưới checkbox */}
            {errors.agree && <p className="form-error" style={{ marginTop: 6 }}>{errors.agree}</p>}
          </div>

          {/* Nút Create Account căn giữa */}
          <div className="signup-col-2 actions-center">
            <button type="submit" className="login-btn">Create Account</button>
          </div>
        </form>
      </div>
    </div>
  );
}