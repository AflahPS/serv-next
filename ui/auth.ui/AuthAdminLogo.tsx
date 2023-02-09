import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { COLOR } from "../../constants";
import Link from "next/link";
import { AdminPanelSettingsOutlined } from "@mui/icons-material";

export const AuthAdminLogo = () => {
  return (
    <Box
      // flex={3}
      display="flex"
      height={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
      sx={{ display: { xs: "none", sm: "flex" }, flex: { xs: 1, md: 3 } }}
    >
      <Stack>
        <Typography
          margin={0}
          variant="h3"
          sx={{ color: COLOR["H1d-ui-primary"] }}
        >
          <Link href={"/"}>HireOne</Link>
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ color: COLOR["H1d-font-primary"] }}
          margin={0}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"end"}
          gap={1}
          component={"span"}
        >
          ADMIN
          <AdminPanelSettingsOutlined />
        </Typography>
      </Stack>
    </Box>
  );
};
