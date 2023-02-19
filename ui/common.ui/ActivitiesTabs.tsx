import styled from "@emotion/styled";
import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import { ACTIVITIES_TABS, COLOR } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../store";
import { activitiesTabActions } from "../../store/activities-tabs.slice";

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

export const ActivitiesTabs = () => {
  const dispatch = useDispatch();
  const currentTab = useSelector(
    (state: StoreState) => state.activitiesTab.currentTab
  );

  return (
    <Box
      height={42}
      display={"flex"}
      justifyContent={"space-evenly"}
      alignItems={"center"}
      bgcolor="black"
      sx={{ borderRadius: 3 }}
    >
      {ACTIVITIES_TABS.map((tab) => (
        <>
          <StyledBox
            key={tab.value}
            onClick={(e) => {
              e.preventDefault();
              dispatch(activitiesTabActions.push(tab.value));
            }}
            bgcolor={currentTab === tab.value ? COLOR["H1d-ui-primary"] : ""}
            flex={1}
          >
            <Typography color={currentTab === tab.value ? "black" : ""}>
              {tab.title}
            </Typography>
          </StyledBox>
          <Divider variant="middle" orientation="vertical" />
        </>
      ))}
    </Box>
  );
};
