import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { COLOR } from "../constants";

export const ChatLi = () => {
  return (
    <>
      <List sx={{ width: "100%", cursor: "pointer" }}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar
              alt="Remy Sharp"
              src="https://images.pexels.com/photos/2709718/pexels-photo-2709718.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
          </ListItemAvatar>
          <ListItemText
            secondaryTypographyProps={{ color: "white" }}
            sx={{ color: COLOR["H1d-font-primary"] }}
            primary="UserName"
            secondary="Online"
          />
        </ListItem>
        <Divider variant="inset" component="li" />
      </List>
    </>
  );
};
