import React, { useEffect, useState } from "react";
import { CreateProject, ProjectsTable } from "../../ui";
import { Box } from "@mui/material";
import { Project } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../store";
import { getProjectsOfVendor } from "../../APIs";

export const Projects = () => {
  const displatch = useDispatch();
  const token = useSelector((state: StoreState) => state.jwt.token);

  const [projects, setProjects] = useState<Project[]>([]);

  const getAndSetProjects = async () => {
    try {
      const projects = await getProjectsOfVendor(token);
      if (projects) return setProjects(projects);
      setProjects([]);
    } catch (err) {
      displatch;
      console.log(err);
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
