package PipelinePioneers.example.route_service;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface RouteRepository extends JpaRepository<Route, Long> {
}

// Removed RouteService class to place it in its own file


