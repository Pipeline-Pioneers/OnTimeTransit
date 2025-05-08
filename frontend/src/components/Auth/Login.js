import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthService from "../../services/AuthService";
 
function Login() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };
 
  const handleLogin = (e) => {
    e.preventDefault();
 
    console.log("Credentials being sent to the backend:", credentials);
 
    AuthService.login(credentials)
      .then((role) => {
        console.log("User role:", role);
        if (role === "ADMIN") {
          console.log("Navigating to admin dashboard...");
          navigate("/admin");
        } else if (role === "USER") {
          console.log("Navigating to user dashboard...");
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
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}
 
export default Login;