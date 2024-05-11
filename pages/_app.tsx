import { AppProps } from "next/app";

import "../styles/globals.css";
import RootLayout from "@/components/layout/RootLayout";
import { NotificationContextProvider } from "@/store/notification-context";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NotificationContextProvider>
      <RootLayout>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Component {...pageProps} />
      </RootLayout>
    </NotificationContextProvider>
  );
}

export default MyApp;
