import React, { useState, FormEvent } from "react";
import { useSelector } from "react-redux";
import LoginButton from "../Components/LoginButton";
import LoginButtonAuth0 from "../Components/LoginButtonAuth0";
import LogoutButton from "../Components/LogoutButton";
import { RootState } from "../Store";

interface AuthenticationProps {
  onSubmit?: (data: any) => void;
}

const Authentication: React.FC<AuthenticationProps> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state: RootState) => state.user);

  const handleEmailChange = (event: FormEvent<HTMLInputElement>) => {
    setEmail((event.target as HTMLInputElement).value);
  };

  const handlePasswordChange = (event: FormEvent<HTMLInputElement>) => {
    setPassword((event.target as HTMLInputElement).value);
  };

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
            placeholder="example@gmail.com"
            value={email}
            onChange={handleEmailChange}
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
            placeholder="strongPassword"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div className="flex justify-between">
          <LoginButton email={email} password={password} />
          {/* <LogoutButton /> */}
          <LoginButtonAuth0 />
        </div>
      </form>
    </section>
  );
};

export default Authentication;
