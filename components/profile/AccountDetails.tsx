import { Box } from "@mui/system";
import React from "react";
import { PersonalDetails, ProfessionalDetails } from "../../ui";
import { useSelector } from "react-redux";
import { StoreState } from "../../store";

export const AccountDetails = () => {
  const role = useSelector((state: StoreState) => state.role.currentUser);

  return (
    <Box
      sx={{
        boxShadow: 8,
        borderRadius: 3,
      }}
    >
      <PersonalDetails />
      {role === "vendor" && <ProfessionalDetails />}
    </Box>
  );
};
