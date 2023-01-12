import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import { COLOR, SIDE_NAV_LINKS } from "../../constants";
import { Stack } from "@mui/system";
import { NextRouter, useRouter } from "next/router";

export const SideNav = () => {
  const router: NextRouter = useRouter();

  return (
    <>
      {/* Laptop or more */}
      <Box
        flex={1}
        bgcolor="black"
        p={2}
        sx={{
          display: { xs: "none", md: "block" },
          color: COLOR["H1d-font-primary"],
        }}
      >
        <Box position="fixed">
          <List>
            {SIDE_NAV_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <ListItem key={link.title} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      router.push(link.href);
                    }}
                  >
                    <ListItemIcon>
                      <Icon sx={{ color: COLOR["H1d-ui-primary"] }} />
                    </ListItemIcon>
                    <ListItemText primary={link.title} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Box>
      {/* less than Laptop */}
      <Box position="fixed">
        <Stack
          bgcolor="black"
          paddingTop={2}
          gap={1}
          // justifyContent={"center"}
          width={"10%"}
          sx={{
            marginLeft: 0,
            display: { xs: "flex", md: "none" },
            color: COLOR["H1d-font-primary"],
          }}
        >
          {SIDE_NAV_LINKS.map((link) => {
            const Icon = link.icon;
            return (
              // <ListItem key={link.title}>
              <ListItemButton
                onClick={() => {
                  router.push(link.href);
                }}
                key={link.title}
              >
                <ListItemIcon>
                  <Icon sx={{ color: COLOR["H1d-ui-primary"] }} />
                </ListItemIcon>
              </ListItemButton>
              // </ListItem>
            );
          })}
        </Stack>
      </Box>
    </>
  );
};
