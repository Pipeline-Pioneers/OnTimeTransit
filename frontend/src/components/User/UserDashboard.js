import React, { useEffect } from "react";
import { ApiService } from "../../services/ApiService";
import Navbar from "../Navbar";

function UserDashboard() {
  const fetchSummaryData = () => {
    ApiService.getRoutes();
    ApiService.getTickets();
  };

  useEffect(() => {
    fetchSummaryData();
  }, []);

  return (
    <div>
      <Navbar />
      <h1>User Dashboard</h1>
      {/* Render routes and tickets */}
    </div>
  );
}

export default UserDashboard;