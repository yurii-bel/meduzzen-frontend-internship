import { Link } from "react-router-dom"; // assuming you're using React Router

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 mb-4">
      <nav className="container flex justify-between gap-10 mx-auto py-4">
        <ul className="flex justify-start items-center text-white">
          <li>
            <Link to="/" className="font-bold text-xl">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="ml-4 hover:text-gray-300">
              About
            </Link>
          </li>
        </ul>
        <ul className="flex justify-start items-center gap-4 text-white">
          <Link
            to="/auth"
            className="px-4 py-2 bg-white text-gray-800 rounded-md hover:bg-gray-300"
          >
            Sign in
          </Link>

          <Link
            to="/registration"
            className="px-4 py-2 bg-white text-gray-800 rounded-md hover:bg-gray-300"
          >
            Sign up
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
