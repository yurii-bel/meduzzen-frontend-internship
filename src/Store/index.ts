import { combineReducers } from "redux";
import counterReducer from "./counterReducer";
import userReducer from "./userReducer";
import usersListReducer from "./usersListReducer";
import companiesReducer from "./companiesListReducer";

const rootReducer = combineReducers({
  counter: counterReducer,
  user: userReducer,
  userList: usersListReducer,
  companiesList: companiesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
