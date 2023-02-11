import { nest } from "../utils";

export const startChat = async (friendId: string, token: string) => {
  try {
    const { data } = await nest({
      method: "POST",
      url: `/chat/${friendId}`,
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
};

export const getChatsForUser = async (token: string) => {
  try {
    const { data } = await nest({
      method: "GET",
      url: "/chat",
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
};

export const getSingleChat = async (chatId: string, token: string) => {
  try {
    const { data } = await nest({
      method: "GET",
      url: `/chat/${chatId}`,
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
};

export const deleteChat = async (chatId: string, token: string) => {
  try {
    const { data } = await nest({
      method: "DELETE",
      url: `/chat/${chatId}`,
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (data?.status === "success") {
      return true;
    }
    return false;
  } catch (err) {
    throw err;
  }
};

export const sendMessage = async (
  chatId: string,
  token: string,
  text: string
) => {
  try {
    const { data } = await nest({
      method: "POST",
      url: `/chat/message/${chatId}`,
      data: { text },
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
};

export const getMessagesOfChat = async (chatId: string, token: string) => {
  try {
    const { data } = await nest({
      method: "GET",
      url: `/chat/message/${chatId}`,
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
};
