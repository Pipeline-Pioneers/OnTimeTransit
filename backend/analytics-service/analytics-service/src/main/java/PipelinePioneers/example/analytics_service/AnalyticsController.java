// filepath: ManagementSystemBus/analytics-service/src/main/java/PipelinePioneers/example/analytics_service/AnalyticsController.java
package PipelinePioneers.example.analytics_service;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {
    private final AnalyticsService analyticsService;

    public AnalyticsController(AnalyticsService analyticsService) {
        this.analyticsService = analyticsService;
    }

    @GetMapping("/summary")
    public AnalyticsSummary getSummary() {
        return analyticsService.getSummary();
    }

    @GetMapping("/test-db")
    public String testDatabaseConnection() {
        return "Database connection is successful!";
    }
}
