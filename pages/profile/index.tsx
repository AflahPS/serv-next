import React from "react";
import { Layout } from "../../components/common";
import { LoadingCard } from "../../ui";

import {
  AboutProfile,
  AccountDetails,
  Activities,
  Friends,
  ProfileHeader,
  ProfileTabs,
  Timeline,
} from "../../components/profile";
import { Box, Card } from "@mui/material";
import { useSelector } from "react-redux";
import { StoreState } from "../../store";

const Profile = () => {
  const currentTab = useSelector(
    (state: StoreState) => state.profileTab.currentTab
  );

  return (
    <Layout>
      <Box
        sx={{
          maxWidth: "85%",
          marginX: "auto",
          marginBottom: "16px",
          borderRadius: 3,
        }}
      >
        <ProfileHeader />
        <AboutProfile />
        <ProfileTabs />
        {currentTab === "timeline" && <Timeline />}
        {currentTab === "accountDetails" && <AccountDetails />}
        {currentTab === "friends" && <Friends />}
        {currentTab === "activities" && <Activities />}
      </Box>
    </Layout>
  );
};

export default Profile;
