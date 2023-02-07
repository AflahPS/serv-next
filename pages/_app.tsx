import { Provider } from "react-redux";
import { ConfirmProvider } from "material-ui-confirm";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import store from "../store";
import { ThemeProvider, createTheme } from "@mui/material";

export default function App({ Component, pageProps }: AppProps) {
  const { palette } = createTheme();
  const { augmentColor } = palette;
  const createColor = (mainColor: string) =>
    augmentColor({ color: { main: mainColor } });
  const theme = createTheme({
    palette: {
      mode: "dark",
      uiPrimary: createColor("#50B5FF"),
      uiSecondary: createColor("#152027"),
      uiBgLight: createColor("#243642"),
      fontPrimary: createColor("#C7C7C7"),
      violet: createColor("#BC00A3"),
    },
  });

  return (
    <ConfirmProvider>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ThemeProvider>
    </ConfirmProvider>
  );
}
