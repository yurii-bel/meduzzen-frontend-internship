import { UserState } from "../Types/types";

const initialState: UserState[] = [];

const SET_USERS = "SET_USERS";

type SetUsersAction = {
  type: typeof SET_USERS;
  payload: UserState[];
};

export const setUsers = (users: UserState[]): SetUsersAction => {
  return {
    type: SET_USERS,
    payload: users,
  };
};

export type UserActions = SetUsersAction;

const userReducer = (
  state: UserState[] = initialState,
  action: UserActions
): UserState[] => {
  switch (action.type) {
    case SET_USERS:
      return action.payload;
    default:
      return state;
  }
};

export default userReducer;
