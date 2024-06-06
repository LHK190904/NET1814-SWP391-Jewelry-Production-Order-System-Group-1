import axios from "axios";

const API_URL = "http://localhost:8080/auth/login_token";

const login = async (username, password) => {
  try {
    const payload = {
      userName: username,
      password,
    };
    const response = await axios.post(API_URL, payload);

    const { token, authenticated } = response.data.result;
    if (authenticated) {
      const userData = { username, token };

      localStorage.setItem("user", JSON.stringify(userData));
      return userData;
    } else {
      console.log("Wrong username or password");
      throw new Error("Invalid username or password");
    }
  } catch (error) {
    console.error("Login error:", error);
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
