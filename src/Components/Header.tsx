import { Link } from "react-router-dom";

type NavItem = {
  title: string;
  path: string;
};

const navItems: NavItem[] = [
  { title: "Home", path: "/" },
  { title: "About", path: "/about" },
  { title: "Auth", path: "/auth" },
  { title: "Registration", path: "/registration" },
  { title: "UsersList", path: "/users-list" },
  { title: "UserProfile", path: "/user-profile" },
  { title: "CompaniesList", path: "/companies-list" },
  { title: "CompanyProfile", path: "/company-profile" },
];

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 mb-4">
      <nav className="container flex justify-between gap-10 mx-auto py-4">
        <ul className="flex justify-start items-center text-white gap-4">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link to={item.path} className="hover:text-gray-300">
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="flex justify-start items-center gap-4 text-white">
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
        </ul>
      </nav>
    </header>
  );
};

export default Header;
