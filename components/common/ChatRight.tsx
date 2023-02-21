import { Box, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { ChatLi } from "../../ui";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../store";
import { COLOR } from "../../constants";
import { Stack } from "@mui/system";
import { SearchComp } from "./SearchComp";
import { getChatsForUser } from "../../APIs";
import { chatListActions } from "../../store/chatList.slice";
import { Socket, io } from "socket.io-client";
import { onlineUsersActions } from "../../store/onlineUsers.slice";

export const ChatRight = () => {
  const dispatch = useDispatch();
  const socket = useRef<Socket>();

  const currentUser = useSelector((state: StoreState) => state.user.data);
  const currentTab = useSelector(
    (state: StoreState) => state.sideNavTab.currentTab
  );
  const currentUserRole = useSelector(
    (state: StoreState) => state.role.currentUser
  );
  const token = useSelector((state: StoreState) => state.jwt.token);
  const chats = useSelector((state: StoreState) => state.chatList.chats);

  const getAndSetChats = async () => {
    try {
      const data = await getChatsForUser(token);
      dispatch(chatListActions.setChatList(data?.chats));
    } catch (err) {
      dispatch(chatListActions.setChatList([]));
      console.log(err);
    }
  };

  // useEffect(() => {
  //   socket.current = io("ws://localhost:5555");
  //   socket?.current?.emit("new-user-add", currentUser?._id);
  //   socket?.current?.on("get-users", (users: any[]) => {
  //     dispatch(onlineUsersActions.setUsers(users));
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    getAndSetChats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() =>

  if (currentUserRole === "guest") return <></>;
  if (
    currentTab === "My Activities" ||
    currentTab === "Vendor Panel" ||
    currentUserRole === "admin" ||
    currentUserRole === "super-admin"
  )
    return <></>;

  return (
    <Box
      bgcolor={"transparent"}
      maxHeight={"90vh"}
      flex={1}
      position="sticky"
      top={72}
      sx={{
        display: { xs: "none", lg: "block" },
        boxShadow: 8,
        borderRadius: 3,
      }}
    >
      <Box
        // position={"absolute"}
        right={2}
        overflow={"auto"}
        bgcolor={"black"}
        height={"100%"}
        width={"100%"}
        p={1}
        sx={{
          display: { xs: "none", lg: "block" },
          boxShadow: 8,
          borderRadius: 3,
        }}
      >
        {chats.length > 0 &&
          chats.map((chat) => <ChatLi key={chat._id} Chat={chat} />)}
        {chats.length > 0 && <SearchComp />}

        {chats.length === 0 && (
          <Stack
            marginY={2}
            paddingX={1}
            gap={2}
            color={COLOR["H1d-font-primary"]}
            sx={{
              maxWidth: "260px",
              backgroundColor: "transparent",
            }}
          >
            <Typography
              color={COLOR["H1d-ui-primary"]}
              align="center"
              variant="h6"
            >
              Connect with...
            </Typography>
            <Typography variant="subtitle2">
              It seems like you have not sent a message yet. Search and find
              someone to chat...
            </Typography>
            <SearchComp />
          </Stack>
        )}
      </Box>
    </Box>
  );
};
