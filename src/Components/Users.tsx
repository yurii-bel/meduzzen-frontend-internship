import React from "react";
import User from "./User";

interface UsersProps {
  users: {
    result: {
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
  }[];
}

const Users: React.FC<UsersProps> = ({ users }) => {
  return (
    <>
      {users.map((user) => (
        <User user={user} />
      ))}
    </>
  );
};

export default Users;
