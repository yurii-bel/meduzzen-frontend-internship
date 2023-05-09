import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../Store";
import Button from "./Core/Button";
import { LogoutOptions, useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout as nativeLogout } from "../Store/userReducer";

type NavItem = {
  title: string;
  path: string;
};

const Header: React.FC = () => {
  const userEmail = useSelector((state: RootState) => state.user.user_email);
  const userId = useSelector((state: RootState) => state.user.user_id);

  const navItemsUserLoggedIn: NavItem[] = [
    { title: "Home", path: "/" },
    { title: "About", path: "/about" },
    { title: "Users", path: "/users-list" },
    // { title: "Auth", path: "/auth" },
    // { title: "Registration", path: "/registration" },
    { title: "Profile", path: `/user-profile/${userId}` },
    { title: "Companies", path: "/companies-list" },
    // { title: "CompanyProfile", path: "/company-profile" },
  ];

  const navItemsUserNotLoggedIn: NavItem[] = [
    { title: "Home", path: "/" },
    { title: "About", path: "/about" },
  ];

  const [userLoggedIn, setUserLoggedIn] = useState(false);
  useEffect(() => {
    userEmail ? setUserLoggedIn(true) : setUserLoggedIn(false);
  }, [userEmail]);

  const { logout } = useAuth0();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    logout({ returnTo: `${window.location.origin}` } as LogoutOptions);
    dispatch(nativeLogout());
    navigate("/");
  };

  return (
    <header className="bg-gray-800 mb-4">
      <nav className="container flex justify-between gap-10 mx-auto py-4">
        <ul className="flex justify-start items-center text-white gap-4">
          {userLoggedIn
            ? navItemsUserLoggedIn.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="hover:text-gray-300">
                    {item.title}
                  </Link>
                </li>
              ))
            : navItemsUserNotLoggedIn.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="hover:text-gray-300">
                    {item.title}
                  </Link>
                </li>
              ))}
        </ul>
        <ul className="flex justify-start items-center gap-4 text-white">
          {!userLoggedIn ? (
            <>
              <Link
                to="/auth"
                className="relative w-auto flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 "
              >
                Sign in
              </Link>
              <Link
                to="/registration"
                className="relative w-autoflex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 "
              >
                Sign up
              </Link>
            </>
          ) : (
            <div className="flex justify-center items-center  gap-4">
              <p className="border border-purple-600 rounded-md p-1.5 font">
                {userEmail}
              </p>
              <Button label="Logout" onClick={handleLogout} />
            </div>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
