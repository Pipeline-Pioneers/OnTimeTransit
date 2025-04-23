package PipelinePioneers.example.route_service;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RouteService {

    private final RouteRepository routeRepository;

    public RouteService(RouteRepository routeRepository) {
        this.routeRepository = routeRepository;
    }

    public List<Route> getAllRoutes() {
        return routeRepository.findAll();
    }

    public Route saveRoute(Route route) {
        System.out.println("Saving route: " + route); // Debugging log
        return routeRepository.save(route);
    }

    public void deleteRoute(Long id) {
        routeRepository.deleteById(id);
    }

    public Route getRouteById(Long id) {
        // Fetch a Route by ID or throw an exception if not found
        return routeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Route not found with ID: " + id));
    }
}