import styled from "@emotion/styled";
import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import { ACTIVITIES_TABS, COLOR } from "../../constants";
import { useDispatch } from "react-redux";
import { activitiesTabActions } from "../../store";
import { useStore } from "../../customHooks";

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
  const { activitiesTab } = useStore();

  return (
    <Box
      height={42}
      display={"flex"}
      justifyContent={"space-evenly"}
      alignItems={"center"}
      bgcolor="black"
      sx={{ borderRadius: 3 }}
    >
      {ACTIVITIES_TABS.map((tab, ind, arr) => (
        <>
          <StyledBox
            key={tab.value}
            onClick={(e) => {
              e.preventDefault();
              dispatch(activitiesTabActions.push(tab.value));
            }}
            bgcolor={activitiesTab === tab.value ? COLOR["H1d-ui-primary"] : ""}
            flex={1}
          >
            <Typography color={activitiesTab === tab.value ? "black" : ""}>
              {tab.title}
            </Typography>
          </StyledBox>{" "}
          {ind !== arr.length - 1 && (
            <Divider variant="middle" orientation="vertical" />
          )}
        </>
      ))}
    </Box>
  );
};
