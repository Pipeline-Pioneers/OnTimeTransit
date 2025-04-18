package PipelinePioneers.example.ticket_service;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
    List<Ticket> findByRouteNameAndTravelDateTime(String routeName, LocalDateTime travelDateTime);
}
