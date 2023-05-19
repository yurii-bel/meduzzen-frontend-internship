import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import api from "../Api/api";
import CompanyMembersItem from "../Components/CompanyMembersItem";
import Spinner from "../Components/Core/Spinner";
import { RootState } from "../Store";
import { User } from "../Types/types";

const CompanyMembersList: React.FC = () => {
  const { id } = useParams();

  const [companyMembersList, setCompanyMembersList] = useState<User[]>([]);
  const [enableActions, setEnableActions] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Added loading state

  const user = useSelector((state: RootState) => state.user);

  const handleAddToBlock = async (actionId: number) => {
    try {
      await api.getActionAddToBlock(actionId);

      const updatedCompaniesList = companyMembersList.filter(
        (company) => Number(company.action_id) !== actionId
      );
      setCompanyMembersList(updatedCompaniesList);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveFromBlock = async (actionId: number) => {
    try {
      await api.getActionRemoveFromBlock(actionId);

      const updatedCompaniesList = companyMembersList.filter(
        (company) => Number(company.action_id) !== actionId
      );
      setCompanyMembersList(updatedCompaniesList);
    } catch (error) {
      console.log(error);
    }
  };

  const handleExpelUserFromCompany = async (actionId: number) => {
    try {
      await api.getActionLeaveCompany(actionId);
      const updatedCompaniesList = companyMembersList.filter(
        (company) => Number(company.action_id) !== actionId
      );
      setCompanyMembersList(updatedCompaniesList);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMakeUserAdminFromCompany = async (actionId: number) => {
    try {
      await api.getActionAddToAdmin(actionId);
      const updatedMembersList = companyMembersList.map((member) => {
        if (Number(member.action_id) === actionId) {
          return {
            ...member,
            action: "admin",
          };
        }
        return member;
      });
      setCompanyMembersList(updatedMembersList);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMakeAdminUserFromCompany = async (actionId: number) => {
    try {
      await api.getActionRemoveFromAdmin(actionId);
      const updatedMembersList = companyMembersList.map((member) => {
        if (Number(member.action_id) === actionId) {
          return {
            ...member,
            action: "member",
          };
        }
        return member;
      });
      setCompanyMembersList(updatedMembersList);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const companyMembersResponse = await api.getCompanyMembersList(
        Number(id)
      );
      setCompanyMembersList(companyMembersResponse.data.result.users);

      const userCompaniesResponse = await api.getUserCompaniesList(
        Number(user.user_id)
      );
      const companies = userCompaniesResponse.data.result.companies;
      const isUserCompanyOwner = companies.some(
        (company: { company_id: number; action: string }) =>
          company.company_id === Number(id) &&
          (company.action === "owner" || company.action === "admin")
      );
      setEnableActions(isUserCompanyOwner);
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  // useEffect(() => {
  //   fetchData();
  // }, [refreshSignal]);

  useEffect(() => {
    fetchData();
  }, [id, user.user_id]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="m-6">
      <h3 className="font-bold text-xl mb-4">Company MembersList</h3>
      <div className="flex flex-col gap-4">
        {companyMembersList?.map((member) => (
          <CompanyMembersItem
            key={member.user_id}
            member={member}
            enableActions={enableActions}
            handleExpelUserFromCompany={handleExpelUserFromCompany}
            handleMakeUserAdminFromCompany={handleMakeUserAdminFromCompany}
            handleMakeAdminUserFromCompany={handleMakeAdminUserFromCompany}
            handleAddToBlock={handleAddToBlock}
          />
        ))}
      </div>
    </div>
  );
};

export default CompanyMembersList;
