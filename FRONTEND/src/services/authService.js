import axios from "../axios";

export const getRolesService = () => {
  return axios.get("/api/v1/getRoles");
};

export const addUserService = (data) => {
  return axios.post("/api/v1/auth/register", data);
};

export const handleLoginApi = (userEmail, userPassword) => {
  return axios.post("/api/v1/auth/login", {
    email: userEmail,
    password: userPassword,
  });
};

export const handleRefreshToken = (refreshToken) => {
  return axios.post("/api/v1/auth/refreshtoken", { refreshToken });
};
