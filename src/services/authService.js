import axios from "axios";

const API_URL = "http://localhost:8080/auth/login_token";

const login = async (username, password) => {
  try {
    const payload = { userName: username, password };
    const response = await axios.post(API_URL, payload);

    const { token, authenticated, title, id } = response.data.result;
    if (authenticated) {
      const userData = { username, token, title, id };
      localStorage.setItem("user", JSON.stringify(userData));
      return userData;
    } else {
      throw new Error("Invalid username or password");
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "Login failed";
    throw new Error(errorMessage);
  }
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const authService = { login, logout, getCurrentUser };

const isAuthenticated = () => {
  const user = getCurrentUser();
  return user && user.token;
};

const isAdmin = () => {
  const user = getCurrentUser();
  return user && user.title === "ADMIN";
};

const isCustomer = () => {
  const user = getCurrentUser();
  return user && user.title === "CUSTOMER" && user.id;
};

export const getToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? user.token : null;
};

export default authService;
