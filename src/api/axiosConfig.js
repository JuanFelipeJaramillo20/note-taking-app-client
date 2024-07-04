import axios from "axios";

const api = axios.create({
  baseURL:
    "http://note-taking-app-env.eba-iutjphmt.us-east-1.elasticbeanstalk.com/",
});

export default api;
