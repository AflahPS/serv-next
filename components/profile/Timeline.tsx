import { Box } from "@mui/system";
import React, { useState } from "react";
import useSWR from "swr";
import { CreatePost, LoadingCard, TabHeader } from "../../ui";
import { Feed } from "../common";
import { Snackbar, Alert } from "@mui/material";
import { useSelector } from "react-redux";
import { StoreState } from "../../store";
import { nest } from "../../utils";

export const Timeline = () => {
  const role = useSelector((state: StoreState) => state.role.currentUser);
  const user = useSelector((state: StoreState) => state.user.data);
  const token = useSelector((state: StoreState) => state.jwt.token);

  // For Error snackbar
  const [open, setOpen] = useState(true);
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // For fetching posts from backend
  const fetcher = async () => {
    const res = await nest({
      url: role === "vendor" ? `/post/owner/${user?._id}` : "/post",
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res.data;
  };
  const { data, error } = useSWR("posts", fetcher);

  return (
    <Box
      sx={{
        boxShadow: 8,
        borderRadius: 3,
        // marginY: 2,
      }}
    >
      <TabHeader header="Timeline" />
      <CreatePost />
      {data && <Feed posts={data.posts} />}{" "}
      {!data && (
        <>
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
        </>
      )}
      {error && (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            Something went wrong !
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};
