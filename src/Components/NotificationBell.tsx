import React, { useEffect, useState } from "react";
import {
  AiFillCheckCircle,
  AiOutlineCheckCircle,
  AiOutlineBell,
} from "react-icons/ai";

import { useNotificationData } from "./hooks/useNotificationData";
import { Notification } from "../Types/types";

const NotificationBell: React.FC = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const { getNotificationData, getMarkNotificationAsRead } =
    useNotificationData();

  const [notificationsData, setNotificationsData] = useState<Notification[]>(
    []
  );

  const handleToggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const checkUnreadMesssages = () => {
    return (
      notificationsData.filter((notification) => {
        return !notification.is_read;
      }).length || 0
    );
  };

  const markNotificationAsRead = (notificationId: number) => {
    getMarkNotificationAsRead(notificationId);
    setNotificationsData((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.notification_id === notificationId
          ? { ...notification, is_read: true }
          : notification
      )
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getNotificationData();
      setNotificationsData(data);
    };

    fetchData();
  }, [notificationsData, getNotificationData]);

  return (
    <div className="relative">
      <div
        className="text-3xl hover:cursor-pointer"
        onClick={handleToggleNotifications}
      >
        <div
          className={`flex justify-center items-center ${
            checkUnreadMesssages() > 0 ? "animate-bounce" : ""
          }`}
        >
          <span className="bg-purple-700 -mr-1 -mt-4 rounded-full p-0.5 text-white text-xs font-bold">
            {checkUnreadMesssages()}
          </span>
          <AiOutlineBell />
        </div>
      </div>
      {showNotifications && (
        <div className="flex flex-col gap-2 overflow-y-scroll h-64 absolute top-0 right-0 mt-8 w-80 bg-white text-black shadow-lg rounded-md p-4">
          {/* Render notification content from state */}
          {notificationsData.map((notification, index) => (
            <div
              key={index}
              className={`${
                !notification.is_read ? "bg-green-100" : "bg-slate-100"
              } border border-gray-100 p-1 text-xs hover:select-none`}
            >
              <div
                onClick={() =>
                  markNotificationAsRead(notification.notification_id)
                }
                className="text-purple-700 text-xl p-1 hover:text-purple-900 hover:cursor-pointer"
              >
                {notification.is_read ? (
                  <AiFillCheckCircle />
                ) : (
                  <AiOutlineCheckCircle />
                )}
              </div>
              <div className="flex gap-2 text-sm">
                <p key={index}>{notification.notification_title}</p>
              </div>
              <div className="italic">
                <p key={index}>{notification.notification_message}</p>
              </div>
              <div className="flex gap-2 justify-end mt-1 italic text-gray-500">
                <p key={index}>
                  {notification.created_at.slice(0, 19).replace("T", " ")}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
