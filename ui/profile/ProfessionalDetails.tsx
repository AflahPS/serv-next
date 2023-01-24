import { Autocomplete, Box, MenuItem } from "@mui/material";
import React, { MouseEvent, useState } from "react";
import { COLOR, USERS } from "../../constants";
import { LinkButton } from "../LinkButton";
import { TabHeader } from "../TabHeader";
import { StyledTextField } from "./StyledTextField";
import { IsValidString } from "../../utils";

interface ReturnData {
  service: string;
  workingDays: string;
  workRadius: string;
  experience: string;
  description: string;
  employees?: any[];
}

export const ProfessionalDetails = () => {
  const [serviceVerified, setServiceVerified] = useState(true);
  const [workingDaysVerified, setWorkingDaysVerified] = useState(true);
  const [workRadiusVerified, setWorkRadiusVerified] = useState(true);
  // const [employeesVerified, setEmployeesVerified] = useState(true);
  const [experienceVerified, setExperienceVerified] = useState(true);
  const [descriptionVerified, setDescriptionVerified] = useState(true);

  const [service, setService] = useState("");
  const [workingDays, setWorkingDays] = useState("");
  const [workRadius, setWorkRadius] = useState("");
  const [employees, setEmployees] = useState([]);
  const [experience, setExperience] = useState("");
  const [description, setDescription] = useState("");

  const verifyData = () => {
    setServiceVerified(IsValidString(service));
    setWorkingDaysVerified(IsValidString(workingDays));
    setWorkRadiusVerified(IsValidString(workRadius));
    setExperienceVerified(IsValidString(experience));
    setDescriptionVerified(IsValidString(description));

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
      description,
    };

    if (employees.length > 0) {
      data.employees = employees;
    }

    return data;
  };

  const handleSaveClick = async (event: MouseEvent) => {
    event.preventDefault();
    const data = verifyData();
    if (!data) return;
    console.log(data);
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
          error={!serviceVerified}
          helperText={!serviceVerified ? "Please select a service" : ""}
          value={service}
          onChange={(e) => {
            setServiceVerified(true);
            setService(e.target.value);
          }}
        >
          <MenuItem value={"painter"}>Painter</MenuItem>
          <MenuItem value={"driver"}>Driver</MenuItem>
          <MenuItem value={"masonry"}>Masonry</MenuItem>
        </StyledTextField>

        {/* ----------- Working Days --------------- */}

        <StyledTextField
          select
          size="small"
          label="Working Days *"
          error={!workingDaysVerified}
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

        <Autocomplete
          multiple
          onChange={(event: any, value: any) => {
            setEmployees(value);
          }}
          value={employees}
          fullWidth
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
        />

        {/* ----------- Experience --------------- */}

        <StyledTextField
          type={"number"}
          size="small"
          label="Experience (in Years)"
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
          sx={{ alignSelf: "end", paddingX: 4, marginY: 2, marginRight: 1 }}
          onClick={handleSaveClick}
        >
          Save
        </LinkButton>
      </Box>
    </>
  );
};
