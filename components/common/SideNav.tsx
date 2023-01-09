import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
} from "@mui/material";
import React from "react";
import { COLOR, SIDE_NAV_LINKS } from "../../constants";
import { ModeNight } from "@mui/icons-material";

export const SideNav = () => {
  return (
    <>
      <Box
        flex={1}
        bgcolor="black"
        p={2}
        sx={{
          display: { xs: "none", sm: "block" },
          color: COLOR["H1d-font-primary"],
        }}
      >
        <Box position="fixed">
          <List>
            {SIDE_NAV_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <ListItem key={link.title} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <Icon sx={{ color: COLOR["H1d-ui-primary"] }} />
                    </ListItemIcon>
                    <ListItemText primary={link.title} />
                  </ListItemButton>
                </ListItem>
              );
            })}
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ModeNight sx={{ color: COLOR["H1d-ui-primary"] }} />
                </ListItemIcon>
                <Switch color="primary" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Box>
    </>
  );
};
