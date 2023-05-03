import React from "react";
import UserLinksItem from "./UserLinksItem";

interface UserProps {
  user: {
    user_id: number;
    user_firstname: string;
    user_lastname: string;
    user_avatar: string;
    user_email: string;
    user_city: string;
    user_phone: string;
    user_status: string;
    user_links: string[];
  };
}

const User: React.FC<UserProps> = ({ user }) => {
  return (
    <div key={user.user_id}>
      <div className="border rounded p-4">
        <div className="flex items-center mb-4">
          <img
            className="h-12 w-12 rounded-full mr-4"
            src={user.user_avatar}
            alt="User Avatar"
          />
          <div>
            <h2 className="text-lg font-bold">{`${user.user_firstname} ${user.user_lastname}`}</h2>
            <p className="text-gray-600">{user.user_city}</p>
          </div>
        </div>
        <div className="mb-4">
          <p className="text-gray-600">Email: {user.user_email}</p>
          <p className="text-gray-600">Phone: {user.user_phone}</p>
          <p className="text-gray-600">Status: {user.user_status}</p>
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
    </div>
  );
};

export default User;
