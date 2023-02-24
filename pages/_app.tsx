import { Provider, useDispatch } from "react-redux";
import { ConfirmProvider } from "material-ui-confirm";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import store from "../store";
import { ThemeProvider, createTheme } from "@mui/material";
import { Notifier } from "../components";
import Head from "next/head";

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
    <>
      <Head>
        <title>HireOne</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Find services available near you !" />
      </Head>
      <ConfirmProvider>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <Component {...pageProps} />
            <Notifier />
          </Provider>
        </ThemeProvider>
      </ConfirmProvider>
    </>
  );
}
