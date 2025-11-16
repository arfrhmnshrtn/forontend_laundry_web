import apiService from "./api";

export const login = async (username, password) => {
  try {
    const response = await apiService.post("/admin/auth/login", {
      username,
      password,
    });

    if (response.token) {
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      localStorage.setItem("isAuthenticated", "true");
    }

    // console.log(response);

    return response;
  } catch (error) {
    console.error("Login error:", error);
    console.log(error.message);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("isAuthenticated");
};

export const isAuthenticated = () => {
  return (
    localStorage.getItem("isAuthenticated") === "true" &&
    localStorage.getItem("token") !== null
  );
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export default {
  login,
  logout,
  isAuthenticated,
  getToken,
  getUser,
};
