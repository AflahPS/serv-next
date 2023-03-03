import { createTheme } from "@mui/material";

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor: string) =>
  augmentColor({ color: { main: mainColor } });
export const theme = createTheme({
  palette: {
    mode: "dark",
    uiPrimary: createColor("#50B5FF"),
    uiSecondary: createColor("#152027"),
    uiBgLight: createColor("#243642"),
    fontPrimary: createColor("#C7C7C7"),
    violet: createColor("#BC00A3"),
  },
});
