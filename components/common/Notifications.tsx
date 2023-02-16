import { Stack } from "@mui/system";
import React from "react";
import { NotificationAlert } from "../../ui";

export const Notifications = () => {
  return (
    <Stack marginTop={3} gap={1}>
      <NotificationAlert
        severity="error"
        text="Something here"
        onClick={() => console.log("clicked")}
      />
      <NotificationAlert
        severity="info"
        text="Something here"
        onClick={() => console.log("clicked")}
      />
      <NotificationAlert
        severity="success"
        text="Something here"
        onClick={() => console.log("clicked")}
      />
      <NotificationAlert
        severity="warning"
        text="Something here"
        onClick={() => console.log("clicked")}
      />
    </Stack>
  );
};
