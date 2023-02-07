import { nest } from "../utils";

export async function deletePost(postId: string, token: string) {
  try {
    const { data } = await nest({
      method: "DELETE",
      url: `post/${postId}`,
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
