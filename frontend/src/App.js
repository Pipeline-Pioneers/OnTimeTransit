import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar"; // ✅ Navbar imported once

import ProtectedLayout from "./components/ProtectedLayout"; // ✅ Only imported once
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
import ManageRoutes from "./components/Admin/ManageRoutes";

import { AuthProvider } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";
import ErrorBoundary from "./components/ErrorBoundary";

import "./App.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        <DataProvider>
          <div className="App">
            <Navbar /> {/* ✅ Navbar visible on all pages */}
            <div className="container">
              <ErrorBoundary>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />

                  {/* Admin Routes */}
                  <Route
                    path="/admin"
                    element={
                      <ProtectedLayout allowedRoles={["ADMIN"]}>
                        <AdminDashboard />
                      </ProtectedLayout>
                    }
                  />
                  <Route
                    path="/admin/schedules"
                    element={
                      <ProtectedLayout allowedRoles={["ADMIN"]}>
                        <BusScheduleList />
                      </ProtectedLayout>
                    }
                  />
                  <Route
                    path="/admin/schedules/add"
                    element={
                      <ProtectedLayout allowedRoles={["ADMIN"]}>
                        <AddBusSchedule />
                      </ProtectedLayout>
                    }
                  />
                  <Route
                    path="/admin/tickets"
                    element={
                      <ProtectedLayout allowedRoles={["ADMIN"]}>
                        <ManageTickets />
                      </ProtectedLayout>
                    }
                  />
                  <Route
                    path="/admin/routes"
                    element={
                      <ProtectedLayout allowedRoles={["ADMIN"]}>
                        <ManageRoutes />
                      </ProtectedLayout>
                    }
                  />
                  <Route
                    path="/admin/routes/add"
                    element={
                      <ProtectedLayout allowedRoles={["ADMIN"]}>
                        <AddRoute />
                      </ProtectedLayout>
                    }
                  />

                  {/* User Routes */}
                  <Route
                    path="/user"
                    element={
                      <ProtectedLayout allowedRoles={["USER"]}>
                        <UserDashboard />
                      </ProtectedLayout>
                    }
                  />
                  <Route
                    path="/user/tickets"
                    element={
                      <ProtectedLayout allowedRoles={["USER"]}>
                        <TicketList />
                      </ProtectedLayout>
                    }
                  />
                  <Route
                    path="/user/book-ticket"
                    element={
                      <ProtectedLayout allowedRoles={["USER"]}>
                        <BookTicket />
                      </ProtectedLayout>
                    }
                  />
                  <Route
                    path="/user/routes"
                    element={
                      <ProtectedLayout allowedRoles={["USER"]}>
                        <RouteList />
                      </ProtectedLayout>
                    }
                  />

                  {/* Catch-All Redirect */}
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </ErrorBoundary>
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
          </div>
        </DataProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
