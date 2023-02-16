import { Snackbar, Alert, useStepperContext } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../store";
import { notifierActions } from "../../store/notifier.slice";
import { Notification } from "../../types";

export const Notifier = () => {
  const dispatch = useDispatch();
  const socketCurrent = useSelector(
    (state: StoreState) => state.socket.current
  );
  const currentUser = useSelector((state: StoreState) => state.user.data);
  const isAuth = useSelector((state: StoreState) => state.auth.isAuth);
  const [notification, setNotification] = useState<Notification>();

  // Receive Notification from socket server
  useEffect(() => {
    if (isAuth && socketCurrent) {
      socketCurrent?.on("receive-notification", (data: Notification) => {
        if (!data) return;
        setNotification(data);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketCurrent]);

  // Dispatch notifications received from the socket server
  useEffect(() => {
    if (
      isAuth &&
      notification !== undefined &&
      notification.receiver === currentUser._id
    ) {
      console.log(notification);
      dispatch(notifierActions[notification?.type](notification?.content));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notification]);

  const errMessage = useSelector(
    (state: StoreState) => state.notifier.errorMessage
  );
  const successMessage = useSelector(
    (state: StoreState) => state.notifier.successMessage
  );
  const infoMessage = useSelector(
    (state: StoreState) => state.notifier.infoMessage
  );
  const warningMessage = useSelector(
    (state: StoreState) => state.notifier.warningMessage
  );

  const openError = useSelector(
    (state: StoreState) => state.notifier.OpenError
  );
  const openSuccess = useSelector(
    (state: StoreState) => state.notifier.OpenSuccess
  );
  const openInfo = useSelector((state: StoreState) => state.notifier.OpenInfo);
  const openWarning = useSelector(
    (state: StoreState) => state.notifier.OpenWarning
  );

  const handleCloseError = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(notifierActions.closeError());
  };
  const handleCloseSuccess = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(notifierActions.closeSuccess());
  };
  const handleCloseInfo = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(notifierActions.closeInfo());
  };
  const handleCloseWarning = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(notifierActions.closeWarning());
  };

  return (
    <>
      <Snackbar
        open={openError}
        autoHideDuration={6000}
        onClose={handleCloseError}
      >
        <Alert
          onClose={handleCloseError}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errMessage}
        </Alert>
      </Snackbar>

      {/* Success message */}

      <Snackbar
        open={openSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSuccess}
      >
        <Alert
          onClose={handleCloseSuccess}
          severity="success"
          sx={{ width: "100%" }}
        >
          {successMessage}
        </Alert>
      </Snackbar>

      {/* Info message */}

      <Snackbar
        open={openInfo}
        autoHideDuration={6000}
        onClose={handleCloseInfo}
      >
        <Alert onClose={handleCloseInfo} severity="info" sx={{ width: "100%" }}>
          {infoMessage}
        </Alert>
      </Snackbar>

      {/* Warning message */}

      <Snackbar
        open={openWarning}
        autoHideDuration={6000}
        onClose={handleCloseWarning}
      >
        <Alert
          onClose={handleCloseWarning}
          severity="warning"
          sx={{ width: "100%" }}
        >
          {warningMessage}
        </Alert>
      </Snackbar>
    </>
  );
};
