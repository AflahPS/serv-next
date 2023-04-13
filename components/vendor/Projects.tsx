import React, { useEffect, useState } from "react";
import { CreateProject, ProjectsTable } from "../../ui";
import { Box } from "@mui/material";
import { Project } from "../../types";
import { useDispatch } from "react-redux";
import { getProjectsOfVendor } from "../../APIs";
import { useStore } from "../../customHooks";

export const Projects = () => {
  const displatch = useDispatch();
  const { token } = useStore();

  const [projects, setProjects] = useState<Project[]>([]);
  const getAndSetProjects = async () => {
    try {
      const projects = await getProjectsOfVendor(token);
      if (projects) return setProjects(projects);
      setProjects([]);
    } catch (err) {
      displatch;
      console.error(err);
    }
  };

  useEffect(() => {
    getAndSetProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box marginY={5}>
      <CreateProject setProjects={setProjects} />
      <ProjectsTable setProjects={setProjects} projects={projects} />
    </Box>
  );
};
