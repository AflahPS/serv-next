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
import React, { useContext, useEffect, useState } from "react";
import { COLOR } from "../../constants";
import { Chat, User } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../store/store";
import { useRouter } from "next/router";
import { chatActions } from "../../store/chatId.slice";
import { onlineUsersActions } from "../../store/onlineUsers.slice";
import { SocketContext } from "../../utils";
// import { SocketContext } from "../../utils";

interface ActiveUsers {
  userId: string;
  socketId: string;
}

export const ChatLi: React.FC<{ Chat: Chat }> = ({ Chat }) => {
  const currentUser = useSelector((state: StoreState) => state.user.data);
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuth = useSelector((state: StoreState) => state.auth.isAuth);
  const { socket } = useContext(SocketContext);

  const onlineUsers = useSelector(
    (state: StoreState) => state.onlineUsers.users
  );

  // const [onlineUsers, setOnlineUsers] = useState<ActiveUsers[]>([]);
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    if (isAuth && socket) {
      socket?.on("get-users", (activeUsers: ActiveUsers[]) => {
        if (!activeUsers) return;
        dispatch(onlineUsersActions.setUsers(activeUsers));
        // setOnlineUsers(activeUsers);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  useEffect(() => {
    if (isAuth && socket) {
      socket?.on("get-users", (activeUsers: ActiveUsers[]) => {
        if (!activeUsers) return;
        dispatch(onlineUsersActions.setUsers(activeUsers));
        // setOnlineUsers(activeUsers);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getFriendObjectFromChat = () =>
    Chat.user1._id === currentUser._id ? Chat.user2 : Chat.user1;

  const handleListClick = () => {
    dispatch(chatActions.setChat(Chat._id));
    router.push("/chat");
  };

  // const isOnline = onlineUsers?.some(
  //   (el: any) => el?.userId === getFriendObjectFromChat()._id
  // );

  // useEffect(() => {
  //   setIsOnline(
  //     initialOnlineUsers?.some(
  //       (el: any) => el?.userId === getFriendObjectFromChat()._id
  //     )
  //   );
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    setIsOnline(
      onlineUsers?.some(
        (el: any) => el?.userId === getFriendObjectFromChat()._id
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onlineUsers]);

  return (
    <Box width={"100%"}>
      <List sx={{ width: "100%", cursor: "pointer" }}>
        <ListItem alignItems="flex-start" onClick={handleListClick}>
          <ListItemAvatar>
            <Badge
              variant="dot"
              color={isOnline ? "success" : "default"}
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
            secondary={isOnline ? "Online" : "Offline"}
            primaryTypographyProps={{
              color: `${isOnline ? "limegreen" : "inherit"}`,
            }}
          />
        </ListItem>
        <Divider variant="inset" component="li" />
      </List>
    </Box>
  );
};
