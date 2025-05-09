import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
} from "@mui/material";
import { motion } from "framer-motion";
import { ApiService } from "../../services/ApiService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [routes, setRoutes] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    ApiService.getRoutes().then(setRoutes).catch(() => toast.error("Failed to fetch routes."));
    ApiService.getTickets().then(setTickets).catch(() => toast.error("Failed to fetch tickets."));
    ApiService.getSchedules().then(setSchedules).catch(() => toast.error("Failed to fetch schedules."));
    ApiService.getAnalyticsSummary().catch(() => toast.error("Failed to fetch analytics."));
  }, []);

  const handleSendNotification = () => {
    if (!notificationMessage.trim()) {
      toast.error("Notification message cannot be empty.");
      return;
    }
    ApiService.sendNotification(notificationMessage)
      .then(() => {
        toast.success("Notification sent successfully!");
        setNotificationMessage("");
      })
      .catch(() => toast.error("Failed to send notification."));
  };

  return (
    <div>
      {/* Header */}
      <AppBar position="static" className="admin-header">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            OnTimeTransit
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main Dashboard */}
      <Container className="admin-container">
        <Typography variant="h4" gutterBottom className="admin-section-title">
          Admin Dashboard
        </Typography>

        {/* Analytics Section */}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Card component={motion.div} whileHover={{ scale: 1.05 }} className="admin-card">
              <CardContent>
                <Typography variant="h6">Total Tickets</Typography>
                <Typography variant="h4">{tickets.length}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card component={motion.div} whileHover={{ scale: 1.05 }} className="admin-card">
              <CardContent>
                <Typography variant="h6">Total Routes</Typography>
                <Typography variant="h4">{routes.length}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card component={motion.div} whileHover={{ scale: 1.05 }} className="admin-card">
              <CardContent>
                <Typography variant="h6">Total Schedules</Typography>
                <Typography variant="h4">{schedules.length}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Manage Tickets */}
        <div className="admin-section">
          <Typography variant="h5" className="admin-section-title">Manage Tickets</Typography>
          <Button variant="contained" color="primary" className="admin-button" onClick={() => navigate("/admin/tickets")}>
            View Tickets
          </Button>
        </div>

        {/* Manage Routes */}
        <div className="admin-section">
          <Typography variant="h5" className="admin-section-title">Manage Routes</Typography>
          <Button variant="contained" color="primary" className="admin-button" onClick={() => navigate("/admin/routes")}>
            View Routes
          </Button>
          <Button variant="contained" color="secondary" className="admin-button" onClick={() => navigate("/admin/routes/add")}>
            Add Route
          </Button>
        </div>

        {/* Manage Schedules */}
        <div className="admin-section">
          <Typography variant="h5" className="admin-section-title">Manage Schedules</Typography>
          <Button variant="contained" color="primary" className="admin-button" onClick={() => navigate("/admin/schedules")}>
            View Schedules
          </Button>
          <Button variant="contained" color="secondary" className="admin-button" onClick={() => navigate("/admin/schedules/add")}>
            Add Schedule
          </Button>
          <Button variant="contained" color="success" className="admin-button" onClick={() => navigate("/admin/schedules/assign")}>
            Assign Schedule
          </Button>
          <Button variant="contained" color="success" className="admin-button" onClick={() => navigate("/admin/schedules/assign-existing")}>
            Assign Existing Schedule
          </Button>
        </div>

        {/* Notifications */}
        <div className="admin-section">
          <Typography variant="h5" className="admin-section-title">Send Notifications</Typography>
          <TextField
            label="Notification Message"
            variant="outlined"
            fullWidth
            value={notificationMessage}
            onChange={(e) => setNotificationMessage(e.target.value)}
            className="notification-input"
          />
          <Button variant="contained" color="secondary" onClick={handleSendNotification}>
            Send Notification
          </Button>
        </div>
      </Container>

      {/* Footer */}
      <footer className="admin-footer">
        © {new Date(2025).getFullYear()} OnTimeTransit. All rights reserved.
      </footer>
    </div>
  );
}

export default AdminDashboard;
