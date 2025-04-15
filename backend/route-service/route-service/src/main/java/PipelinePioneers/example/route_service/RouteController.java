package PipelinePioneers.example.route_service;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/routes")
public class RouteController {
    private final RouteService service;

    public RouteController(RouteService service) {
        this.service = service;
    }

    @GetMapping
    public List<Route> getAllRoutes() {
        return service.getAllRoutes();
    }

    @PostMapping
    public Route createRoute(@RequestBody Route route) {
        return service.saveRoute(route);
    }

    @PutMapping("/{id}")
    public Route updateRoute(@PathVariable Long id, @RequestBody Route route) {
        return service.updateRoute(id, route);
    }

    @DeleteMapping("/{id}")
    public void deleteRoute(@PathVariable Long id) {
        service.deleteRoute(id);
    }

    @GetMapping("/test-db")
    public String testDatabaseConnection() {
        return "Database connection is successful!";
    }
}
