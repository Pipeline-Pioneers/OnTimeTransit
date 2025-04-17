import axios from "axios";

const USER_SERVICE_URL = "http://localhost:8089/api/auth";

const AuthService = {
  register: (user) => {
    return axios.post(`${USER_SERVICE_URL}/register`, user);
  },

  login: (credentials) => {
    return axios.post(`${USER_SERVICE_URL}/login`, credentials);
  },

  logout: () => {
    // Handle logout logic if necessary
  },
};

