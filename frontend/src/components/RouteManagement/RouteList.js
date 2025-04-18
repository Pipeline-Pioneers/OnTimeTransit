import React, { useEffect, useState } from "react";
import { ApiService } from "../../services/ApiService";
import { Client } from "@stomp/stompjs";
import { useNavigate } from "react-router-dom";

function RouteList() {
  const [routes, setRoutes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch initial routes
    ApiService.getRoutes()
      .then((data) => {
        setRoutes(data);
      })
      .catch((error) => {
        console.error("Error fetching routes:", error);
      });

    // Set up WebSocket client
    const client = new Client({
      brokerURL: "ws://localhost:8084/ws", // Ensure this matches the backend WebSocket endpoint
      connectHeaders: {}, // Optional: Add headers if needed
      debug: (str) => console.log(str), // Enable debugging
      reconnectDelay: 5000, // Reconnect after 5 seconds if disconnected
      onConnect: () => {
        console.log("Connected to WebSocket");
        client.subscribe("/topic/routes", (message) => {
          const newRoute = JSON.parse(message.body);
          setRoutes((prevRoutes) => [...prevRoutes, newRoute]);
        });
      },
      onStompError: (frame) => {
        console.error("Broker reported error: " + frame.headers["message"]);
        console.error("Additional details: " + frame.body);
      },
    });

    client.activate();

    return () => client.deactivate();
  }, []);

  return (
    <div className="container mt-5">
      <h1>Manage Routes</h1>
      <ul className="list-group">
        {routes.length > 0 ? (
          routes.map((route) => (
            <li key={route.id} className="list-group-item d-flex justify-content-between align-items-center">
              {route.startPoint} → {route.endPoint} ({route.estimatedTravelTime})
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => navigate(`/admin/routes/update/${route.id}`)}
              >
                Update
              </button>
            </li>
          ))
        ) : (
          <p>No routes available. Add a new route to get started.</p>
        )}
      </ul>
    </div>
  );
}

export default RouteList;