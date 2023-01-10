import React from "react";
import { Box } from "@mui/material";
import { Stack } from "@mui/system";
import { AuthLogo } from "../../ui";
import { Signup } from "../../components/auth";

const index = () => {
  return (
    <Box>
      <Stack height={"100%"} direction={"row"} gap={1}>
        <AuthLogo />
        <Signup />
        <Box flex={1} sx={{ display: { xs: "none", lg: "block" } }} />
        {/* VOID*/}
      </Stack>
    </Box>
  );
};

export default index;
