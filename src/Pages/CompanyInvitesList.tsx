import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../Api/api";
import CompanyInvitesItem from "../Components/CompanyInvitesItem";
import { User } from "../Types/types";

const CompanyInvitesList: React.FC = () => {
  const [companyInvitesList, setCompanyInvitesList] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshSignal, setRefreshSignal] = useState("");

  const { id } = useParams();

  const fetchCompanyInvitesList = () => {
    setIsLoading(true);

    api
      .getCompanyInvitesList(Number(id))
      .then((response) => {
        console.log(response);
        setCompanyInvitesList(response.data.result.users);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchCompanyInvitesList();
  }, [refreshSignal]);

  const handleCancelInvite = (actionId: string) => {
    api
      .getActionDeclineAction(Number(actionId))
      .then(() => {
        setRefreshSignal(Date.now().toString());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="m-6">
      <h3 className="font-bold text-xl mb-4">
        Invites from this company to users
      </h3>
      <div className="flex flex-col gap-4">
        {isLoading
          ? "Loading..."
          : companyInvitesList.length === 0
          ? "No invites to users from this company "
          : companyInvitesList.map((user) => (
              <CompanyInvitesItem
                key={user.user_id}
                user={user}
                onCancelInvite={handleCancelInvite}
              />
            ))}
      </div>
    </div>
  );
};

export default CompanyInvitesList;
