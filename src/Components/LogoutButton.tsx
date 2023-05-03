import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../Store/userReducer";

const LogoutButton: React.FC = () => {
  // const { logout, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      <button
        onClick={handleLogout}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Logout
      </button>
    </>
  );
};

export default LogoutButton;
