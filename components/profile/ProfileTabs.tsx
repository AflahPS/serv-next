import styled from "@emotion/styled";
import { Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { MouseEvent } from "react";
import { COLOR } from "../../constants";
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
      case "activities":
        dispatch(profileTabActions.activities());
        break;
      default:
        dispatch(profileTabActions.timeline());
    }
  };

  return (
    <Box
      height={42}
      display={"flex"}
      justifyContent={"space-evenly"}
      alignItems={"center"}
      bgcolor="black"
      sx={{ borderRadius: 3 }}
    >
      {/* -------Timeline---------- */}
      <StyledBox
        onClick={(e) => {
          handleTabClick(e, "timeline");
        }}
        bgcolor={currentTab === "timeline" ? COLOR["H1d-ui-primary"] : ""}
        flex={1}
      >
        <Typography color={currentTab === "timeline" ? "black" : ""}>
          Timeline
        </Typography>
      </StyledBox>

      <Divider variant="middle" orientation="vertical" />

      {/* -------AccountDetails---------- */}

      <StyledBox
        flex={1}
        onClick={(e) => {
          handleTabClick(e, "accountDetails");
        }}
        bgcolor={currentTab === "accountDetails" ? COLOR["H1d-ui-primary"] : ""}
      >
        <Typography color={currentTab === "accountDetails" ? "black" : ""}>
          Account Details
        </Typography>
      </StyledBox>

      <Divider variant="middle" orientation="vertical" />

      {/* -------Friends---------- */}

      <StyledBox
        flex={1}
        onClick={(e) => {
          handleTabClick(e, "friends");
        }}
        bgcolor={currentTab === "friends" ? COLOR["H1d-ui-primary"] : ""}
      >
        <Typography color={currentTab === "friends" ? "black" : ""}>
          Friends
        </Typography>
      </StyledBox>

      <Divider variant="middle" orientation="vertical" />

      {/* -------Activities---------- */}

      <StyledBox
        flex={1}
        onClick={(e) => {
          handleTabClick(e, "activities");
        }}
        bgcolor={currentTab === "activities" ? COLOR["H1d-ui-primary"] : ""}
      >
        <Typography color={currentTab === "activities" ? "black" : ""}>
          Activities
        </Typography>
      </StyledBox>
    </Box>
  );
};
