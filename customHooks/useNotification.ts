import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../store";
import { useEffect, useState } from "react";
import { Notification } from "../types";
import { notifierActions } from "../store/notifier.slice";
import { makeNotification } from "../APIs";

export function useNotification() {
  const dispatch = useDispatch();
  const socketCurrent = useSelector(
    (state: StoreState) => state.socket.current
  );
  const token = useSelector((state: StoreState) => state.jwt.token);
  const isAuth = useSelector((state: StoreState) => state.auth.isAuth);
  const [notification, setNotification] = useState<Notification>();

  const isValid = () => {
    return (
      isAuth &&
      !!token &&
      notification !== undefined &&
      socketCurrent !== undefined
    );
  };

  const createNewNotification = async () => {
    try {
      if (isValid()) {
        const newNotification = await makeNotification(notification, token);
        if (newNotification) {
          socketCurrent?.emit("send-notification", notification);
          setNotification(undefined);
        }
      }
    } catch (err) {
      console.log({ err });
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
