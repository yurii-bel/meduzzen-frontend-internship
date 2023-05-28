import { Company } from "../Types/types";
import ActionButton from "./Core/ActionButton";

interface UserRequestsItemProps {
  company: Company;
  onCancelRequest: (actionId: string) => void;
}

const UserRequestsItem: React.FC<UserRequestsItemProps> = ({
  company,
  onCancelRequest,
}) => {
  const handleCancelRequest = () => {
    onCancelRequest(company.action_id);
  };

  return (
    <div className="flex justify-between p-2 border-2 bg-gray-50 rounded-md">
      <div>
        <div className="text-sm text-gray-500">{company.action_id}</div>
        <div className="p-2 bg-white">
          <div className="flex items-center mb-4">
            <div>
              <img
                className="h-12 w-12 rounded-full mr-4 object-cover"
                src={
                  company.company_avatar ||
                  "https://www.freeiconspng.com/thumbs/office-icon/office-icon--insharepics-11.png"
                }
                alt="Company Avatar"
              />
            </div>
            <div>
              <div className="text-xl font-bold text-gray-800">
                {company.company_name}
              </div>
              <div className="text-sm font-bold text-gray-500">
                {company.company_title}
              </div>
            </div>
          </div>
        </div>
        <div
          className={`text-sm font-bold ${
            company.action === "invite" ? "text-green-500" : "text-red-500"
          } `}
        >
          {company.action}
        </div>
      </div>
      {true && (
        <div className="flex justify-center items-center gap-4">
          <ActionButton
            label="Cancel"
            onClick={handleCancelRequest}
            color="red"
          />
        </div>
      )}
    </div>
  );
};

export default UserRequestsItem;
