import { useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");


  if (user && token) {
    console.log("User ID:", user.id);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",  //Header này cho server biết rằng dữ liệu bạn gửi trong body là JSON
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await res.json();  //Lấy dữ liệu JSON mà server trả về → chuyển thành object JavaScript.
      console.log("Response từ server:", data);

      if (data.errCode !== 0) {
        alert(data.message);
        return;
      }

      // LƯU TOKEN ĐÚNG
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify({
        token: data.token,
        id: data.user.id,
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        email: data.user.email,
        address: data.user.address,
        gender: data.user.gender,
        role: data.user.role,
        phonenumber: data.user.phonenumber
      }));

      console.log("TOKEN LƯU:", localStorage.getItem("token"));

      if (data.user.role === "2") {
        navigate("/");
      } else {
        navigate("/dashboard")
      }

    } catch (err) {
      console.error("Lỗi khi gọi API:", err);
      alert("Đăng nhập thất bại");
    }
  };


  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        <p className="welcome-text">
          Welcome back! Please sign in to your account
        </p>

        <form onSubmit={handleSubmit}>
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="options">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              Remember Me
            </label>
            <a href="#" className="reset-link">
              Reset Password
            </a>
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
          <button type="button" className="signup-btn"
            onClick={() => navigate("/signup")}
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}
