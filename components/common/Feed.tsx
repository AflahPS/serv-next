import React from "react";
import { CreatePost, FeedCard } from "../../ui";
import { useSelector } from "react-redux";
import { Post } from "../../types/Posts";

export const Feed: React.FC<{ posts: Post[] }> = (props) => {
  return (
    <>
      {props.posts.map((post) => (
        <FeedCard key={post._id} post={post} />
      ))}
      {/* <FeedCard />
      <FeedCard />
      <FeedCard /> */}
    </>
  );
};
