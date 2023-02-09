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
