import { DeleteOutlineOutlined, EditOutlined } from "@mui/icons-material";
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
import { Scrollbars } from "rc-scrollbars";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Appointment } from "../../types";
import { getAppointments, deleteAppointments } from "../../APIs";
import dayjs from "dayjs";
import { firstLetterCapitalizer } from "../../utils";
import { notifierActions } from "../../store";
import { useConfirm } from "material-ui-confirm";
import { EditAppoModal } from "./EditAppoModal";
import { useStore } from "../../customHooks";

export const AppointmentsTableUser: React.FC = () => {
  const router = useRouter();
  const { token } = useStore();
  const confirmer = useConfirm();

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
  const [selectedAppo, setSelectedAppo] = useState<Appointment>();
  const [openModal, setOpenModal] = useState(false);

  const getAndSetAppointments = async () => {
    try {
      const appos = await getAppointments(token, "user");
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

  // Delete
  const dispatch = useDispatch();

  const handleDelete = async (appoId: string, token: string) => {
    try {
      await confirmer({
        description: `Are you sure you want to delete this appointment ?`,
      });
      const isSuccess = await deleteAppointments(appoId, token);
      if (isSuccess) {
        dispatch(notifierActions.success("Successfully removed !"));
        setAppointments((prev) => prev.filter((app) => app._id !== appoId));
      }
    } catch (err) {
      console.error(err);
      if (err !== undefined) dispatch(notifierActions.somethingWentWrong());
    }
  };

  // Edit
  const handleEdit = (appo: Appointment) => {
    setSelectedAppo(appo);
    setOpenModal(true);
  };

  // Formating data for the table
  type Header = { title: string; id: string };
  const HEADERS: Header[] = [
    { title: "Image", id: "image" },
    { title: "Vendor", id: "name" },
    { title: "Place", id: "place" },
    { title: "Description", id: "description" },
    { title: "Date and Time", id: "date" },
    { title: "Status", id: "status" },
    { title: "Edit", id: "edit" },
    { title: "Action", id: "action" },
  ];
  interface Data {
    image: JSX.Element;
    name: string;
    place: string;
    description: string;
    date: string | Date;
    status: string;
    edit: JSX.Element;
    action: JSX.Element;
  }
  const rows: Data[] = !appointments
    ? []
    : appointments.map((appo) => {
        return {
          image: (
            <IconButton
              onClick={() => {
                router.push(`/profile/${appo.vendor?._id}`);
              }}
            >
              <Avatar src={appo.vendor?.image}>{appo.vendor?.name}</Avatar>
            </IconButton>
          ),

          name: String(appo.vendor?.name),
          place: String(appo.vendor?.place),
          description: String(`${appo?.description?.slice(0, 35)}...`),
          date: dayjs(appo.date).format("LLL"),
          status: firstLetterCapitalizer(appo.status),
          edit: (
            <IconButton
              onClick={() => {
                handleEdit(appo);
              }}
            >
              <EditOutlined color="info" />
            </IconButton>
          ),
          action: (
            <IconButton
              onClick={() => {
                handleDelete(appo._id, token);
              }}
            >
              <DeleteOutlineOutlined color="error" />
            </IconButton>
          ),
        };
      });

  return (
    <Paper
      sx={{ width: "100%", overflow: "hidden", marginY: 2, borderRadius: 3 }}
    >
      <TableContainer sx={{ maxHeight: 520 }}>
        <Scrollbars style={{ height: 520 }}>
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
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((row: any, ind) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row?.date || ind}
                    >
                      {HEADERS?.map((column: Header) => {
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
        </Scrollbars>
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
      <EditAppoModal
        appointment={selectedAppo as Appointment}
        setAppointments={setAppointments}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </Paper>
  );
};
