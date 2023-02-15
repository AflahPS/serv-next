import { nest } from "../utils";

export const signinUser = async (dataV: any) => {
  try {
    const { data } = await nest({
      url: "auth/signin",
      method: "POST",
      data: dataV,
    });
    if (data?.status === "success") {
      return data;
    }
    return false;
  } catch (err) {
    throw err;
  }
};

export const signinAdmin = async (dataV: any) => {
  try {
    const { data } = await nest({
      url: "auth/signin/admin",
      method: "POST",
      data: dataV,
    });
    if (data?.status === "success") {
      return data;
    }
    return false;
  } catch (err) {
    throw err;
  }
};
