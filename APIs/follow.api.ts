import { User } from "../types";
import { nest } from "../utils";

export const followFriend = async (userId: string | User, token: string) => {
  try {
    const { data } = await nest({
      method: "PATCH",
      url: `/user/follow/${typeof userId === "string" ? userId : userId._id}`,
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (data?.status === "success") {
      return true;
    }
    return false;
  } catch (err: any) {
    console.error(err?.messgae);
    return false;
  }
};

export const unfollowFriend = async (userId: string | User, token: string) => {
  try {
    const { data } = await nest({
      method: "PATCH",
      url: `/user/unfollow/${typeof userId === "string" ? userId : userId._id}`,
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (data?.status === "success") {
      return true;
    }
    return false;
  } catch (err: any) {
    console.error(err?.messgae);
    return false;
  }
};
