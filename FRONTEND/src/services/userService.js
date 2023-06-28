import axios from "../axios";

export const getPublicContent = () => {
  return axios.get("/api/v1/test/all");
};

export const getAdminBoard = (header) => {
  return axios.get("/api/v1/test/admin", { headers: header });
};

export const getModeratorBoard = (header) => {
  return axios.get("/api/v1/test/moderator", { headers: header });
};

export const getUserBoard = (header) => {
  return axios.get("/api/v1/test/user", { headers: header });
};
