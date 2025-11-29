import { useState } from "react";
import "./App.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Đăng nhập thành công");
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
          <button type="button" className="signup-btn">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}
