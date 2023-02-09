import { Stack, Typography } from "@mui/material";
import React from "react";
import { COLOR } from "../../constants";

export const AuthHeading = (props: { main: string; sub?: string }) => {
  return (
    <Stack height={"20%"} justifyContent={"space-around"}>
      <Typography
        variant="h4"
        align="center"
        sx={{ color: COLOR["H1d-font-primary"] }}
      >
        {props.main}
      </Typography>
      {props.sub && (
        <Typography
          variant="body2"
          fontWeight="200"
          sx={{
            color: COLOR["H1d-font-primary"],
            display: { xs: "none", sm: "block" },
          }}
        >
          {props.sub}
        </Typography>
      )}
    </Stack>
  );
};
