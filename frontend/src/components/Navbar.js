import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import { AppBar, Toolbar, Typography, Button, ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

function Navbar() {
  const role = AuthService.getRole(); // 'ADMIN', 'USER', or null
  const navigate = useNavigate();

  const handleLogout = () => {
    AuthService.logout();
    navigate("/login");
  };

  // Button style
  const navButtonStyle = {
    backgroundColor: "#3498db",
    color: "#fff",
    marginLeft: 1,
    "&:hover": {
      backgroundColor: "#2980b9",
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" sx={{ backgroundColor: "#004466" }}>
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            On-Time Transit
          </Typography>

          {role === "ADMIN" && (
            <>
              <Button sx={navButtonStyle} component={Link} to="/admin">Admin Dashboard</Button>
              <Button sx={navButtonStyle} component={Link} to="/admin/tickets">Manage Tickets</Button>
              <Button sx={navButtonStyle} component={Link} to="/admin/routes">Manage Routes</Button>
              <Button sx={navButtonStyle} component={Link} to="/admin/schedules">Manage Schedules</Button>
              
            </>
          )}

          {role === "USER" && (
            <>
              <Button sx={navButtonStyle} component={Link} to="/user">Dashboard</Button>
              <Button sx={navButtonStyle} component={Link} to="/user/routes">Manage Routes</Button>
            </>
          )}

          {role && (
            <Button sx={navButtonStyle} onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default Navbar;
