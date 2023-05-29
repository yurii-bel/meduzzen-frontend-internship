import { useSelector } from "react-redux";
import api from "../../Api/api";
import { RootState } from "../../Store";

export const useNotificationData = () => {
  const user = useSelector((state: RootState) => state.user);

  const getNotificationData = async () => {
    const response = await api.getUserNotificationsList(user.user_id);
    const notifications = await response.data.result.notifications;
    return notifications;
  };

  const getMarkNotificationAsRead = async (notificationId: number) => {
    await api.getUserMarkNotificationsAsRead(user.user_id, notificationId);
  };

  return { getNotificationData, getMarkNotificationAsRead };
};
