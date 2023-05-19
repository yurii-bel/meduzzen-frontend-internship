import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../Api/api";
import { Company } from "../Types/types";
import UserCompanyItemRequest from "../Components/UserCompanyItemRequest";
import Button from "../Components/Core/Button";
import Pagination from "../Components/Pagination";

const UserSendRequest: React.FC = () => {
  const [companiesList, setCompaniesList] = useState<Company[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const handleSendRequestToCompany = async (id: number) => {
    try {
      await api.getActionCreateFromUserToCompany(id);
    } catch (error) {
      alert("You have already send the request or being member of the company");
    }
  };

  useEffect(() => {
    api.getCompanies(currentPage).then((response) => {
      const { pagination } = response.data.result;
      const companiesList = response.data.result.companies;
      setCompaniesList(companiesList);
      setCurrentPage(pagination.current_page);
      setTotalPages(pagination.total_page);
      setTotalResults(pagination.total_results);
    });
  }, [currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <h2 className="font-bold text-2xl">
        User can send request to these companies
      </h2>
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {companiesList.map((company) => (
          <UserCompanyItemRequest
            key={company.company_id}
            company={company}
            handleSendRequestToCompany={handleSendRequestToCompany}
          />
        ))}
      </ul>
      <div className="flex justify-center items-center gap-12 mx-12">
        <div className="flex gap-1">
          <Button
            label="First"
            onClick={handleFirstPage}
            disabled={currentPage === 1}
          />
          <Button
            label="Previous"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          />
        </div>
        <div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </div>
        <div className="flex gap-1">
          <Button
            label="Next"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          />
          <Button
            label="Last"
            onClick={handleLastPage}
            disabled={currentPage === totalPages}
          />
        </div>
        <div>
          <p>
            Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
          </p>
          <p>
            Total results: <strong>{totalResults}</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserSendRequest;
