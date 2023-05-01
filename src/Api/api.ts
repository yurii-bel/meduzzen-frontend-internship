import axios, { AxiosInstance } from "axios";
import { User, Company } from "../Types/types";

const apiInstance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL_TEST,
});

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

const api = {
  checkStatus,
  getUser,
  getUsers,
  getCompany,
  getCompanies,
};

export default api;
