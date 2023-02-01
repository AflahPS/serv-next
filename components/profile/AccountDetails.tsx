import { Box } from "@mui/system";
import React from "react";
import { PersonalDetails, ProfessionalDetails } from "../../ui";
import { User } from "../../types";

export const AccountDetails: React.FC<{
  user: User;
  isProfileOwner: boolean;
}> = ({ user, isProfileOwner }) => {
  const role = user?.role;

  return (
    <Box
      sx={{
        boxShadow: 8,
        borderRadius: 3,
      }}
    >
      <PersonalDetails user={user} isProfileOwner={isProfileOwner} />
      {role === "vendor" && (
        <ProfessionalDetails user={user} isProfileOwner={isProfileOwner} />
      )}
    </Box>
  );
};
