import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Company } from "../Types/types";
import Button from "./Core/Button";
import Spinner from "./Core/Spinner";

type UserCompanyItemRequestProps = {
  company: Company;
  handleSendRequestToCompany: (id: number) => void;
};

const UserCompanyItemRequest: React.FC<UserCompanyItemRequestProps> = ({
  company,
  handleSendRequestToCompany,
}) => {
  const [loading, setLoading] = useState(false);

  const handleSendRequest = async () => {
    setLoading(true);
    await handleSendRequestToCompany(company.company_id);
    setLoading(false);
  };

  return (
    <div className="flex justify-between px-12 py-2 items-center gap-12 bg-purple-50 ">
      <Link to={`/company-profile/${company.company_id}`}>
        <div className="flex justify-center items-center gap-2 p-1 rounded-md bg-purple-200 hover:bg-purple-300 hover:cursor-pointer px-4">
          <img
            className="w-16 h-16 rounded-full"
            src={
              company.company_avatar ||
              "https://www.freeiconspng.com/thumbs/office-icon/office-icon--insharepics-11.png"
            }
            alt="company avatar"
          />
          <div>
            <p className="font-bold">{company.company_name}</p>
            <p>{company.company_title}</p>
          </div>
        </div>
      </Link>
      <div>
        {!loading ? (
          <Button label="Send Request" onClick={handleSendRequest} />
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default UserCompanyItemRequest;
