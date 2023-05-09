import React from "react";
import { UserProps } from "../Types/types";
import { Link } from "react-router-dom";

const User: React.FC<UserProps> = ({ user }) => {
  return (
    <Link to={`/user-profile/${user.user_id}`}>
      <div className="border border-gray-300 rounded p-4 hover:bg-purple-50 hover:border-purple-600 hover:cursor-pointer duration-100">
        <div className="flex items-center mb-4">
          <img
            className="h-12 w-12  mr-4 object-cover"
            src={
              user.user_avatar ||
              "https://assets.stickpng.com/images/585e4bf3cb11b227491c339a.png"
            }
            alt="User Avatar"
          />
          <div>
            <h2 className="text-lg font-bold">{`${user.user_firstname} ${user.user_lastname}`}</h2>
            <p className="text-gray-600">{user.user_city}</p>
          </div>
        </div>
        <div className="mb-4">
          <p className="text-gray-600">
            <span className="font-bold">Email:</span> {user.user_email}
          </p>
          <p className="text-gray-600">
            <span className="font-bold">Phone:</span> {user.user_phone}
          </p>
          <p className="text-gray-600">
            <span className="font-bold">Status:</span> {user.user_status}
          </p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-bold">Links:</h3>
          {/* <ul className="list-disc list-inside">
      {user.user_links.map((link, index) => (
        <UserLinksItem link={link} key={index} />
      ))}
    </ul> */}
        </div>
      </div>
    </Link>
  );
};

export default User;
