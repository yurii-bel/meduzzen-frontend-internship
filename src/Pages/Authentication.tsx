import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../Components/Core/Button";

import AuthHeader from "../Components/AuthHeader";

import api, { apiInstance } from "../Api/api";
import { setUser } from "../Store/userReducer";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";
import { RootState } from "../Store";

type LoginForm = {
  email: string;
  password: string;
};

interface AuthenticationProps {
  onSubmit?: (data: LoginForm) => void;
}

const Authentication: React.FC<AuthenticationProps> = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  // Validation
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    // Password must be at least 8 characters and contain at least one lowercase letter, one uppercase letter, and one number
    // const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    const passwordRegex = /^(?=.{6,})/;
    return passwordRegex.test(password);
  };

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

  const setUserData = async () => {
    apiInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("accessToken")}`;
    const userData = await apiInstance.get("/auth/me/");
    dispatch(setUser(userData.data.result));
  };

  const handleCredsLogin = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    try {
      const response = await api.login(formData.email, formData.password);
      const token = response.data.result.access_token;
      localStorage.setItem("accessToken", token);
      await setUserData();
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
    // console.log(isAuthenticated);
    // if (isAuthenticated) {
    // const accessToken = await getAccessTokenSilently();
    // localStorage.setItem("accessToken", accessToken);

    // console.log(isAuthenticated);
    // console.log(localStorage.getItem("accessToken"));
    // await setUserData();
    // navigate("/");
    // }
  };

  // useEffect(() => {
  //   const fetchToken = async () => {
  //     if (isAuthenticated) {
  //       const accessToken = await getAccessTokenSilently();
  //       localStorage.setItem("accessToken", accessToken);

  //       // console.log(isAuthenticated);
  //       // console.log(localStorage.getItem("accessToken"));
  //       await setUserData();
  //       navigate("/");
  //     }
  //   };

  //   fetchToken();
  // }, [isAuthenticated]);

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
          <Button
            disabled={
              !validateEmail(formData.email) ||
              (!validatePassword(formData.password) && true)
            }
            label="Auth0"
            onClick={handleAuth0Login}
          />
        </div>
      </form>
    </section>
  );
};

export default Authentication;
