import { Box, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DashStat, LineChart, PieChart } from "../../ui";
import { MONTHS } from "../../constants";
import {
  getAllServiceTitles,
  getVendorCountByService,
  lastWeekMadeDocs,
  monthlyMade,
} from "../../APIs";
import { useSelector } from "react-redux";
import { StoreState } from "../../store/store";
import { firstLetterCapitalizer } from "../../utils";

interface PieData {
  id: string;
  label: string;
  value: number;
  color: string;
}

interface LineData {
  id: string;
  color: string;
  data: {
    x: string;
    y: number;
  }[];
}

export const Dashboard = () => {
  const [weeklyAppointments, setWeeklyAppointments] = useState(0);
  const [weeklyPosts, setWeeklyPosts] = useState(0);
  const [weeklyProjects, setWeeklyProjects] = useState(0);
  const [weeklySignups, setWeeklySignups] = useState(0);

  const [pieData, setPieData] = useState<PieData[]>([]);
  const [lineData, setLineData] = useState<LineData[]>([]);

  const token = useSelector((state: StoreState) => state.jwt.token);

  const getAndSetData = async () => {
    try {
      const appoCount = await lastWeekMadeDocs(token, "appointment");
      const postCount = await lastWeekMadeDocs(token, "post");
      const projCount = await lastWeekMadeDocs(token, "project");
      const signupCount = await lastWeekMadeDocs(token, "user");

      setWeeklyAppointments(appoCount || 0);
      setWeeklyPosts(postCount || 0);
      setWeeklyProjects(projCount || 0);
      setWeeklySignups(signupCount || 0);
    } catch (err) {
      console.error(err);
    }
  };

  const PieDataFormatter = async () => {
    try {
      const pieData: { _id: string; count: number }[] =
        await getVendorCountByService(token);
      const services: { _id: string; title: string }[] =
        await getAllServiceTitles();
      const data = pieData.map((el) => {
        const serviceIdx = services.findIndex((s) => s._id === el._id);
        const serviceTitle = services[serviceIdx]?.title;
        const randInt = Math.floor(Math.random() * 360 + 1);
        return {
          id: serviceTitle,
          label: firstLetterCapitalizer(serviceTitle),
          value: el.count,
          color: `hsl(${randInt}, 70%, 50%)`,
        };
      });
      setPieData(data);
    } catch (err) {}
  };

  const monthlyFormatter = (arr: number[]): { x: string; y: number }[] => {
    return arr.map((val, ind) => {
      return {
        x: MONTHS[ind],
        y: val,
      };
    });
  };

  const lineDataFormatter = async () => {
    try {
      const monthlySignupData = await monthlyMade(token, "user");
      const monthlyPostData = await monthlyMade(token, "post");
      const monthlyAppointmentData = await monthlyMade(token, "appointment");
      const monthlyProjectData = await monthlyMade(token, "project");

      const lineDataSet = [
        {
          id: `Users`,
          color: "hsl(86, 70%, 50%)",
          data: monthlyFormatter(monthlySignupData),
        },
        {
          id: `Posts`,
          color: "hsl(213, 70%, 50%)",
          data: monthlyFormatter(monthlyPostData),
        },
        {
          id: `Appointments`,
          color: "hsl(126, 70%, 50%)",
          data: monthlyFormatter(monthlyAppointmentData),
        },
        {
          id: `Projects`,
          color: "hsl(21, 70%, 50%)",
          data: monthlyFormatter(monthlyProjectData),
        },
      ];

      setLineData(lineDataSet);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAndSetData();
    PieDataFormatter();
    lineDataFormatter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box width={"100%"}>
      <Stack mb={3} gap={2} direction={"row"} width={`100%`}>
        <DashStat
          header="Weekly Appointments"
          value={weeklyAppointments.toString()}
        />
        <DashStat header="Weekly Signups" value={weeklySignups.toString()} />
        <DashStat header="Weekly Posts" value={weeklyPosts.toString()} />
        <DashStat header="Weekly Projects" value={weeklyProjects.toString()} />
      </Stack>
      <Stack mb={3} height={`50vh`} direction={`row`} gap={2} width={`100%`}>
        <Box borderRadius={3} bgcolor={`black`} flex={2}>
          <LineChart data={lineData} />
        </Box>
        <Box borderRadius={3} bgcolor={`black`} flex={1}>
          <PieChart data={pieData} />
        </Box>
      </Stack>
      <Box></Box>
    </Box>
  );
};
