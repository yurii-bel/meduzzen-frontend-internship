export type User = {
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
  is_superuser: boolean | false;
};

export type UserPassword = {
  user_password: string;
  user_password_repeat: string;
};

export type UserAvatar = {
  user_avatar: any;
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

// export type Users = {
//   status_code: number;
//   detail: string;
//   result: {
//     users: User[];
//     pagination: {
//       current_page: number;
//       total_page: number;
//       total_results: number;
//     };
//   };
// };

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

export type Company = {
  id: number;
  name: string;
  industry: string;
  city: string;
  state: string;
};

export type Children = { children: React.ReactNode };
