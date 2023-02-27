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
  return (
    <Box
      sx={{
        boxShadow: 8,
        borderRadius: 3,
        // marginY: 2,
      }}
    >
      <TabHeader header="Timeline" />
      {isProfileOwner && <CreatePost />}

      <Feed user={user._id} />
    </Box>
  );
};
