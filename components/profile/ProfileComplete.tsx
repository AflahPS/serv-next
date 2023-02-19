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
import { useSelector } from "react-redux";
import { StoreState } from "../../store";
import { SavedPosts } from "./SavedPosts";

export const ProfileComplete: React.FC<{ user: User }> = ({ user }) => {
  const currentTab = useSelector(
    (state: StoreState) => state.profileTab.currentTab
  );
  const currentUser = useSelector((state: StoreState) => state.user.data);
  const isProfileOwner = user?._id?.toString() === currentUser?._id?.toString();
  const userRole = user.role;

  return (
    <Box
      sx={{
        maxWidth: "85%",
        marginX: "auto",
        marginBottom: "16px",
        borderRadius: 3,
      }}
    >
      <ProfileHeader user={user} isProfileOwner={isProfileOwner} />
      {userRole === "vendor" && <AboutProfile user={user} />}
      <ProfileTabs />
      {currentTab === "timeline" && (
        <Timeline user={user} isProfileOwner={isProfileOwner} />
      )}
      {currentTab === "accountDetails" && (
        <AccountDetails user={user} isProfileOwner={isProfileOwner} />
      )}
      {currentTab === "friends" && (
        <Friends user={user} isProfileOwner={isProfileOwner} />
      )}
      {currentTab === "savedPosts" && <SavedPosts />}
    </Box>
  );
};
