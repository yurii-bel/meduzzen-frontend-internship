import React, { useState } from "react";
import api from "../Api/api";
import Button from "../Components/Core/Button";
import Input from "../Components/Input";
import AuthHeader from "../Components/AuthHeader";
import { useNavigate } from "react-router-dom";
import { validateName, validateEmail, validatePassword } from "../Utils/utils";

type FormData = {
  user_password: string;
  user_password_repeat: string;
  user_email: string;
  user_firstname: string;
  user_lastname: string;
};

const initialFormData: FormData = {
  user_password: "",
  user_password_repeat: "",
  user_email: "",
  user_firstname: "",
  user_lastname: "",
};

const Registration: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const {
    user_password,
    user_password_repeat,
    user_email,
    user_firstname,
    user_lastname,
  } = formData;

  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignUp = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      api.signUp(
        user_password,
        user_password_repeat,
        user_email,
        user_firstname,
        user_lastname
      );
      navigate("/auth");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AuthHeader
        heading="Signup to create an account"
        paragraph="Already have an accout? "
        linkName="Login"
        linkUrl="/auth"
      />
      <form className="mx-auto max-w-lg ">
        <div className="mb-4">
          <Input
            placeholder="First Name"
            type="text"
            name="user_firstname"
            id="user_firstname"
            value={formData.user_firstname}
            onChange={handleChange}
            className="appearance-none border focus:border-purple-600 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {!validateName(formData.user_firstname) && (
            <p className="text-red-500 text-xs mt-1">
              Please enter a valid user firstname.
            </p>
          )}
        </div>
        <div className="mb-4">
          <Input
            placeholder="Last Name"
            type="text"
            name="user_lastname"
            id="user_lastname"
            value={formData.user_lastname}
            onChange={handleChange}
            className="appearance-none border focus:border-purple-600 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {!validateName(formData.user_lastname) && (
            <p className="text-red-500 text-xs mt-1">
              Please enter a valid user lastname.
            </p>
          )}
        </div>
        <div className="mb-4">
          <Input
            placeholder="Email address"
            type="email"
            name="user_email"
            id="user_email"
            value={formData.user_email}
            onChange={handleChange}
            className="appearance-none border focus:border-purple-600 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {!validateEmail(formData.user_email) && (
            <p className="text-red-500 text-xs mt-1">
              Please enter a valid user email.
            </p>
          )}
        </div>
        <div className="mb-4">
          <Input
            placeholder="Password"
            type="password"
            name="user_password"
            id="user_password"
            value={formData.user_password}
            onChange={handleChange}
            className="appearance-none border focus:border-purple-600 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {!validatePassword(formData.user_password) && (
            <p className="text-red-500 text-xs mt-1">
              Password must contain at least 6 characters
            </p>
          )}
        </div>
        <div className="mb-4">
          <Input
            placeholder="Confirm Password"
            type="password"
            name="user_password_repeat"
            id="user_password_repeat"
            value={formData.user_password_repeat}
            onChange={handleChange}
            className="appearance-none border focus:border-purple-600 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {user_password !== user_password_repeat && (
            <p className="text-red-500 text-xs mt-1">Passwords do not match</p>
          )}
        </div>
        <Button label="SignUp" onClick={handleSignUp} />
      </form>
    </>
  );
};

export default Registration;
