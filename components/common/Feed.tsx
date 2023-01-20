import React from "react";
import { CreatePost, FeedCard } from "../../ui";
import { useSelector } from "react-redux";

export const Feed = () => {
  const role = useSelector((state: any) => state?.role?.currentUser);
  return (
    <>
      {role === "guest" && <CreatePost />}
      <FeedCard />
      <FeedCard />
      <FeedCard />
      <FeedCard />
    </>
  );
};
