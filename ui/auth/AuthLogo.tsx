import { Box, Typography } from "@mui/material";
import React from "react";
import { COLOR } from "../../constants";
import Link from "next/link";

export const AuthLogo = () => {
  return (
    <Box
      // flex={3}
      display="flex"
      height={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
      sx={{ display: { xs: "none", sm: "flex" }, flex: { xs: 1, md: 3 } }}
    >
      <Typography variant="h3" sx={{ color: COLOR["H1d-ui-primary"] }}>
        <Link href={"/"}>HireOne</Link>
      </Typography>
    </Box>
  );
};
