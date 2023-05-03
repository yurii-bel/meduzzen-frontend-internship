import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../Store";
import LogoutButton from "./LogoutButton";

type NavItem = {
  title: string;
  path: string;
};

const navItemsUserLoggedIn: NavItem[] = [
  { title: "Home", path: "/" },
  { title: "About", path: "/about" },
  { title: "UsersList", path: "/users-list" },
  // { title: "Auth", path: "/auth" },
  // { title: "Registration", path: "/registration" },
  // { title: "UserProfile", path: "/user-profile" },
  // { title: "CompaniesList", path: "/companies-list" },
  // { title: "CompanyProfile", path: "/company-profile" },
];

const navItemsUserNotLoggedIn: NavItem[] = [
  { title: "Home", path: "/" },
  { title: "About", path: "/about" },
];

const Header: React.FC = () => {
  const userEmail = useSelector((state: RootState) => state.user.user_email);
  // console.log("user: " + userEmail);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  useEffect(() => {
    userEmail ? setUserLoggedIn(true) : setUserLoggedIn(false);
  }, [userEmail]);

  // console.log(userLoggedIn);

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
                className="px-3 py-1 bg-white text-gray-800 rounded-md hover:bg-gray-300"
              >
                Sign in
              </Link>
              <Link
                to="/registration"
                className="px-3 py-1 bg-white text-gray-800 rounded-md hover:bg-gray-300"
              >
                Sign up
              </Link>
            </>
          ) : (
            <>
              <p>{userEmail}</p>
              <LogoutButton />
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
