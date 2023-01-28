import React from "react";
import { FeedCard } from "../../ui";
import { Post } from "../../types/Posts";

export const Feed: React.FC<{ posts: Post[] }> = (props) => {
  console.log(props);

  return (
    <>
      {props?.posts?.map((post) => (
        <FeedCard key={post._id} post={post} maxWidth="80%" />
      ))}
    </>
  );
};
