import React, { useEffect, useState } from "react";
import { Avatar, Box, Button, IconButton } from "@mui/material";
import { BookmarkBorderOutlined } from "@mui/icons-material";
import { GridColDef } from "@mui/x-data-grid";
import { useStore } from "../../customHooks";
import { DataTable, MakeAppoModal } from "../../ui";
import { Service, User } from "../../types";
import { getAllServices, getVendorFollowers } from "../../APIs";
import { useDispatch } from "react-redux";
import { notifierActions } from "../../store";
import Scrollbars from "rc-scrollbars";

export const VendorTableUser = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState<User[]>([]);
  const [services, setServices] = useState<Service[]>([]);

  const [openModal, setOpenModal] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<User>();

  const { token } = useStore();

  const getAndSetUsersAndServices = async () => {
    try {
      const users = await getVendorFollowers(token);
      const serviceData = await getAllServices();
      if (users) setUsers(users);
      if (serviceData) setServices(serviceData?.services);
    } catch (err) {
      dispatch(notifierActions.somethingWentWrong());
      console.error(err);
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

    function makeAppointment(row: User) {
      // Handle ban
      const handleBook = async () => {
        setSelectedVendor(row);
        setOpenModal(true);
      };

      return (
        <Button
          // size="small"
          variant="outlined"
          color="success"
          startIcon={<BookmarkBorderOutlined />}
          fullWidth
          onClick={handleBook}
        >
          Hire
        </Button>
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
        headerName: "Hire",
        headerAlign: "center",
        width: 150,
        description: "Make a new appointment",
        renderCell(params) {
          return makeAppointment(params.row);
        },
      },
    ];
    return [users, columns];
  }

  const [rows, columns] = userDataFormatter(users);

  return (
    <Box marginTop={3}>
      <DataTable rows={rows} columns={columns as GridColDef[]} />
      <MakeAppoModal
        user={selectedVendor as User}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </Box>
  );
};
