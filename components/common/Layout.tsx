import { Box, Card, Stack } from "@mui/material";
import React, { ReactNode } from "react";
import { ChatRight } from "./ChatRight";
import { NavBar } from "./NavBar";
import { SideNav } from "./SideNav";
import { LoadingCard } from "../../ui";
import { COLOR, SIDE_NAV_LINKS } from "../../constants";
import { StoreState } from "../../store";
import { SideNavLink } from "../../types";
import { useSelector } from "react-redux";

interface Props {
  SideNavLinks?: SideNavLink[];
  children?: ReactNode | undefined;
}

export const Layout: React.FC<Props> = ({ children, SideNavLinks }) => {
  const isLoading = useSelector(
    (state: StoreState) => state.layoutLoading.isLayoutLoading
  );

  const role = useSelector((state: StoreState) => state.role.currentUser);

  let sideLinks;
  if (!SideNavLinks) {
    sideLinks = SIDE_NAV_LINKS;
  } else {
    sideLinks = SideNavLinks;
  }

  return (
    <>
      <NavBar />
      <Stack
        minHeight={"100vh"}
        direction={"row"}
        // justifyContent="space-between"
        marginY={1}
      >
        <SideNav SideNavLinks={sideLinks} />
        <Box flex={3.5} paddingY={2}>
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
            </Card>
          )}
          {!isLoading && children}
        </Box>
        {role !== "guest" && <ChatRight />}
      </Stack>
    </>
  );
};
