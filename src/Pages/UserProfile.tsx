import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../Api/api";
import Button from "../Components/Core/Button";
import { User } from "../Types/types";

const UserProfile: React.FC = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User>();
  const [password, setPassword] = useState<string>("");
  const [passwordRe, setPasswordRe] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(true);
  const [newData, setNewData] = useState({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log(user?.data.result);
    // setUser({ ...user, user_firstname: 'John' });
    // setNewData((prevUser) => ({
    //   ...prevUser,
    //   [name]: value,
    // }));
    // console.log(newData);
    // dispatch(setUser(userData.data.result));
  };
  const handlePasswordChange = () => {};
  const handleRePasswordChange = () => {};
  const handleDeleteUser = () => {};
  const handleEditUser = () => {
    setDisabled(false);
  };
  const handleUpdateUser = () => {
    // post updates
    setDisabled(true);
  };

  const handleUpdateUserAvatar = () => {};

  const handleUpdatePassword = () => {};

  useEffect(() => {
    const userId = parseInt(id || "");
    if (isNaN(userId)) {
      return;
    }
    api
      .getUser(userId)
      .then((response) => {
        const user = response;
        setUser(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex justify-center min-h-1/2 py-2sm:py-12 mb-24 ">
        <div className="flex justify-center py-1 gap-4">
          {/* <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div> */}
          <div className="px-1 py-1 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div className="">
                <div className="flex justify-center">
                  <img
                    className="h-24 w-24"
                    src={
                      user.data.result.user_avatar ||
                      "https://assets.stickpng.com/images/585e4bf3cb11b227491c339a.png"
                    }
                    alt="User Avatar"
                  />
                </div>
                <div className="ml-6">
                  <h2 className="text-xl font-bold text-gray-800">
                    {user.data.result.user_firstname}
                    {user.data.result.user_lastname}
                  </h2>
                  <p className="text-gray-600">{user.data.result.user_city}</p>
                </div>
              </div>
              <form className="mt-6 space-y-1">
                <div className="grid grid-cols-1 gap-6">
                  <div className="block">
                    <label
                      htmlFor="firstName"
                      className="text-gray-700 font-bold"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      disabled={disabled}
                      value={user.data.result.user_firstname}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="block">
                    <label
                      htmlFor="lastName"
                      className="text-gray-700 font-bold"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      disabled={disabled}
                      value={user.data.result.user_lastname}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="block">
                    <label htmlFor="email" className="text-gray-700 font-bold">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      disabled={true}
                      value={user.data.result.user_email}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="block">
                    <label htmlFor="city" className="text-gray-700 font-bold">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      disabled={disabled}
                      placeholder="Kyiv"
                      value={`${user.data.result.user_city || ""}`}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="block">
                    <label
                      htmlFor="isSuperUser"
                      className="text-gray-700 font-bold"
                    >
                      Is super user?
                    </label>
                    <input
                      type="text"
                      name="isSuperUser"
                      id="isSuperUser"
                      disabled={disabled}
                      value={`${user.data.result.is_superuser}`}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="block">
                    <label htmlFor="phone" className="text-gray-700 font-bold">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      disabled={disabled}
                      placeholder="+380504775651"
                      value={`${user.data.result.user_phone || ""}`}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="flex flex-col gap-4 mr-36 relative px-1 py-1 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <h3 className="text-xl text-center text-purple-900 font-bold mb-12">
              Options
            </h3>
            <Button label="Delete this user" onClick={handleDeleteUser} />
            {disabled ? (
              <Button
                label="Change user information"
                onClick={handleEditUser}
              />
            ) : (
              <Button
                label="Update user information"
                onClick={handleUpdateUser}
              />
            )}
            <Button label="Update password" onClick={handleUpdatePassword} />
            <form className="mt-1 space-y-1">
              <div className="grid grid-cols-1 gap-6">
                <div className="block">
                  <label htmlFor="password" className="text-gray-700 font-bold">
                    New Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={""}
                    onChange={handlePasswordChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div className="block">
                  <label
                    htmlFor="passwordRe"
                    className="text-gray-700 font-bold"
                  >
                    Repeat new password
                  </label>
                  <input
                    type="password"
                    name="passwordRe"
                    id="passwordRe"
                    value={""}
                    onChange={handleRePasswordChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </form>
            <Button
              label="Update user avatar"
              onClick={handleUpdateUserAvatar}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleUpdateUserAvatar}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
