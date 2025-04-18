import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ApiService } from "../../services/ApiService";

function UpdateRoute() {
  const { id } = useParams(); // Get the route ID from the URL
  const [route, setRoute] = useState({
    startPoint: "",
    endPoint: "",
    intermediateStops: "",
    distance: "",
    estimatedTravelTime: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the existing route details
    ApiService.getRouteById(id)
      .then((data) => setRoute(data))
      .catch((error) => {
        toast.error("Failed to fetch route details.");
        console.error("Error fetching route:", error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoute({ ...route, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    ApiService.updateRoute(id, route)
      .then(() => {
        toast.success("Route updated successfully!");
        navigate("/admin/routes"); // Redirect to the route list page
      })
      .catch((error) => {
        toast.error("Failed to update route. Please try again.");
        console.error("Error updating route:", error);
      });
  };

  return (
    <div className="container mt-5">
      <h2>Update Route</h2>
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
          Update Route
        </button>
      </form>
    </div>
  );
}

export default UpdateRoute;