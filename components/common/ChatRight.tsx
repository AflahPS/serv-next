import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { ChatLi } from "../../ui";
import { useDispatch } from "react-redux";
import { COLOR } from "../../constants";
import { Stack } from "@mui/system";
import { SearchComp } from "./SearchComp";
import { getChatsForUser } from "../../APIs";
import { chatListActions } from "../../store/chatList.slice";
import { useStore } from "../../customHooks";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export const ChatRight = () => {
  const dispatch = useDispatch();
  const { token, chatList, role, sideNavTab } = useStore();
  const [animeRef] = useAutoAnimate();

  const getAndSetChats = async () => {
    try {
      const data = await getChatsForUser(token);
      dispatch(chatListActions.setChatList(data?.chats));
    } catch (err) {
      dispatch(chatListActions.setChatList([]));
      console.log(err);
    }
  };

  useEffect(() => {
    getAndSetChats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (
    sideNavTab === "My Activities" ||
    sideNavTab === "Vendor Panel" ||
    role === "admin" ||
    role === "guest" ||
    role === "super-admin"
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
        right={2}
        overflow={"auto"}
        bgcolor={"black"}
        height={"100%"}
        width={"100%"}
        p={1}
        ref={animeRef}
        sx={{
          display: { xs: "none", lg: "block" },
          boxShadow: 8,
          borderRadius: 3,
        }}
      >
        {chatList.length > 0 &&
          chatList.map((chat) => <ChatLi key={chat._id} Chat={chat} />)}
        {chatList.length > 0 && <SearchComp />}

        {chatList.length === 0 && (
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
