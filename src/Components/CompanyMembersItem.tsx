import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import api from "../Api/api";
import { RootState } from "../Store";
import { User } from "../Types/types";
import ActionButton from "./Core/ActionButton";

type CompanyMembersItemProps = {
  member: User;
  enableActions: boolean;
  handleExpelUserFromCompany: (actionId: number) => void;
};

const CompanyMembersItem: React.FC<CompanyMembersItemProps> = ({
  member,
  enableActions,
  handleExpelUserFromCompany,
}) => {
  const { id } = useParams();

  const handleMakeUserAdmin = () => {};
  const handleBlockUser = () => {};
  const handleExpelUser = () => {
    handleExpelUserFromCompany(Number(member.action_id));
  };

  return (
    <div
      className="flex justify-between p-2 border-2 bg-gray-50 rounded-md"
      key={member.user_id}
    >
      <div>
        <div className="text-sm text-gray-500">{member.action_id}</div>
        <div className="p-2 bg-white">
          <div className="flex items-center mb-4">
            <div>
              <img
                className="h-12 w-12 rounded-full mr-4 object-cover"
                src={
                  member.user_avatar ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                }
                alt="Company Avatar"
              />
            </div>
            <div>
              <div className="text-xl font-bold text-gray-800">
                {member.user_firstname}
              </div>
              <div className="text-sm font-bold text-gray-500">
                {member.user_email}
              </div>
            </div>
          </div>
        </div>
        <div
          className={`text-sm font-bold ${
            member.action !== "owner" ? "text-green-500" : "text-red-500"
          } `}
        >
          {member.action}
        </div>
      </div>
      {enableActions ? (
        member.action !== "owner" ? (
          <div className="flex justify-center items-center gap-4">
            <ActionButton
              label="Make an admin"
              onClick={handleMakeUserAdmin}
              color="blue"
            />
            <ActionButton
              label="Block"
              onClick={handleBlockUser}
              color="gray"
            />
            <ActionButton label="Expel" onClick={handleExpelUser} color="red" />
          </div>
        ) : (
          ""
        )
      ) : (
        ""
      )}
    </div>
  );
};

export default CompanyMembersItem;
