import React, { useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../store";
import { layoutLoadingActions } from "../../store/layout-loading.slice";

const Profile = () => {
  const dispatch = useDispatch();
  const currentTab = useSelector(
    (state: StoreState) => state.profileTab.currentTab
  );

  useEffect(() => {
    dispatch(layoutLoadingActions.finishedLoading());
  }, [dispatch]);

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
