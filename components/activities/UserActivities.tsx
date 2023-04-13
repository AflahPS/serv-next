import React from "react";
import { Box } from "@mui/material";
import { ActivitiesTabs } from "../../ui";
import { AppointmentsUser, VendorTableUser } from "../common";
import { ProjectsTableUser } from "./ProjectsTableUser";
import { useStore } from "../../customHooks";

export const UserActivities = () => {
  const { activitiesTab } = useStore();

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
      {activitiesTab === "appointments" && <AppointmentsUser />}
      {activitiesTab === "vendors" && <VendorTableUser />}
      {activitiesTab === "projects" && <ProjectsTableUser />}
    </Box>
  );
};
