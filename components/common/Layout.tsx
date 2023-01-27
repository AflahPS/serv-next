import { Box, Card, Stack } from "@mui/material";
import React, { PropsWithChildren } from "react";
import { ChatRight } from "./ChatRight";
import { NavBar } from "./NavBar";
import { SideNav } from "./SideNav";
import { LoadingCard } from "../../ui";
import { COLOR } from "../../constants";
import { useSelector } from "react-redux";
import { StoreState } from "../../store";

export const Layout = (props: PropsWithChildren) => {
  const isLoading = useSelector(
    (state: StoreState) => state.layoutLoading.isLayoutLoading
  );
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
          {isLoading && (
            <Card
              sx={{
                backgroundColor: COLOR["H1d-ui-bg"],
                maxWidth: "80%",
                marginX: "auto",
                marginBottom: "16px",
                boxShadow: 8,
                borderRadius: 3,
              }}
            >
              <LoadingCard />
              <LoadingCard />
              <LoadingCard />
              <LoadingCard />
              <LoadingCard />
            </Card>
          )}
          {!isLoading && props.children}
        </Box>
        <ChatRight />
      </Stack>
    </>
  );
};
