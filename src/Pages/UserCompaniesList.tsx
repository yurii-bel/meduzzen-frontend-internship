import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../Api/api";
import { Company } from "../Types/types";
import UserCompanyItem from "../Components/UserCompanyItem";
import CompanyItem from "../Components/CompanyItem";

const UserCompaniesList: React.FC = () => {
  const { id } = useParams();
  const [companiesList, setCompaniesList] = useState<Company[]>([]);

  useEffect(() => {
    const companyId = parseInt(id || "");
    if (isNaN(companyId)) {
      return;
    }
    api
      .getUserCompaniesList(companyId)
      .then((response) => {
        const companyData = response.data.result.companies;
        setCompaniesList(companyData);
        console.log(companyData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <h2 className="font-bold text-2xl">User companies</h2>
      <ul className="flex flex-col w-screen gap-4">
        {companiesList.map((company) => (
          <UserCompanyItem key={company.company_id} company={company} />
        ))}
      </ul>
    </div>
  );
};

export default UserCompaniesList;
