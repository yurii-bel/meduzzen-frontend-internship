import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Company, User } from "../Types/types";
import Button from "./Core/Button";
import Spinner from "./Core/Spinner";

type CompanyUserItemInviteProps = {
  user: User;
  handleSendInviteToUser: (user_id: number) => void;
};

const CompanyUserItemInvite: React.FC<CompanyUserItemInviteProps> = ({
  user,
  handleSendInviteToUser,
}) => {
  const [loading, setLoading] = useState(false);

  const handleSendInvite = async () => {
    setLoading(true);
    await handleSendInviteToUser(user.user_id);
    setLoading(false);
  };

  return (
    <div className="flex justify-between px-12 py-2 items-center gap-12 bg-purple-50 ">
      <Link to={`/user-profile/${user.user_id}`}>
        <div className="flex justify-center items-center gap-2 p-1 rounded-md bg-purple-200 hover:bg-purple-300 hover:cursor-pointer px-4">
          <img
            className="w-16 h-16 rounded-full"
            src={
              user.user_avatar ||
              "https://www.freeiconspng.com/thumbs/office-icon/office-icon--insharepics-11.png"
            }
            alt="user avatar"
          />
          <div>
            <p className="font-bold">
              {user.user_firstname} {user.user_lastname}
            </p>
            <p>{user.user_email}</p>
          </div>
        </div>
      </Link>
      <div>
        {!loading ? (
          <Button label="Send Invite" onClick={handleSendInvite} />
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default CompanyUserItemInvite;
