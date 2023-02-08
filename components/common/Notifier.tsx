import { Snackbar, Alert } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../store";
import { notifierActions } from "../../store/notifier.slice";

export const Notifier = () => {
  const dispatch = useDispatch();

  const errMessage = useSelector(
    (state: StoreState) => state.notifier.errorMessage
  );
  const successMessage = useSelector(
    (state: StoreState) => state.notifier.successMessage
  );
  const infoMessage = useSelector(
    (state: StoreState) => state.notifier.infoMessage
  );

  const openError = useSelector(
    (state: StoreState) => state.notifier.OpenError
  );
  const openSuccess = useSelector(
    (state: StoreState) => state.notifier.OpenSuccess
  );
  const openInfo = useSelector((state: StoreState) => state.notifier.OpenInfo);

  const handleCloseError = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(notifierActions.closeError());
  };
  const handleCloseSuccess = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(notifierActions.closeSuccess());
  };
  const handleCloseInfo = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(notifierActions.closeInfo());
  };

  return (
    <>
      <Snackbar
        open={openError}
        autoHideDuration={6000}
        onClose={handleCloseError}
      >
        <Alert
          onClose={handleCloseError}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errMessage}
        </Alert>
      </Snackbar>

      {/* Success message */}

      <Snackbar
        open={openSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSuccess}
      >
        <Alert
          onClose={handleCloseSuccess}
          severity="success"
          sx={{ width: "100%" }}
        >
          {successMessage}
        </Alert>
      </Snackbar>
      {/* Info message */}

      <Snackbar
        open={openInfo}
        autoHideDuration={6000}
        onClose={handleCloseInfo}
      >
        <Alert onClose={handleCloseInfo} severity="info" sx={{ width: "100%" }}>
          {infoMessage}
        </Alert>
      </Snackbar>
    </>
  );
};
