import { DoDisturbAltOutlined } from "@mui/icons-material";
import {
  IconButton,
  Avatar,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { EMPLOYEES } from "../../constants";

export const EmployeeTable = () => {
  const router = useRouter();

  // Pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  type Header = { title: string; id: string };
  const HEADERS: Header[] = [
    { title: "Image", id: "image" },
    { title: "Name", id: "name" },
    { title: "Place", id: "place" },
    { title: "Joined", id: "joined" },
    { title: "Projects", id: "projects" },
    { title: "Action", id: "action" },
  ];

  const handleDeny = (reqId: string) => {
    // Deny the request
  };

  interface Data {
    image: JSX.Element;
    name: string;
    place: string;
    projects: number;
    joined: string;
    action: JSX.Element;
  }

  const rows: Data[] = EMPLOYEES.map((emp) => {
    return {
      image: (
        <IconButton
          onClick={() => {
            router.push(`/profile/${emp.user?._id}`);
          }}
        >
          <Avatar src={emp.user?.image}>{emp.user?.name}</Avatar>
        </IconButton>
      ),
      name: String(emp.user?.name),
      place: emp.user.place,
      joined: emp.joined.toLocaleDateString(),
      projects: emp.pojects.length,
      action: (
        <IconButton
          onClick={() => {
            handleDeny(emp._id);
          }}
        >
          <DoDisturbAltOutlined color="error" />
        </IconButton>
      ),
    };
  });

  return (
    <Paper
      sx={{ width: "100%", overflow: "hidden", marginY: 5, borderRadius: 3 }}
    >
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {HEADERS.map((h) => (
                <TableCell sx={{ backgroundColor: "black" }} key={h.id}>
                  {h.title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                    {HEADERS.map((column: Header) => {
                      return (
                        <TableCell key={column.id} align="left">
                          {row[column.id]}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
