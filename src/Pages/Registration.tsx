import React, { useState } from "react";
import api from "../Api/api";
import Button from "../Components/Core/Button";
import Input from "../Components/Input";

interface FormData {
  user_password: string;
  user_password_repeat: string;
  user_email: string;
  user_firstname: string;
  user_lastname: string;
}

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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignUp = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    api.signUp(
      user_password,
      user_password_repeat,
      user_email,
      user_firstname,
      user_lastname
    );
    // try {
    //   const response = await api.login(formData.email, formData.password);
    //   const token = response.data.result.access_token;
    //   localStorage.setItem("accessToken", token);
    //   await setUserData();
    // } catch (error) {
    //   console.log(error);
    // }
    // navigate("/");
  };

  return (
    <form className="mx-auto max-w-md bg-white py-6 px-12 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Registration Form</h1>
      <div className="mb-4">
        <label htmlFor="user_firstname" className="block font-medium mb-1">
          First Name
        </label>
        <Input
          type="text"
          name="user_firstname"
          id="user_firstname"
          value={formData.user_firstname}
          onChange={handleChange}
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="user_lastname" className="block font-medium mb-1">
          Last Name
        </label>
        <Input
          type="text"
          name="user_lastname"
          id="user_lastname"
          value={formData.user_lastname}
          onChange={handleChange}
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="user_email" className="block font-medium mb-1">
          Email
        </label>
        <Input
          type="email"
          name="user_email"
          id="user_email"
          value={formData.user_email}
          onChange={handleChange}
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="user_password" className="block font-medium mb-1">
          Password
        </label>
        <Input
          type="password"
          name="user_password"
          id="user_password"
          value={formData.user_password}
          onChange={handleChange}
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="user_password_repeat"
          className="block font-medium mb-1"
        >
          Repeat Password
        </label>
        <Input
          type="password"
          name="user_password_repeat"
          id="user_password_repeat"
          value={formData.user_password_repeat}
          onChange={handleChange}
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <Button label="SignUp" onClick={handleSignUp} />
    </form>
  );
};

export default Registration;
