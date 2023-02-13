import React from "react";
import { DataTable } from "../../ui";
import { Service } from "../../types";
import { Avatar, Box, IconButton, Tooltip } from "@mui/material";
import { DeleteOutline, NotInterestedOutlined } from "@mui/icons-material";
import { GridColDef } from "@mui/x-data-grid";
import { deleteService } from "../../APIs";
import { useConfirm } from "material-ui-confirm";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../store";
import { notifierActions } from "../../store/notifier.slice";

interface Props {
  services: Service[];
  setServices: React.Dispatch<React.SetStateAction<Service[]>>;
  vendorCount: {
    _id: string;
    count: number;
  }[];
}

export const ServiceTable = (props: Props) => {
  const { services, setServices, vendorCount } = props;

  const confirmer = useConfirm();
  const dispatch = useDispatch();
  const token = useSelector((state: StoreState) => state.jwt.token);

  function serviceDataFormatter(services: Service[]) {
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

    function renderDeleteButton(row: Service) {
      // Handle Delete
      const handleDelete = async () => {
        try {
          const serviceId = row._id;
          await confirmer({
            description: `Do you want to delete this service (${row.title}) ?`,
          });
          const isSuccess = await deleteService(serviceId, token);
          if (!isSuccess) return dispatch(notifierActions.somethingWentWrong());
          setServices((prev) => prev.filter((serv) => serv._id !== serviceId));
          dispatch(notifierActions.info("Successfully deleted the service !"));
        } catch (err) {
          console.log(err);
          if (err !== undefined) dispatch(notifierActions.somethingWentWrong());
        }
      };

      return (
        <Tooltip title="Disable a Service">
          <IconButton color="error" onClick={handleDelete}>
            <DeleteOutline />
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
      { field: "caption", headerName: "Caption", width: 150 },
      {
        field: "_id",
        headerName: "Vendors",
        width: 150,
        description: "Total available vendors",
        valueGetter(params) {
          const vendors = vendorCount.find((s) => s._id === params.row._id);
          return vendors?.count || 0;
        },
        align: "center",
        headerAlign: "center",
      },
      {
        field: "id",
        headerName: "Delete",
        width: 150,
        description: "Delete a service",
        renderCell(params) {
          return renderDeleteButton(params.row);
        },
        align: "center",
        headerAlign: "center",
      },
    ];
    return [services, columns];
  }

  const [rows, columns] = serviceDataFormatter(services);

  return <DataTable rows={rows} columns={columns as GridColDef[]} />;
};
