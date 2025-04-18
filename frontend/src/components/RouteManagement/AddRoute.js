import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ApiService } from "../../services/ApiService";
import { useForm } from "react-hook-form";

function AddRoute() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    ApiService.addRoute(data)
      .then(() => {
        toast.success("Route added successfully!");
        navigate("/admin/routes");
      })
      .catch((error) => {
        toast.error("Failed to add route. Please try again.");
        console.error("Error adding route:", error);
      });
  };

  return (
    <div className="container mt-5">
      <h2>Add Route</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label">Start Point</label>
          <input
            type="text"
            className="form-control"
            {...register("startPoint", { required: "Start Point is required" })}
          />
          {errors.startPoint && <p className="text-danger">{errors.startPoint.message}</p>}
        </div>
        <div className="mb-3">
          <label className="form-label">End Point</label>
          <input
            type="text"
            className="form-control"
            {...register("endPoint", { required: "End Point is required" })}
          />
          {errors.endPoint && <p className="text-danger">{errors.endPoint.message}</p>}
        </div>
        <div className="mb-3">
          <label className="form-label">Intermediate Stops</label>
          <input
            type="text"
            className="form-control"
            {...register("intermediateStops")}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Distance (km)</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            {...register("distance", { required: "Distance is required" })}
          />
          {errors.distance && <p className="text-danger">{errors.distance.message}</p>}
        </div>
        <div className="mb-3">
          <label className="form-label">Estimated Travel Time</label>
          <input
            type="text"
            className="form-control"
            {...register("estimatedTravelTime", { required: "Estimated Travel Time is required" })}
          />
          {errors.estimatedTravelTime && <p className="text-danger">{errors.estimatedTravelTime.message}</p>}
        </div>
        <button type="submit" className="btn btn-primary">
          Add Route
        </button>
      </form>
    </div>
  );
}

export default AddRoute;