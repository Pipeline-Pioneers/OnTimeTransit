import axios from "axios";

const USER_SERVICE_URL = "http://localhost:8089/api/auth";

const AuthService = {
  register: (user) => axios.post(`${USER_SERVICE_URL}/register`, user).then((res) => res.data),
  login: (credentials) => axios.post(`${USER_SERVICE_URL}/login`, credentials).then((res) => res.data),
};

export default AuthService;