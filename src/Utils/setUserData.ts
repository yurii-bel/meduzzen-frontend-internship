import { Dispatch } from "redux";
import { apiInstance } from "../Api/api";
import { setUser } from "../Store/userReducer";
import { setAuthorizationHeader } from "./utils";

export const setUserData = async (dispatch: Dispatch) => {
  const accessToken = localStorage.getItem("accessToken");
  accessToken && setAuthorizationHeader(accessToken);
  const userData = await apiInstance.get("/auth/me/");
  dispatch(setUser(userData.data.result));
};
