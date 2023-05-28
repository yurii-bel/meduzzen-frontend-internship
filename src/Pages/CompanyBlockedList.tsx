import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../Api/api";
import CompanyBlockedItem from "../Components/CompanyBlockedItem";
import { User } from "../Types/types";

const CompanyBlockedList: React.FC = () => {
  const [companyBlockedList, setCompanyBlockedList] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshSignal] = useState("");

  const { id } = useParams();

  const fetchCompanyBlockedList = () => {
    setIsLoading(true);

    api
      .getCompanyBlockedList(Number(id))
      .then((response) => {
        console.log(response);
        setCompanyBlockedList(response.data.result.users);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchCompanyBlockedList();
  }, [refreshSignal, fetchCompanyBlockedList]);

  const handleUnblock = async (actionId: string) => {
    try {
      await api.getActionRemoveFromBlock(Number(actionId));

      const updatedBlockedList = companyBlockedList.filter(
        (company) => company.action_id !== actionId
      );
      setCompanyBlockedList(updatedBlockedList);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="m-6">
      <h3 className="font-bold text-xl mb-4">Blocked users</h3>
      <div className="flex flex-col gap-4">
        {isLoading
          ? "Loading..."
          : companyBlockedList.length === 0
          ? "No blocked users in this company "
          : companyBlockedList.map((user) => (
              <CompanyBlockedItem
                key={user.user_id}
                user={user}
                onUnblock={handleUnblock}
              />
            ))}
      </div>
    </div>
  );
};

export default CompanyBlockedList;
