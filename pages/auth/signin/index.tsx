import React from "react";
import { Box } from "@mui/material";
import { Stack } from "@mui/system";
import { IsAuthProtection, Signin } from "../../../components/auth";
import { AuthLogo } from "../../../ui";

const index = () => {
  return (
    <IsAuthProtection>
      <Box>
        <Stack height={"100%"} direction={"row"} gap={1}>
          <AuthLogo />
          <Signin />
          <Box flex={1} sx={{ display: { xs: "none", lg: "block" } }} />
        </Stack>
      </Box>
    </IsAuthProtection>
  );
};

export default index;
