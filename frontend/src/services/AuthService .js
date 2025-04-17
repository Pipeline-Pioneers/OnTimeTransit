import axios from "axios";

const USER_SERVICE_URL = "http://localhost:8089/api/auth";

const AuthService = {
  register: (user) => {
    console.log("Sending registration request with payload:", user);
    return axios
      .post(`${USER_SERVICE_URL}/register`, user)
      .then((response) => {
        console.log("Registration successful:", response.data);
        return response.data;
      })
      .catch((error) => {
        console.error("Error during registration:", error);
        throw error;
      });
  },

  login: (credentials) => {
    console.log("Sending login request with credentials:", credentials);
    return axios
      .post(`${USER_SERVICE_URL}/login`, credentials)
      .then((response) => {
        console.log("Login successful:", response.data);
        return response.data;
      })
      .catch((error) => {
        console.error("Error during login:", error);
        throw error;
      });
  },

  logout: () => {
    console.log("Logging out...");
    // Handle logout logic if necessary
  },
};

export default AuthService;