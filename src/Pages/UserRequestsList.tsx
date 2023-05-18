import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../Api/api";
import UserRequestsItem from "../Components/UserRequestsItem";
import { Company } from "../Types/types";

const UserRequestsList: React.FC = () => {
  const [userRequestsList, setUserRequestsList] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshSignal, setRefreshSignal] = useState("");

  const { id } = useParams();

  const fetchUserRequestsList = () => {
    setIsLoading(true);

    api
      .getUserRequestsList(Number(id))
      .then((response) => {
        setUserRequestsList(response.data.result.companies);
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
    fetchUserRequestsList();
  }, [refreshSignal]);

  const handleCancelRequest = (actionId: string) => {
    api
      .getActionDeclineAction(Number(actionId))
      .then(() => {
        // Remove the cancelled item from the userRequestsList
        setUserRequestsList((prevList) =>
          prevList.filter((company) => company.action_id !== actionId)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="m-6">
      <h3 className="font-bold text-xl mb-4">
        Requests list from user to companies
      </h3>
      <div className="flex flex-col gap-4">
        {isLoading
          ? "Loading..."
          : userRequestsList.length === 0
          ? "No companies"
          : userRequestsList.map((company) => (
              <UserRequestsItem
                key={company.company_id}
                company={company}
                onCancelRequest={handleCancelRequest}
              />
            ))}
      </div>
    </div>
  );
};

export default UserRequestsList;
