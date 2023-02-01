import { List } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Comment } from "../../types";
import { CommentCard } from "../../ui";
import { nest } from "../../utils";

export const Comments: React.FC<{ post: string }> = ({ post }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetcher() {
      try {
        const { data } = await nest({
          url: `comment/post/${post}`,
          method: "GET",
        });
        if (data.status === "success") {
          console.log(data);

          setComments(data?.comments);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetcher();
  }, [post]);

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
      {Array.isArray(comments) &&
        comments.length &&
        comments.map((comment: Comment) => (
          <CommentCard comment={comment} key={comment._id} />
        ))}
    </List>
  );
};
