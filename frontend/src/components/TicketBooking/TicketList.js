import React, { useEffect, useState } from "react";
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { ApiService } from "../../services/ApiService";
import { toast } from "react-toastify";

function TicketList() {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [ticketsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [ticketToCancel, setTicketToCancel] = useState(null);

  useEffect(() => {
    ApiService.getTickets()
      .then((data) => {
        setTickets(data);
        setFilteredTickets(data);
      })
      .catch((error) => console.error("Error fetching tickets:", error));
  }, []);

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

  const handleCancelClick = (ticket) => {
    setTicketToCancel(ticket);
    setOpenDialog(true);
  };

  const confirmCancelTicket = () => {
    if (ticketToCancel) {
      ApiService.cancelTicket(ticketToCancel.id)
        .then(() => {
          toast.success("Ticket canceled successfully!");
          setTickets((prev) =>
            prev.map((ticket) =>
              ticket.id === ticketToCancel.id ? { ...ticket, status: "Canceled" } : ticket
            )
          );
          setFilteredTickets((prev) =>
            prev.map((ticket) =>
              ticket.id === ticketToCancel.id ? { ...ticket, status: "Canceled" } : ticket
            )
          );
        })
        .catch((error) => {
          toast.error("Failed to cancel ticket.");
          console.error("Error canceling ticket:", error);
        })
        .finally(() => {
          setOpenDialog(false);
          setTicketToCancel(null);
        });
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setTicketToCancel(null);
  };

  // Pagination logic
  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = filteredTickets.slice(indexOfFirstTicket, indexOfLastTicket);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-5">
      <h2>All Tickets</h2>
      <TextField
        label="Search Tickets"
        variant="outlined"
        fullWidth
        margin="normal"
        value={search}
        onChange={handleSearch}
      />
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
            {currentTickets.map((ticket) => (
              <TableRow
                key={ticket.id}
                style={{
                  backgroundColor: ticket.status === "Canceled" ? "#f8d7da" : "inherit",
                }}
              >
                <TableCell>{ticket.passengerName}</TableCell>
                <TableCell>{ticket.routeName}</TableCell>
                <TableCell>{new Date(ticket.travelDateTime).toLocaleString()}</TableCell>
                <TableCell>{ticket.seatNumber}</TableCell>
                <TableCell>{ticket.status}</TableCell>
                <TableCell>
                  {ticket.status !== "Canceled" && (
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleCancelClick(ticket)}
                    >
                      Cancel
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <div className="pagination mt-3">
        {Array.from(
          { length: Math.ceil(filteredTickets.length / ticketsPerPage) },
          (_, i) => (
            <Button
              key={i + 1}
              variant={currentPage === i + 1 ? "contained" : "outlined"}
              onClick={() => paginate(i + 1)}
            >
              {i + 1}
            </Button>
          )
        )}
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Cancel Ticket</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to cancel the ticket for{" "}
            <strong>{ticketToCancel?.passengerName}</strong> on route{" "}
            <strong>{ticketToCancel?.routeName}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            No
          </Button>
          <Button onClick={confirmCancelTicket} color="error">
            Yes, Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default TicketList;