import { nest } from "../utils";

export async function getPosts(token: string, page: number, limit?: number) {
  try {
    const { data } = await nest({
      url: Boolean(token)
        ? `/post/user/page/${page || 1}/limit/${limit || 10}`
        : `/post/page/${page || 1}/limit/${limit || 1}`,
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (data.status === "success") {
      return data;
    }
    return null;
  } catch (err) {
    throw err;
  }
}

export async function getPostsOfUser(
  userId: string,
  page: number,
  limit?: number
) {
  try {
    const { data } = await nest({
      url: `/post/owner/${userId}/page/${page || 1}/limit/${limit || 10}`,
      method: "GET",
    });
    if (data.status === "success") {
      return data;
    }
    return null;
  } catch (err) {
    throw err;
  }
}

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

// Create a like on the DB
export const likePost = async (
  action: "like" | "dislike",
  postId: string,
  token: string
) => {
  try {
    const { data } = await nest({
      url: `/post/${action}/${postId}`,
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return data?.status === "success";
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const reportPost = async (postId: string, token: string) => {
  try {
    const { data } = await nest({
      method: "PATCH",
      url: `post/report/${postId}`,
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return data?.status === "success";
  } catch (err) {
    console.log(err);
    return false;
  }
};

interface AddComment {
  content: string;
  post: string;
}

export const addComment = async (dataV: AddComment, token: string) => {
  try {
    const { data } = await nest({
      url: "/comment",
      method: "POST",
      data: dataV,
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (data?.status === "success") {
      return data;
    }
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getCommentsOfPost = async (postId: string) => {
  try {
    const { data } = await nest({
      url: `comment/post/${postId}`,
      method: "GET",
    });
    if (data?.status === "success") {
      return data?.comments;
    }
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
};
