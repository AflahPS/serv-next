import { Provider } from "react-redux";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import store from "../store";
import { ThemeProvider, createTheme } from "@mui/material";

export default function App({ Component, pageProps }: AppProps) {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ThemeProvider>
  );
}
