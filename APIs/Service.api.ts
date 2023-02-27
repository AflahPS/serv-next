import { nest } from "../utils";

export interface CreateServiceType {
  image: string;
  caption: string;
  title: string;
}

export const createService = async (
  dataV: CreateServiceType,
  token: string
) => {
  try {
    const { data } = await nest({
      method: "POST",
      url: "/service",
      data: dataV,
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (data?.status === "success") {
      return data;
    }
    return false;
  } catch (err) {
    throw err;
  }
};

export const deleteService = async (serviceId: string, token: string) => {
  try {
    const { data } = await nest({
      method: "DELETE",
      url: `/service/${serviceId}`,
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

export const getAllServices = async () => {
  try {
    const { data } = await nest({
      url: "/service",
      method: "GET",
    });
    if (data.status === "success") {
      return data;
    }
  } catch (err) {
    throw err;
  }
};

export const getAllServiceTitles = async () => {
  try {
    const { data } = await nest({
      url: "/service/titles",
      method: "GET",
    });
    if (data.status === "success") {
      return data?.services;
    }
  } catch (err) {
    throw err;
  }
};

export const getVendorsByServiceId = async (
  serviceId: string,
  location: string
) => {
  try {
    const { data } = await nest({
      url: `/service/vendor/${serviceId}/location/${location}`,
      method: "GET",
    });
    if (data.status === "success") {
      return data;
    }
  } catch (err) {
    throw err;
  }
};
