import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container mt-5">
      <h1>Welcome to the Bus Management System</h1>
      <ul>
        <li><Link to="/schedules">View Bus Schedules</Link></li>
        <li><Link to="/tickets">Manage Tickets</Link></li>
        <li><Link to="/routes">Manage Routes</Link></li>
      </ul>
    </div>
  );
}

export default Home; // Ensure this is a default export