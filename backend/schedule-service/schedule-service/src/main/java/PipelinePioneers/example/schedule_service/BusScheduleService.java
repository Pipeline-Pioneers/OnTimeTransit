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
}
