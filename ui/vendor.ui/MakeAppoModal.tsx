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
import { TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs, { Dayjs } from "dayjs";
import { COLOR } from "../../constants";
import { makeAppointment } from "../../APIs";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../store/store";
import { useState } from "react";
import { useNotification } from "../../customHooks";
import { notifierActions } from "../../store/notifier.slice";
import { lengthChecker } from "../../utils";

interface Props {
  openModal: boolean;
  user: User;
  setOpenModal: (p: boolean) => void;
}

export const MakeAppoModal: React.FC<Props> = (props) => {
  const { openModal, user, setOpenModal } = props;
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
    dayjs().toISOString()
  );
  const [description, setDescription] = useState("");

  const handleChange = (newValue: Dayjs | null) => {
    setDateTime(dayjs(newValue).toISOString() || null);
  };

  interface DataV {
    vendor: string;
    date: string;
    description: string;
    status: string;
  }

  const verifyData = (): DataV | boolean => {
    const userId = user?._id;
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
      vendor: userId as string,
      date: dateTime,
      description,
      status: "requested",
    };
  };

  const handleMakeAppointment = async () => {
    try {
      const dataV = verifyData();
      if (!dataV) {
        return;
      }
      const isSuccess = await makeAppointment(dataV, token);
      if (isSuccess) {
        dispatch(
          notifierActions.success(
            `You have successfully made a new appointment with ${user?.name}.`
          )
        );
        setNotification({
          content: `You have a new appointment request from ${currentUser.name} !`,
          type: "success",
          receiver: (dataV as DataV).vendor,
          href: "/dashboard/vendor",
        });
        setDescription("");
        setDateTime(dayjs().toISOString());
        setOpenModal(false);
      }
    } catch (err) {
      console.error(err);
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
        <Button onClick={handleMakeAppointment} variant="outlined" autoFocus>
          Make Appointment
        </Button>
      </DialogActions>
    </Dialog>
  );
};
