import axios from "axios";

// https://663ddef6e1913c476795b585.mockapi.io/account
// https://664ef13afafad45dfae19e02.mockapi.io/Movie
const API_URL = "https://663ddef6e1913c476795b585.mockapi.io/account";

const login = async (username, password) => {
  try {
    const response = await axios.get(`${API_URL}`);

    const users = response.data;
    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      const token = "dummy-token";
      const userData = { ...user, token };

      localStorage.setItem("user", JSON.stringify(userData));
      return userData;
    } else {
      console.log("Wrong username or password");
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
