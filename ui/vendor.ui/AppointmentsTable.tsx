import {
  CheckCircleOutlineOutlined,
  DoDisturbAltOutlined,
} from "@mui/icons-material";
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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../store";
import { Appointment } from "../../types";
import { getAppointments, appoiStatusUpdator } from "../../APIs";
import dayjs from "dayjs";
import { firstLetterCapitalizer } from "../../utils";
import { notifierActions } from "../../store/notifier.slice";

export const AppointmentsTable: React.FC = () => {
  const router = useRouter();

  const currentUser = useSelector((state: StoreState) => state.user.data);
  const token = useSelector((state: StoreState) => state.jwt.token);

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
  /////

  // Setting appointments on mount
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const getAndSetAppointments = async () => {
    try {
      const appos = await getAppointments(token, "vendor"); ///////////////////
      setAppointments(appos);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getAndSetAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  ////

  // Status update
  const dispatch = useDispatch();
  const handleApprove = async (reqId: string, status: string) => {
    try {
      const isSuccess = await appoiStatusUpdator(token, reqId, status);
      if (isSuccess?.status) {
        const curAppoiIndex = appointments.findIndex(
          (appo) => appo._id.toString() === reqId.toString()
        );
        if (curAppoiIndex > -1) {
          const updatedAppointments = [...appointments];
          updatedAppointments[curAppoiIndex].status = isSuccess.status;
          setAppointments(updatedAppointments);
          dispatch(notifierActions.success("Successfully updated !"));
        }
      }
    } catch (err) {
      dispatch(notifierActions.error("Something went wrong"));
      console.error(err);
    }
  };

  // Formating data for the table
  type Header = { title: string; id: string };
  const HEADERS: Header[] = [
    { title: "Image", id: "image" },
    { title: "Name", id: "name" },
    { title: "Place", id: "place" },
    { title: "Description", id: "description" },
    { title: "Date and Time", id: "date" },
    { title: "Status", id: "status" },
    { title: "Created at", id: "createdAt" },
    { title: "Action", id: "action" },
  ];
  interface Data {
    image: JSX.Element;
    name: string;
    place: string;
    date: string | Date;
    status: string;
    action: JSX.Element;
  }
  const rows: Data[] = appointments.map((appo) => {
    return {
      image: (
        <IconButton
          onClick={() => {
            router.push(`/profile/${appo.user?._id}`);
          }}
        >
          <Avatar src={appo.user?.image}>{appo.user?.name}</Avatar>
        </IconButton>
      ),

      name: String(appo.user?.name),
      place: String(appo.user?.place),
      description: String(appo?.description),
      date: dayjs(appo.date).format("LLL"),
      status: firstLetterCapitalizer(appo.status),
      createdAt: dayjs(appo?.createdAt).format("LLL"),
      action:
        appo.status === "requested" || appo.status === "denied" ? (
          <IconButton
            onClick={() => {
              handleApprove(appo._id, "approved");
            }}
          >
            <CheckCircleOutlineOutlined color="success" />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => {
              handleApprove(appo._id, "denied");
            }}
          >
            <DoDisturbAltOutlined color="error" />
          </IconButton>
        ),
    };
  });
  ////

  return (
    <Paper
      sx={{ width: "100%", overflow: "hidden", marginY: 5, borderRadius: 3 }}
    >
      <TableContainer sx={{ maxHeight: "150vh" }}>
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
              .map((row: any, ind) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row?.date || ind}
                  >
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
