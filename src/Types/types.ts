export type User = UserAction & {
  data: any;
  user_id: number;
  user_email: string;
  user_firstname: string;
  user_lastname: string;
  user_avatar: string | null;
  user_status: string | null;
  user_city: string | null;
  user_phone: string | null;
  user_links: string | null;
  is_superuser: boolean;
};

export type UserAction = {
  action?: string;
  action_id: string;
};

export type UserPassword = {
  user_password: string;
  user_password_repeat: string;
};

export type UserAvatar = {
  user_avatar: string;
};

export type CompanyAvatar = {
  user_avatar: string;
};

export type UserState = {
  is_superuser: boolean;
  user_avatar: string;
  user_city: string;
  user_email: string;
  user_firstname: string;
  user_id: number;
  user_lastname: string;
  user_links: string[];
  user_phone: string;
  user_status: string;
};

export type CompanyState = {
  data?: any;
  company_id: number;
  company_name: string;
  company_title: string;
  company_avatar: string;
  is_visible: boolean;
  company_description: string;
  company_city: string;
  company_phone: string;
  company_links: string[];
  company_owner: UserState;
};

export type UserProps = {
  user: {
    user_id: number;
    user_firstname: string;
    user_lastname: string;
    user_avatar: string;
    user_email: string;
    user_city: string;
    user_phone: string;
    user_status: string;
    user_links: string[];
  };
};

export type Company = CompanyAction & {
  company_id: number;
  company_name: string;
  company_title: string;
  company_avatar: string;
  is_visible: boolean;
  action_id?: number;
  action?: string;
};

export type CompanyAction = {
  action: string;
  action_id: string;
};

export type CompaniesListResponse = {
  status_code: number;
  detail: string;
  result: {
    companies: Company[];
  };
};

export type Question = {
  question_id?: number;
  question_text: string;
  question_answers: string[];
  question_correct_answer: number;
};

export type Quiz = {
  quiz_id?: number;
  quiz_name: string;
  quiz_title?: string;
  quiz_description?: string;
  quiz_frequency: number;
  company_id?: number;
  created_by?: User;
  questions_list: Question[];
};

export type Answers = {
  [key: string]: string;
};

export type MyAnswers = {
  answers: Answers;
};

export type SummaryRatingForUsersType = {
  rating: number;
  user_id: number;
};

export type SummaryRatingForUsersAType = {
  current_rating: number;
  average_rating: number;
  pass_at: string;
};

export type Member = {
  user_id: number;
  action: string;
};

export type UsersTotal = {
  id: number;
  avg_rating: number;
  current_rating: number;
  data_time: string;
};

export type Notification = {
  notification_id: number;
  notification_title: string;
  notification_message: string;
  notification_user_id: number;
  notification_company_id: number;
  is_read: boolean;
  created_at: string;
};

export type Children = { children: React.ReactNode };
