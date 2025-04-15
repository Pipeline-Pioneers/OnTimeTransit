import React, { useEffect, useState } from "react";
import { ApiService } from "../../services/ApiService";

function RouteList() {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    ApiService.getRoutes()
      .then((data) => setRoutes(data))
      .catch((error) => console.error("Error fetching routes:", error));
  }, []);

  return (
    <div>
      <h1>Routes</h1>
      {/* Render route list */}
    </div>
  );
}

export default RouteList;