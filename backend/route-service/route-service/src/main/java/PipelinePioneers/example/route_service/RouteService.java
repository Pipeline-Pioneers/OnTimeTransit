package PipelinePioneers.example.route_service;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class RouteService {
    private final RouteRepository repository;

    public RouteService(RouteRepository repository) {
        this.repository = repository;
    }

    public List<Route> getAllRoutes() {
        return repository.findAll();
    }

    public Route saveRoute(Route route) {
        return repository.save(route);
    }

    public Route updateRoute(Long id, Route updatedRoute) {
        Route existingRoute = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Route not found"));
        existingRoute.setStartPoint(updatedRoute.getStartPoint());
        existingRoute.setEndPoint(updatedRoute.getEndPoint());
        existingRoute.setIntermediateStops(updatedRoute.getIntermediateStops());
        existingRoute.setDistance(updatedRoute.getDistance());
        existingRoute.setEstimatedTravelTime(updatedRoute.getEstimatedTravelTime());
        return repository.save(existingRoute);
    }

    public void deleteRoute(Long id) {
        repository.deleteById(id);
    }
}