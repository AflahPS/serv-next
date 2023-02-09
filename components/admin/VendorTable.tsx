import React, { useEffect, useState } from "react";
import { DataTable } from "../../ui";
import { COLUMNS, ROWS } from "../../constants";
import { Service, User } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../store";
import { getAllServices, getUsersByRole } from "../../APIs";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import {
  CheckCircleOutlineOutlined,
  DeleteOutlineOutlined,
  NotInterestedOutlined,
} from "@mui/icons-material";
import { GridColDef } from "@mui/x-data-grid";
import { notifierActions } from "../../store/notifier.slice";

export const VendorTable = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState<User[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  console.log(
    "🚀 ~ file: VendorTable.tsx:21 ~ VendorTable ~ services",
    services
  );
  console.log("🚀 ~ file: VendorTable.tsx:18 ~ VendorTable ~ vendors", users);

  const token = useSelector((state: StoreState) => state.jwt.token);

  const getAndSetUsersAndServices = async () => {
    try {
      const users = await getUsersByRole("vendor", token);
      const serviceData = await getAllServices();
      if (users) setUsers(users);
      if (serviceData) setServices(serviceData?.services);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAndSetUsersAndServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function userDataFormatter(users: User[]) {
    function renderAvatar(row: User) {
      const handleProfileClick = () => {
        // Handle ptofile click event
      };

      return (
        <>
          <IconButton onClick={handleProfileClick}>
            <Avatar src={row?.image}>{row.name}</Avatar>
          </IconButton>
        </>
      );
    }

    function renderBanButton(row: User) {
      const handleBan = () => {
        // Handle ban
        console.log("Ban " + row._id);
        dispatch(notifierActions.success("Ban " + row._id));
      };

      return (
        <Tooltip title="Ban on Unban a vendor">
          <IconButton onClick={handleBan}>
            {row?.isBanned ? (
              <CheckCircleOutlineOutlined />
            ) : (
              <NotInterestedOutlined />
            )}
          </IconButton>
        </Tooltip>
      );
    }

    function renderDeleteButton(row: User) {
      const handleDelete = () => {
        // Handle Delete
        console.log("Delete " + row._id);
        dispatch(notifierActions.success("Delete " + row._id));
      };

      return (
        <Tooltip title="Remove a vendor">
          <IconButton onClick={handleDelete}>
            <DeleteOutlineOutlined />
          </IconButton>
        </Tooltip>
      );
    }

    const columns: GridColDef[] = [
      {
        field: "image",
        headerName: "Avatar",
        width: 100,
        renderCell(params) {
          return renderAvatar(params.row);
        },
      },
      { field: "name", headerName: "Name", width: 150 },
      { field: "place", headerName: "Place", width: 150 },
      { field: "email", headerName: "Email", width: 150 },
      { field: "phone", headerName: "Phone", width: 150 },
      {
        field: "vendor.projects",
        headerName: "Projects",
        width: 150,
        valueGetter(params) {
          return params.row?.vendor?.projects?.length;
        },
      },
      {
        field: "vendor.service",
        headerName: "Service",
        width: 150,
        valueGetter(params) {
          const service = services.filter(
            (service) => service._id === params.row?.vendor?.service
          )[0];
          return service?.title;
          // return "Painter";
        },
      },
      {
        field: "id",
        headerName: "Action",
        width: 150,
        description: "Ban on Unban a user",
        renderCell(params) {
          return renderBanButton(params.row);
        },
      },
      {
        field: "_id",
        headerName: "Remove",
        width: 150,
        description: "Remove a user",
        renderCell(params) {
          return renderDeleteButton(params.row);
        },
      },
    ];

    return [users, columns];
  }

  const [rows, columns] = userDataFormatter(users);

  return <DataTable rows={rows} columns={columns as GridColDef[]} />;
};
