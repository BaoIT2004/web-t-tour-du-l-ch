import { useState } from "react";
import "./App.css"; // dùng lại CSS hiện có

export default function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!fullName.trim()) e.fullName = "Please enter your full name.";
    if (!email.trim()) e.email = "Please enter your email.";
    // Regex đơn giản cho email
    if (email && !/^\S+@\S+\.\S+$/.test(email)) e.email = "Email is not valid.";
    if (!password) e.password = "Please enter a password.";
    if (password && password.length < 6)
      e.password = "Password must be at least 6 characters.";
    if (!confirm) e.confirm = "Please re-enter your password.";
    if (password && confirm && password !== confirm)
      e.confirm = "Passwords do not match.";
    if (!agree) e.agree = "You must agree to the Terms & Privacy.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // TODO: gọi API đăng ký
    alert("Đăng ký thành công!");
    // reset form (tùy chọn)
    setFullName("");
    setEmail("");
    setPassword("");
    setConfirm("");
    setAgree(false);
    setErrors({});
  };

  return (
    <div className="login-page">{/* tái dùng layout full screen */}
      <div className="login-container">{/* tái dùng card */}
        <h2>Signup</h2>
        <p className="welcome-text">
          Create your account to start your journey
        </p>

        <form onSubmit={handleSubmit} noValidate>
          {/* Full name */}
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          {errors.fullName && <p className="form-error">{errors.fullName}</p>}

          {/* Email */}
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && <p className="form-error">{errors.email}</p>}

          {/* Password */}
          <label>Password</label>
          <input
            type="password"
            placeholder="Create a password (min 6 chars)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && <p className="form-error">{errors.password}</p>}

          {/* Confirm password */}
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Re-enter your password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
          {errors.confirm && <p className="form-error">{errors.confirm}</p>}

          {/* Terms */}
          <div className="options">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
              />
              I agree to the <a href="#" className="reset-link">Terms</a> &{" "}
              <a href="#" className="reset-link">Privacy</a>
            </label>
          </div>
          {errors.agree && <p className="form-error">{errors.agree}</p>}

          {/* Buttons */}
          <button type="submit" className="login-btn">Create Account</button>
          <p className="login-bottom-text">Already have an account?{" "}<a href="#" className="reset-link">Login here</a></p>
        </form>
      </div>
    </div>
  );
}
