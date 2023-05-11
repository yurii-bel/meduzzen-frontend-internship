import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../Api/api";
import Button from "../Components/Core/Button";
import CustomInput from "../Components/Core/CustomInput";
import Modal from "../Components/Modal/Modal";
import { Company } from "../Types/types";
import { useSelector } from "react-redux";
import { RootState } from "../Store";

const CompanyProfilePage: React.FC = () => {
  const { id } = useParams();
  const [company, setCompany] = useState<Company>();
  const [initialCompany, setInitialCompany] = useState<Company>();
  const [disabled, setDisabled] = useState<boolean>(true);
  const [updateDisabled, setUpdateDisabled] = useState<boolean>(false);
  const [avatarFile, setAvatarFile] = useState<FormData>(new FormData());

  const myCompany = useSelector((state: RootState) => state.company);

  // Modal
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  // Validation

  // Handle events
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (company) {
      setCompany({ ...company, [name]: value, company_id: company.company_id });
    }
  };

  const handleAvatarFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      setAvatarFile(formData);
    }
  };

  // const handleDeleteCompany = () => {
  //   api.deleteCompany(Number(id));
  //   if (user?.user_id === Number(id)) {
  //     handleLogout();
  //   }
  // };

  return <div className="flex flex-col items-center"></div>;
};

export default CompanyProfilePage;
