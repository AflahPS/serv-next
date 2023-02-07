import React from "react";

import { EmployeeTable } from "../../ui";

export const Employees = () => {
  return (
    <>
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
      <EmployeeTable />
    </>
  );
};
