import React from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/AuthService";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

function Navbar() {
  const role = AuthService.getRole(); // Get the role from localStorage

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
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/user">
              Dashboard
            </Button>
            <Button color="inherit" component={Link} to="/user/routes">
              View Routes
            </Button>
          </>
        )}
        <Button color="inherit" onClick={AuthService.logout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;