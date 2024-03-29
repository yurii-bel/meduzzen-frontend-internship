import axios, { AxiosInstance } from "axios";
import {
  User,
  Company,
  UserPassword,
  UserAvatar,
  CompanyAvatar,
  CompanyState,
  Quiz,
  Question,
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

const getCompanyInvitesList = (id: number) => {
  return apiInstance.get(`/company/${id}/invites_list/`);
};

const getCompanyRequestsList = (id: number) => {
  return apiInstance.get(`/company/${id}/requests_list/`);
};

const getCompanyBlockedList = (id: number) => {
  return apiInstance.get(`/company/${id}/blocked_list/`);
};

const getCompanyQuizzesList = (id: number) => {
  return apiInstance.get(`/company/${id}/quizzes_list/`);
};

const getActionCreateFromUserToCompany = (id: number) => {
  return apiInstance.get(`/action/create_from_user/company/${id}`);
};

const getActionCreateFromCompanyToUser = (
  company_id: number,
  user_id: number
) => {
  return apiInstance.get(
    `/action/create_from_company/${company_id}/user/${user_id}`
  );
};

const getActionAcceptInvite = (id: number) => {
  return apiInstance.get(`/action/${id}/accept_invite/`);
};

const getActionAcceptRequest = (id: number) => {
  return apiInstance.get(`/action/${id}/accept_request/`);
};

const getActionDeclineAction = (id: number) => {
  return apiInstance.get(`/action/${id}/decline_action/`);
};

const getActionLeaveCompany = (id: number) => {
  return apiInstance.get(`/action/${id}/leave_company/`);
};

const getActionAddToAdmin = (id: number) => {
  return apiInstance.get(`/action/${id}/add_to_admin/`);
};

const getActionRemoveFromAdmin = (id: number) => {
  return apiInstance.get(`/action/${id}/remove_from_admin/`);
};

const getActionAddToBlock = (id: number) => {
  return apiInstance.get(`/action/${id}/add_to_block/`);
};

const getActionRemoveFromBlock = (id: number) => {
  return apiInstance.get(`/action/${id}/remove_from_block/`);
};

const getQuiz = (id: number) => {
  return apiInstance.get(`/quiz/${id}/`);
};

const deleteQuiz = (id: number) => {
  return apiInstance.delete(`/quiz/${id}/`);
};

const postCreateQuiz = (quiz: Quiz) => {
  return apiInstance.post("/quiz/", quiz);
};

const putUpdateQuiz = (quiz: Quiz, id: number) => {
  return apiInstance.put(`/quiz/${id}/update_info`, quiz);
};

const postAddQuestion = (id: number, question: Question) => {
  return apiInstance.post(`/quiz/${id}/add_question`, question);
};

const postTakeQuiz = (id: number, answers: any) => {
  return apiInstance.post(`/quiz/${id}/take_quiz`, answers);
};

const putUpdateQuestion = (id: number, question: Question) => {
  return apiInstance.put(`/question/${id}/update_info`, question);
};

const deleteQuestion = (id: number) => {
  return apiInstance.delete(`/question/${id}/`);
};

const getCompanySummaryRatingForUsers = (id: number) => {
  return apiInstance.get(`/company/${id}/summary_rating_for_users/`);
};

const getCompanySummaryRatingForUsersA = (id: number) => {
  return apiInstance.get(`/company/${id}/summary_rating_analytic_for_users/`);
};

const getCompanySummaryRatingForUserA = (companyId: number, userId: number) => {
  return apiInstance.get(
    `/company/${companyId}/summary_rating_analytic_for_user/${userId}`
  );
};

const getUserQuizzesLastPass = (id: number) => {
  return apiInstance.get(`/user/${id}/quizzes_last_pass`);
};

const getCompanyQuizzesLastPass = (id: number) => {
  return apiInstance.get(`/company/${id}/quizzes_last_pass`);
};

const getUserRatingInCompany = (userId: number, companyId: number) => {
  return apiInstance.get(`user/${userId}/rating_in_company/${companyId}`);
};

const getUserGlobalRating = (id: number) => {
  return apiInstance.get(`user/${id}/global_rating`);
};

const getUserLastAnswersCSV = (id: number) => {
  return apiInstance.get(`user/${id}/last_answers_csv`);
};

const getCompanyLastAnswersCSV = (id: number) => {
  return apiInstance.get(`company/${id}/last_answers_csv`);
};

const getCompanyLastAnswersCsvForUser = (companyId: number, userId: number) => {
  return apiInstance.get(
    `company/${companyId}/last_answers_csv_for_user/${userId}`
  );
};

const getCompanyLastAnswersCsvForQuiz = (companyId: number, quizId: number) => {
  return apiInstance.get(
    `company/${companyId}/last_answers_csv_for_quiz/${quizId}`
  );
};

const getUserNotificationsList = (id: number) => {
  return apiInstance.get(`user/${id}/notifications_list`);
};

const getUserMarkNotificationsAsRead = (
  userId: number,
  notificationId: number
) => {
  return apiInstance.get(
    `user/${userId}/mark_notification_as_read/${notificationId}`
  );
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
  getCompanyInvitesList,
  getCompanyRequestsList,
  getCompanyBlockedList,
  getCompanyQuizzesList,
  getActionAcceptInvite,
  getActionAcceptRequest,
  getActionDeclineAction,
  getActionLeaveCompany,
  getActionCreateFromUserToCompany,
  getActionCreateFromCompanyToUser,
  getActionAddToAdmin,
  getActionRemoveFromAdmin,
  getActionAddToBlock,
  getActionRemoveFromBlock,
  getQuiz,
  deleteQuiz,
  postCreateQuiz,
  putUpdateQuiz,
  postAddQuestion,
  postTakeQuiz,
  putUpdateQuestion,
  deleteQuestion,
  getCompanySummaryRatingForUsers,
  getCompanySummaryRatingForUsersA,
  getCompanySummaryRatingForUserA,
  getUserQuizzesLastPass,
  getCompanyQuizzesLastPass,
  getUserRatingInCompany,
  getUserGlobalRating,
  getUserLastAnswersCSV,
  getCompanyLastAnswersCSV,
  getCompanyLastAnswersCsvForUser,
  getCompanyLastAnswersCsvForQuiz,
  getUserNotificationsList,
  getUserMarkNotificationsAsRead,
  login,
  signUp,
  authme,
};

export default api;
