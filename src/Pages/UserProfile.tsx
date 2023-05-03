import React from "react";

interface UserProfileProps {
  user_id: number;
  user_email: string;
  user_firstname: string;
  user_lastname: string;
  user_avatar: string;
}
const user: UserProfileProps = {
  user_id: 1,
  user_email: "john.doe@example.com",
  user_firstname: "John",
  user_lastname: "Doe",
  user_avatar: "https://via.placeholder.com/150",
};
const UserProfile: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <img
        src={user.user_avatar}
        alt={`${user.user_firstname} ${user.user_lastname}`}
        className="h-24 w-24 rounded-full mb-4"
      />
      <h1 className="text-2xl font-bold mb-2">{`${user.user_firstname} ${user.user_lastname}`}</h1>
      <p className="text-gray-700 mb-2">{user.user_email}</p>
      <p className="text-gray-700 mb-4">{`User ID: ${user.user_id}`}</p>
    </div>
  );
};

export default UserProfile;
