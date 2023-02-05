import { nest } from "../utils";

export const followFriend = async (userId: string, token: string) => {
  try {
    const { data } = await nest({
      method: "PATCH",
      url: `/user/follow/${userId}`,
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (data?.status === "success") {
      return true;
    }
    return false;
  } catch (err: any) {
    console.log(err?.messgae);
    return false;
  }
};

export const unfollowFriend = async (userId: string, token: string) => {
  try {
    const { data } = await nest({
      method: "PATCH",
      url: `/user/unfollow/${userId}`,
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (data?.status === "success") {
      return true;
    }
    return false;
  } catch (err: any) {
    console.log(err?.messgae);
    return false;
  }
};
