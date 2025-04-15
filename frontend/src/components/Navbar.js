import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useAuth } from "../context/AuthContext";

function Navbar({ role }) {
  const { logout } = useAuth();

  return (
    <AppBar position="static" sx={{ backgroundColor: "#343a40" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Bus Management System
        </Typography>
        {role === "ADMIN" ? (
          <>
            <Button color="inherit" component={Link} to="/admin">
              Dashboard
            </Button>
            <Button color="inherit" component={Link} to="/admin/routes">
              Manage Routes
            </Button>
            <Button color="inherit" component={Link} to="/admin/schedules">
              Manage Schedules
            </Button>
            <Button color="inherit" component={Link} to="/admin/tickets">
              Manage Tickets
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/user">
              Dashboard
            </Button>
            <Button color="inherit" component={Link} to="/user/routes">
              View Routes
            </Button>
            <Button color="inherit" component={Link} to="/user/book-ticket">
              Book Ticket
            </Button>
            <Button color="inherit" component={Link} to="/user/tickets">
              My Tickets
            </Button>
          </>
        )}
        <Button color="inherit" onClick={logout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;