import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../Api/api";
import { User } from "../Types/types";

const UserProfile: React.FC = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User>();

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
    <div className="flex flex-col items-center justify-center">
      <img
        src={user.data.result.user_avatar || ""}
        alt={`${user.data.result.user_firstname} ${user.data.result.user_lastname}`}
        className="h-24 w-24 rounded-full mb-4"
      />
      <h1 className="text-2xl font-bold mb-2">{`${user.data.result.user_firstname} ${user.data.result.user_lastname}`}</h1>
      <p className="text-gray-700 mb-2">{user.data.result.user_email}</p>
      <p className="text-gray-700 mb-4">{`User ID: ${user.data.result.user_id}`}</p>
    </div>
  );
};

export default UserProfile;
