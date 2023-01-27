import {
  Box,
  Fade,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import React from "react";
import { COLOR, SIDE_NAV_LINKS } from "../../constants";
import { Stack } from "@mui/system";
import { NextRouter, useRouter } from "next/router";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { sideNavTabActions } from "../../store/sidenav-tab.slice";
import { StoreState } from "../../store";
import { layoutLoadingActions } from "../../store/layout-loading.slice";

export const SideNav = () => {
  const dispatch: Dispatch<AnyAction> = useDispatch();
  const router: NextRouter = useRouter();
  const currentTab = useSelector(
    (state: StoreState) => state.sideNavTab.currentTab
  );
  const role = useSelector((state: StoreState) => state.role.currentUser);

  return (
    <>
      {/* Laptop or more */}
      <Box
        // p={2}
        flex={1}
        height={"100%"}
        sx={{
          display: { xs: "none", md: "block" },
        }}
      >
        <Box
          p={2}
          position="fixed"
          bgcolor={"black"}
          height={"100%"}
          flex={1}
          sx={{
            display: { xs: "none", md: "block" },
            color: COLOR["H1d-font-primary"],
            boxShadow: 8,
            borderRadius: 3,
          }}
        >
          <List>
            {SIDE_NAV_LINKS.map((link) => {
              const Icon = link.icon;
              if (!link.allowedRoles.includes(role)) return;
              return (
                <ListItem key={link.title} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      dispatch(layoutLoadingActions.loading());
                      dispatch(sideNavTabActions.push(link.title));
                      router.push(link.href);
                    }}
                  >
                    <ListItemIcon>
                      <Icon
                        sx={{
                          color:
                            currentTab === link.title
                              ? COLOR["H1d-ui-primary"]
                              : "inherit",
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      sx={{
                        color:
                          currentTab === link.title
                            ? COLOR["H1d-ui-primary"]
                            : "inherit",
                      }}
                      primary={link.title}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Box>
      {/* less than Laptop */}

      <Box>
        <Box position="fixed">
          <Stack
            display={"flex"}
            bgcolor="black"
            paddingY={2}
            width={"100%"}
            gap={1}
            sx={{
              marginLeft: 0,
              display: { xs: "flex", md: "none" },
              color: COLOR["H1d-font-primary"],
              boxShadow: 8,
              borderRadius: 3,
            }}
          >
            {SIDE_NAV_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                // <ListItem key={link.title}>
                <ListItemButton sx={{ paddingX: 1 }} key={link.title}>
                  <Tooltip
                    title={link.title}
                    placement="right"
                    disableFocusListener
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 600 }}
                  >
                    <ListItemIcon sx={{ justifyContent: "center" }}>
                      <Link
                        href={link.href}
                        onClick={() => {
                          dispatch(layoutLoadingActions.loading());
                          dispatch(sideNavTabActions.push(link.title));
                        }}
                      >
                        <Icon
                          sx={{
                            color:
                              currentTab === link.title
                                ? COLOR["H1d-ui-primary"]
                                : "inherit",
                          }}
                        />
                      </Link>
                    </ListItemIcon>
                  </Tooltip>
                </ListItemButton>
                // </ListItem>
              );
            })}
          </Stack>
        </Box>
      </Box>
    </>
  );
};
