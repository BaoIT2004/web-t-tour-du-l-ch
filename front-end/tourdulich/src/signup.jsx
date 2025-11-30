import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ dùng React Router
import "./App.css";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [gender, setgender] = useState(""); // "Male" | "Female" | ""
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate(); // ✅

  const validate = () => {
    const e = {};
    if (!firstName.trim()) e.firstName = "Please enter first name.";
    if (!lastName.trim()) e.lastName = "Please enter last name.";
    if (!email.trim()) e.email = "Please enter email.";
    else if (!/^\S+@\S+\.\S+$/.test(email)) e.email = "Email is not valid.";
    if (!password) e.password = "Please enter password.";
    else if (password.length < 6) e.password = "Min 6 characters.";
    if (!address.trim()) e.address = "Please enter address.";
    if (!phoneNumber.trim()) e.phoneNumber = "Please enter phone number.";
    if (!gender) e.gender = "Please choose gender.";
    if (!agree) e.agree = "You must agree to the Terms & Privacy.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;


    try {
      const res = await fetch("http://localhost:3000/api/creat-new-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",  //Header này cho server biết rằng dữ liệu bạn gửi trong body là JSON
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          address,
          phoneNumber,
          gender
        }),
      });
      const data = await res.json();  //Lấy dữ liệu JSON mà server trả về → chuyển thành object JavaScript.
      console.log("Response từ server:", data);
      if(data.errCode ===1){
        alert("email đã tồn tại");
        return;
      }else if (data.errCode === 0) {
        alert("Đăng kí thành công")
        navigate("/login");
        // reset form
        setFirstName(""); setLastName("");
        setEmail(""); setPassword("");
        setAddress(""); setphoneNumber("");
        setgender(""); setAgree(false);
        setErrors({});
      }
    } catch (e) {
      console.error("Lỗi khi gọi API:", err);
      alert("Đăng nhập thất bại");
    }
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

          {/* phoneNumber / gender */}
          <div className="signup-field" style={{ paddingRight: "20px" }}>
            <label>phoneNumber Number</label>
            <input
              type="tel"
              placeholder="phoneNumber Number"
              value={phoneNumber}
              onChange={(e) => setphoneNumber(e.target.value)}
            />
            {errors.phoneNumber && <p className="signup-err">{errors.phoneNumber}</p>}
          </div>

          <div className="signup-field">
            <label>gender</label>
            <select value={gender} onChange={(e) => setgender(e.target.value)}>
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
            </select>
            {errors.gender && <p className="signup-err">{errors.gender}</p>}
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