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

    @PostMapping("/book")
    public Ticket bookTicket(@RequestBody Ticket ticket) {
        return service.bookTicket(ticket);
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

    @PutMapping("/cancel/{id}")
    public void cancelTicket(@PathVariable Long id) {
        service.cancelTicket(id);
    }
}
