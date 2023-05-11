import axios, { AxiosInstance } from "axios";
import { User, Company, UserPassword, UserAvatar } from "../Types/types";

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

const getCompanies = (page: number) => {
  return apiInstance.get(`/companies?page=${page}`);
};

const getCompany = (id: number): Promise<Company> => {
  return apiInstance.get(`/company/${id}`);
};

const deleteUser = (id: number): Promise<User> => {
  return apiInstance.delete(`/user/${id}`);
};

const putUpdatePassword = (
  id: number,
  user_password: string,
  user_password_repeat: string
): Promise<UserPassword> => {
  return apiInstance.put(`/user/${id}/update_password`, {
    user_password,
    user_password_repeat,
  });
};

const putUpdateInfo = (
  id: number,
  user_firstname: string,
  user_lastname: string,
  user_status: string,
  user_city: string,
  user_phone: string
): Promise<User> => {
  return apiInstance.put(`/user/${id}/update_info`, {
    user_firstname,
    user_lastname,
    user_status,
    user_city,
    user_phone,
  });
};

const putUpdateAvatar = (
  id: number,
  user_avatar: FormData
): Promise<UserAvatar> => {
  return apiInstance.put(`/user/${id}/update_avatar/`, user_avatar, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

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
  deleteUser,
  putUpdatePassword,
  putUpdateInfo,
  putUpdateAvatar,
  login,
  signUp,
  authme,
};

export default api;
