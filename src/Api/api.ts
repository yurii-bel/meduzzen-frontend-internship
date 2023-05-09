import axios, { AxiosInstance } from "axios";
import { User, Company } from "../Types/types";

export const apiInstance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const token = localStorage.getItem("accessToken");

apiInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

const checkStatus = () => {
  return apiInstance.get("/");
};

const getUsers = (page: number) => {
  return apiInstance.get(`/users?page=${page}`);
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

const deleteUser = (id: number): Promise<User> => {
  return apiInstance.delete(`/user/${id}`);
};

const putUpdateInfo = (
  id: number,
  user_firstname: string,
  user_lastname: string,
  user_city: string,
  user_phone: string
): Promise<User> => {
  return apiInstance.put(`/user/${id}/update-info`, {
    user_firstname,
    user_lastname,
    user_city,
    user_phone,
  });
};

// const putUpdatePassword = (id: number): Promise<User>  => {};
// const putUpdateAvatar = (id: number): Promise<User>  => {};

const login = (email: string, password: string) => {
  return apiInstance.post("/auth/login", {
    user_email: email,
    user_password: password,
  });
};

const signUp = (
  password: string,
  password_re: string,
  email: string,
  firstname: string,
  lastname: string
) => {
  return apiInstance.post("/user/", {
    user_password: password,
    user_password_repeat: password_re,
    user_email: email,
    user_firstname: firstname,
    user_lastname: lastname,
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
  signUp,
  authme,
};

export default api;
