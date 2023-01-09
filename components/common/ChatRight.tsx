import { Box } from "@mui/material";
import React from "react";
import { ChatLi } from "../../ui";

export const ChatRight = () => {
  return (
    <Box
      bgcolor={"black"}
      flex={1}
      p={2}
      sx={{ display: { xs: "none", lg: "block" } }}
    >
      <ChatLi />
      <ChatLi />
      <ChatLi />
      <ChatLi />
      <ChatLi />
      <ChatLi />
    </Box>
  );
};
