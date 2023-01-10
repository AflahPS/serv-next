import {
  Box,
  PaletteMode,
  Stack,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { SideNav, NavBar, Feed, ChatRight } from "../components/common";
import { useState } from "react";

export default function Home() {
  // const [mode, setMode] = useState<PaletteMode>("dark");

  // const darkTheme = createTheme({
  //   palette: {
  //     mode: mode,
  //   },
  // });

  return (
    // <ThemeProvider theme={darkTheme}>
    <Box>
      <NavBar />
      <Stack direction={"row"} spacing={2} justifyContent="space-between">
        <SideNav />
        <Feed />
        <ChatRight />
      </Stack>
    </Box>
    // </ThemeProvider>
  );
}
