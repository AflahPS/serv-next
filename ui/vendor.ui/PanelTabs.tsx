import React from "react";
import styled from "@emotion/styled";
import { Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { COLOR } from "../../constants";
import { useDispatch } from "react-redux";
import { panelTabActions } from "../../store/panel-tab.slice";
import { PANEL_TABS } from "../../constants/PANEL_TABS";
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

export const PanelTabs = () => {
  const dispatch = useDispatch();
  const { panelTab } = useStore();

  return (
    <Box
      height={42}
      display={"flex"}
      justifyContent={"space-evenly"}
      alignItems={"center"}
      bgcolor="black"
      sx={{ borderRadius: 3 }}
    >
      {PANEL_TABS.map((tab, ind, arr) => (
        <>
          <StyledBox
            key={tab.value}
            onClick={(e) => {
              e.preventDefault();
              dispatch(panelTabActions.push(tab.value));
            }}
            bgcolor={panelTab === tab.value ? COLOR["H1d-ui-primary"] : ""}
            flex={1}
          >
            <Typography color={panelTab === tab.value ? "black" : ""}>
              {tab.title}
            </Typography>
          </StyledBox>
          {ind !== arr.length - 1 && (
            <Divider variant="middle" orientation="vertical" />
          )}
        </>
      ))}
    </Box>
  );
};
