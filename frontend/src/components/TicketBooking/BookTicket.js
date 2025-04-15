import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ApiService } from "../../services/ApiService";

function BookTicket() {
  const [ticket, setTicket] = useState({
    passengerName: "",
    email: "",
    phoneNumber: "",
    routeName: "",
    travelDateTime: "",
    seatNumber: "",
  });
  const [routes, setRoutes] = useState([]); // State to store available routes
  const navigate = useNavigate();

  // Fetch available routes on component mount
  useEffect(() => {
    ApiService.getRoutes()
      .then((data) => setRoutes(data))
      .catch((error) => console.error("Error fetching routes:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicket({ ...ticket, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    ApiService.bookTicket(ticket)
        .then(() => {
            toast.success("Ticket booked successfully!");
            navigate("/user/tickets");
        })
        .catch((error) => {
            toast.error("Failed to book ticket. Please try again.");
            console.error("Error booking ticket:", error);
        });
  };

  return (
    <div className="container mt-5">
      <h2>Book Ticket</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Passenger Name</label>
          <input
            type="text"
            className="form-control"
            name="passengerName"
            value={ticket.passengerName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={ticket.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input
            type="text"
            className="form-control"
            name="phoneNumber"
            value={ticket.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Route Name</label>
          <select
            className="form-control"
            name="routeName"
            value={ticket.routeName}
            onChange={handleChange}
            required
          >
            <option value="">Select a Route</option>
            {routes.map((route) => (
              <option key={route.id} value={`${route.startPoint} - ${route.endPoint}`}>
                {route.startPoint} - {route.endPoint}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Travel Date and Time</label>
          <input
            type="datetime-local"
            className="form-control"
            name="travelDateTime"
            value={ticket.travelDateTime}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Seat Number</label>
          <input
            type="number"
            className="form-control"
            name="seatNumber"
            value={ticket.seatNumber}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Book Ticket</button>
      </form>
    </div>
  );
}

export default BookTicket;