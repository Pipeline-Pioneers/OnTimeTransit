package PipelinePioneers.example.ticket_service;

import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {
    private final TicketService service;

    public TicketController(TicketService service) {
        this.service = service;
    }

    // Book a ticket
    @PostMapping("/book")
    public Ticket bookTicket(@RequestBody Ticket ticket) {
        return service.bookTicket(ticket); // Save the ticket to the database
    }

    // Fetch all tickets or filter by routeName and travelDateTime
    @GetMapping
    public List<Ticket> getTickets(
            @RequestParam(required = false) String routeName,
            @RequestParam(required = false) String travelDateTime) {
        if (routeName != null && travelDateTime != null) {
            return service.getTicketsByRouteAndDate(routeName, LocalDateTime.parse(travelDateTime));
        }
        return service.getAllTickets();
    }

    // Cancel a ticket
    @PutMapping("/cancel/{id}")
    public void cancelTicket(@PathVariable Long id) {
        service.cancelTicket(id);
    }

    // Get available seats
    @GetMapping("/available-seats")
    public List<Integer> getAvailableSeats(
            @RequestParam String routeName,
            @RequestParam String travelDateTime) {
        return service.getAvailableSeats(routeName, LocalDateTime.parse(travelDateTime));
    }
}
