import axios from "axios";
// import _ from "lodash";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  // withCredentials: true
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.response.use((response) => {
  const { data } = response;
  return response.data;
});

export default instance;
