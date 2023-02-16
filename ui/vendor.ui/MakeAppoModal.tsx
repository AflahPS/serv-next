import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { User, Vendor } from "../../types";
import { Alert, Snackbar, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs, { Dayjs } from "dayjs";
import { COLOR } from "../../constants";
import { makeAppointment } from "../../APIs";
import { useSelector } from "react-redux";
import { StoreState } from "../../store";
import { useState } from "react";
import { useNotification } from "../../customHooks";

interface Props {
  openModal: boolean;
  vendor: Vendor;
  setOpenModal: (p: boolean) => void;
  successSetter: (p: string) => void;
  errorSetter: (p: string) => void;
}

export const MakeAppoModal: React.FC<Props> = (props) => {
  const { openModal, vendor, setOpenModal, successSetter, errorSetter } = props;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const handleClose = () => {
    setOpenModal(false);
  };

  const setNotification = useNotification();

  const token = useSelector((state: StoreState) => state.jwt.token);
  const currentUser = useSelector((state: StoreState) => state.user.data);

  const [dateTime, setDateTime] = React.useState<string | null>(
    dayjs().toISOString()
  );
  const handleChange = (newValue: Dayjs | null) => {
    console.log(newValue?.toISOString());
    setDateTime(newValue?.toISOString() || null);
  };

  const handleMakeAppointment = async () => {
    try {
      const date = dateTime;
      const vendorId = vendor.user?._id;
      const dataV = {
        vendor: vendorId,
        date,
        status: "requested",
      };

      const isSuccess = await makeAppointment(dataV, token);
      if (isSuccess) {
        successSetter(
          `You have successfully made a new appointment with ${vendor.user?.name}.`
        );
        setNotification({
          content: `You have a new appointment request from ${currentUser.name} !`,
          type: "success",
          receiver: vendorId,
          href: "/dashboard/vendor",
        });
        setOpenModal(false);
      }
    } catch (err) {
      console.log(err);
      errorSetter("Something went wrong !");
      setOpenModal(false);
    }
  };

  return (
    <Dialog
      color={COLOR["H1d-font-primary"]}
      fullScreen={fullScreen}
      open={openModal}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      PaperProps={{
        sx: {
          paddingX: "12px",
          background:
            "linear-gradient(180deg, rgba(10,113,115,1) 0%, rgba(0,0,1,1) 25%)",
        },
      }}
    >
      <DialogTitle id="responsive-dialog-title">
        {"Pick a date and time"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Pick a date and time that is suitable for you. You will get notified
          when the service provider approves or deny your appointment.
        </DialogContentText>
      </DialogContent>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          PaperProps={{
            sx: {
              paddingX: "12px",
              background:
                "linear-gradient(180deg, rgba(10,113,115,1) 0%, rgba(0,0,1,1) 25%)",
            },
          }}
          label="Date&Time picker"
          value={dateTime}
          onChange={handleChange}
          renderInput={(params) => (
            <TextField
              sx={{ backgroundColor: "rgba(0,0,1,1)" }}
              variant="outlined"
              {...params}
            />
          )}
        />
      </LocalizationProvider>

      <DialogActions>
        <Button onClick={handleClose} variant="outlined" autoFocus>
          Cancel
        </Button>
        <Button onClick={handleMakeAppointment} variant="outlined" autoFocus>
          Make Appointment
        </Button>
      </DialogActions>
    </Dialog>
  );
};
