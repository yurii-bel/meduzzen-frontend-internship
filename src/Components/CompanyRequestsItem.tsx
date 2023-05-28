import { User } from "../Types/types";
import ActionButton from "./Core/ActionButton";

interface CompanyRequestsItemProps {
  user: User;
  onAcceptRequest: (actionId: string) => void;
  onDeclineRequest: (actionId: string) => void;
}

const CompanyRequestsItem: React.FC<CompanyRequestsItemProps> = ({
  user,
  onAcceptRequest,
  onDeclineRequest,
}) => {
  const handleAcceptRequest = () => {
    onAcceptRequest(user.action_id);
  };

  const handleDeclineRequest = () => {
    onDeclineRequest(user.action_id);
  };

  return (
    <div className="flex justify-between p-2 border-2 bg-gray-50 rounded-md">
      <div>
        <div className="text-sm text-gray-500">{user.action_id}</div>
        <div className="p-2 bg-white">
          <div className="flex items-center mb-4">
            <div>
              <img
                className="h-12 w-12 rounded-full mr-4 object-cover"
                src={
                  user.user_avatar ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                }
                alt="User Avatar"
              />
            </div>
            <div>
              <div className="text-xl font-bold text-gray-800">
                {user.user_firstname}
              </div>
              <div className="text-sm font-bold text-gray-500">
                {user.user_lastname}
              </div>
            </div>
          </div>
        </div>
        <div
          className={`text-sm font-bold ${
            user.action === "request" ? "text-green-500" : "text-red-500"
          } `}
        >
          {user.action}
        </div>
      </div>

      {true && (
        <div className="flex justify-center items-center gap-4">
          <ActionButton
            label="Accept"
            onClick={handleAcceptRequest}
            color="green"
          />
          <ActionButton
            label="Decline"
            onClick={handleDeclineRequest}
            color="red"
          />
        </div>
      )}
    </div>
  );
};

export default CompanyRequestsItem;
