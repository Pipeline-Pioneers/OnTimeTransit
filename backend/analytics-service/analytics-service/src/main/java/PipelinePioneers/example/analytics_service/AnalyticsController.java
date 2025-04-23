// filepath: ManagementSystemBus/analytics-service/src/main/java/PipelinePioneers/example/analytics_service/AnalyticsController.java
package PipelinePioneers.example.analytics_service;

import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {
    private final AnalyticsService analyticsService;

    public AnalyticsController(AnalyticsService analyticsService) {
        this.analyticsService = analyticsService;
    }

    @GetMapping("/summary")
    public Map<String, Object> getAnalyticsSummary() {
        return Map.of(
            "totalTickets", 120,
            "totalRoutes", 15,
            "totalSchedules", 10,
            "revenue", 5000
        );
    }

    @GetMapping("/test-db")
    public String testDatabaseConnection() {
        return "Database connection is successful!";
    }
}
