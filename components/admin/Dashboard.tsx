import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { DashStat, LineChart, PieChart } from "../../ui";
import { LINE_DATA, PIE_DATA } from "../../constants";

export const Dashboard = () => {
  return (
    <Box width={"100%"}>
      <Stack mb={3} gap={2} direction={"row"} width={`100%`}>
        <DashStat header="Weekly Appointments" value="111" />
        <DashStat header="Weekly Signups" value="23" />
        <DashStat header="Weekly Posts" value="231" />
        <DashStat header="Weekly Projects" value="312" />
      </Stack>
      <Stack mb={3} height={`50vh`} direction={`row`} gap={2} width={`100%`}>
        <Box borderRadius={3} bgcolor={`black`} flex={2}>
          <LineChart data={LINE_DATA} />
        </Box>
        <Box borderRadius={3} bgcolor={`black`} flex={1}>
          <PieChart data={PIE_DATA} />
        </Box>
      </Stack>
      <Box></Box>
    </Box>
  );
};
