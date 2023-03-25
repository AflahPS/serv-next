import { Provider } from "react-redux";
import { ConfirmProvider } from "material-ui-confirm";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import store from "../store/store";
import { ThemeProvider } from "@mui/material";
import { Notifier } from "../components";
import Head from "next/head";
import { SocketContext, theme } from "../utils";
import { useState } from "react";
import { Socket } from "socket.io-client";

export default function App({ Component, pageProps }: AppProps) {
  const [socket, setSocket] = useState<Socket>();

  return (
    <>
      <Head>
        <title>HireOne</title>
        <link rel="manifest" href="/manifest.json" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Find services available near you !" />
      </Head>
      <SocketContext.Provider value={{ socket, setSocket }}>
        <ConfirmProvider>
          <ThemeProvider theme={theme}>
            <Provider store={store}>
              <Component {...pageProps} />
              <Notifier />
            </Provider>
          </ThemeProvider>
        </ConfirmProvider>
      </SocketContext.Provider>
    </>
  );
}
