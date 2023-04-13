import { Box, Card, Stack } from "@mui/material";
import React, { ReactNode } from "react";
import { ChatRight } from "./ChatRight";
import { NavBar } from "./NavBar";
import { SideNav } from "./SideNav";
import { LoadingCard } from "../../ui";
import { COLOR, SIDE_NAV_LINKS } from "../../constants";
import { SideNavLink } from "../../types";
import { useStore } from "../../customHooks";

interface Props {
  SideNavLinks?: SideNavLink[];
  children?: ReactNode | undefined;
}

export const Layout: React.FC<Props> = ({ children, SideNavLinks }) => {
  const { layoutLoading } = useStore();

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
          {layoutLoading && (
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
          {!layoutLoading && children}
        </Box>
        <ChatRight />
      </Stack>
    </>
  );
};
