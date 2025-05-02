package PipelinePioneers.example.schedule_service;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScheduleService {

    private final BusScheduleRepository scheduleRepository;

    public ScheduleService(BusScheduleRepository scheduleRepository) {
        this.scheduleRepository = scheduleRepository;
    }

    public List<BusSchedule> getAllSchedules() {
        // Fetch all schedules from the database
        return scheduleRepository.findAll();
    }

    public BusSchedule saveSchedule(BusSchedule schedule) {
        return scheduleRepository.save(schedule);
    }

    public void deleteSchedule(Long id) {
        scheduleRepository.deleteById(id);
    }

    public BusSchedule getScheduleById(Long id) {
        return scheduleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Schedule not found with ID: " + id));
    }

    public List<BusSchedule> getSchedulesByRoute(Long routeId) {
        return scheduleRepository.findByRouteId(routeId);
    }
}
