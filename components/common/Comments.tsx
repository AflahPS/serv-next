import { List } from "@mui/material";
import React from "react";
import { Comment } from "../../types";
import { CommentCard } from "../../ui";

export const Comments: React.FC<{ comments: Comment[] }> = ({ comments }) => {
  return (
    <List
      sx={{
        width: "100%",
        maxHeight: "360px",
        overflow: "auto",
        display: "flex",
        flexDirection: "column-reverse",
      }}
    >
      {comments.map((comment) => (
        <CommentCard comment={comment} key={comment._id} />
      ))}
    </List>
  );
};
