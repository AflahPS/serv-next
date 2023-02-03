import { Box } from "@mui/system";
import React, { useState } from "react";
import useSWR from "swr";
import { CreatePost, LoadingCard, TabHeader } from "../../ui";
import { Feed } from "../common";
import { Snackbar, Alert, Typography } from "@mui/material";
import { axiosThrowerByMessage, nest } from "../../utils";
import { User } from "../../types";
import { COLOR } from "../../constants";

export const Timeline: React.FC<{
  user: User;
  isProfileOwner: boolean;
}> = ({ user, isProfileOwner }) => {
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
    try {
      const res = await nest({
        url: `/post/owner/${user?._id}`,
        method: "GET",
      });
      return res.data;
    } catch (err: any) {
      return axiosThrowerByMessage(err, "Post not found !!", () => []);
    }
  };
  const { data, error } = useSWR("posts/profile", fetcher);

  return (
    <Box
      sx={{
        boxShadow: 8,
        borderRadius: 3,
        // marginY: 2,
      }}
    >
      <TabHeader header="Timeline" />

      {/* If profile-owner is the current user he is 
      authorized for Creating a post */}

      {isProfileOwner && <CreatePost />}

      {/* If he has posts , show as FEED */}

      {data && <Feed posts={data.posts} />}

      {/* If he doesn't have any posts yet */}

      {Array.isArray(data) && data.length === 0 && (
        <Typography
          variant="h5"
          color={COLOR["H1d-font-primary"]}
          align="center"
          margin={3}
        >
          Nothing posted yet !
        </Typography>
      )}

      {/* If data is being fetched... */}

      {!Array.isArray(data) && !data && (
        <>
          <LoadingCard />
          <LoadingCard />
        </>
      )}

      {/* ERROR Message */}

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
