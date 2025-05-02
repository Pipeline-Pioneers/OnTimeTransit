package PipelinePioneers.example.schedule_service;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BusScheduleService {
    private final BusScheduleRepository repository;

    public BusScheduleService(BusScheduleRepository repository) {
        this.repository = repository;
    }

    public List<BusSchedule> getAllSchedules() {
        return repository.findAll();
    }

    public BusSchedule saveSchedule(BusSchedule schedule) {
        return repository.save(schedule);
    }

    public void deleteSchedule(Long id) {
        repository.deleteById(id);
    }

    public BusSchedule getScheduleById(Long id) {
        // Fetch a BusSchedule by ID or throw an exception if not found
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Schedule not found with ID: " + id));
    }
}
