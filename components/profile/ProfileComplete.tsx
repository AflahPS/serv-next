import React from "react";
import {
  AboutProfile,
  AccountDetails,
  Friends,
  ProfileHeader,
  ProfileTabs,
  Timeline,
} from ".";
import { Box } from "@mui/material";
import { User } from "../../types";
import { SavedPosts } from "./SavedPosts";
import { useStore } from "../../customHooks";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export const ProfileComplete: React.FC<{ user: User }> = ({ user }) => {
  const { currentUser, profileTab } = useStore();
  const [animationRef] = useAutoAnimate();
  const isProfileOwner = user?._id?.toString() === currentUser?._id?.toString();

  return (
    <Box
      sx={{
        maxWidth: "85%",
        marginX: "auto",
        marginBottom: "16px",
        borderRadius: 3,
      }}
      ref={animationRef}
    >
      <ProfileHeader user={user} isProfileOwner={isProfileOwner} />
      <AboutProfile user={user} isProfileOwner={isProfileOwner} />
      <ProfileTabs />
      {profileTab === "timeline" && (
        <Timeline user={user} isProfileOwner={isProfileOwner} />
      )}
      {profileTab === "accountDetails" && (
        <AccountDetails user={user} isProfileOwner={isProfileOwner} />
      )}
      {profileTab === "friends" && (
        <Friends user={user} isProfileOwner={isProfileOwner} />
      )}
      {isProfileOwner && profileTab === "savedPosts" && <SavedPosts />}
    </Box>
  );
};
