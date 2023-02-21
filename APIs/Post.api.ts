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

export async function getAllPosts(token: string) {
  try {
    const { data } = await nest({
      method: "GET",
      url: `/post/all`,
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (data.status === "success") {
      return data;
    }
  } catch (err) {
    throw err;
  }
}

export async function addToSavedPost(token: string, postId: string) {
  try {
    const { data } = await nest({
      method: "POST",
      url: `/user/save-post/${postId}`,
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (data.status === "success") {
      return true;
    }
    return false;
  } catch (err) {
    throw err;
  }
}

export async function removeFromSavedPost(token: string, postId: string) {
  try {
    const { data } = await nest({
      method: "DELETE",
      url: `/user/save-post/${postId}`,
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (data.status === "success") {
      return true;
    }
    return false;
  } catch (err) {
    throw err;
  }
}

export async function getSavedPost(token: string) {
  try {
    const { data } = await nest({
      method: "GET",
      url: `/user/save-post`,
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (data.status === "success") {
      return data?.user?.savedPosts;
    }
    return false;
  } catch (err) {
    throw err;
  }
}
