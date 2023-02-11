import { nest } from "../utils";

export const getUsersByRole = async (role: string, token: string) => {
  try {
    const { data } = await nest({
      method: "GET",
      url: `/user/role/${role}`,
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (data.status === "success") {
      return data?.users;
    }
  } catch (err) {
    throw err;
  }
};

export const doSearch = async (searchText: string) => {
  try {
    if (!searchText) return false;
    const { data } = await nest({
      method: "GET",
      url: "/user/search/" + searchText,
    });
    if (!data || data.status !== "success") return false;
    return data;
  } catch (err) {
    throw err;
  }
};
