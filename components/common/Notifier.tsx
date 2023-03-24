import { Snackbar, Alert } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../store/store";
import { notifierActions } from "../../store/notifier.slice";
import { ActiveUser, Notification, User } from "../../types";
import { getMeAdmin, getMeUser, initializeSocket } from "../../APIs";
import { authActions } from "../../store/auth.slice";
import { jwtActions } from "../../store/jwt.slice";
import { onlineUsersActions } from "../../store/onlineUsers.slice";
import { roleActions } from "../../store/role.slice";
import { userDataActions } from "../../store/user-data.slice";
import { SocketContext } from "../../utils";

export const Notifier = () => {
  const dispatch = useDispatch();
  const { socket, setSocket } = useContext(SocketContext);
  const currentUser = useSelector((state: StoreState) => state.user.data);
  const isAuth = useSelector((state: StoreState) => state.auth.isAuth);
  const [notification, setNotification] = useState<Notification>();

  // Receive Notification from socket server
  useEffect(() => {
    if (isAuth && socket) {
      socket?.on("receive-notification", (data: Notification) => {
        if (!data) return;
        setNotification(data);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  // Dispatch notifications received from the socket server
  useEffect(() => {
    if (
      isAuth &&
      notification !== undefined &&
      notification.receiver === currentUser._id
    ) {
      dispatch(notifierActions[notification?.type](notification?.content));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notification]);

  // const socket = useRef<Socket>();

  const acknowledgeAdmin = (token: string, user: User) => {
    dispatch(authActions.login()); // login the user
    dispatch(jwtActions.setToken(token)); // set the token
    dispatch(
      user.role === "admin"
        ? roleActions.admin()
        : user.role === "super-admin"
        ? roleActions.superAdmin()
        : roleActions.guest()
    ); // set the role
    dispatch(userDataActions.addUserData(user)); // set the user data
    const newSocket = initializeSocket();
    newSocket?.emit("new-user-add", user?._id);
    newSocket?.on("get-users", (activeUsers: ActiveUser[]) => {
      dispatch(onlineUsersActions.setUsers(activeUsers));
    });
    setSocket(newSocket);
  };

  const acknowledgeUser = (token: string, user: User) => {
    dispatch(authActions.login()); // login the user
    dispatch(jwtActions.setToken(token)); // set the token
    dispatch(
      user?.role === "vendor" ? roleActions.vendor() : roleActions.user()
    ); // set the role
    dispatch(userDataActions.addUserData(user)); // set the user data
    const newSocket = initializeSocket();
    newSocket?.emit("new-user-add", user?._id);
    newSocket?.on("get-users", (activeUsers: ActiveUser[]) => {
      dispatch(onlineUsersActions.setUsers(activeUsers));
    });
    setSocket(newSocket);
  };

  const handleToken = async (token: string) => {
    try {
      if (location.href.includes("admin")) {
        const user = await getMeAdmin(token);
        if (user && (user.role === "admin" || user.role === "super-admin")) {
          acknowledgeAdmin(token, user);
        }
      } else {
        const user = await getMeUser(token);
        if (user) {
          acknowledgeUser(token, user);
        }
      }
    } catch (err: any) {
      console.error(err?.message);
      dispatch(roleActions.guest());
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) handleToken(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
