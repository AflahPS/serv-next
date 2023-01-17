import { Box } from "@mui/material";
import React from "react";
import { ChatLi } from "../../ui";

export const ChatRight = () => {
  return (
    <Box
      overflow={"auto"}
      bgcolor={"black"}
      flex={1}
      p={2}
      sx={{
        display: { xs: "none", lg: "block" },
        boxShadow: 8,
        borderRadius: 3,
      }}
    >
      <Box position={"fixed"}>
        <ChatLi />
        <ChatLi />
        <ChatLi />
        <ChatLi />
        <ChatLi />
        <ChatLi />
        <ChatLi />
        <ChatLi />
        <ChatLi />
        <ChatLi />
      </Box>
    </Box>
  );
};
