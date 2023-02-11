import React, { useEffect, useState } from "react";
import { DataTable } from "../../ui";
import { Project } from "../../types";
import { useSelector } from "react-redux";
import { StoreState } from "../../store";
import { getAllProjects } from "../../APIs";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import { DeleteOutlineOutlined } from "@mui/icons-material";
import { GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";

export const ProjectTable = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  const token = useSelector((state: StoreState) => state.jwt.token);

  const getAndSetProjects = async () => {
    try {
      const projectData = await getAllProjects(token);
      if (projectData) setProjects(projectData?.projects);
    } catch (err) {
      console.log(err);
    }
  };

  function dataFormatter(projects: Project[]) {
    function renderClientAvatar(row: Project) {
      const handleProfileClick = () => {
        // Handle ptofile click event
      };

      return (
        <>
          <IconButton onClick={handleProfileClick}>
            <Avatar src={row?.client?.image}>{row?.client?.name}</Avatar>
          </IconButton>
        </>
      );
    }

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

    function renderDeleteButton(row: Project) {
      const handleDelete = () => {
        // Handle Delete
        console.log("Delete " + row._id);
      };

      return (
        <Tooltip title="Remove a Project">
          <IconButton color="error" onClick={handleDelete}>
            <DeleteOutlineOutlined />
          </IconButton>
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
        field: "client.image",
        headerName: "Client",
        width: 100,
        headerAlign: "center",
        align: "center",
        renderCell(params) {
          return renderClientAvatar(params.row);
        },
      },
      {
        field: "client.name",
        headerName: "Client Name",
        width: 150,
        valueGetter(params) {
          return params.row?.client?.name;
        },
      },
      {
        field: "vendor.user.image",
        headerName: "Vendor",
        width: 100,
        headerAlign: "center",
        align: "center",
        renderCell(params) {
          return renderVendorAvatar(params.row);
        },
      },
      {
        field: "vendor.name",
        headerName: "Vendor Name",
        width: 150,
        valueGetter(params) {
          return params.row?.vendor?.user?.name;
        },
      },
      {
        field: "service.title",
        headerName: "Service",
        width: 150,
        valueGetter(params) {
          return params.row?.service?.title;
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
        headerName: "Remove",
        width: 150,
        description: "Remove a service",
        renderCell(params) {
          return renderDeleteButton(params.row);
        },
      },
    ];

    return [projects, columns];
  }

  const [rows, columns] = dataFormatter(projects);

  useEffect(() => {
    getAndSetProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <DataTable rows={rows} columns={columns as GridColDef[]} />;
};
