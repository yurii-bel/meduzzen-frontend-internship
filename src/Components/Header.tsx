import React from "react";
import { Link } from "react-router-dom"; // assuming you're using React Router

const Header: React.FC = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/auth">Sign in</Link>
          </li>
          <li>
            <Link to="/registration">Sign up</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
