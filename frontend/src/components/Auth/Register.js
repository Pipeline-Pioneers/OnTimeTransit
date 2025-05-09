import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import AuthService from "../../services/AuthService";
import "./Register.css";

function Register() {
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
    phoneNumber: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    AuthService.register(user)
      .then(() => {
        toast.success("Registration successful! Please log in.");
        navigate("/login");
      })
      .catch((error) => {
        toast.error("Registration failed. Please try again.");
        console.error("Error registering user:", error);
      });
  };

  return (
    <div className="register-page">
      <header className="register-header">
        <h1>My App</h1>
      </header>

      <main className="container mt-5 d-flex justify-content-center">
        <div className="form-box">
          <h2 className="mb-4 text-center">Register</h2>
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={user.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
              <input
                type="text"
                className="form-control"
                id="phoneNumber"
                name="phoneNumber"
                value={user.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Register
            </button>
          </form>

          <p className="mt-3 text-center">
            Already have an account?{" "}
            <Link to="/login" className="login-link">Login</Link>
          </p>
        </div>
      </main>

      <footer className="register-footer">
        <p>&copy; {new Date().getFullYear()} My App. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Register;
