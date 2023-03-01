import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { NotificationAlert } from "../../ui";
import { getNotification } from "../../APIs";
import { Notification } from "../../types";
import { useStore } from "../../customHooks";

export const Notifications = () => {
  const { token } = useStore();
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
