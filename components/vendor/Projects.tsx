import React from "react";
import { CreateProject, ProjectsTable } from "../../ui";
import { Box } from "@mui/material";

export const Projects = () => {
  return (
    <Box marginY={5}>
      <CreateProject />
      <ProjectsTable />
    </Box>
  );
};
