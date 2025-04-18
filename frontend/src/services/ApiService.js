import axios from "axios";
import { toast } from "react-toastify";

const ROUTE_SERVICE_URL = "http://localhost:8084/api/routes";
const SCHEDULE_SERVICE_URL = "http://localhost:8085/api/schedules";
const TICKET_SERVICE_URL = "http://localhost:8087/api/tickets";
const USER_SERVICE_URL = "http://localhost:8089/api/auth";
const NOTIFICATION_SERVICE_URL = "http://localhost:8085/api/notifications";
const ANALYTICS_SERVICE_URL = "http://localhost:8086/api/analytics";

const handleApiError = (error) => {
  if (error.response) {
    // Server responded with a status other than 2xx
    toast.error(error.response.data.message || "An error occurred.");
  } else if (error.request) {
    // Request was made but no response received
    toast.error("No response from the server. Please try again.");
  } else {
    // Something else happened
    toast.error("An unexpected error occurred.");
  }
  console.error("API Error:", error);
  throw error; // Re-throw the error for further handling if needed
};

const ApiService = {
  // Routes
  getRoutes: async () => {
    const response = await axios.get(ROUTE_SERVICE_URL).catch(handleApiError);
    return response.data;
  },
  getRouteById: (id) => axios.get(`${ROUTE_SERVICE_URL}/${id}`).then((response) => response.data).catch(handleApiError),
  addRoute: (route) => axios.post(`${ROUTE_SERVICE_URL}`, route).then((response) => response.data).catch(handleApiError),
  updateRoute: (id, route) => axios.put(`${ROUTE_SERVICE_URL}/${id}`, route).then((res) => res.data).catch(handleApiError),
  deleteRoute: async (id) => {
    const response = await axios.delete(`${ROUTE_SERVICE_URL}/${id}`).catch(handleApiError);
    return response.data;
  },

  // Schedules
  getSchedules: () => axios.get(`${SCHEDULE_SERVICE_URL}`).then((res) => res.data).catch(handleApiError),
  addSchedule: (schedule) => axios.post(`${SCHEDULE_SERVICE_URL}`, schedule).then((res) => res.data).catch(handleApiError),
  deleteSchedule: (id) => axios.delete(`${SCHEDULE_SERVICE_URL}/${id}`).then((res) => res.data).catch(handleApiError),
  getSchedulesByRoute: (routeId) =>
    axios
      .get(`${SCHEDULE_SERVICE_URL}/route/${routeId}`)
      .then((res) => res.data)
      .catch(handleApiError),

  // Tickets
  getTickets: (routeName, travelDateTime) =>
    axios
      .get(`${TICKET_SERVICE_URL}`, {
        params: { routeName, travelDateTime },
      })
      .then((res) => res.data)
      .catch(handleApiError),
  bookTicket: (ticket) =>
    axios.post(`${TICKET_SERVICE_URL}/book`, ticket).then((res) => res.data).catch(handleApiError),
  cancelTicket: (id) => axios.delete(`${TICKET_SERVICE_URL}/${id}`).then((res) => res.data).catch(handleApiError),
  getAvailableSeats: (routeName, travelDateTime) =>
    axios
      .get(`${TICKET_SERVICE_URL}/available-seats`, {
        params: { routeName, travelDateTime },
      })
      .then((res) => res.data)
      .catch(handleApiError),

  // Authentication
  login: (credentials) => axios.post(`${USER_SERVICE_URL}/login`, credentials).then((res) => res.data).catch(handleApiError),
  register: (user) => axios.post(`${USER_SERVICE_URL}/register`, user).then((res) => res.data).catch(handleApiError),

  // Notifications
  sendNotification: (message) =>
    axios.post(`${NOTIFICATION_SERVICE_URL}/send`, { message }).then((res) => res.data).catch(handleApiError),

  // Analytics
  getAnalyticsSummary: () =>
    axios.get(`${ANALYTICS_SERVICE_URL}/summary`).then((res) => res.data).catch(handleApiError),
};

export { ApiService };