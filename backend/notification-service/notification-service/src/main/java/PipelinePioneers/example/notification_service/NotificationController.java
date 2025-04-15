package PipelinePioneers.example.notification_service;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    @PostMapping("/send")
    public String sendNotification(@RequestBody String message) {
        // Simulate sending a notification
        return "Notification sent: " + message;
    }

    @GetMapping("/test-db")
    public String testDatabaseConnection() {
        return "Database connection is successful!";
    }
}
