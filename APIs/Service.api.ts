import { nest } from "../utils";

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
