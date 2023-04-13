import {
  DoneOutlineOutlined,
  ReportGmailerrorredOutlined,
} from "@mui/icons-material";
import { IconButton, Avatar, Tooltip, Box } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useConfirm } from "material-ui-confirm";
import { Project } from "../../types";
import { getProjectsOfUser, reportProject, unreportProject } from "../../APIs";
import { notifierActions } from "../../store";
import { DataTable } from "../../ui";
import { useStore } from "../../customHooks";

export const ProjectsTableUser: React.FC = () => {
  const dispatch = useDispatch();
  const confirmer = useConfirm();
  const { token } = useStore();

  const [projects, setProjects] = useState<Project[]>();

  const getAndSetProjects = async () => {
    try {
      const projects = await getProjectsOfUser(token);
      if (projects) setProjects(projects);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAndSetProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function dataFormatter(projects: Project[] | undefined) {
    if (projects === undefined) return [[], []];
    function renderVendorAvatar(row: Project) {
      const handleProfileClick = () => {
        // Handle ptofile click event
      };

      return (
        <>
          <IconButton onClick={handleProfileClick}>
            <Avatar src={row?.vendor?.user?.image}>
              {row?.vendor?.user?.name}
            </Avatar>
          </IconButton>
        </>
      );
    }

    function renderReportButton(row: Project) {
      // Handle Delete
      const handleReport = async (action: "report" | "unreport") => {
        try {
          await confirmer({
            description: `Are you sure you want to ${action} this project as failed ?`,
          });
          const isSuccess =
            action === "report"
              ? await reportProject(row._id, token)
              : await unreportProject(row._id, token);
          if (!isSuccess) return dispatch(notifierActions.somethingWentWrong());
          const selectedIndex = (projects as Project[]).findIndex(
            (p) => p._id === row._id
          );
          setProjects((prev) => {
            (prev as Project[])[selectedIndex].status =
              action === "report" ? "failed" : "runnung";
            return [...(prev as Project[])];
          });
          dispatch(
            notifierActions.info(
              `Successfully ${action}ed the project ${row.title} !`
            )
          );
        } catch (err) {
          if (typeof err !== "undefined")
            dispatch(notifierActions.somethingWentWrong());
          console.error(err);
        }
      };

      return (
        <Tooltip title={`Report the project`}>
          {row?.status !== "failed" ? (
            <IconButton color="error" onClick={() => handleReport("report")}>
              <ReportGmailerrorredOutlined />
            </IconButton>
          ) : (
            <IconButton
              color="success"
              onClick={() => handleReport("unreport")}
            >
              <DoneOutlineOutlined />
            </IconButton>
          )}
        </Tooltip>
      );
    }

    const columns: GridColDef[] = [
      {
        field: "title",
        headerName: "Project Title",
        width: 150,
      },
      {
        field: "vendor.user.image",
        headerName: "vendor",
        width: 100,
        headerAlign: "center",
        align: "center",
        renderCell(params) {
          return renderVendorAvatar(params.row);
        },
      },
      {
        field: "vendor.user.name",
        headerName: "Vendor Name",
        width: 150,
        valueGetter(params) {
          return params.row?.vendor?.user?.name;
        },
      },

      {
        field: "place",
        headerName: "Location",
        width: 150,
        valueGetter(params) {
          return params.row?.place;
        },
      },
      {
        field: "status",
        headerName: "Status",
        width: 150,
        valueGetter(params) {
          return params.row?.status;
        },
      },
      {
        field: "startDate",
        headerName: "Start Date",
        width: 200,
        valueGetter(params) {
          return dayjs(params.row?.startDate).format("LLL");
        },
      },
      {
        field: "endDate",
        headerName: "End Date",
        width: 200,
        valueGetter(params) {
          return dayjs(params.row?.endDate).format("LLL") || "-";
        },
      },
      {
        field: "id",
        headerName: "Report",
        align: "center",
        headerAlign: "center",
        width: 150,
        description: "Report project as failed",
        renderCell(params) {
          return renderReportButton(params.row);
        },
      },
    ];

    return [projects, columns];
  }

  const [rows, setRows] = useState<any[]>([]);
  const [columns, setColumns] = useState<GridColDef[]>([]);

  useEffect(() => {
    const [rows, columns] = dataFormatter(projects);
    setRows(rows);
    setColumns(columns as GridColDef[]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects]);

  return (
    <Box marginTop={3}>
      <DataTable rows={rows} columns={columns as GridColDef[]} />
    </Box>
  );
};
