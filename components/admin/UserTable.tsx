import React, { useEffect, useState } from "react";
import { DataTable } from "../../ui";
import {
  RoleDataV,
  banUser,
  changeRole,
  deleteUser,
  getUsersByRole,
} from "../../APIs/User.api";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../store";
import { User } from "../../types";
import { GridColDef } from "@mui/x-data-grid";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import {
  CheckCircleOutlineOutlined,
  DeleteOutlineOutlined,
  NorthOutlined,
  NotInterestedOutlined,
} from "@mui/icons-material";
import { notifierActions } from "../../store/notifier.slice";
import { useConfirm } from "material-ui-confirm";

export const UserTable = () => {
  const dispatch = useDispatch();
  const confirmer = useConfirm();
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
        // const userId = row._id;
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
      // Handle ban
      const handleBan = async () => {
        try {
          const userId = row._id;
          const action = !row.isBanned ? "ban" : "unban";
          await confirmer({
            description: `Do you want to ${action} this user (${row.name}) ?`,
          });
          const reaction = action === "ban";
          const isSuccess = await banUser(userId, token, action);
          if (!isSuccess) {
            return dispatch(notifierActions.somethingWentWrong());
          }
          const bannedUserIndex = users.findIndex(
            (user) => user._id === row._id
          );
          const clonnedUsers = [...users];
          clonnedUsers[bannedUserIndex].isBanned = reaction;
          setUsers(clonnedUsers);
          dispatch(notifierActions.info(`Successfully ${action}ned !`));
        } catch (err) {
          console.log(err);
          if (err !== undefined) dispatch(notifierActions.somethingWentWrong());
        }
      };

      return (
        <IconButton onClick={handleBan}>
          {row?.isBanned ? (
            <Tooltip title="Click to UNBAN this user">
              <NotInterestedOutlined color="warning" />
            </Tooltip>
          ) : (
            <Tooltip title="Click to BAN this user">
              <CheckCircleOutlineOutlined color="success" />
            </Tooltip>
          )}
        </IconButton>
      );
    }

    function renderPromoteButton(row: User) {
      // Handle ban
      const handlePromote = async () => {
        try {
          const userId = row._id;
          await confirmer({
            description: `Do you want to promote this user (${row.name}) ?`,
          });
          const dataV: RoleDataV = {
            id: userId,
            from: "user",
            to: "admin",
          };
          const promotedUser = await changeRole(token, dataV);
          if (promotedUser?.role !== "admin")
            dispatch(notifierActions.somethingWentWrong());
          setUsers((prev) => prev.filter((user) => user._id !== userId));
          dispatch(
            notifierActions.info(
              `Successfully promoted and added to 'Admin-table' !`
            )
          );
        } catch (err) {
          console.log(err);
          if (err !== undefined) dispatch(notifierActions.somethingWentWrong());
        }
      };

      return (
        <IconButton onClick={handlePromote}>
          <Tooltip title="Click to BAN this user">
            <NorthOutlined color="success" />
          </Tooltip>
        </IconButton>
      );
    }

    function renderDeleteButton(row: User) {
      // Handle Delete
      const handleDelete = async () => {
        try {
          const userId = row._id;
          await confirmer({
            description: `Do you want to delete this user (${row.name}) ?`,
          });
          const isSuccess = await deleteUser(userId, token);
          setUsers((prev) => prev.filter((user) => user._id !== userId));
          dispatch(notifierActions.info("Successfully deleted the user !"));
        } catch (err) {
          console.log(err);
          if (err !== undefined) dispatch(notifierActions.somethingWentWrong());
        }
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
        field: "role",
        headerName: "Promote",
        width: 150,
        description: "Promote User to Admin",
        renderCell(params) {
          return renderPromoteButton(params.row);
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
