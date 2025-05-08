// src/pages/LandingPage.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Typography,
  Button,
  Container,
  Box,
  Paper,
} from "@mui/material";
import AuthService from "../services/AuthService";

function LandingPage() {
  const role = AuthService.getRole();
  const navigate = useNavigate();

  const handleLogout = () => {
    AuthService.logout();
    navigate("/login");
  };

  return (
    <>
      {/* Landing Page Content */}
      <Container maxWidth="md">
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            mt: 8,
            backgroundColor: "#f8f9fa",
            borderRadius: 3,
          }}
        >
          <Box textAlign="center">
            <Typography
              variant="h3"
              gutterBottom
              sx={{ color: "#343a40", fontWeight: "bold" }}
            >
              Welcome to the Bus Management System
            </Typography>
            <Typography variant="h6" sx={{ color: "#6c757d", mb: 4 }}>
              Simplify your travel experience with seamless route, schedule, and
              ticket management.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate("/user/routes")}
            >
              Book a Ticket
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
}

export default LandingPage;
