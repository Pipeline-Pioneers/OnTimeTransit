package PipelinePioneers.example.ticket_service;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TicketService {
    private final TicketRepository repository;

    public TicketService(TicketRepository repository) {
        this.repository = repository;
    }

    // Fetch all tickets
    public List<Ticket> getAllTickets() {
        return repository.findAll();
    }

    public Ticket bookTicket(Ticket ticket) {
        ticket.setStatus(TicketStatus.BOOKED);
        return repository.save(ticket);
    }

    // Fetch tickets by routeName and travelDateTime
    public List<Ticket> getTicketsByRouteAndDate(String routeName, LocalDateTime travelDateTime) {
        return repository.findByRouteNameAndTravelDateTime(routeName, travelDateTime);
    }

    public void cancelTicket(Long ticketId) {
        Ticket ticket = repository.findById(ticketId).orElseThrow(() -> new RuntimeException("Ticket not found"));
        ticket.setStatus(TicketStatus.CANCELLED);
        repository.save(ticket);
    }
}
