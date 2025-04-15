package PipelinePioneers.example.schedule_service;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalTime;

@Data
@Entity
public class BusSchedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String routeName;
    private LocalTime departureTime;
    private LocalTime arrivalTime;
    private String frequency; // e.g., "Daily", "Weekly"
}