import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../Components/Core/Button";

import AuthHeader from "../Components/AuthHeader";
import { validateEmail, validatePassword } from "../Utils/utils";
import api from "../Api/api";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";
import { RootState } from "../Store";

import { setUserData } from "../Utils/setUserData";

type LoginForm = {
  email: string;
  password: string;
};

interface AuthenticationProps {
  onSubmit?: (data: LoginForm) => void;
}

const Authentication: React.FC<AuthenticationProps> = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const user = useSelector((state: RootState) => state.user);
  console.log("user: " + user.user_email);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loginWithRedirect, isAuthenticated, getAccessTokenSilently } =
    useAuth0();

  const handleCredsLogin = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    try {
      const response = await api.login(formData.email, formData.password);
      const token = response.data.result.access_token;
      localStorage.setItem("accessToken", token);
      await setUserData(dispatch);
    } catch (error) {
      console.log(error);
    }
    navigate("/");
  };

  const handleAuth0Login = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    await loginWithRedirect();
  };

  return (
    <section>
      <AuthHeader
        heading="Login to your account"
        paragraph="Don't have an account yet? "
        linkName="Signup"
        linkUrl="/registration"
      />
      <form className="mx-auto max-w-lg ">
        <div className="mb-4">
          <input
            className="appearance-none border focus:border-purple-600 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {!validateEmail(formData.email) && (
            <p className="text-red-500 text-xs mt-1">
              Please enter a valid email address.
            </p>
          )}
        </div>
        <div className="mb-4">
          <input
            className="appearance-none border focus:border-purple-600 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {!validatePassword(formData.password) && (
            <p className="text-red-500 text-xs mt-1">
              Password must be at least 6 characters
              {/* and contain at least one
              lowercase letter, one uppercase letter, and one number. */}
            </p>
          )}
        </div>
        <div className="flex justify-between gap-6">
          <Button
            disabled={
              !validateEmail(formData.email) ||
              (!validatePassword(formData.password) && true)
            }
            label="Login"
            onClick={handleCredsLogin}
          />
          <Button label="Auth0" onClick={handleAuth0Login} />
        </div>
      </form>
    </section>
  );
};

export default Authentication;
