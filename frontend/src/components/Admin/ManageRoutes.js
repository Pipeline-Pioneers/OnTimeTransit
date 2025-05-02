import React, { useEffect, useState } from "react";
import { ApiService } from "../../services/ApiService";
import { toast } from "react-toastify";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
} from "@mui/material";
import { useData } from "../../context/DataContext";

function ManageRoutes() {
  const { routes, setRoutes } = useData(); // Destructure both routes and setRoutes
  const [newRoute, setNewRoute] = useState({
    startPoint: "",
    endPoint: "",
    intermediateStops: "",
    distance: "",
    estimatedTravelTime: "",
  });
  const [error, setError] = useState(null);

  // Fetch routes on component mount
  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    try {
      const data = await ApiService.getRoutes();
      setRoutes(data); // Ensure this updates the state
    } catch (err) {
      setError(err.message);
      toast.error("Failed to fetch routes.");
    }
  };

  // Handle adding a new route
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(newRoute); // Log the route data to verify
    try {
      await ApiService.addRoute(newRoute); // Add the new route
      toast.success("Route added successfully!");
      await fetchRoutes(); // Refresh the list of routes after adding
      setNewRoute({
        startPoint: "",
        endPoint: "",
        intermediateStops: "",
        distance: "",
        estimatedTravelTime: "",
      }); // Reset the form fields
    } catch (err) {
      setError(err.message);
      toast.error("Failed to add route. Please try again.");
      console.error("Error adding route:", err);
    }
  };

  // Handle deleting a route
  const handleDeleteRoute = async (routeId) => {
    try {
      await ApiService.deleteRoute(routeId);
      toast.success("Route deleted successfully!");
      setRoutes((prevRoutes) => prevRoutes.filter((route) => route.id !== routeId)); // Optimistic update
    } catch (err) {
      setError(err.message);
      toast.error("Failed to delete route.");
    }
  };

  return (
    <div className="container mt-5">
      <h1>Manage Routes</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Add Route Form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <TextField
            label="Start Point"
            variant="outlined"
            fullWidth
            value={newRoute.startPoint}
            onChange={(e) => setNewRoute({ ...newRoute, startPoint: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <TextField
            label="End Point"
            variant="outlined"
            fullWidth
            value={newRoute.endPoint}
            onChange={(e) => setNewRoute({ ...newRoute, endPoint: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <TextField
            label="Intermediate Stops"
            variant="outlined"
            fullWidth
            value={newRoute.intermediateStops}
            onChange={(e) => setNewRoute({ ...newRoute, intermediateStops: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <TextField
            label="Distance (km)"
            variant="outlined"
            fullWidth
            type="number"
            value={newRoute.distance}
            onChange={(e) => setNewRoute({ ...newRoute, distance: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <TextField
            label="Estimated Travel Time"
            variant="outlined"
            fullWidth
            value={newRoute.estimatedTravelTime}
            onChange={(e) =>
              setNewRoute({ ...newRoute, estimatedTravelTime: e.target.value })
            }
            required
          />
        </div>
        <Button type="submit" variant="contained" color="primary">
          Add Route
        </Button>
      </form>

      {/* Routes Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Start Point</TableCell>
              <TableCell>End Point</TableCell>
              <TableCell>Intermediate Stops</TableCell>
              <TableCell>Distance (km)</TableCell>
              <TableCell>Estimated Travel Time</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {routes.length > 0 ? (
              routes.map((route) => (
                <TableRow key={route.id}>
                  <TableCell>{route.startPoint}</TableCell>
                  <TableCell>{route.endPoint}</TableCell>
                  <TableCell>{route.intermediateStops}</TableCell>
                  <TableCell>{route.distance}</TableCell>
                  <TableCell>{route.estimatedTravelTime}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDeleteRoute(route.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No routes available. Add a new route to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ManageRoutes;