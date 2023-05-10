import React from "react";
import { UserProps } from "../Types/types";
import { Link } from "react-router-dom";

const User: React.FC<UserProps> = ({ user }) => {
  return (
    <Link to={`/user-profile/${user.user_id}`}>
      <div className="border border-gray-300 rounded p-4 hover:bg-purple-50 hover:border-purple-600 hover:cursor-pointer duration-100">
        <div className="flex items-center mb-4">
          <img
            className="h-24 w-24  mr-4 object-cover"
            src={
              user.user_avatar ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
            }
            alt="User Avatar"
          />
        </div>
        <div className="bg-gray-50 p-2">
          <h2 className="font-bold text-gray-600 mb-2">
            <span className="mr-1">First Name:</span>
            <span className="text-purple-800">{user.user_firstname}</span>
          </h2>
          <h2 className="font-bold text-gray-600 mb-2">
            <span className="mr-1">Last Name:</span>
            <span className="text-purple-800">{user.user_lastname}</span>
          </h2>
          <div className="mb-4">
            <p className="text-gray-600 font-bold">
              <span className=" mr-1">Email:</span>
              <span className="text-purple-800"> {user.user_email}</span>
            </p>
            <p className="text-gray-600 font-bold">
              <span className=" mr-1">ID:</span>
              <span className="text-purple-800"> {user.user_id}</span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default User;
