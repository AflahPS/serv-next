import { Autocomplete, Box, MenuItem } from "@mui/material";
import React, { useRef, useState } from "react";
import { COLOR, USERS } from "../../constants";
import { LinkButton } from "../LinkButton";
import { TabHeader } from "../TabHeader";
import { StyledTextField } from "./StyledTextField";
import { TextFieldCustom2 } from "../TextFieldCustom2";

export const ProfessionalDetails = () => {
  const [serviceVerified, setServiceVerified] = useState(true);
  const [workingDaysVerified, setWorkingDaysVerified] = useState(true);
  const [employees, setEmployees] = useState([]);

  const serviceRef = useRef<HTMLInputElement>();
  const workingDaysRef = useRef<HTMLInputElement>();

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
        <StyledTextField
          select
          inputRef={serviceRef}
          size="small"
          label="Service / Profession"
          error={!serviceVerified}
          helperText={!serviceVerified ? "Please select a service" : ""}
          defaultValue={""}
        >
          <MenuItem value={"painter"}>Painter</MenuItem>
          <MenuItem value={"driver"}>Driver</MenuItem>
          <MenuItem value={"masonry"}>Masonry</MenuItem>
        </StyledTextField>

        <StyledTextField
          select
          inputRef={workingDaysRef}
          size="small"
          label="Working Days"
          error={!workingDaysVerified}
          helperText={!workingDaysVerified ? "Please select a woking days" : ""}
          defaultValue={""}
        >
          <MenuItem value={"painter"}>Everyday</MenuItem>
          <MenuItem value={"driver"}>Monday-Friday</MenuItem>
          <MenuItem value={"driver"}>Monday-Saturday</MenuItem>
          <MenuItem value={"driver"}>Saturday-Sunday</MenuItem>
          <MenuItem value={"masonry"}>Sunday</MenuItem>
        </StyledTextField>

        <StyledTextField
          type={"number"}
          size="small"
          label="Maximum Work-Distance in KM"
        />
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
          defaultValue={[]}
          renderInput={(params) => (
            <StyledTextField
              {...params}
              variant="outlined"
              label="Add more employees..."
              fullWidth
              size="small"
              placeholder="Employees"
            />
          )}
          sx={{ width: { xs: "100%", md: "93%" } }}
        />
        <StyledTextField
          type={"number"}
          size="small"
          label="Experience (in Years)"
        />
        <StyledTextField multiline rows={3} size="small" label="Description" />
        <LinkButton
          variant="outlined"
          sx={{ alignSelf: "end", paddingX: 4, marginY: 2, marginRight: 1 }}
        >
          Save
        </LinkButton>
      </Box>
    </>
  );
};
