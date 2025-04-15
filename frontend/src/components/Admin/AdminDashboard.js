import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, Typography, Button } from "@mui/material";

import { motion } from "framer-motion";
import { ApiService } from "../../services/ApiService";
import Navbar from "../Navbar";
import Analytics from "../Analytics";

function AdminDashboard() {
  const [routes, setRoutes] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [analyticsData, setAnalyticsData] = useState({ labels: [], values: [] });

  // Fetch data for analytics and management
  const fetchSummaryData = () => {
    ApiService.getRoutes().then(setRoutes);
    ApiService.getSchedules().then(setSchedules);
    ApiService.getTickets().then(setTickets);
  };

  useEffect(() => {
    fetchSummaryData();
  }, []);

  useEffect(() => {
    ApiService.getAnalyticsSummary()
        .then((data) => {
            setAnalyticsData(data);
        })
        .catch((error) => console.error("Error fetching analytics data:", error));
  }, []);

  useEffect(() => {
    ApiService.getTickets("Route A", "2025-04-15T10:00:00")
      .then((data) => setTickets(data))
      .catch((error) => console.error("Error fetching tickets:", error));
  }, []);

  // Add a new route
  const handleAddRoute = () => {
    const newRoute = {
      startPoint: "New City A",
      endPoint: "New City B",
      intermediateStops: "Stop 1, Stop 2",
      distance: 120,
      estimatedTravelTime: "3 hours",
    };
    ApiService.addRoute(newRoute).then(() => fetchSummaryData());
  };

  // Add a new schedule
  const handleAddSchedule = () => {
    const newSchedule = {
      routeName: "New Route",
      departureTime: "10:00",
      arrivalTime: "12:00",
      frequency: "Daily",
    };
    ApiService.addSchedule(newSchedule).then(() => fetchSummaryData());
  };

  // Export tickets as CSV
  const handleExportTickets = () => {
    const csvContent = [
      ["Passenger Name", "Route Name", "Travel Date", "Seat Number", "Status"].join(","),
      ...tickets.map((ticket) =>
        [
          ticket.passengerName,
          ticket.routeName,
          new Date(ticket.travelDateTime).toLocaleString(),
          ticket.seatNumber,
          ticket.status,
        ].join(",")
      ),
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "tickets.csv";
    link.click();
  };

  // Submit feedback
  const handleFeedbackSubmit = () => {
    alert(`Thank you for your feedback: "${feedback}"`);
    setFeedback("");
  };

  return (
    <div>
      <Navbar role="ADMIN" />
      <div className="container mt-5">
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>
        <Analytics data={analyticsData} />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            {/* Content */}
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          {/* Routes Management */}
          <Grid item xs={12} sm={4}>
            <Card component={motion.div} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <CardContent>
                <Typography variant="h6">Total Routes</Typography>
                <Typography variant="h4">{routes.length}</Typography>
                <Button variant="contained" color="primary" onClick={handleAddRoute}>
                  Add Route
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Schedules Management */}
          <Grid item xs={12} sm={4}>
            <Card component={motion.div} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <CardContent>
                <Typography variant="h6">Total Schedules</Typography>
                <Typography variant="h4">{schedules.length}</Typography>
                <Button variant="contained" color="primary" onClick={handleAddSchedule}>
                  Add Schedule
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Tickets Management */}
          <Grid item xs={12} sm={4}>
            <Card component={motion.div} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <CardContent>
                <Typography variant="h6">Total Tickets</Typography>
                <Typography variant="h4">{tickets.filter((ticket) => ticket.status !== "Canceled").length}</Typography>
                <Button variant="contained" color="secondary" onClick={handleExportTickets}>
                  Export Tickets
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Feedback Section */}
        <div className="mt-4">
          <h3>Feedback</h3>
          <textarea
            className="form-control mb-3"
            rows="4"
            placeholder="Share your feedback about the system..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          ></textarea>
          <button className="btn btn-primary" onClick={handleFeedbackSubmit}>
            Submit Feedback
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;