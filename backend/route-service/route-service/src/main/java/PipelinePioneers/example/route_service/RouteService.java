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
        return routeRepository.save(route);
    }

    public void deleteRoute(Long id) {
        routeRepository.deleteById(id);
    }
}