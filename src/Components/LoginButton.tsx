import api from "../Api/api";
import { useDispatch } from "react-redux";
import { setUser } from "../Store/userReducer";
import { useNavigate } from "react-router-dom";

interface LoginButtonProps {
  email: string;
  password: string;
}

const LoginButton: React.FC<LoginButtonProps> = ({ email, password }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const response = await api.login(email, password);
      const token = response.data.result.access_token;
      localStorage.setItem("accessToken", token);

      const userData = await api.authme();
      dispatch(setUser(userData.data.result)); // Dispatching the setUser action with the userData as the payload
    } catch (error) {
      console.log(error);
    }
    navigate("/");
  };

  return (
    <>
      <button
        onClick={loginSubmit}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Login
      </button>
    </>
  );
};

export default LoginButton;
