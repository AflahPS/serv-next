import { nest } from "../utils";

export const getVendorCountByService = async (token: string) => {
  try {
    const { data } = await nest({
      method: "GET",
      url: "/vendor/service/count",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (data?.status === "success") {
      return data?.vendorCount;
    }
  } catch (err) {
    throw err;
  }
};

export const removeEmployee = async (empId: string, token: string) => {
  try {
    const { data } = await nest({
      method: "DELETE",
      url: `/vendor/employee/${empId}`,
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

export const addNewEmployee = async (empId: string, token: string) => {
  try {
    const { data } = await nest({
      method: "POST",
      url: `/vendor/employee/${empId}`,
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

export const getEmployeesOfVendor = async (token: string) => {
  try {
    const { data } = await nest({
      method: "GET",
      url: "/vendor/employee",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (data?.status === "success") {
      return data?.employees;
    }
  } catch (err) {
    throw err;
  }
};
