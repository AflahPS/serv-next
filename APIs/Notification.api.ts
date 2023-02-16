import { nest } from "../utils";

export const makeNotification = async (dataV: any, token: string) => {
  try {
    if (!dataV || !token) return;
    const { data } = await nest({
      method: "POST",
      url: "/notification",
      data: dataV,
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (data?.status === "success") {
      return data?.notification;
    }
    return false;
  } catch (err) {
    throw err;
  }
};

export const getNotification = async (token: string) => {
  try {
    const { data } = await nest({
      method: "GET",
      url: "/notification",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (data?.status === "success") {
      return data?.notifications;
    }
  } catch (err) {
    throw err;
  }
};

export const removeNotification = async (
  notificationId: string,
  token: string
) => {
  try {
    const { data } = await nest({
      method: "DELETE",
      url: `/notification/${notificationId}`,
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (data?.status === "success") {
      return true;
    }
    return false;
  } catch (err) {
    throw err;
  }
};
