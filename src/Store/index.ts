import { combineReducers } from "redux";
import counterReducer from "./counterReducer";
import userReducer from "./userReducer";
import usersListReducer from "./usersListReducer";
import companiesReducer from "./companiesListReducer";
import companyReducer from "./companyReducer";
const rootReducer = combineReducers({
  counter: counterReducer,
  user: userReducer,
  userList: usersListReducer,
  company: companyReducer,
  companiesList: companiesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
