// src/services/authService.js
import axios from "axios";

// Set up the base URL for your API
const API_URL = "https://664ef13afafad45dfae19e02.mockapi.io/Movie/";

const login = async (username, password) => {
  try {
    const response = await axios.get(`${API_URL}/users`); // Ensure URL is constructed correctly

    const users = response.data;
    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      // Simulating token generation for the demo
      const token = "dummy-token";
      const userData = { ...user, token };

      // Store the user token and user info in local storage
      localStorage.setItem("user", JSON.stringify(userData));
      return userData;
    } else {
      throw new Error("Invalid username or password");
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const authService = {
  login,
  logout,
  getCurrentUser,
};

export default authService;
