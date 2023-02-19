import { Appointment } from "../types";
import { nest } from "../utils";

export const makeAppointment = async (dataV: {}, token: string) => {
  try {
    const { data } = await nest({
      method: "POST",
      url: "/appointment",
      data: dataV,
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

export const getAppointments = async (
  token: string,
  forWhom: "user" | "vendor"
) => {
  try {
    const { data } = await nest({
      method: "GET",
      url: `/appointment/${forWhom}`,
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (data?.status === "success") {
      return data?.appointments;
    }
  } catch (err) {
    throw err;
  }
};

export const appoiStatusUpdator = async (
  token: string,
  appoId: string,
  status: string
) => {
  try {
    const { data } = await nest({
      method: "PATCH",
      url: `/appointment/status/${appoId}`,
      data: { status },
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (data?.status === "success") {
      return data?.appointment;
    }
  } catch (err) {
    throw err;
  }
};

export const editAppointment = async (
  token: string,
  appoId: string,
  dataV: any
) => {
  try {
    const { data } = await nest({
      method: "PATCH",
      url: `/appointment/${appoId}`,
      data: dataV,
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (data?.status === "success") {
      return data?.appointment;
    }
  } catch (err) {
    throw err;
  }
};

export const deleteAppointments = async (appoId: string, token: string) => {
  try {
    const { data } = await nest({
      method: "DELETE",
      url: `/appointment/${appoId}`,
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
