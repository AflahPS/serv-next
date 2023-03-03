import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../store";
import { useContext, useEffect, useState } from "react";
import { Notification } from "../types";
import { notifierActions } from "../store/notifier.slice";
import { makeNotification } from "../APIs";
import { SocketContext } from "../utils";

export function useNotification() {
  const dispatch = useDispatch();
  const { socket } = useContext(SocketContext);
  const token = useSelector((state: StoreState) => state.jwt.token);
  const isAuth = useSelector((state: StoreState) => state.auth.isAuth);
  const [notification, setNotification] = useState<Notification>();

  const isValid = () => {
    return (
      isAuth && !!token && notification !== undefined && socket !== undefined
    );
  };

  const createNewNotification = async () => {
    try {
      if (isValid()) {
        const newNotification = await makeNotification(notification, token);
        if (newNotification) {
          socket?.emit("send-notification", notification);
          setNotification(undefined);
        }
      }
    } catch (err: any) {
      console.warn(err?.message);
      dispatch(
        notifierActions.error(
          `Something went wrong when creating notification !`
        )
      );
    }
  };

  // Invoking createNewNotification() to create a new notification when
  // `notification` is being updated from any components.
  useEffect(() => {
    createNewNotification();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notification]);

  return setNotification;
}
