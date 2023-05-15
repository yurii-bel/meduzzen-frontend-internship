import axios, { AxiosInstance } from "axios";
import {
  User,
  Company,
  UserPassword,
  UserAvatar,
  CompanyAvatar,
  CompanyState,
} from "../Types/types";

export const apiInstance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const token = localStorage.getItem("accessToken");

apiInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

const checkStatus = () => {
  return apiInstance.get("/");
};

const getUsers = (page: number): Promise<User> => {
  return apiInstance.get(`/users?page=${page}`);
};

const getUser = (id: number): Promise<User> => {
  return apiInstance.get(`/user/${id}`);
};

const getCompanies = (page: number) => {
  return apiInstance.get(`/companies?page=${page}`);
};

const getCompany = (id: number): Promise<CompanyState> => {
  return apiInstance.get(`/company/${id}`);
};

const deleteUser = (id: number): Promise<User> => {
  return apiInstance.delete(`/user/${id}`);
};

const deleteCompany = (id: number): Promise<Company> => {
  return apiInstance.delete(`/company/${id}`);
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

const putUpdateCompanyInfo = (
  id: number,
  company_name: string,
  company_title: string,
  company_description: string,
  company_city: string,
  company_phone: string
): Promise<Company> => {
  return apiInstance.put(`/company/${id}/update_info`, {
    company_name,
    company_title,
    company_description,
    company_city,
    company_phone,
  });
};

const putUpdateVisibleCompany = (
  id: number,
  is_visible: boolean
): Promise<Company> => {
  return apiInstance.put(`/company/${id}/update_visible`);
};

const putUpdateAvatarCompany = (
  id: number,
  company_avatar: FormData
): Promise<CompanyAvatar> => {
  return apiInstance.put(`/company/${id}/update_avatar/`, company_avatar, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
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

const getUserCompaniesList = (id: number) => {
  return apiInstance.get(`/user/${id}/companies_list/`);
};

const getUserInvitesList = (id: number) => {
  return apiInstance.get(`/user/${id}/invites_list/`);
};

const getUserRequestsList = (id: number) => {
  return apiInstance.get(`/user/${id}/requests_list/`);
};

const getCompanyMembersList = (id: number) => {
  return apiInstance.get(`/company/${id}/members_list/`);
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

const postCreateCompany = (company_name: string) => {
  return apiInstance.post("/company/", {
    company_name: company_name,
    is_visible: true,
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
  deleteCompany,
  putUpdatePassword,
  putUpdateInfo,
  putUpdateCompanyInfo,
  putUpdateAvatar,
  putUpdateAvatarCompany,
  putUpdateVisibleCompany,
  postCreateCompany,
  getUserCompaniesList,
  getUserInvitesList,
  getUserRequestsList,
  getCompanyMembersList,
  login,
  signUp,
  authme,
};

export default api;
