import { Box, Stack } from "@mui/system";
import React from "react";
import { StatStack } from "../../ui";
import { Typography } from "@mui/material";
import { COLOR } from "../../constants";

export const AboutProfile = () => {
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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem,
          molestias eveniet. Voluptatibus quas exercitationem vero voluptatem
          labore necessitatibus sequi.
        </Typography>
      </Box>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        paddingX={2}
        paddingY={1}
      >
        <StatStack name="Service" stat="Painter" />
        <StatStack name="Projects" stat="32" />
        <StatStack name="Location" stat="Kozhikode" />
      </Stack>
    </Stack>
  );
};
