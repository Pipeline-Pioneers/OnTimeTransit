package PipelinePioneers.example.analytics_service;

import org.springframework.stereotype.Service;

@Service
public class AnalyticsService {
    public AnalyticsSummary getSummary() {
        // Example logic for generating analytics summary
        return new AnalyticsSummary("Sample Data", 100);
    }
}
