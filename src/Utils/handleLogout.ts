import { logout as nativeLogout } from "../Store/userReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    dispatch(nativeLogout());
    navigate("/");
  };

  return handleLogout;
};

export default useLogout;
