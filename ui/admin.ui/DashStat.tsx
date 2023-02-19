import React from "react";
import { Stack, Typography } from "@mui/material";
import { COLOR } from "../../constants";

export const DashStat: React.FC<{ header: string; value: string }> = ({
  header,
  value,
}) => {
  return (
    <Stack
      borderRadius={3}
      paddingY={2}
      paddingX={1}
      bgcolor={`black`}
      flex={1}
    >
      <Typography
        align="center"
        color={COLOR["H1d-font-primary"]}
        variant="button"
      >
        {header}
      </Typography>
      <Typography align="center" color={COLOR["H1d-ui-primary"]} variant="h4">
        {value} +
      </Typography>
    </Stack>
  );
};
