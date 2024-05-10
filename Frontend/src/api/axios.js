import axios from "axios";

const instance = axios.create({
  baseURL: "https://task-backend-lake.vercel.app/api",
  withCredentials: true,
});

export default instance;
