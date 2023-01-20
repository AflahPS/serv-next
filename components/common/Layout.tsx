import { Box, Stack } from "@mui/material";
import React, { PropsWithChildren } from "react";
import { ChatRight } from "./ChatRight";
import { NavBar } from "./NavBar";
import { SideNav } from "./SideNav";

export const Layout = (props: PropsWithChildren) => {
  return (
    <>
      <NavBar />
      <Stack
        minHeight={"100vh"}
        direction={"row"}
        justifyContent="space-between"
        marginY={1}
      >
        <SideNav />
        <Box flex={3.5} paddingY={2} marginX={1}>
          {props.children}
        </Box>
        <ChatRight />
      </Stack>
    </>
  );
};
