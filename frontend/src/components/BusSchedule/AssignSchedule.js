import React, { useState, useEffect } from "react";
import { ApiService } from "../../services/ApiService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AssignSchedule() {
  const [routes, setRoutes] = useState([]);
  const [schedule, setSchedule] = useState({
    routeId: "",
    departureTime: "",
    arrivalTime: "",
    frequency: "",
  });
  const navigate = useNavigate();

  // Fetch all routes on component mount
  useEffect(() => {
    ApiService.getRoutes()
      .then((data) => setRoutes(data))
      .catch(() => toast.error("Failed to fetch routes."));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSchedule({ ...schedule, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!schedule.routeId) {
      toast.error("Please select a route.");
      return;
    }

    ApiService.addSchedule(schedule)
      .then(() => {
        toast.success("Schedule assigned successfully!");
        navigate("/admin/schedules"); // Redirect to the schedule list page
      })
      .catch(() => toast.error("Failed to assign schedule. Please try again."));
  };

  return (
    <div className="container mt-5">
      <h2>Assign Schedule to Route</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Select Route</label>
          <select
            className="form-control"
            name="routeId"
            value={schedule.routeId}
            onChange={handleChange}
            required
          >
            <option value="">Select a Route</option>
            {routes.map((route) => (
              <option key={route.id} value={route.id}>
                {route.startPoint} → {route.endPoint}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Departure Time</label>
          <input
            type="time"
            className="form-control"
            name="departureTime"
            value={schedule.departureTime}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Arrival Time</label>
          <input
            type="time"
            className="form-control"
            name="arrivalTime"
            value={schedule.arrivalTime}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Frequency</label>
          <select
            className="form-control"
            name="frequency"
            value={schedule.frequency}
            onChange={handleChange}
            required
          >
            <option value="">Select Frequency</option>
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Assign Schedule
        </button>
      </form>
    </div>
  );
}

export default AssignSchedule;