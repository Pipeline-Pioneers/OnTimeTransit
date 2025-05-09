import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import AuthService from "../../services/AuthService";
import "./Login.css";

function Login() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    AuthService.login(credentials)
      .then((role) => {
        if (role === "ADMIN") {
          navigate("/admin");
        } else if (role === "USER") {
          navigate("/user");
        } else {
          toast.error("Unexpected role received from the server.");
        }
      })
      .catch((error) => {
        toast.error("Login failed. Please check your credentials.");
        console.error("Error logging in:", error);
      });
  };

  return (
    <>
     <header className="login-header">
  <img src="Logo.png" alt="On Time Transit Logo" className="logo" />
</header>


      <main className="login-container">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>

          <div className="form-links">
            <Link to="/forgot-password" className="forgot-password-link">
              Forgot Password?
            </Link>
          </div>

          <button type="submit" className="btn-login">Login</button>

          <p className="signup-prompt">
            Don't have an account? <Link to="/register">Sign up</Link>
          </p>
        </form>
      </main>

      <footer className="login-footer">
        © 2025 On Time Transit. All rights reserved.
      </footer>
    </>
  );
}

export default Login;
