import React, { useEffect, useState } from "react";
import { DataTable } from "../../ui";
import { COLUMNS, ROWS } from "../../constants";
import { Service } from "../../types";
import { useSelector } from "react-redux";
import { StoreState } from "../../store";
import {
  getAllServices,
  getUsersByRole,
  getVendorCountByService,
} from "../../APIs";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import { DeleteOutlineOutlined } from "@mui/icons-material";
import { GridColDef } from "@mui/x-data-grid";

const countInitial = [
  {
    _id: "serviceId",
    count: 0,
  },
];

export const ServiceTable = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [vendorCount, setVendorCount] = useState(countInitial);
  console.log(
    "🚀 ~ file: ServiceTable.tsx:26 ~ ServiceTable ~ vendorCount",
    vendorCount
  );

  const token = useSelector((state: StoreState) => state.jwt.token);

  const getAndSetServices = async () => {
    try {
      const serviceData = await getAllServices();
      if (serviceData) setServices(serviceData?.services);
    } catch (err) {
      console.log(err);
    }
  };

  const getAndSetVendorCount = async () => {
    try {
      const count = await getVendorCountByService(token);
      if (count) setVendorCount(count);
    } catch (err) {
      console.log(err);
    }
  };

  function userDataFormatter(services: Service[]) {
    function renderAvatar(row: Service) {
      const handleProfileClick = () => {
        // Handle ptofile click event
      };

      return (
        <>
          <IconButton onClick={handleProfileClick}>
            <Avatar src={row?.image}>{row.title}</Avatar>
          </IconButton>
        </>
      );
    }

    // function renderBanButton(row: Service) {
    //   const handleBan = () => {
    //     // Handle ban
    //     console.log("Ban " + row._id);
    //   };

    //   return (
    //     <Tooltip title="Ban on Unban a user">
    //       <IconButton onClick={handleBan}>
    //         {row?.isBanned ? (
    //           <CheckCircleOutlineOutlined />
    //         ) : (
    //           <NotInterestedOutlined />
    //         )}
    //       </IconButton>
    //     </Tooltip>
    //   );
    // }

    function renderDeleteButton(row: Service) {
      const handleDelete = () => {
        // Handle Delete
        console.log("Delete " + row._id);
      };

      return (
        <Tooltip title="Remove a Service">
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
      { field: "title", headerName: "Title", width: 150 },
      {
        field: "_id",
        headerName: "Vendors",
        width: 150,
        description: "Total available vendors",
        valueGetter(params) {
          const vendors = vendorCount.find((s) => s._id === params.row._id);
          return vendors?.count;
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

    return [services, columns];
  }

  const [rows, columns] = userDataFormatter(services);

  useEffect(() => {
    getAndSetServices();
    getAndSetVendorCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <DataTable rows={rows} columns={columns as GridColDef[]} />;
};
