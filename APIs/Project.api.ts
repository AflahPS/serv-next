import { nest } from "../utils";

export async function getAllProjects(token: string) {
  try {
    const { data } = await nest({
      method: "GET",
      url: "/project/all",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (data?.status === "success") {
      return data;
    }
  } catch (err) {
    throw err;
  }
}
