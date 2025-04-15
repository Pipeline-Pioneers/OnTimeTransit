import axios from "axios";

const ROUTE_SERVICE_URL = "http://localhost:8084/api/routes";
const SCHEDULE_SERVICE_URL = "http://localhost:8085/api/schedules";
const TICKET_SERVICE_URL = "http://localhost:8087/api/tickets";
const USER_SERVICE_URL = "http://localhost:8084/api/auth";
const NOTIFICATION_SERVICE_URL = "http://localhost:8085/api/notifications";
const ANALYTICS_SERVICE_URL = "http://localhost:8086/api/analytics";

export const ApiService = {
  // Routes
  getRoutes: () => axios.get(`${ROUTE_SERVICE_URL}`).then((res) => res.data),
  addRoute: (route) => axios.post(`${ROUTE_SERVICE_URL}`, route).then((res) => res.data),
  updateRoute: (id, route) => axios.put(`${ROUTE_SERVICE_URL}/${id}`, route).then((res) => res.data),
  deleteRoute: (id) => axios.delete(`${ROUTE_SERVICE_URL}/${id}`).then((res) => res.data),

  // Schedules
  getSchedules: () => axios.get(`${SCHEDULE_SERVICE_URL}`).then((res) => res.data),
  addSchedule: (schedule) => axios.post(`${SCHEDULE_SERVICE_URL}`, schedule).then((res) => res.data),
  deleteSchedule: (id) => axios.delete(`${SCHEDULE_SERVICE_URL}/${id}`).then((res) => res.data),

  // Tickets
  getTickets: (routeName, travelDateTime) =>
    axios
      .get(`${TICKET_SERVICE_URL}`, {
        params: { routeName, travelDateTime },
      })
      .then((res) => res.data),
  bookTicket: (ticket) => axios.post(`${TICKET_SERVICE_URL}`, ticket).then((res) => res.data),
  cancelTicket: (id) => axios.delete(`${TICKET_SERVICE_URL}/${id}`).then((res) => res.data),

  // Authentication
  login: (credentials) => axios.post(`${USER_SERVICE_URL}/login`, credentials).then((res) => res.data),
  register: (user) => axios.post(`${USER_SERVICE_URL}/register`, user).then((res) => res.data),

  // Notifications
  sendNotification: (message) =>
    axios.post(`${NOTIFICATION_SERVICE_URL}/send`, { message }).then((res) => res.data),

  // Analytics
  getAnalyticsSummary: () =>
    axios.get(`${ANALYTICS_SERVICE_URL}/summary`).then((res) => res.data),
};