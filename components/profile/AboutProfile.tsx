import { Box, Stack } from "@mui/system";
import React from "react";
import { StatStack } from "../../ui";
import { Typography } from "@mui/material";
import { COLOR } from "../../constants";
import { Vendor } from "../../types";

export const AboutProfile: React.FC<{ user: Vendor }> = ({ user }) => {
  const service = user?.vendor?.service?.title || "-";

  return (
    <Stack
      sx={{
        backgroundColor: "black",
        boxShadow: 8,
        borderRadius: 3,
        marginY: 1,
      }}
    >
      <Box padding={2}>
        <Typography
          align="center"
          fontWeight={300}
          variant="body1"
          color={COLOR["H1d-font-primary"]}
        >
          {user?.about || ""}
        </Typography>
      </Box>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        paddingX={2}
        paddingY={1}
      >
        <StatStack name="Service" stat={service} />
        <StatStack
          name="Projects"
          stat={
            (user?.vendor?.projects &&
              user?.vendor?.projects.length.toString()) ||
            "0"
          }
        />
        <StatStack name="Location" stat={user.place} />
      </Stack>
    </Stack>
  );
};
