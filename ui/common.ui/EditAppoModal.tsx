import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Appointment, Vendor } from "../../types";
import { TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs, { Dayjs } from "dayjs";
import { COLOR } from "../../constants";
import { editAppointment, makeAppointment } from "../../APIs";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../store";
import { useEffect, useState } from "react";
import { useNotification } from "../../customHooks";
import { notifierActions } from "../../store/notifier.slice";
import { lengthChecker } from "../../utils";

interface Props {
  openModal: boolean;
  setOpenModal: (p: boolean) => void;
  appointment: Appointment;
  setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>;
}

export const EditAppoModal: React.FC<Props> = (props) => {
  const { openModal, appointment, setOpenModal, setAppointments } = props;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const handleClose = () => {
    setOpenModal(false);
  };

  const setNotification = useNotification();
  const dispatch = useDispatch();

  const token = useSelector((state: StoreState) => state.jwt.token);
  const currentUser = useSelector((state: StoreState) => state.user.data);

  const [dateTime, setDateTime] = React.useState<string | null>(
    dayjs(appointment?.date).toISOString()
  );
  const [description, setDescription] = useState(appointment?.description);

  const handleChange = (newValue: Dayjs | null) => {
    setDateTime(dayjs(newValue).toISOString() || null);
  };

  interface DataV {
    date: string;
    description: string;
  }

  useEffect(() => {
    setDateTime(dayjs(appointment?.date).toISOString());
    setDescription(appointment?.description);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const verifyData = (): DataV | boolean => {
    if (!dateTime || +dayjs(dateTime).valueOf() < +dayjs().valueOf()) {
      dispatch(notifierActions.error(`Please provide a valid date !`));
      return false;
    }
    if (!lengthChecker(description, 2, 250)) {
      dispatch(
        notifierActions.error(
          `Please provide a valid description (length 2-250) !`
        )
      );
      return false;
    }
    return {
      date: dateTime,
      description,
    };
  };

  const handleEditAppointment = async () => {
    try {
      const dataV = verifyData();
      if (!dataV) {
        return;
      }
      const newAppointment = await editAppointment(
        token,
        appointment?._id,
        dataV
      );
      if (newAppointment) {
        dispatch(
          notifierActions.success(
            `You have successfully edited the appointment.`
          )
        );
        setAppointments((prev) => {
          const idx = prev.findIndex((el) => el._id === appointment?._id);
          const newArr = [...prev];
          newArr[idx] = newAppointment;
          return newArr;
        });
        setNotification({
          content: `Appointment with ${currentUser.name} has been updated !`,
          type: "success",
          receiver: appointment?.vendor,
          href: "/dashboard/vendor",
        });
        setOpenModal(false);
      }
    } catch (err) {
      console.log(err);
      dispatch(notifierActions.somethingWentWrong());
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
        <TextField
          label="Description"
          placeholder="Write a description about the service you requesting..."
          sx={{ backgroundColor: "rgba(0,0,1,1)", marginY: 3 }}
          variant="outlined"
          value={description}
          onChange={(e) => {
            setDescription(e.currentTarget.value);
          }}
        />
      </LocalizationProvider>

      <DialogActions>
        <Button onClick={handleClose} variant="outlined" autoFocus>
          Cancel
        </Button>
        <Button onClick={handleEditAppointment} variant="outlined" autoFocus>
          Update Appointment
        </Button>
      </DialogActions>
    </Dialog>
  );
};
