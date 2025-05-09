import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaRoute, FaTicketAlt, FaCreditCard, FaBus, FaArrowRight } from "react-icons/fa";
import "./LandingPage.css";

function LandingPage() {
  return (
    <div className="landing-page-container">
      {/* Header */}
      <header className="header">
        <div className="header-left">On Time Transit</div>
        <div className="header-right">
          <Link to="/login" className="btn btn-primary">Login</Link>
          <Link to="/register" className="btn btn-secondary">Register</Link>
        </div>
      </header>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{ flex: 1 }}
      >
        {/* Hero Section */}
        <div className="hero-section">
          <div className="intro-section">
            <motion.h1 className="hero-title" initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1 }}>
              Welcome to "On Time Transit"
            </motion.h1>
            <motion.p className="hero-subtitle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}>
              Simplify your travel experience with seamless route, schedule, and ticket management.
            </motion.p>
          </div>
        </div>

        {/* How It Works Section */}
        <motion.div
          className="how-it-works-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <h2>How It Works</h2>
          <div className="how-flow">
            <div className="step-icon">
              <FaRoute className="icon" />
              <p>Choose Route</p>
            </div>
            <FaArrowRight className="arrow-icon" />
            <div className="step-icon">
              <FaTicketAlt className="icon" />
              <p>Book Ticket</p>
            </div>
            <FaArrowRight className="arrow-icon" />
            <div className="step-icon">
              <FaCreditCard className="icon" />
              <p>Make Payment</p>
            </div>
            <FaArrowRight className="arrow-icon" />
            <div className="step-icon">
              <FaBus className="icon" />
              <p>Enjoy Ride</p>
            </div>
          </div>
        </motion.div>

        {/* Popular Routes Section */}
        <motion.div
          className="popular-routes-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <h2>Popular Routes</h2>
          <div className="routes-list">
            <div className="route-card">
              <h4>Sandton → Rosebank</h4>
              <p>Fast and frequent shuttles every 15 minutes.</p>
            </div>
            <div className="route-card">
              <h4>Gandhi Square → New Town</h4>
              <p>Direct route for students and faculty.</p>
            </div>
            <div className="route-card">
              <h4>Fourways → Johannesburg CBD</h4>
              <p>Ideal for daily commuters and professionals.</p>
            </div>
          </div>
        </motion.div>

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

      {/* Footer */}
      <div className="footer">
        &copy; 2025 Bus Management System. All rights reserved.
      </div>
    </div>
  );
}

export default LandingPage;
