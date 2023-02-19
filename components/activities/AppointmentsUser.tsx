import React from "react";
import { AppointmentsTableUser } from "../../ui";
import { Box, Button, Stack, Typography } from "@mui/material";
import { AddCircleOutlineOutlined } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { sideNavTabActions } from "../../store/sidenav-tab.slice";

export const AppointmentsUser = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const handleNewClick = () => {
    router.push("/services");
  };

  return (
    <>
      <Box
        width={"100%"}
        marginTop={2}
        display={"flex"}
        justifyContent={"center"}
      >
        <Button variant="outlined" onClick={handleNewClick}>
          <Typography variant="button" fontSize={16}>
            <Stack direction={"row"} gap={1}>
              {`Create New Appointment`}
              <AddCircleOutlineOutlined />
            </Stack>
          </Typography>
        </Button>
      </Box>
      <AppointmentsTableUser />
    </>
  );
};
