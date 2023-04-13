import { Box, MenuItem } from "@mui/material";
import React, { MouseEvent, useEffect, useState } from "react";
import { COLOR } from "../../constants";
import { LinkButton } from "../common.ui";
import { TabHeader } from "./TabHeader";
import { StyledTextField } from "./StyledTextField";
import { IsValidString, nest } from "../../utils";
import { useDispatch } from "react-redux";
import { userDataActions } from "../../store/user-data.slice";
import { SaveAltOutlined, CreateOutlined } from "@mui/icons-material";
import { Service, User } from "../../types";
import { useStore } from "../../customHooks";
import { notifierActions } from "../../store/notifier.slice";
import { getAllServices, updateProfessionalDetails } from "../../APIs";

const LoadingServiceDummy = {
  title: "Loading..",
  _id: "",
  caption: "",
  image: "",
};
interface ReturnData {
  service: string;
  workingDays: string;
  workRadius: string;
  experience: string;
  about: string;
}

interface Props {
  user: User;
  isProfileOwner: boolean;
}

export const ProfessionalDetails: React.FC<Props> = (props) => {
  const { user, isProfileOwner } = props;
  const dispatch = useDispatch();
  const { token } = useStore();

  const [serviceVerified, setServiceVerified] = useState(true);
  const [workingDaysVerified, setWorkingDaysVerified] = useState(true);
  const [workRadiusVerified, setWorkRadiusVerified] = useState(true);
  const [experienceVerified, setExperienceVerified] = useState(true);
  const [descriptionVerified, setDescriptionVerified] = useState(true);

  const [service, setService] = useState<Service>(LoadingServiceDummy);
  const [workingDays, setWorkingDays] = useState(
    (user?.vendor?.workingDays && String(user?.vendor?.workingDays)) || ""
  );
  const [workRadius, setWorkRadius] = useState(
    (user?.vendor?.workRadius && String(user?.vendor?.workRadius)) || ""
  );
  const [experience, setExperience] = useState(
    (user?.vendor?.experience && String(user?.vendor?.experience)) || ""
  );
  const [description, setDescription] = useState(
    (user?.vendor?.about && String(user?.vendor?.about)) || ""
  );

  const [allServices, setAllServices] = useState<any[]>([]);

  const [isEditable, setIsEditable] = useState(false);

  // Data Verification

  const verifyData = () => {
    setServiceVerified(!!service && IsValidString(service._id));
    setWorkingDaysVerified(!!workingDays && IsValidString(workingDays));
    setWorkRadiusVerified(!!workRadius && IsValidString(workRadius));
    setExperienceVerified(!!experience && IsValidString(experience));
    setDescriptionVerified(!!description && IsValidString(description));
    setDescriptionVerified(description.length <= 400);
    if (
      !serviceVerified ||
      !workingDaysVerified ||
      !workRadiusVerified ||
      !experienceVerified ||
      !descriptionVerified
    )
      return false;

    const data: ReturnData = {
      service: service?._id as string,
      workingDays,
      workRadius,
      experience,
      about: description,
    };
    return data;
  };

  // Save Button Click

  const handleSaveClick = async (event: MouseEvent) => {
    try {
      event.preventDefault();
      if (!isEditable) {
        setIsEditable(true);
        return;
      }
      const dataV = verifyData();
      if (!dataV) return;
      const data = await updateProfessionalDetails(dataV, token);
      if (!data) {
        dispatch(
          notifierActions.error(
            "Something went wrong while updating the professional informations !"
          )
        );
        return;
      }
      dispatch(userDataActions.addUserData(data?.user));
      dispatch(
        notifierActions.success(
          "Successfully updated the professional informations !"
        )
      );
      setIsEditable(false);
    } catch (err: any) {
      console.error(err?.message);
      if (
        err?.message.match(/service/) ||
        err?.message.match(/workingDays/) ||
        err?.message.match(/workRadius/) ||
        err?.message.match(/experience/) ||
        err?.message.match(/about/)
      ) {
        dispatch(notifierActions.error(err?.message));
        return;
      }
      dispatch(notifierActions.somethingWentWrong());
    }
  };

  // Helper function
  const getServiceById = (id: string, services: any[]) => {
    const userService = services?.filter(
      (service: Service) => service._id.toString() === id.toString()
    )[0];
    return userService;
  };

  // For fetching services from backend and setting it
  // at the mounting time with the help of useEffect
  const servicesFetcher = async () => {
    try {
      const data = await getAllServices();
      setAllServices(data?.services);
      const userService = getServiceById(
        user?.vendor?.service?._id as string,
        data?.services
      );
      setService(userService);
    } catch (err: any) {
      console.error(err?.message);
    }
  };
  useEffect(() => {
    servicesFetcher();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <TabHeader invertColor header="Professional Details" />

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
          value={service?._id}
          onChange={(e) => {
            setServiceVerified(true);
            setService(getServiceById(e.target.value, allServices));
          }}
        >
          {!allServices.length && (
            <MenuItem value={""}>{"Loading..."}</MenuItem>
          )}
          {allServices.length > 0 &&
            allServices.map((serv: any) => (
              <MenuItem
                selected={
                  serv?._id?.toString() ===
                  user.vendor?.service?._id?.toString()
                }
                key={serv?._id}
                value={serv?._id}
              >
                {serv?.title}
              </MenuItem>
            ))}
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
              ? "Please describe your profession, in 2-400 letters !, current length: " +
                description.length
              : ""
          }
          value={description}
          onChange={(e) => {
            setDescriptionVerified(true);
            setDescription(e.target.value);
          }}
        />

        {/* Save/Edit button */}

        {isProfileOwner && (
          <LinkButton
            variant="outlined"
            sx={{ alignSelf: "end", paddingX: 3, marginY: 2, marginRight: 1 }}
            onClick={handleSaveClick}
            startIcon={isEditable ? <SaveAltOutlined /> : <CreateOutlined />}
          >
            {isEditable ? "Save" : "Edit"}
          </LinkButton>
        )}
      </Box>
    </>
  );
};
