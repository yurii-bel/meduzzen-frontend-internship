import { logout as nativeLogout } from "../Store/userReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { LogoutOptions, useAuth0 } from "@auth0/auth0-react";

const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { logout } = useAuth0();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    // logout({ returnTo: `${window.location.origin}` } as LogoutOptions);
    dispatch(nativeLogout());
    navigate("/");
  };

  return handleLogout;
};

export default useLogout;
