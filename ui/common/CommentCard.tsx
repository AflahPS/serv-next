import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";
import React from "react";
import { Comment } from "../../types";

export const CommentCard: React.FC<{ comment: Comment }> = ({ comment }) => {
  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={comment?.user?.name} src={comment?.user?.image} />
        </ListItemAvatar>
        <ListItemText
          primary={comment.user.name}
          secondary={
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {comment.content}
            </Typography>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};
