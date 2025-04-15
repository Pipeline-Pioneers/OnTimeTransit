import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ApiService } from "../../services/ApiService";

function AddRoute() {
  const [route, setRoute] = useState({
    startPoint: "",
    endPoint: "",
    intermediateStops: "",
    distance: "",
    estimatedTravelTime: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoute({ ...route, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    ApiService.addRoute(route)
      .then(() => {
        toast.success("Route added successfully!");
        navigate("/routes");
      })
      .catch((error) => {
        toast.error("Failed to add route. Please try again.");
        console.error("Error adding route:", error);
      });
  };

  return (
    <div className="container mt-5">
      <h2>Add Route</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Start Point</label>
          <input
            type="text"
            className="form-control"
            name="startPoint"
            value={route.startPoint}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">End Point</label>
          <input
            type="text"
            className="form-control"
            name="endPoint"
            value={route.endPoint}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Intermediate Stops</label>
          <input
            type="text"
            className="form-control"
            name="intermediateStops"
            value={route.intermediateStops}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Distance (km)</label>
          <input
            type="number"
            className="form-control"
            name="distance"
            value={route.distance}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Estimated Travel Time</label>
          <input
            type="text"
            className="form-control"
            name="estimatedTravelTime"
            value={route.estimatedTravelTime}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Route
        </button>
      </form>
    </div>
  );
}

export default AddRoute;