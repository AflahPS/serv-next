import { Box } from "@mui/material";
import React from "react";
import { ChatLi } from "../../ui";
import { useSelector } from "react-redux";
import { StoreState } from "../../store";

export const ChatRight = () => {
  const currentTab = useSelector(
    (state: StoreState) => state.sideNavTab.currentTab
  );
  const currentUserRole = useSelector(
    (state: StoreState) => state.role.currentUser
  );

  if (currentUserRole === "guest") return <></>;
  if (currentTab === "Panel" || currentTab === "Dashboard") return <></>;

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
