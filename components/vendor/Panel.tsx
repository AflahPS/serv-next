import { Box } from "@mui/material";
import React from "react";
import { PanelTabs } from "../../ui";
import { useSelector } from "react-redux";
import { StoreState } from "../../store";
import {
  Appointments,
  Dashboard,
  Employees,
  Jobs,
  Notifications,
  Projects,
} from ".";

export const Panel = () => {
  const currentTab = useSelector(
    (state: StoreState) => state.panelTab.currentTab
  );

  return (
    <Box
      sx={{
        maxWidth: "85%",
        marginX: "auto",
        marginBottom: "16px",
        borderRadius: 3,
      }}
    >
      <PanelTabs />
      {currentTab === "dashboard" && <Dashboard />}
      {currentTab === "appointments" && <Appointments />}
      {currentTab === "employees" && <Employees />}
      {currentTab === "projects" && <Projects />}
      {currentTab === "jobs" && <Jobs />}
      {currentTab === "notifications" && <Notifications />}
    </Box>
  );
};
