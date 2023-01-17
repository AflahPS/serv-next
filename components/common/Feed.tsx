import React, { useState } from "react";
import { CreatePost, FeedCard } from "../../ui";

export const Feed = () => {
  return (
    <>
      <CreatePost />
      <FeedCard />
      <FeedCard />
      <FeedCard />
      <FeedCard />
    </>
  );
};
