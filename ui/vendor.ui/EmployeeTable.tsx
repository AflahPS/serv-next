import {
  DeleteOutlineOutlined,
  DoDisturbAltOutlined,
} from "@mui/icons-material";
import { IconButton, Avatar, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { EMPLOYEES } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { useConfirm } from "material-ui-confirm";
import { Employee, Project, User } from "../../types";
import { StoreState } from "../../store";
import { getEmployeesOfVendor, removeEmployee } from "../../APIs";
import { notifierActions } from "../../store/notifier.slice";
import { GridColDef } from "@mui/x-data-grid";
import { DataTable } from "../admin.ui";
import { Box } from "@mui/system";

interface Props {
  employees: Employee[];
  setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
}

export const EmployeeTable: React.FC<Props> = ({ employees, setEmployees }) => {
  const dispatch = useDispatch();
  const confirmer = useConfirm();
  // const [employees, setEmployees] = useState<Employee[]>([]);

  const token = useSelector((state: StoreState) => state.jwt.token);

  // const getAndSetEmployees = async () => {
  //   try {
  //     const employees = await getEmployeesOfVendor(token);
  //     if (employees) setEmployees(employees);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  function userDataFormatter(employees: Employee[]) {
    function renderAvatar(row: Employee) {
      const handleProfileClick = () => {
        // Handle ptofile click event
        // const EmployeeId = row._id;
      };

      return (
        <>
          <IconButton onClick={handleProfileClick}>
            <Avatar src={row?.emp?.image}>{row?.emp?.name}</Avatar>
          </IconButton>
        </>
      );
    }

    function renderDeleteButton(row: Employee) {
      // Handle Delete
      const handleDelete = async () => {
        try {
          const employeeId = row.emp?._id;
          await confirmer({
            description: `Do you want to remove this employee (${row.emp?.name}) ?`,
          });
          const isSuccess = await removeEmployee(employeeId, token);
          if (!isSuccess) {
            return dispatch(notifierActions.somethingWentWrong());
          }
          setEmployees((prev) =>
            prev.filter((user) => user.emp?._id !== employeeId)
          );
          dispatch(
            notifierActions.info(
              `Successfully removed the employee (${row.emp?.name}) !`
            )
          );
        } catch (err) {
          console.log(err);
          if (err !== undefined) dispatch(notifierActions.somethingWentWrong());
        }
      };

      return (
        <Tooltip title="Remove employee">
          <IconButton color="error" onClick={handleDelete}>
            <DeleteOutlineOutlined />
          </IconButton>
        </Tooltip>
      );
    }

    const columns: GridColDef[] = [
      {
        field: "emp.image",
        headerName: "Avatar",
        width: 100,
        renderCell(params) {
          return renderAvatar(params.row);
        },
      },
      {
        field: "emp.name",
        headerName: "Name",
        width: 150,
        valueGetter(params) {
          return params.row?.emp?.name;
        },
      },
      {
        field: "emp.place",
        headerName: "Place",
        width: 150,
        valueGetter(params) {
          return params.row?.emp?.place;
        },
      },
      {
        field: "emp.email",
        headerName: "Email",
        width: 150,
        valueGetter(params) {
          return params.row?.emp?.email;
        },
      },
      {
        field: "emp.phone",
        headerName: "Phone",
        width: 150,
        valueGetter(params) {
          return params.row?.emp?.phone;
        },
      },
      {
        field: "emp._id",
        headerName: "Remove",
        width: 150,
        description: "Remove an employee",
        renderCell(params) {
          return renderDeleteButton(params.row);
        },
      },
    ];

    return [employees, columns];
  }

  const [rows, columns] = userDataFormatter(employees);

  return (
    <Box marginY={3}>
      <DataTable rows={rows} columns={columns as GridColDef[]} />;
    </Box>
  );
};
