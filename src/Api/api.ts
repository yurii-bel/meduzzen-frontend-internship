import axios, { AxiosInstance } from "axios";
import { User, Company } from "../Types/types";

const apiInstance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const token = localStorage.getItem("accessToken");

apiInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

const checkStatus = () => {
  return apiInstance.get("/");
};

const getUsers = () => {
  return apiInstance.get("/users");
};

const getUser = (id: number): Promise<User> => {
  return apiInstance.get(`/user/${id}`);
};

const getCompanies = () => {
  return apiInstance.get("/companies");
};

const getCompany = (id: number): Promise<Company> => {
  return apiInstance.get(`/company/${id}`);
};

const login = (email: string, password: string) => {
  return apiInstance.post("/auth/login", {
    user_email: email,
    user_password: password,
  });
};

const authme = () => {
  return apiInstance.get("/auth/me/");
};

const api = {
  checkStatus,
  getUser,
  getUsers,
  getCompany,
  getCompanies,
  login,
  authme,
};

export default api;
