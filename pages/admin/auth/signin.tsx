import { Box, Stack } from "@mui/material";
import React from "react";
import { AuthAdminLogo, AuthLogo } from "../../../ui";
import { Signin } from "../../../components";

const SigninAdmin = () => {
  return (
    <Box>
      <Stack height={"100%"} direction={"row"} gap={1}>
        <AuthAdminLogo />
        <Signin isAdmin />
        {/* VOID*/}
        <Box flex={1} sx={{ display: { xs: "none", lg: "block" } }} />
      </Stack>
    </Box>
  );
};

export default SigninAdmin;
