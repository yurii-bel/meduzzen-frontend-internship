import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../Components/Core/Button";

import api, { apiInstance } from "../Api/api";
import { setUser } from "../Store/userReducer";
import { useAuth0 } from "@auth0/auth0-react";

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

  // const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loginWithRedirect, isAuthenticated, getAccessTokenSilently } =
    useAuth0();

  const setUserData = async () => {
    // const userData = await api.authme();
    apiInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("accessToken")}`;
    const userData = await apiInstance.get("/auth/me/");
    localStorage.setItem("userData", JSON.stringify(userData.data.result));
    localStorage.setItem("loggedIn", "yes");
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

  const handleAuth0Login = async () => {
    try {
      await loginWithRedirect();
      const accessToken = await getAccessTokenSilently();

      console.log(accessToken);
      localStorage.setItem("accessToken", accessToken);
      await setUserData();
    } catch (e) {
      console.log(e);
    }
  };

  //     //   "accessToken",
  //     //   "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImhiSkFnbWdiSWdmcmdUdGpyZngxbCJ9.eyJlbWFpbCI6ImRyYWdvbndvdzMwMEBnbWFpbC5jb20iLCJpc3MiOiJodHRwczovL2Rldi1qNXl4MHctZS51cy5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDI1NjEyMzk2Nzk3Nzk3MzY3MjkiLCJhdWQiOlsiaHR0cHM6Ly9pbnRlcm5zaGlwLWV4YW1wbGUuY29tIiwiaHR0cHM6Ly9kZXYtajV5eDB3LWUudXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTY4MzEzODU3MSwiZXhwIjoxNjgzMjI0OTcxLCJhenAiOiJ0TUJJb0R3dVYwclA1Sm1kSW52cXJjWkVzMlR1NUdsdCIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwifQ.geDV4Un6R7WgoeZKKP-10RvIztNGjxihGuNBJM678XPK8WxhcVX0BaxUZVxHw-rSju13v6jVHVbj11gCa3wuvP1v9S626I0orC2Qt6wT8iPkoU6PyE2e3bEZASl6Y7NoAiFAvhAMRfQ--ZDXanwyTnXhlawF-WaYONl-891ZmRqpujzRAwfQOA7qYpVPihOGpfyXxN_ty2ZD92rlor5kosNKq8qZgDUXMlyVUgRq2PPB-8UUXlCwq2DSNgKi8LYv-rWuakcLUhLX9fD-E6VbDz0d9_wVVmTRn2sk1gP5aEOrEl3CwOmZTDEu_LW79VmeCa_hWogwVKTpuj-nvSta1A"

  return (
    <section className="flex justify-center items-center">
      <form className="bg-white py-6 px-12 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Authentication Form</h1>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            name="email"
            placeholder="example@gmail.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            name="password"
            placeholder="strongPassword"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex justify-between">
          <Button label="Login" onClick={handleCredsLogin} />
          <Button label="Auth0" onClick={handleAuth0Login} />
        </div>
      </form>
    </section>
  );
};

export default Authentication;
