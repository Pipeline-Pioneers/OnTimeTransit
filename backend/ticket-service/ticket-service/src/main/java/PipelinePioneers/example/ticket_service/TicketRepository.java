package PipelinePioneers.example.ticket_service;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
    List<Ticket> findByRouteNameAndTravelDateTime(String routeName, LocalDateTime travelDateTime);
}
