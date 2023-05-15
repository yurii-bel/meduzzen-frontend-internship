import React from "react";
import { Company } from "../Types/types";

type MyCompanyItemProps = {
  company: Company;
};

const MyCompanyItem: React.FC<MyCompanyItemProps> = ({ company }) => {
  return (
    <li>
      <p>Company ID: {company.company_id}</p>
      <p>Company Name: {company.company_name}</p>
      <p>Company Title: {company.company_title}</p>
    </li>
  );
};

export default MyCompanyItem;
