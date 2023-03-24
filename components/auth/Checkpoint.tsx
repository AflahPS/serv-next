import React from "react";
import { Box } from "@mui/material";
import { Stack } from "@mui/system";
import { AuthHeading, SimpleCard } from "../../ui";

export const Checkpoint = () => {
  return (
    <Box
      sx={{ flex: { xs: 1, md: 2 } }}
      bgcolor="black"
      height={"100vh"}
      minWidth={"34%"}
    >
      <Stack height={"100%"} paddingY={3} paddingX={5}>
        <AuthHeading main="Who are you ?" sub="Please select your role..." />
        <Stack height={"100%"} display={"flex"} justifyContent={"space-around"}>
          <SimpleCard
            href="/"
            head={"USER"}
            body="Find services and jobs near-by and much more..."
            buttonText="I'm a user"
          />
          <SimpleCard
            href="/auth/signup/vendor"
            head={"VENDOR"}
            body="Find clients who are in need of your service."
            buttonText="I'm a vendor"
          />
        </Stack>
      </Stack>
    </Box>
  );
};
