import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../Api/api";
import Button from "../Components/Core/Button";
import CustomInput from "../Components/Core/CustomInput";
import Modal from "../Components/Modal/Modal";
import { Company, CompanyState } from "../Types/types";
import { useSelector } from "react-redux";
import { RootState } from "../Store";

const CompanyProfile: React.FC = () => {
  const { id } = useParams();
  const [company, setCompany] = useState<CompanyState>();
  const [initialCompany, setInitialCompany] = useState<Company>();
  const [disabled, setDisabled] = useState<boolean>(true);
  const [updateDisabled, setUpdateDisabled] = useState<boolean>(false);
  const [avatarFile, setAvatarFile] = useState<FormData>(new FormData());

  const navigate = useNavigate();
  // const myCompany = useSelector((state: RootState) => state.company);
  const loggedUser = useSelector((state: RootState) => state.user);

  const testHandle = () => {};

  useEffect(() => {
    console.log(company?.company_title);
  }, [company]);

  useEffect(() => {
    const companyId = parseInt(id || "");
    if (isNaN(companyId)) {
      return;
    }
    api
      .getCompany(companyId)
      .then((response) => {
        const company = response;
        setCompany(company.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  // if (!company) {
  //   return <div>Loading...</div>;
  // }

  // Modal
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  // Main info handlers
  const handleDeleteCompany = () => {
    api.deleteCompany(Number(company?.company_id));
    alert("Company successfully deleted!");
    navigate("/companies-list");
  };

  const handleUpdateCompanyInfo = () => {
    api.putUpdateCompanyInfo(
      Number(id),
      company?.company_name ?? "",
      company?.company_title ?? "",
      company?.company_description ?? "",
      company?.company_city ?? "",
      company?.company_phone ?? ""
    );
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

  return (
    <>
      <Modal
        title="Delete profile"
        isOpen={showModal}
        onClose={handleCloseModal}
      >
        <p>Are you sure you want to delete this company profile?</p>
        <Button label="Yes" onClick={handleDeleteCompany} />
      </Modal>
      <div className="flex justify-center min-h-1/2 py-2sm:py-12 mb-24 ">
        <div className="flex justify-center py-1 gap-4">
          {/* <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div> */}
          <div className="px-1 py-1 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div className="">
                <div className="flex justify-center">
                  <img
                    className="h-24 w-24"
                    src={
                      company?.company_avatar ||
                      "https://www.freeiconspng.com/thumbs/office-icon/office-icon--insharepics-11.png"
                    }
                    alt="Company Avatar"
                  />
                </div>
                <div className="text-center">
                  <h2 className="text-xl font-bold text-purple-700">
                    {company?.company_name}
                  </h2>
                </div>
              </div>
              <form className="mt-6 space-y-1">
                <div className="grid grid-cols-1 gap-6">
                  <CustomInput
                    label="Company title"
                    type="text"
                    name="company_title"
                    id="company_title"
                    onChange={handleChange}
                    disabled={disabled}
                    value={`${company?.company_title}`}
                  />
                  <CustomInput
                    label="Company description"
                    type="text"
                    name="company_description"
                    id="company_description"
                    onChange={handleChange}
                    disabled={disabled}
                    value={`${company?.company_description}`}
                  />
                  <CustomInput
                    label="Company city"
                    type="text"
                    name="company_city"
                    id="company_city"
                    onChange={handleChange}
                    disabled={disabled}
                    value={`${company?.company_city}`}
                  />
                  <CustomInput
                    label="Company phone"
                    type="tel"
                    name="company_phone"
                    id="company_phone"
                    onChange={handleChange}
                    disabled={disabled}
                    value={`${company?.company_phone}`}
                  />
                </div>
              </form>
              <div className="flex flex-col justify-center items-center p-4 border border-purple-800 rounded-md mt-4 hover:bg-purple-50">
                <h3 className="font-bold mb-2">Company owner</h3>
                <img
                  className="h-24 w-24 rounded-full"
                  src={
                    company?.company_owner.user_avatar ||
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                  }
                  alt="Company Owner Avatar"
                />
                <div className="flex flex-col">
                  <div className="flex gap-2">
                    <span>First name:</span>
                    <span className="font-bold">
                      {company?.company_owner.user_firstname}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <span>Last name:</span>
                    <span className="font-bold">
                      {company?.company_owner.user_lastname}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <span>Email:</span>
                    <span className="font-bold">
                      {company?.company_owner.user_email}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 mr-36 relative px-1 py-1 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            {loggedUser.user_id === company?.company_owner.user_id ? (
              <>
                <h3 className="text-xl text-center text-purple-900 font-bold mb-12">
                  Options
                </h3>
                <Button label="Delete this company" onClick={handleShowModal} />
                {disabled ? (
                  <Button
                    label="Change company information"
                    onClick={testHandle}
                  />
                ) : (
                  <div className="flex justify-center items-center gap-4">
                    <Button
                      label="Update company"
                      disabled={updateDisabled}
                      onClick={testHandle}
                    />
                    <Button label="Cancel" onClick={testHandle} />
                  </div>
                )}

                <Button label="Update company avatar" onClick={testHandle} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarFile}
                />
              </>
            ) : (
              <div className="flex flex-col">
                <h3 className="text-xl text-center text-purple-900 font-bold mb-4">
                  Options:
                </h3>
                <span className="text-orange-700 font-bold italic!">
                  You are not allowed to change this company profile!
                </span>
                <span className="text-orange-700 font-bold italic!">
                  You must be company owner!
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyProfile;
