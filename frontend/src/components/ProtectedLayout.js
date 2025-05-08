import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import AuthService from "../services/AuthService";

function ProtectedLayout({ children, allowedRoles }) {
  const role = AuthService.getRole(); // 'ADMIN', 'USER', or null
  const location = useLocation();

  if (!role) {
    // Not logged in
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(role)) {
    // Logged in, but role not allowed
    return <Navigate to="/" replace />;
  }

  return <>{children}</>; // Only the child components (content) are returned.
}

export default ProtectedLayout;
