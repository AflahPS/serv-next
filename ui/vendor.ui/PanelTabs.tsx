import React from "react";
import styled from "@emotion/styled";
import { Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { COLOR } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../store";
import { panelTabActions } from "../../store/panel-tab.slice";
import { PANEL_TABS } from "../../constants/PANEL_TABS";

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

export const PanelTabs = () => {
  const dispatch = useDispatch();
  const currentTab = useSelector(
    (state: StoreState) => state.panelTab.currentTab
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
      {PANEL_TABS.map((tab) => (
        <>
          <StyledBox
            key={tab.value}
            onClick={(e) => {
              e.preventDefault();
              dispatch(panelTabActions.push(tab.value));
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
