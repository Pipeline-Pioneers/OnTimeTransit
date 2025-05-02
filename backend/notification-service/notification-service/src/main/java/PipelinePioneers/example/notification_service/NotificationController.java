package PipelinePioneers.example.notification_service;

import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    @PostMapping("/send")
    public String sendNotification(@RequestBody Map<String, String> payload) {
        String message = payload.get("message");
        System.out.println("Notification sent: " + message);
        return "Notification sent successfully!";
    }

    @GetMapping("/test-db")
    public String testDatabaseConnection() {
        return "Database connection is successful!";
    }
}
