import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import { ApiService } from "../../services/ApiService";
import { toast } from "react-toastify";

function TicketList() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    ApiService.getTickets()
      .then((data) => setTickets(data))
      .catch((error) => console.error("Error fetching tickets:", error));
  }, []);

  const cancelTicket = (id) => {
    ApiService.cancelTicket(id)
      .then(() => {
        toast.success("Ticket canceled successfully!");
        setTickets((prev) => prev.map((ticket) => (ticket.id === id ? { ...ticket, status: "Canceled" } : ticket)));
      })
      .catch((error) => {
        toast.error("Failed to cancel ticket.");
        console.error("Error canceling ticket:", error);
      });
  };

  return (
    <div className="container mt-5">
      <h2>All Tickets</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Passenger Name</TableCell>
              <TableCell>Route Name</TableCell>
              <TableCell>Travel Date</TableCell>
              <TableCell>Seat Number</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell>{ticket.passengerName}</TableCell>
                <TableCell>{ticket.routeName}</TableCell>
                <TableCell>{new Date(ticket.travelDateTime).toLocaleString()}</TableCell>
                <TableCell>{ticket.seatNumber}</TableCell>
                <TableCell>{ticket.status}</TableCell>
                <TableCell>
                  {ticket.status !== "Canceled" && (
                    <Button variant="contained" color="error" onClick={() => cancelTicket(ticket.id)}>
                      Cancel
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default TicketList;