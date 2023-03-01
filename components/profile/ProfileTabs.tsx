import styled from "@emotion/styled";
import { Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { MouseEvent } from "react";
import { COLOR, PROFILE_TABS } from "../../constants";
import { profileTabActions } from "../../store/profile-tab.slice";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../store";

const StyledBox = styled(Box)({
  color: COLOR["H1d-font-primary"],
  borderRadius: "inherit",
  textAlign: "center",
  cursor: "pointer",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const ProfileTabs = () => {
  const dispatch = useDispatch();
  const currentTab = useSelector(
    (state: StoreState) => state.profileTab.currentTab
  );

  const handleTabClick = (event: MouseEvent, tab: string) => {
    event.preventDefault();
    switch (tab) {
      case "timeline":
        dispatch(profileTabActions.timeline());
        break;
      case "accountDetails":
        dispatch(profileTabActions.accountDetails());
        break;
      case "friends":
        dispatch(profileTabActions.friends());
        break;
      case "savedPosts":
        dispatch(profileTabActions.savedPosts());
        break;
      default:
        dispatch(profileTabActions.timeline());
    }
  };

  return (
    <Box
      height={{ xs: 32, sm: 34, md: 38, lg: 42 }}
      display={"flex"}
      justifyContent={"space-evenly"}
      alignItems={"center"}
      bgcolor="black"
      sx={{ borderRadius: 3 }}
      marginBottom={{ xs: 0.5, sm: 1, md: 1.5, lg: 2 }}
    >
      {PROFILE_TABS.map((tab, ind) => (
        <React.Fragment key={ind}>
          <StyledBox
            onClick={(e) => {
              handleTabClick(e, tab.value);
            }}
            bgcolor={currentTab === tab.value ? COLOR["H1d-ui-primary"] : ""}
            flex={1}
          >
            <Typography color={currentTab === tab.value ? "black" : ""}>
              {tab.title}
            </Typography>
          </StyledBox>

          <Divider variant="middle" orientation="vertical" />
        </React.Fragment>
      ))}
    </Box>
  );
};
