import { Box } from "@mui/system";
import React from "react";
import { PersonalDetails, ProfessionalDetails } from "../../ui";
import { User } from "../../types";

interface Props {
  user: User;
  isProfileOwner: boolean;
}
export const AccountDetails: React.FC<Props> = (props) => {
  const { user, isProfileOwner } = props;
  const { role } = user;

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
