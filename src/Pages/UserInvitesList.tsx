import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../Api/api";
import UserInvitesItem from "../Components/UserInvitesItem";
import { Company } from "../Types/types";

const UserInvitesList: React.FC = () => {
  const [userInvitesList, setUserInvitesList] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshSignal, setRefreshSignal] = useState("");

  const { id } = useParams();

  const fetchUserInvitesList = () => {
    setIsLoading(true);

    api
      .getUserInvitesList(Number(id))
      .then((response) => {
        setUserInvitesList(response.data.result.companies);
        console.log(response.data.result.companies);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchUserInvitesList();
  }, [refreshSignal]);

  const handleAcceptInvite = (actionId: string) => {
    api
      .getActionAcceptInvite(Number(actionId))
      .then(() => {
        setRefreshSignal(Date.now().toString()); // Update the refresh signal to trigger the useEffect
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeclineInvite = (actionId: string) => {
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
      <h3 className="font-bold text-xl mb-4">Invites list from companies</h3>
      <div className="flex flex-col gap-4">
        {isLoading
          ? "Loading..."
          : userInvitesList.length === 0
          ? "No companies"
          : userInvitesList.map((company) => (
              <UserInvitesItem
                key={company.company_id}
                company={company}
                onAcceptInvite={handleAcceptInvite}
                onDeclineInvite={handleDeclineInvite}
              />
            ))}
      </div>
    </div>
  );
};

export default UserInvitesList;
