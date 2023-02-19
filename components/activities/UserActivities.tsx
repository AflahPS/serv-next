import React from "react";
import { useSelector } from "react-redux";
import { StoreState } from "../../store";
import { Box } from "@mui/material";
import { ActivitiesTabs } from "../../ui";
import { AppointmentsUser, VendorTableUser } from "../common";
import { ProjectsTableUser } from "./ProjectsTableUser";

export const UserActivities = () => {
  const currentTab = useSelector(
    (state: StoreState) => state.activitiesTab.currentTab
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
      <ActivitiesTabs />
      {currentTab === "appointments" && <AppointmentsUser />}
      {currentTab === "vendors" && <VendorTableUser />}
      {currentTab === "projects" && <ProjectsTableUser />}
    </Box>
  );
};
