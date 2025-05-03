import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ApiService } from "../../services/ApiService";
import { toast } from "react-toastify";

function ViewSchedules() {
  const { routeId } = useParams(); // Get the route ID from the URL
  const [schedules, setSchedules] = useState([]);
  const [route, setRoute] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the route details
    ApiService.getRoutes()
      .then((routes) => {
        const selectedRoute = routes.find((r) => r.id === Number(routeId));
        if (selectedRoute) {
          setRoute(selectedRoute);
        } else {
          toast.error("Route not found.");
          navigate("/user");
        }
      })
      .catch(() => toast.error("Failed to fetch route details."));

    // Fetch schedules for the route
    ApiService.getSchedulesByRoute(routeId)
      .then((data) => setSchedules(data))
      .catch(() => toast.error("Failed to fetch schedules."));
  }, [routeId, navigate]);

  const handleBookTicket = (schedule) => {
    navigate("/user/book-ticket", { state: { schedule, route } });
  };

  return (
    <div className="container mt-5">
      {route && (
        <>
          <h1>Schedules for {route.startPoint} → {route.endPoint}</h1>
          <p>Distance: {route.distance} km</p>
          <p>Estimated Travel Time: {route.estimatedTravelTime}</p>
        </>
      )}

      <h2>Available Schedules</h2>
      {schedules.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Departure Time</th>
              <th>Arrival Time</th>
              <th>Frequency</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((schedule) => (
              <tr key={schedule.id}>
                <td>{schedule.departureTime}</td>
                <td>{schedule.arrivalTime}</td>
                <td>{schedule.frequency}</td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => handleBookTicket(schedule)}
                  >
                    Book Ticket
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No schedules available for this route.</p>
      )}

      <button className="btn btn-secondary mt-3" onClick={() => navigate("/user")}>
        Back to Routes
      </button>
    </div>
  );
}

export default ViewSchedules;