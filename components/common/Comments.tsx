import { List } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Comment } from "../../types";
import { CommentCard } from "../../ui";
import { nest } from "../../utils";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { getCommentsOfPost } from "../../APIs";

interface Props {
  post: any;
  comments: any[];
  setComments: React.Dispatch<React.SetStateAction<any[]>>;
}

export const Comments: React.FC<Props> = (props) => {
  const { post, comments, setComments } = props;

  const [listParent] = useAutoAnimate();

  useEffect(() => {
    async function fetcher() {
      try {
        const commentsFetched = await getCommentsOfPost(post);
        if (commentsFetched) {
          setComments(commentsFetched);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetcher();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);

  function removeComment(id: string) {
    setComments((prev) => prev.filter((c) => c._id !== id));
  }

  return (
    <List
      ref={listParent}
      sx={{
        width: "100%",
        maxHeight: "360px",
        overflow: "auto",
        display: "flex",
        flexDirection: "column-reverse",
      }}
    >
      {Array.isArray(comments) &&
        comments.length > 0 &&
        comments.map((comment: Comment) => (
          <CommentCard
            comment={comment}
            key={comment._id}
            removeComment={removeComment}
          />
        ))}
    </List>
  );
};
