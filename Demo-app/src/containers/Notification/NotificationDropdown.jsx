import React, { useState, useRef, useEffect } from "react";
import moment from "moment";
import Button from "../../components/common-components/button/Button";
import Icons from "../../components/Icons/Icons";
import { BUTTON_VARIANTS } from "../../components/common-components/button/Constant";

const dummyNotifications = [
  {
    uuid: "1",
    label: "Appointment Reminder",
    description: "Your appointment is scheduled at 3:00 PM.",
    date: new Date(),
    isRead: false,
  },
  {
    uuid: "2",
    label: "New Message",
    description: "You received a message from Dr. Smith.",
    date: new Date(),
    isRead: true,
  },
];

const NotificationDropdown = () => {
  const [isNotificationDropdown, setIsNotificationDropdown] = useState(false);
  const [notifications, setNotifications] = useState(dummyNotifications);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsNotificationDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleNotificationDropdown = () => {
    setIsNotificationDropdown(!isNotificationDropdown);
  };

  const handleNotificationMarkAsRead = (notificationId) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.uuid === notificationId ? { ...notif, isRead: true } : notif
      )
    );
  };

  const handleClearAllNotification = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div ref={dropdownRef} className="relative">
      <button onClick={toggleNotificationDropdown} className="relative z-10">
        <div className="mt-2">
          <Icons iconName="bellIcon" />
        </div>

        <span className="absolute top-2 left-3 px-1 py-1 text-xs font-semibold leading-none cursor-pointer text-white bg-red-500 rounded-full"></span>
      </button>

      {isNotificationDropdown && (
        <div
          className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-lg"
          style={{ zIndex: 1099 }}
        >
          <div className="py-2 px-4 bg-gray-100 border-b border-gray-200">
            <h6 className="text-lg font-semibold">Notifications</h6>
          </div>
          <div className="overflow-y-auto max-h-80">
            {notifications.length ? (
              notifications.map((item) => (
                <div
                  key={item.uuid}
                  className="p-4 border-b border-gray-200 cursor-pointer"
                  style={item.isRead ? {} : { background: "aliceblue" }}
                  onClick={() => handleNotificationMarkAsRead(item.uuid)}
                >
                  <div className="flex items-center">
                    <div className="flex-1">
                      <h6 className="text-base font-semibold">{item.label}</h6>
                      <p className="text-sm text-gray-600">
                        {item.description}
                      </p>
                      <p className="text-xs text-gray-400">
                        {moment(item.date).format("LL LT")}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex justify-center py-4">
                No new notifications at the moment
              </div>
            )}

            {notifications.length > 0 && (
              <div className="py-2 flex justify-center">
                <Button
                  style={{
                    width: "200px",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  variant={BUTTON_VARIANTS.CONTAINED_GRAY}
                  onClickCb={handleClearAllNotification}
                >
                  Clear All
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
