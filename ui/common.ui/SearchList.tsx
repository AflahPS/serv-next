import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  IconButton,
} from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { COLOR } from "../../constants";
import { Pose } from "aws-sdk/clients/rekognition";
import { ChatBubbleOutline } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../store";
import { getSingleChat, startChat } from "../../APIs";
import { chatActions } from "../../store/chatId.slice";
import { chatListActions } from "../../store/chatList.slice";

type Pos = {
  top?: string;
  bottom?: string;
  right?: string;
  left?: string;
};

export const SearchList: React.FC<{ results: any[]; Positions?: Pos }> = ({
  results,
  Positions,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const currentUser = useSelector((state: StoreState) => state.user.data);
  const role = useSelector((state: StoreState) => state.role.currentUser);
  const token = useSelector((state: StoreState) => state.jwt.token);

  const handleChatClick = async (userId: string) => {
    try {
      const newChat = await startChat(userId, token);
      dispatch(chatListActions.addToChatList(newChat?.chat));
      dispatch(chatActions.setChat(newChat?.chat?._id));
      router.push("/chat");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <List
      sx={{
        width: "100%",
        bgcolor: COLOR["H1d-ui-bg"],
        height: "40vh",
        maxHeight: "60vh",
        overflow: "auto",
        position: "absolute",
        ...Positions,
      }}
    >
      {results.map((user) => (
        <ListItem
          sx={{ cursor: "pointer" }}
          key={user._id}
          alignItems="flex-start"
          secondaryAction={
            <>
              {role !== "guest" && (
                <IconButton
                  color="primary"
                  edge="end"
                  onClick={() => {
                    handleChatClick(user._id);
                  }}
                  aria-label="chat"
                >
                  <ChatBubbleOutline />
                </IconButton>
              )}
            </>
          }
        >
          <ListItemAvatar>
            <IconButton
              onClick={() => {
                router.push(`/profile/${user._id}`);
              }}
            >
              <Avatar alt={user.name} src={user?.image} />
            </IconButton>
          </ListItemAvatar>
          <ListItemText
            onClick={() => {
              router.push(`/profile/${user._id}`);
            }}
            primary={user.name}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Email
                </Typography>
                {` : ${user.email}`}
              </React.Fragment>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};
