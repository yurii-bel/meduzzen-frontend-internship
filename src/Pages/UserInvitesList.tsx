import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../Api/api";
import { Company } from "../Types/types";

const UserInvitesList: React.FC = () => {
  const [userInvitesList, setUserInvitesList] = useState<Company[]>([]);
  const { id } = useParams();

  useEffect(() => {
    api.getUserInvitesList(Number(id)).then((response) => {
      setUserInvitesList(response.data.result.companies);
      console.log(response.data.result.companies);
    });
  }, []);

  return (
    <div className="flex flex-col justify-center">
      <h3 className="font-bold text-2xl mb-4"> InvitesList</h3>
      <div className="flex justify-center items-center gap-4">
        <p>
          {userInvitesList.length === 0
            ? "No companies"
            : userInvitesList.map((company) => (
                <div>{company.company_name}</div>
              ))}
        </p>
        <button className="border border-blue-400 p-1">Cancel</button>
      </div>
    </div>
  );
};

export default UserInvitesList;
