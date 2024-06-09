import axios from "axios";

//https://664ef13afafad45dfae19e02.mockapi.io/Account
//http://localhost:8080/auth/login_token
const API_URL = "https://664ef13afafad45dfae19e02.mockapi.io/Account";

const login = async (username, password) => {
  try {
    const payload = {
      userName: username,
      password,
    };
    const response = await axios.post(API_URL, payload);

    const { token, authenticated, role } = response.data;
    if (authenticated) {
      const userData = { username, token, role };
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
