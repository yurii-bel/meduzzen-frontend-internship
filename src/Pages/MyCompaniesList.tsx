import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../Api/api";
import { Company } from "../Types/types";
import MyCompanyItem from "../Components/MyCompanyItem";

const MyCompaniesList: React.FC = () => {
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
    <div className="flex flex-col justify-center items-center border-2 border-purple-500 gap-4">
      <h2 className="font-bold text-2xl">My companies</h2>
      <ul>
        {companiesList.map((company) => (
          <MyCompanyItem key={company.company_id} company={company} />
        ))}
      </ul>
    </div>
  );
};

export default MyCompaniesList;
