import React, { useEffect, useState } from "react";
import { ApiService } from "../../services/ApiService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../Navbar";

function UserDashboard() {
  const [routes, setRoutes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    ApiService.getRoutes()
      .then((data) => setRoutes(data))
      .catch((error) => toast.error("Failed to fetch routes."));
  }, []);

  const handleBookTicket = (route) => {
    navigate("/user/book-ticket", { state: { route } });
  };

  return (
    <div className="container mt-5">
      <Navbar />
      <h1>Available Routes</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Start Point</th>
            <th>End Point</th>
            <th>Intermediate Stops</th>
            <th>Distance (km)</th>
            <th>Estimated Travel Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {routes.length > 0 ? (
            routes.map((route) => (
              <tr key={route.id}>
                <td>{route.startPoint}</td>
                <td>{route.endPoint}</td>
                <td>{route.intermediateStops}</td>
                <td>{route.distance}</td>
                <td>{route.estimatedTravelTime}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleBookTicket(route)}
                  >
                    Book Ticket
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} align="center">
                No routes available. Please check back later.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserDashboard;