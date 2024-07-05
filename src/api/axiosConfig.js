import axios from "axios";

const api = axios.create({
  baseURL: "https://i8axxnh82c.execute-api.us-east-1.amazonaws.com/prod/",
});

export default api;
