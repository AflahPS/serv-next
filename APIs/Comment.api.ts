import { nest } from "../utils";

export async function deleteCommentById(commentId: string, token: string) {
  try {
    const { data } = await nest({
      method: "DELETE",
      url: `/comment/${commentId}`,
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (data.status === "success") {
      return true;
    }
  } catch (err) {
    throw err;
  }
}

export async function likeComment(
  isLiked: boolean,
  commentId: string,
  token: string
) {
  try {
    const { data } = await nest({
      method: "PATCH",
      url: `/comment/${isLiked ? "dislike" : "like"}/${commentId}`,
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (data.status === "success") {
      if (isLiked) return true;
      return data;
    }
  } catch (err) {
    throw err;
  }
}

export async function getCommentLikes(commentId: string) {
  try {
    const { data } = await nest({
      method: "GET",
      url: `/comment/like/${commentId}`,
    });
    if (data.status === "success") {
      return data?.likes;
    }
  } catch (err) {
    throw err;
  }
}
