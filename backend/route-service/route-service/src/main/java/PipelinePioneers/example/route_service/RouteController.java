package PipelinePioneers.example.route_service;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;
import java.util.List;

@RestController
@RequestMapping("/api/routes")
public class RouteController {
    private final RouteService routeService;

    public RouteController(RouteService routeService) {
        this.routeService = routeService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin/routes")
    public List<Route> getAllRoutes() {
        return routeService.getAllRoutes();
    }

    @PostMapping
    public ResponseEntity<Route> createRoute(@RequestBody Route route) {
        System.out.println("Received route: " + route); // Debugging log
        Route savedRoute = routeService.saveRoute(route);
        return ResponseEntity.ok(savedRoute);
    }

    @DeleteMapping("/{id}")
    public void deleteRoute(@PathVariable Long id) {
        routeService.deleteRoute(id);
    }

    @PutMapping("/{id}")
    public Route updateRoute(@PathVariable Long id, @RequestBody Route updatedRoute) {
        Route existingRoute = routeService.getRouteById(id);
        existingRoute.setStartPoint(updatedRoute.getStartPoint());
        existingRoute.setEndPoint(updatedRoute.getEndPoint());
        existingRoute.setIntermediateStops(updatedRoute.getIntermediateStops());
        existingRoute.setDistance(updatedRoute.getDistance());
        existingRoute.setEstimatedTravelTime(updatedRoute.getEstimatedTravelTime());
        return routeService.saveRoute(existingRoute);
    }
}
