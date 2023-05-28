import { Company } from "../Types/types";
import ActionButton from "./Core/ActionButton";

interface UserInvitesItemProps {
  company: Company;
  onAcceptInvite: (actionId: string) => void;
  onDeclineInvite: (actionId: string) => void;
}

const UserInvitesItem: React.FC<UserInvitesItemProps> = ({
  company,
  onAcceptInvite,
  onDeclineInvite,
}) => {
  const handleAcceptInvite = () => {
    onAcceptInvite(company.action_id);
  };

  const handleDeclineInvite = () => {
    onDeclineInvite(company.action_id);
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
      {/* Add condition in future if needed... */}
      {true && (
        <div className="flex justify-center items-center gap-4">
          {/* <Button label="Accept" onClick={handleAcceptInvite} />
          <Button label="Decline" onClick={handleDeclineInvite} /> */}
          <ActionButton
            label="Accept"
            onClick={handleAcceptInvite}
            color="green"
          />
          <ActionButton
            label="Decline"
            onClick={handleDeclineInvite}
            color="red"
          />
        </div>
      )}
    </div>
  );
};

export default UserInvitesItem;
