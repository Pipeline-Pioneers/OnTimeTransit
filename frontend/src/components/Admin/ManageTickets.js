import React, { useEffect, useState } from "react";
import { ApiService } from "../../services/ApiService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ManageTickets({ onAnalyticsUpdate }) {
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [ticket, setTicket] = useState({
    passengerName: "",
    email: "",
    phoneNumber: "",
    routeName: "",
    travelDateTime: "",
    seatNumber: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    ApiService.getTickets()
      .then((data) => {
        setTickets(data);
        setFilteredTickets(data);
        if (onAnalyticsUpdate) {
          onAnalyticsUpdate(data);
        }
      })
      .catch((error) => console.error("Error fetching tickets:", error));
  }, [onAnalyticsUpdate]);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    setFilteredTickets(
      tickets.filter(
        (ticket) =>
          ticket.passengerName.toLowerCase().includes(value) ||
          ticket.routeName.toLowerCase().includes(value) ||
          ticket.status.toLowerCase().includes(value)
      )
    );
  };

  const cancelTicket = (id) => {
    ApiService.cancelTicket(id)
      .then(() => {
        toast.success("Ticket canceled successfully!");
        setTickets((prev) => prev.filter((ticket) => ticket.id !== id));
        setFilteredTickets((prev) => prev.filter((ticket) => ticket.id !== id));
        if (onAnalyticsUpdate) {
          onAnalyticsUpdate(
            tickets.filter((ticket) => ticket.id !== id)
          );
        }
      })
      .catch((error) => console.error("Error canceling ticket:", error));
  };

  const exportTickets = () => {
    const csvContent = [
      [
        "Passenger Name",
        "Email",
        "Phone Number",
        "Route Name",
        "Travel Date",
        "Seat Number",
        "Status",
      ].join(","),
      ...tickets.map((ticket) =>
        [
          ticket.passengerName,
          ticket.email,
          ticket.phoneNumber,
          ticket.routeName,
          new Date(ticket.travelDateTime).toLocaleString(),
          ticket.seatNumber,
          ticket.status,
        ].join(",")
      ),
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "tickets.csv";
    link.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    ApiService.bookTicket(ticket)
      .then(() => {
        toast.success("Ticket booked successfully!");
        ApiService.sendNotification("A new ticket has been booked.");
        navigate("/tickets");
      })
      .catch((error) => console.error("Error booking ticket:", error));
  };

  return (
    <div className="container mt-5">
      <h2>Manage Tickets</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search tickets by name, route, or status..."
          value={search}
          onChange={handleSearch}
        />
      </div>
      <button className="btn btn-success mb-3" onClick={exportTickets}>
        Export Tickets
      </button>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Passenger Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Route Name</th>
            <th>Travel Date</th>
            <th>Seat Number</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTickets.map((ticket) => (
            <tr key={ticket.id}>
              <td>{ticket.passengerName}</td>
              <td>{ticket.email}</td>
              <td>{ticket.phoneNumber}</td>
              <td>{ticket.routeName}</td>
              <td>{new Date(ticket.travelDateTime).toLocaleString()}</td>
              <td>{ticket.seatNumber}</td>
              <td>{ticket.status}</td>
              <td>
                {ticket.status !== "Canceled" && (
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => cancelTicket(ticket.id)}
                  >
                    Cancel
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageTickets;