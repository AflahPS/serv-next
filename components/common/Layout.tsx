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

  // Selecting sidenavLinks according to user/admin layout settings
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
        <Box paddingX={0} flex={3.5} paddingY={{ xs: 0.5, md: 1, lg: 2 }}>
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
