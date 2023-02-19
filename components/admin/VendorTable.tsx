import React, { useEffect, useState } from "react";
import { DataTable } from "../../ui";
import { Service, User } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../store";
import {
  banUser,
  deleteUser,
  getAllServices,
  getUsersByRole,
} from "../../APIs";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import {
  CheckCircleOutlineOutlined,
  DeleteOutlineOutlined,
  NotInterestedOutlined,
} from "@mui/icons-material";
import { GridColDef } from "@mui/x-data-grid";
import { notifierActions } from "../../store/notifier.slice";
import { useConfirm } from "material-ui-confirm";

export const VendorTable = () => {
  const confirmer = useConfirm();
  const dispatch = useDispatch();
  const [users, setUsers] = useState<User[]>([]);
  const [services, setServices] = useState<Service[]>([]);

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
        <Tooltip title="Ban on Unban a vendor">
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
      // Handle Delete
      const handleDelete = async () => {
        try {
          const userId = row._id;
          await confirmer({
            description: `DELETE THIS VENDOR ONLY IF YOU ARE SO SURE ?`,
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
        <Tooltip title="Remove a vendor">
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
