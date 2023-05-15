import CompanyItem from "../Components/CompanyItem";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../Store";
import { useEffect, useState } from "react";
import api from "../Api/api";
import { setCompanies } from "../Store/companiesListReducer";
import Button from "../Components/Core/Button";
import Pagination from "../Components/Pagination";
import Modal from "../Components/Modal/Modal";
import CustomInput from "../Components/Core/CustomInput";

const CompaniesList: React.FC = () => {
  const dispath = useDispatch();
  const companies = useSelector((state: RootState) => state.companiesList);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [modalCompanyName, setModalCompanyName] = useState("");

  // Modal
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  // Handle events
  const handleCompanyNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setModalCompanyName(value);
  };

  const handleCreateCompany = () => {
    api.postCreateCompany(modalCompanyName);
    handleCloseModal();
  };

  useEffect(() => {
    api.getCompanies(currentPage).then((response) => {
      const { pagination } = response.data.result;
      const companiesList = response.data.result.companies;
      dispath(setCompanies(companiesList));
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
    <section className="flex flex-col mt-4 mb-24">
      <Modal
        title="Create company"
        isOpen={showModal}
        onClose={handleCloseModal}
      >
        <CustomInput
          label="Company name"
          type="text"
          name="company_name"
          id="companyname"
          onChange={handleCompanyNameChange}
          value={modalCompanyName}
        />
        <p className="py-4">Are you sure you want to create this company?</p>
        <Button label="Yes" onClick={handleCreateCompany} />
      </Modal>
      <div className="w-36 ml-12 mb-4">
        <Button label="Create company" onClick={handleShowModal} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 px-12 mb-4">
        {companies.map((company, id) => (
          <CompanyItem company={company} key={id} />
        ))}
      </div>
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
    </section>
  );
};

export default CompaniesList;
