import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { TabHeader } from "../../ui";
import { Post } from "../../types";
import { Feed } from "../common";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../store";
import { notifierActions } from "../../store/notifier.slice";
import { getSavedPost } from "../../APIs";

export const SavedPosts = () => {
  const token = useSelector((state: StoreState) => state.jwt.token);
  const dispach = useDispatch();

  const [data, setData] = useState<Post[]>([]);

  const getAndSetData = async () => {
    try {
      const posts = await getSavedPost(token);
      if (posts.length > 0) setData(posts);
    } catch (err) {
      console.log(err);
      dispach(notifierActions.somethingWentWrong());
    }
  };

  useEffect(() => {
    getAndSetData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      sx={{
        boxShadow: 8,
        borderRadius: 3,
        // marginY: 2,
      }}
    >
      <TabHeader header="Saved Posts" />
      <Feed posts={data} />
    </Box>
  );
};
