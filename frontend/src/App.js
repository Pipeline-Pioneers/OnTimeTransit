import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LandingPage from "./pages/LandingPage";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import AdminDashboard from "./components/Admin/AdminDashboard";
import UserDashboard from "./components/User/UserDashboard";
import BusScheduleList from "./components/BusSchedule/BusScheduleList";
import AddBusSchedule from "./components/BusSchedule/AddBusSchedule";
import TicketList from "./components/TicketBooking/TicketList";
import BookTicket from "./components/TicketBooking/BookTicket";
import RouteList from "./components/RouteManagement/RouteList";
import AddRoute from "./components/RouteManagement/AddRoute";
import ManageTickets from "./components/Admin/ManageTickets";
import NotFound from "./pages/NotFound";

import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./utils/PrivateRoute";
import ErrorBoundary from "./components/ErrorBoundary";

import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <div className="container">
            <ErrorBoundary>
              <Routes>
                {/* Landing Page */}
                <Route path="/" element={<LandingPage />} />

                {/* Login Page */}
                <Route path="/login" element={<Login />} />

                {/* Register Page */}
                <Route path="/register" element={<Register />} />

                {/* Admin Dashboard Routes */}
                <Route
                  path="/admin"
                  element={
                    <PrivateRoute allowedRoles={["ADMIN"]}>
                      <AdminDashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/admin/schedules"
                  element={
                    <PrivateRoute allowedRoles={["ADMIN"]}>
                      <BusScheduleList />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/admin/schedules/add"
                  element={
                    <PrivateRoute allowedRoles={["ADMIN"]}>
                      <AddBusSchedule />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/admin/tickets"
                  element={
                    <PrivateRoute allowedRoles={["ADMIN"]}>
                      <ManageTickets />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/admin/routes"
                  element={
                    <PrivateRoute allowedRoles={["ADMIN"]}>
                      <RouteList />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/admin/routes/add"
                  element={
                    <PrivateRoute allowedRoles={["ADMIN"]}>
                      <AddRoute />
                    </PrivateRoute>
                  }
                />

                {/* User Dashboard Routes */}
                <Route
                  path="/user"
                  element={
                    <PrivateRoute allowedRoles={["USER"]}>
                      <UserDashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/user/tickets"
                  element={
                    <PrivateRoute allowedRoles={["USER"]}>
                      <TicketList />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/user/book-ticket"
                  element={
                    <PrivateRoute allowedRoles={["USER"]}>
                      <BookTicket />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/user/routes"
                  element={
                    <PrivateRoute allowedRoles={["USER"]}>
                      <RouteList />
                    </PrivateRoute>
                  }
                />

                {/* Additional Route */}
                <Route
                  path="/schedules/add"
                  element={
                    <PrivateRoute>
                      <AddBusSchedule />
                    </PrivateRoute>
                  }
                />

                {/* Default Redirect */}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </ErrorBoundary>
          </div>
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
