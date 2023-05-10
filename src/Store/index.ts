import { combineReducers } from "redux";
import counterReducer from "./counterReducer";
import userReducer from "./userReducer";
import usersListReducer from "./usersListReducer";

const rootReducer = combineReducers({
  counter: counterReducer,
  user: userReducer,
  userList: usersListReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
