package PipelinePioneers.example.schedule_service;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/schedules")
public class ScheduleController {
    private final ScheduleService scheduleService;

    public ScheduleController(ScheduleService scheduleService) {
        this.scheduleService = scheduleService;
    }

    @GetMapping
    public List<BusSchedule> getAllSchedules() {
        return scheduleService.getAllSchedules();
    }

    @PostMapping
    public BusSchedule createSchedule(@RequestBody BusSchedule schedule) {
        return scheduleService.saveSchedule(schedule);
    }

    @DeleteMapping("/{id}")
    public void deleteSchedule(@PathVariable Long id) {
        scheduleService.deleteSchedule(id);
    }

    @PutMapping("/{id}")
    public BusSchedule updateSchedule(@PathVariable Long id, @RequestBody BusSchedule updatedSchedule) {
        BusSchedule existingSchedule = scheduleService.getScheduleById(id);
        existingSchedule.setRouteName(updatedSchedule.getRouteName());
        existingSchedule.setDepartureTime(updatedSchedule.getDepartureTime());
        existingSchedule.setArrivalTime(updatedSchedule.getArrivalTime());
        existingSchedule.setFrequency(updatedSchedule.getFrequency());
        return scheduleService.saveSchedule(existingSchedule);
    }

    @GetMapping("/route/{routeId}")
    public ResponseEntity<List<BusSchedule>> getSchedulesByRoute(@PathVariable Long routeId) {
        List<BusSchedule> schedules = scheduleService.getSchedulesByRoute(routeId);
        return ResponseEntity.ok(schedules);
    }
}
