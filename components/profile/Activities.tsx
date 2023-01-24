import { Box } from "@mui/material";
import React from "react";
import { TabHeader } from "../../ui";

export const Activities = () => {
  return (
    <Box
      sx={{
        boxShadow: 8,
        borderRadius: 3,
        // marginY: 2,
      }}
    >
      <TabHeader header="Activities" />
    </Box>
  );
};
