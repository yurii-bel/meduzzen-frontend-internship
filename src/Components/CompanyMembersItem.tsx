import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../Api/api";
import { User } from "../Types/types";
import ActionButton from "./Core/ActionButton";

type CompanyMembersItemProps = {
  member: User;
  enableActions: boolean;
  handleExpelUserFromCompany: (actionId: number) => void;
  handleMakeUserAdminFromCompany: (actionId: number) => void;
  handleMakeAdminUserFromCompany: (actionId: number) => void;
  handleAddToBlock: (actionId: number) => void;
};

const CompanyMembersItem: React.FC<CompanyMembersItemProps> = ({
  member,
  enableActions,
  handleExpelUserFromCompany,
  handleMakeUserAdminFromCompany,
  handleMakeAdminUserFromCompany,
  handleAddToBlock,
}) => {
  const [quizLastPassTime, setQuizLastPassTime] = useState<string>("");

  const [userDataCsv, setUserDataCsv] = useState("");

  const { id } = useParams();

  const handleDownloadCSV = () => {
    const csvData =
      "data:text/csv;charset=utf-8," + encodeURIComponent(userDataCsv);
    const link = document.createElement("a");
    link.setAttribute("href", csvData);
    link.setAttribute(
      "download",
      `company_${id}_user_${member.user_id}_quiz_data.csv`
    );
    link.click();
  };

  const fetchUserQuizData = async () => {
    try {
      const response = await api.getCompanyLastAnswersCsvForUser(
        Number(id),
        member.user_id
      );
      setUserDataCsv(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUserLastQuizPass = async () => {
    try {
      const response = await api.getCompanyQuizzesLastPass(Number(id));
      const users = response.data.result.users;
      for (let user of users) {
        if (user.user_id === member.user_id) {
          const quizLastPass =
            user.quizzes.length > 0 &&
            user.quizzes[user.quizzes.length - 1].last_quiz_pass_at;
          setQuizLastPassTime(quizLastPass);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserLastQuizPass();
    fetchUserQuizData();
  }, []);

  const handleMakeUserAdmin = () => {
    handleMakeUserAdminFromCompany(Number(member.action_id));
  };

  const handleMakeAdminUser = () => {
    handleMakeAdminUserFromCompany(Number(member.action_id));
  };

  const handleBlockUser = () => {
    handleAddToBlock(Number(member.action_id));
  };

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
                alt="User Avatar"
              />
            </div>
            <div>
              <div className="text-xl font-bold text-gray-800">
                {member.user_firstname}
              </div>
              <div className="text-sm font-bold text-gray-500">
                {member.user_email}
              </div>
              <div className="text-xs text-gray-500">
                {quizLastPassTime
                  ? `Last quiz: ${quizLastPassTime}`
                  : "0 quizzes passed"}
              </div>
              {member && (
                <div className="h-0">
                  <span
                    className="text-xs font-bold tracking-wide text-white px-2 py-0.5 bg-gray-700 border hover:cursor-pointer hover:bg-blue-700 active:bg-blue-700 duration-200 select-none rounded-md"
                    onClick={() => handleDownloadCSV()}
                  >
                    Export quiz data
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div
          className={`text-sm font-bold ${
            member.action === "owner"
              ? "text-red-500"
              : member.action === "admin"
              ? "text-purple-500"
              : "text-green-500"
          } `}
        >
          {member.action}
        </div>
      </div>

      {enableActions &&
        (member.action === "member" || member.action === "admin") && (
          <div className="flex justify-center items-center gap-4">
            {member.action === "admin" ? (
              <>
                <ActionButton
                  label="Make a user"
                  onClick={handleMakeAdminUser}
                  color="gray"
                />
              </>
            ) : (
              <>
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
              </>
            )}

            <ActionButton label="Expel" onClick={handleExpelUser} color="red" />
          </div>
        )}
    </div>
  );
};

export default CompanyMembersItem;
