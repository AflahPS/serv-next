import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { NotificationAlert } from "../../ui";
import { getNotification } from "../../APIs";
import { useSelector } from "react-redux";
import { StoreState } from "../../store";
import { Notification } from "../../types";

export const Notifications = () => {
  const token = useSelector((state: StoreState) => state.jwt.token);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const getAndSetNotifications = async () => {
    try {
      const notifications = await getNotification(token);
      if (notifications) setNotifications(notifications);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAndSetNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack marginTop={3} gap={1}>
      {notifications.length > 0 &&
        notifications.map((not) => (
          <NotificationAlert key={not._id} notification={not} />
        ))}
    </Stack>
  );
};
