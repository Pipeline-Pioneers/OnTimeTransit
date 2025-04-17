import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, Typography, Button } from "@mui/material";

import { motion } from "framer-motion";
import { ApiService } from "../../services/ApiService";
import Navbar from "../Navbar";
import Analytics from "../Analytics";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
} from "@mui/material";

function AdminDashboard() {
  const [routes, setRoutes] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [analyticsData, setAnalyticsData] = useState({ labels: [], values: [] });
  const [newRoute, setNewRoute] = useState({
    startPoint: "",
    endPoint: "",
    intermediateStops: "",
    distance: "",
    estimatedTravelTime: "",
  });
  const navigate = useNavigate();

  console.log("AdminDashboard rendered");

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
  const handleAddRoute = (e) => {
    e.preventDefault();
    ApiService.addRoute(newRoute)
      .then((route) => {
        toast.success("Route added successfully!");
        setRoutes((prevRoutes) => [...prevRoutes, route]);
        setNewRoute({
          startPoint: "",
          endPoint: "",
          intermediateStops: "",
          distance: "",
          estimatedTravelTime: "",
        });
      })
      .catch((error) => toast.error("Failed to add route."));
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

  // Delete a route
  const handleDeleteRoute = (routeId) => {
    ApiService.deleteRoute(routeId)
      .then(() => {
        toast.success("Route deleted successfully!");
        setRoutes((prevRoutes) => prevRoutes.filter((route) => route.id !== routeId));
      })
      .catch((error) => toast.error("Failed to delete route."));
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
                <form onSubmit={handleAddRoute} className="mb-4">
                  <div className="mb-3">
                    <TextField
                      label="Start Point"
                      variant="outlined"
                      fullWidth
                      value={newRoute.startPoint}
                      onChange={(e) => setNewRoute({ ...newRoute, startPoint: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <TextField
                      label="End Point"
                      variant="outlined"
                      fullWidth
                      value={newRoute.endPoint}
                      onChange={(e) => setNewRoute({ ...newRoute, endPoint: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <TextField
                      label="Intermediate Stops"
                      variant="outlined"
                      fullWidth
                      value={newRoute.intermediateStops}
                      onChange={(e) => setNewRoute({ ...newRoute, intermediateStops: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <TextField
                      label="Distance (km)"
                      variant="outlined"
                      fullWidth
                      type="number"
                      value={newRoute.distance}
                      onChange={(e) => setNewRoute({ ...newRoute, distance: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <TextField
                      label="Estimated Travel Time"
                      variant="outlined"
                      fullWidth
                      value={newRoute.estimatedTravelTime}
                      onChange={(e) =>
                        setNewRoute({ ...newRoute, estimatedTravelTime: e.target.value })
                      }
                      required
                    />
                  </div>
                  <Button type="submit" variant="contained" color="primary">
                    Add Route
                  </Button>
                </form>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Start Point</TableCell>
                        <TableCell>End Point</TableCell>
                        <TableCell>Intermediate Stops</TableCell>
                        <TableCell>Distance (km)</TableCell>
                        <TableCell>Estimated Travel Time</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {routes.length > 0 ? (
                        routes.map((route) => (
                          <TableRow key={route.id}>
                            <TableCell>{route.startPoint}</TableCell>
                            <TableCell>{route.endPoint}</TableCell>
                            <TableCell>{route.intermediateStops}</TableCell>
                            <TableCell>{route.distance}</TableCell>
                            <TableCell>{route.estimatedTravelTime}</TableCell>
                            <TableCell>
                              <Button
                                variant="contained"
                                color="error"
                                onClick={() => handleDeleteRoute(route.id)}
                              >
                                Delete
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} align="center">
                            No routes available. Add a new route to get started.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
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