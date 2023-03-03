import React, { useEffect, useState } from "react";
import { DataTable } from "../../ui";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../store";
import { RoleDataV, changeRole, getUsersByRole } from "../../APIs";
import { User } from "../../types";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import { NorthOutlined, SouthOutlined } from "@mui/icons-material";
import { GridColDef } from "@mui/x-data-grid";
import { firstLetterCapitalizer } from "../../utils";
import { useConfirm } from "material-ui-confirm";
import { notifierActions } from "../../store/notifier.slice";

export const AdminTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const token = useSelector((state: StoreState) => state.jwt.token);

  const confirmer = useConfirm();
  const dispatch = useDispatch();

  const getAndSetUsers = async () => {
    try {
      const admins = await getUsersByRole("admin", token);
      const superAdmins = await getUsersByRole("super-admin", token);
      setUsers((prev) => {
        let ret = [];
        if (admins?.length) ret.push(...admins);
        if (superAdmins?.length) ret.push(...superAdmins);
        return ret;
      });
    } catch (err) {
      console.error(err);
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
      const handlePromote = async () => {
        try {
          const userId = row._id;
          await confirmer({
            description: `Do you want to promote this user (${row.name}) ?`,
          });
          const dataV: RoleDataV = {
            id: userId,
            from: "admin",
            to: "super-admin",
          };
          const promotedUser = await changeRole(token, dataV);
          if (promotedUser?.role !== dataV.to)
            dispatch(notifierActions.somethingWentWrong());
          const promotedUserIdx = users.findIndex(
            (user) => user._id === userId
          );
          const clonnedUsers = [...users];
          clonnedUsers[promotedUserIdx].role = "super-admin";
          setUsers(clonnedUsers);
          dispatch(notifierActions.info(`Successfully promoted ${row.name} !`));
        } catch (err) {
          console.error(err);
          if (err !== undefined) dispatch(notifierActions.somethingWentWrong());
        }
      };

      return (
        <Tooltip title="Ban on Unban a user">
          <IconButton
            disabled={row?.role === "super-admin"}
            color="success"
            onClick={handlePromote}
          >
            <NorthOutlined />
          </IconButton>
        </Tooltip>
      );
    }

    function renderDemoteButton(row: User) {
      const handleDemote = async () => {
        try {
          const userId = row._id;
          await confirmer({
            description: `Do you want to demote this user (${row.name}) ?`,
          });
          const userRole = row.role as "admin" | "super-admin";
          const newRole = userRole === "super-admin" ? "admin" : "user";
          const dataV: RoleDataV = {
            id: userId,
            from: userRole,
            to: newRole,
          };
          const demotedUser = await changeRole(token, dataV);
          if (demotedUser?.role !== dataV.to)
            dispatch(notifierActions.somethingWentWrong());
          const demotedUserIdx = users.findIndex((user) => user._id === userId);
          const clonnedUsers = [...users];
          if (dataV.to === "admin") clonnedUsers[demotedUserIdx].role = "admin";
          else clonnedUsers.splice(demotedUserIdx, 1);
          setUsers(clonnedUsers);
          dispatch(notifierActions.info(`Successfully demoted ${row.name} !`));
        } catch (err) {
          console.error(err);
          if (err !== undefined) dispatch(notifierActions.somethingWentWrong());
        }
      };

      return (
        <Tooltip title="Remove a user">
          <IconButton color="error" onClick={handleDemote}>
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
      {
        field: "role",
        headerName: "Role",
        width: 150,
        valueGetter(params) {
          return firstLetterCapitalizer(params.row?.role);
        },
      },
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
