import { Link } from "react-router-dom";
import { Company } from "../Types/types";

interface CompanyItemProps {
  company: Company;
}

const CompanyItem: React.FC<CompanyItemProps> = ({ company }) => {
  return (
    <Link to={`/company-profile/${company.company_id}`}>
      <div className="border border-gray-300 rounded p-4 hover:bg-purple-50 hover:border-purple-600 hover:cursor-pointer duration-100">
        <div className="flex items-center mb-4">
          <img
            className="h-24 w-24  mr-4 object-cover"
            src={
              company.company_avatar ||
              "https://www.freeiconspng.com/thumbs/office-icon/office-icon--insharepics-11.png"
            }
            alt="Company Avatar"
          />
        </div>
        <div className="bg-gray-50 p-2">
          <h2 className="font-bold text-gray-600 mb-2">
            <span className="mr-1">Comapny Name:</span>
            <span className="text-purple-800">{company.company_name}</span>
          </h2>
          <div className="mb-4">
            <p className="text-gray-600 font-bold">
              <span className=" mr-1">Title:</span>
              <span className="text-purple-800"> {company.company_title}</span>
            </p>
            <p className="text-gray-600 font-bold">
              <span className=" mr-1">ID:</span>
              <span className="text-purple-800"> {company.company_id}</span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CompanyItem;
