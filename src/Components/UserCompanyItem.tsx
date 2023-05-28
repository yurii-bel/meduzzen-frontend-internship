import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../Api/api";
import { Company } from "../Types/types";
import Button from "./Core/Button";

type UserCompanyItemProps = {
  company: Company;
  handleLeaveCompany: (actionId: number) => void;
};

const UserCompanyItem: React.FC<UserCompanyItemProps> = ({
  company,
  handleLeaveCompany,
}) => {
  const { id } = useParams();

  const [companyAvgRating, setCompanyAvgRating] = useState<number>();

  const fetchUserAvgRating = async () => {
    try {
      const response = await api.getUserRatingInCompany(
        Number(id),
        company.company_id
      );
      const avgRating = response.data.result.rating;
      setCompanyAvgRating(avgRating / 10);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserAvgRating();
  }, [fetchUserAvgRating]);

  const handleLeave = () => {
    handleLeaveCompany(company.action_id);
  };

  return (
    <div className="flex justify-between px-12 py-2 items-center gap-12 bg-purple-50 ">
      <Link to={`/company-profile/${company.company_id}`}>
        <div className="flex justify-center items-center gap-2 p-1 rounded-md bg-purple-200 hover:bg-purple-300 hover:cursor-pointer px-4">
          <img
            className="w-16 h-16 rounded-full"
            src={company.company_avatar}
            alt="company avatar"
          />
          <div>
            <p className="font-bold">{company.company_name}</p>
            <p className="text-sm text-gray-700">
              Status:{" "}
              <span
                className={`font-bold ${
                  company.action === "owner"
                    ? "text-red-500"
                    : company.action === "admin"
                    ? "text-purple-500"
                    : "text-green-500"
                }`}
              >
                {company.action}
              </span>
            </p>
            <p className="text-sm text-gray-700">
              Average rating:
              <span className="pl-1 font-bold">{companyAvgRating}</span>
            </p>
          </div>
        </div>
      </Link>
      <div>
        {company.action !== "owner" && (
          <Button label="Leave" onClick={handleLeave} />
        )}
      </div>
    </div>
  );
};

export default UserCompanyItem;
