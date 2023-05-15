import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../Api/api";
import { User } from "../Types/types";

const CompanyMembersList: React.FC = () => {
  const { id } = useParams();

  const [companyMembersList, setCompanyMembersList] = useState<User[]>([]);

  useEffect(() => {
    api.getCompanyMembersList(Number(id)).then((response) => {
      setCompanyMembersList(response.data.result.users);
    });
  }, []);

  return (
    <div>
      <h3>Company MembersList</h3>
      <div className="flex flex-col gap-4">
        {companyMembersList?.map((member) => (
          <div
            className="flex flex-col p-2 border-2 border-purple-200"
            key={member.user_id}
          >
            <div>{member.user_firstname}</div>
            <div>{member.action}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyMembersList;
