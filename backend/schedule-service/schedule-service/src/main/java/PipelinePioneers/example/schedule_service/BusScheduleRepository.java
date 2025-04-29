package PipelinePioneers.example.schedule_service;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BusScheduleRepository extends JpaRepository<BusSchedule, Long> {
    List<BusSchedule> findByRouteName(String routeName); // Use routeName instead of routeId
    // Find schedules by routeId
    List<BusSchedule> findByRouteId(Long routeId);
}
