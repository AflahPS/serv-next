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
