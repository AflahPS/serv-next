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

export const getFollowers = async (userId: string) => {
  try {
    const { data } = await nest({
      method: "GET",
      url: `/user/followers/${userId}`,
    });
    if (data.status === "success") {
      return data?.followers;
    }
    return false;
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

export const banUser = async (
  userId: string,
  token: string,
  action: "ban" | "unban"
) => {
  try {
    const { data } = await nest({
      method: "PATCH",
      url: `/user/${action}/${userId}`,
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return data?.status === "success";
  } catch (err) {
    throw err;
  }
};

export const deleteUser = async (userId: string, token: string) => {
  try {
    const { data } = await nest({
      method: "DELETE",
      url: `/user/${userId}`,
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return data?.status === "success";
  } catch (err) {
    throw err;
  }
};
