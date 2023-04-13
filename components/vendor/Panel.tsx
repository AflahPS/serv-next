import { Box } from "@mui/material";
import React from "react";
import { PanelTabs } from "../../ui";
import { Appointments, Employees, Projects, VendorPanel } from ".";
import { useStore } from "../../customHooks";

export const Panel = () => {
  const { panelTab } = useStore();

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
      {panelTab === "dashboard" && <VendorPanel />}
      {panelTab === "appointments" && <Appointments />}
      {panelTab === "employees" && <Employees />}
      {panelTab === "projects" && <Projects />}
      {/* {currentTab === "jobs" && <Jobs />} */}
    </Box>
  );
};
