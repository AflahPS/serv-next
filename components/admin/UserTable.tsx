import React, { useEffect, useState } from "react";
import { DataTable } from "../../ui";
import { getUsersByRole } from "../../APIs/User.api";
import { useSelector } from "react-redux";
import { StoreState } from "../../store";
import { User } from "../../types";
import { GridColDef } from "@mui/x-data-grid";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import {
  CheckCircleOutlineOutlined,
  DeleteOutlineOutlined,
  NotInterestedOutlined,
} from "@mui/icons-material";

export const UserTable = () => {
  const [users, setUsers] = useState<User[]>([]);

  const token = useSelector((state: StoreState) => state.jwt.token);

  const getAndSetUsers = async () => {
    try {
      const users = await getUsersByRole("user", token);
      if (users) setUsers(users);
    } catch (err) {
      console.log(err);
    }
  };

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
      };

      return (
        <Tooltip title="Ban on Unban a user">
          <IconButton onClick={handleBan}>
            {row?.isBanned ? (
              <CheckCircleOutlineOutlined color="success" />
            ) : (
              <NotInterestedOutlined color="warning" />
            )}
          </IconButton>
        </Tooltip>
      );
    }

    function renderDeleteButton(row: User) {
      const handleDelete = () => {
        // Handle Delete
        console.log("Delete " + row._id);
      };

      return (
        <Tooltip title="Remove a user">
          <IconButton color="error" onClick={handleDelete}>
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

  useEffect(() => {
    getAndSetUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <DataTable rows={rows} columns={columns as GridColDef[]} />;
};
