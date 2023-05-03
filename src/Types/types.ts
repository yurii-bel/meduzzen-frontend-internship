export type User = {
  user_id: number;
  user_email: string;
  user_firstname: string;
  user_lastname: string;
  user_avatar: string;
};

export type Users = {
  status_code: number;
  detail: string;
  result: {
    users: User[];
    pagination: {
      current_page: number;
      total_page: number;
      total_results: number;
    };
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
