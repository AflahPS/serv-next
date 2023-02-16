import * as React from "react";
import Box from "@mui/material/Box";
import Alert, { AlertColor } from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import { Stack, Typography } from "@mui/material";
import { Notification } from "../../types";
import { useRouter } from "next/router";
import { removeNotification } from "../../APIs";
import { useSelector } from "react-redux";
import { StoreState } from "../../store";
import dayjs from "dayjs";

interface Props {
  notification: Notification;
}

export const NotificationAlert: React.FC<Props> = ({ notification }) => {
  const router = useRouter();
  const token = useSelector((state: StoreState) => state.jwt.token);
  const [open, setOpen] = React.useState(true);

  const handleNotificationClick = () => {
    if (!notification?.href) return;
    router.push(notification?.href);
  };
  const deleteNotification = async () => {
    try {
      const isSuccess = await removeNotification(
        notification?._id as string,
        token
      );
      if (isSuccess) setOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Collapse in={open}>
        <Alert
          severity={notification?.type}
          onClick={handleNotificationClick}
          sx={!!notification?.href ? { cursor: "pointer" } : {}}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={deleteNotification}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <Stack>
            <Typography variant="subtitle1" color={notification?.type}>
              {notification?.content}
            </Typography>
            <Typography variant="caption">
              {dayjs(notification?.createdAt).format("LLL")}
            </Typography>
          </Stack>
        </Alert>
      </Collapse>
    </Box>
  );
};
