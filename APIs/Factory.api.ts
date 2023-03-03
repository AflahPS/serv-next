import { nest } from "../utils";

export const lastWeekMadeDocs = async (
  token: string,
  model: "project" | "user" | "post" | "appointment"
) => {
  try {
    const { data } = await nest({
      method: "GET",
      url: `/${model}/weekly`,
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (data?.status === "success") return data?.count;
  } catch (err) {
    throw err;
  }
};

export const monthlyMade = async (
  token: string,
  model: "project" | "user" | "post" | "appointment"
) => {
  try {
    const { data } = await nest({
      method: "GET",
      url: `/${model}/monthly`,
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (data?.status === "success") return data?.data;
  } catch (err) {
    throw err;
  }
};
