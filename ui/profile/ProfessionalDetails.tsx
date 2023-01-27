import { Alert, Autocomplete, Box, MenuItem, Snackbar } from "@mui/material";
import React, { MouseEvent, useState } from "react";
import { COLOR, USERS } from "../../constants";
import { LinkButton } from "../common";
import { TabHeader } from "./TabHeader";
import { StyledTextField } from "./StyledTextField";
import { IsValidString, nest } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../store";
import { userDataActions } from "../../store/user-data.slice";
import { SaveAltOutlined, CreateOutlined } from "@mui/icons-material";

interface ReturnData {
  service: string;
  workingDays: string;
  workRadius: string;
  experience: string;
  about: string;
}

export const ProfessionalDetails = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: StoreState) => state.jwt.token);
  const user = useSelector((state: StoreState) => state.user.data);

  const [serviceVerified, setServiceVerified] = useState(true);
  const [workingDaysVerified, setWorkingDaysVerified] = useState(true);
  const [workRadiusVerified, setWorkRadiusVerified] = useState(true);
  const [experienceVerified, setExperienceVerified] = useState(true);
  const [descriptionVerified, setDescriptionVerified] = useState(true);

  const [service, setService] = useState(
    (user?.service && String(user?.service)) || ""
  );
  const [workingDays, setWorkingDays] = useState(
    (user?.workingDays && String(user?.workingDays)) || ""
  );
  const [workRadius, setWorkRadius] = useState(
    (user?.workRadius && String(user?.workRadius)) || ""
  );
  const [experience, setExperience] = useState(
    (user?.experience && String(user?.experience)) || ""
  );
  const [description, setDescription] = useState(
    (user?.about && String(user?.about)) || ""
  );

  const [isEditable, setIsEditable] = useState(false);

  //----- ERROR, Success message Snackbar related properties
  const [errMessage, setErrMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [openError, setOpenError] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);

  const handleCloseError = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
  };

  const handleCloseSuccess = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccess(false);
  };

  const errorSetter = (message: string) => {
    setErrMessage(message);
    setOpenError(true);
  };

  // Data Verification

  const verifyData = () => {
    setServiceVerified(!!service && IsValidString(service));
    setWorkingDaysVerified(!!workingDays && IsValidString(workingDays));
    setWorkRadiusVerified(!!workRadius && IsValidString(workRadius));
    setExperienceVerified(!!experience && IsValidString(experience));
    setDescriptionVerified(!!description && IsValidString(description));

    if (
      !serviceVerified ||
      !workingDaysVerified ||
      !workRadiusVerified ||
      !experienceVerified ||
      !descriptionVerified
    )
      return false;

    const data: ReturnData = {
      service,
      workingDays,
      workRadius,
      experience,
      about: description,
    };
    return data;
  };

  const handleSaveClick = async (event: MouseEvent) => {
    try {
      event.preventDefault();
      if (!isEditable) {
        setIsEditable(true);
        return;
      }
      const dataV = verifyData();
      console.log(
        "🚀 ~ file: ProfessionalDetails.tsx:114 ~ handleSaveClick ~ dataV",
        dataV
      );
      if (!dataV) return;
      console.log(dataV);
      const { data } = await nest({
        url: "/vendor/professional",
        method: "PATCH",
        data: dataV,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (!data || data?.status !== "success") {
        errorSetter(
          "Something went wrong while updating the professional informations !"
        );
        return;
      }
      dispatch(userDataActions.addUserData(data?.user));
      setSuccessMessage("Successfully updated the professional informations !");
      setOpenSuccess(true);
      setIsEditable(false);
    } catch (err: any) {
      console.log(err?.message);
      if (
        err?.message.match(/service/) ||
        err?.message.match(/workingDays/) ||
        err?.message.match(/workRadius/) ||
        err?.message.match(/experience/) ||
        err?.message.match(/about/)
      ) {
        errorSetter(err?.message);
        return;
      }
      errorSetter("Sorry, something went wrong !");
    }
  };

  return (
    <>
      <TabHeader header="Professional Details" />

      <Box
        borderRadius={3}
        bgcolor={COLOR["H1d-ui-bg"]}
        display={"flex"}
        flexDirection={"column"}
        paddingX={6}
        paddingY={2}
      >
        {/* -----------Service --------------- */}
        <StyledTextField
          select
          size="small"
          label="Service / Profession *"
          disabled={!isEditable}
          error={!serviceVerified}
          helperText={!serviceVerified ? "Please select a service" : ""}
          value={service}
          onChange={(e) => {
            setServiceVerified(true);
            setService(e.target.value);
          }}
        >
          <MenuItem value={"63c262e58bcefb58e544c250"}>Painter</MenuItem>
          <MenuItem value={"63c262e58bcefb58e544c251"}>Driver</MenuItem>
          <MenuItem value={"63c262e58bcefb58e544c252"}>Masonry</MenuItem>
        </StyledTextField>

        {/* ----------- Working Days --------------- */}

        <StyledTextField
          select
          size="small"
          label="Working Days *"
          error={!workingDaysVerified}
          disabled={!isEditable}
          helperText={!workingDaysVerified ? "Please select a woking days" : ""}
          value={workingDays}
          onChange={(e) => {
            setWorkingDaysVerified(true);
            setWorkingDays(e.target.value);
          }}
        >
          <MenuItem value={"0-1-2-3-4-5-6"}>Everyday</MenuItem>
          <MenuItem value={"0-1-2-3-4-5"}>Monday-Saturday</MenuItem>
          <MenuItem value={"0-1-2-3-4"}>Monday-Friday</MenuItem>
          <MenuItem value={"5-6"}>Saturday-Sunday</MenuItem>
          <MenuItem value={"6"}>Sunday</MenuItem>
        </StyledTextField>

        {/* ----------- Work Radius --------------- */}

        <StyledTextField
          type={"number"}
          size="small"
          label="Maximum Work-Distance in KM *"
          disabled={!isEditable}
          error={!workRadiusVerified}
          helperText={
            !workRadiusVerified
              ? "Please provide maximum distance you can go for a work/project."
              : ""
          }
          value={workRadius}
          onChange={(e) => {
            setWorkRadiusVerified(true);
            setWorkRadius(e.target.value);
          }}
        />

        {/* ----------- Add Employee --------------- */}

        {/* <Autocomplete
          multiple
          onChange={(event: any, value: any) => {
            setEmployees(value);
          }}
          value={employees}
          fullWidth
          disabled={!isEditable}
          limitTags={2}
          id="multiple-limit-tags"
          options={USERS}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <StyledTextField
              {...params}
              variant="outlined"
              label="Add your employees..."
              fullWidth
              size="small"
              placeholder="Employees"
            />
          )}
        /> */}

        {/* ----------- Experience --------------- */}

        <StyledTextField
          type={"number"}
          size="small"
          label="Experience (in Years) *"
          disabled={!isEditable}
          error={!experienceVerified}
          helperText={
            !experienceVerified
              ? "Please provide a valid number of years !"
              : ""
          }
          value={experience}
          onChange={(e) => {
            setExperienceVerified(true);
            setExperience(e.target.value);
          }}
        />

        {/* ----------- Description --------------- */}

        <StyledTextField
          multiline
          rows={3}
          size="small"
          label="Description *"
          disabled={!isEditable}
          error={!descriptionVerified}
          helperText={
            !descriptionVerified
              ? "Please write something about your profession !"
              : ""
          }
          value={description}
          onChange={(e) => {
            setDescriptionVerified(true);
            setDescription(e.target.value);
          }}
        />

        <LinkButton
          variant="outlined"
          sx={{ alignSelf: "end", paddingX: 3, marginY: 2, marginRight: 1 }}
          onClick={handleSaveClick}
          startIcon={isEditable ? <SaveAltOutlined /> : <CreateOutlined />}
        >
          {isEditable ? "Save" : "Edit"}
        </LinkButton>
      </Box>
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
    </>
  );
};
