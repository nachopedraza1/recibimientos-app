import '@/styles/globals.css';

import { AppProps } from "next/app";
import { AppThemeProvider } from "@/theme";

export default function App({ Component, pageProps }: AppProps) {


  return (
    <>
      <AppThemeProvider>
        <Component {...pageProps} />
      </AppThemeProvider>
    </>
  )

}
