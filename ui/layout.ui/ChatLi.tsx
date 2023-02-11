import {
  Avatar,
  Badge,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import React from "react";
import { COLOR } from "../../constants";
import { Chat } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../store";
import { useRouter } from "next/router";
import { chatActions } from "../../store/chatId.slice";

export const ChatLi: React.FC<{ Chat: Chat }> = ({ Chat }) => {
  const currentUser = useSelector((state: StoreState) => state.user.data);
  const router = useRouter();
  const dispatch = useDispatch();

  const getFriendObjectFromChat = () =>
    Chat.user1._id === currentUser._id ? Chat.user2 : Chat.user1;

  const handleListClick = () => {
    dispatch(chatActions.setChat(Chat._id));
    router.push("/chat");
  };

  return (
    <Box width={"100%"}>
      <List sx={{ width: "100%", cursor: "pointer" }}>
        <ListItem alignItems="flex-start" onClick={handleListClick}>
          <ListItemAvatar>
            <Badge
              variant="dot"
              color="success"
              overlap="circular"
              badgeContent=" "
            >
              <Avatar
                alt="Remy Sharp"
                src={getFriendObjectFromChat()?.image as string}
              />
            </Badge>
          </ListItemAvatar>
          <ListItemText
            secondaryTypographyProps={{ color: "white" }}
            sx={{ color: COLOR["H1d-font-primary"] }}
            primary={getFriendObjectFromChat()?.name}
            secondary="Online"
          />
        </ListItem>
        <Divider variant="inset" component="li" />
      </List>
    </Box>
  );
};
