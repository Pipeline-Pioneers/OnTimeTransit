package PipelinePioneers.example.route_service;


import org.springframework.data.jpa.repository.JpaRepository;


public interface RouteRepository extends JpaRepository<Route, Long> {
}

// Removed RouteService class to place it in its own file


