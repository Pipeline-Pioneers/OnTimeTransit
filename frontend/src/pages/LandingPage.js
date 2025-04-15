import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./LandingPage.css"; // Custom CSS for additional styling

function LandingPage() {
  return (
    <motion.div
      className="landing-page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Hero Section */}
      <div className="hero-section">
        <motion.h1
          className="hero-title"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Welcome to the Bus Management System
        </motion.h1>
        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Simplify your travel experience with seamless route, schedule, and ticket management.
        </motion.p>
        <motion.div
          className="hero-buttons"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <Link
            to="/login"
            className="btn btn-primary btn-lg me-3"
            style={{ transition: "transform 0.3s ease" }}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          >
            Login
          </Link>
          <Link
            to="/register"
            className="btn btn-secondary btn-lg"
            style={{ transition: "transform 0.3s ease" }}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          >
            Register
          </Link>
        </motion.div>
      </div>

      {/* Features Section */}
      <motion.div
        className="features-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <div className="feature">
          <h3>Manage Routes</h3>
          <p>Plan and organize bus routes efficiently.</p>
        </div>
        <div className="feature">
          <h3>Schedule Buses</h3>
          <p>Set up schedules for smooth operations.</p>
        </div>
        <div className="feature">
          <h3>Book Tickets</h3>
          <p>Allow passengers to book tickets with ease.</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default LandingPage;