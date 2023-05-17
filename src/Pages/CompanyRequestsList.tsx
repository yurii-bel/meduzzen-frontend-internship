import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../Api/api";
import CompanyRequestsItem from "../Components/CompanyRequestsItem";
import { User } from "../Types/types";

const CompanyRequestsList: React.FC = () => {
  const [companyRequestsList, setCompanyRequestsList] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshSignal, setRefreshSignal] = useState("");

  const { id } = useParams();

  const fetchCompanyRequestsList = () => {
    setIsLoading(true);

    api
      .getCompanyRequestsList(Number(id))
      .then((response) => {
        console.log(response);
        setCompanyRequestsList(response.data.result.users);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchCompanyRequestsList();
  }, [refreshSignal]);

  const handleAcceptRequest = (actionId: string) => {
    api
      .getActionAcceptRequest(Number(actionId))
      .then(() => {
        setRefreshSignal(Date.now().toString()); // Update the refresh signal to trigger the useEffect
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeclineRequest = (actionId: string) => {
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
        Requests from users to this company
      </h3>
      <div className="flex flex-col gap-4">
        {isLoading
          ? "Loading..."
          : companyRequestsList.length === 0
          ? "No users requests yet "
          : companyRequestsList.map((user) => (
              <CompanyRequestsItem
                key={user.user_id}
                user={user}
                onAcceptRequest={handleAcceptRequest}
                onDeclineRequest={handleDeclineRequest}
              />
            ))}
      </div>
    </div>
  );
};

export default CompanyRequestsList;
