package PipelinePioneers.example.schedule_service;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScheduleRepository extends JpaRepository<BusSchedule, Long> {
    List<BusSchedule> findByRouteId(Long routeId);
}
