package PipelinePioneers.example.ticket_service;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;



@Data
@Entity
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String passengerName;
    private String email;
    private String phoneNumber;

    private String routeName;
    private LocalDateTime travelDateTime;

    private int seatNumber;
    private double price;

    @Enumerated(EnumType.STRING)
    private TicketStatus status; // e.g., BOOKED, CANCELLED
}
