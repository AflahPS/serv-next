import { Box } from "@mui/system";
import React from "react";
import { CreatePost, TabHeader } from "../../ui";
import { Feed } from "../common";
import { User } from "../../types";

interface Props {
  user: User;
  isProfileOwner: boolean;
}

export const Timeline: React.FC<Props> = (props) => {
  const { user, isProfileOwner } = props;
  return (
    <Box
      sx={{
        boxShadow: 8,
        borderRadius: 3,
      }}
    >
      <TabHeader invertColor header="Timeline" />
      {isProfileOwner && <CreatePost />}

      <Feed user={user._id} />
    </Box>
  );
};
