import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("User")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("User")).token
    }`;
  }
  return req;
});

//AUTH API
export const signUp = (formData) => API.post("/user/signup", formData);
export const signIn = (formData) => API.post("/user/signin", formData);
