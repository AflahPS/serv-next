import React, { useEffect, useState } from "react";
import { ROWS, COLUMNS } from "../../constants";
import { DataTable } from "../../ui";
import { useSelector } from "react-redux";
import { StoreState } from "../../store";
import { getUsersByRole } from "../../APIs";
import { User } from "../../types";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import {
  ArrowCircleDownOutlined,
  ArrowCircleUpOutlined,
  CheckCircleOutlineOutlined,
  DeleteOutlineOutlined,
  NorthOutlined,
  NotInterestedOutlined,
  SouthOutlined,
  UpgradeOutlined,
} from "@mui/icons-material";
import { GridColDef } from "@mui/x-data-grid";

export const AdminTable = () => {
  const [users, setUsers] = useState<User[]>([]);

  const token = useSelector((state: StoreState) => state.jwt.token);

  const getAndSetUsers = async () => {
    try {
      const users = await getUsersByRole("admin", token);
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

    function renderPromotionButton(row: User) {
      const handlePromote = () => {
        // Handle ban
        console.log("Ban " + row._id);
      };

      return (
        <Tooltip title="Ban on Unban a user">
          <IconButton onClick={handlePromote}>
            <NorthOutlined />
          </IconButton>
        </Tooltip>
      );
    }

    function renderDemoteButton(row: User) {
      const handleDemote = () => {
        // Handle Delete
        console.log("Demote " + row._id);
      };

      return (
        <Tooltip title="Remove a user">
          <IconButton onClick={handleDemote}>
            <SouthOutlined />
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
        headerName: "Promote",
        width: 150,
        description: "Make an Admin to Super-Admin",
        renderCell(params) {
          return renderPromotionButton(params.row);
        },
      },
      {
        field: "_id",
        headerName: "Demote",
        width: 150,
        description: "Remove Admin position",
        renderCell(params) {
          return renderDemoteButton(params.row);
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
