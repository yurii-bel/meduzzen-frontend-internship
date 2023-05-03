interface UserState {
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
}

const initialState: UserState = {
  is_superuser: false,
  user_avatar: "",
  user_city: "",
  user_email: "",
  user_firstname: "",
  user_id: 0,
  user_lastname: "",
  user_links: [],
  user_phone: "",
  user_status: "",
};

const SET_USER = "SET_USER";
const LOGOUT = "LOGOUT";

interface SetUserAction {
  type: typeof SET_USER;
  payload: UserState;
}

interface LogoutAction {
  type: typeof LOGOUT;
}

export const setUser = (user: UserState): SetUserAction => {
  return {
    type: SET_USER,
    payload: user,
  };
};

export const logout = (): LogoutAction => ({
  type: LOGOUT,
});

export type UserActions = SetUserAction | LogoutAction;

const userReducer = (
  state: UserState = initialState,
  action: UserActions
): UserState => {
  switch (action.type) {
    case SET_USER:
      return action.payload;
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default userReducer;
