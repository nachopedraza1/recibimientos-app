import { useEffect } from 'react';
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react"

import { AuthProvider } from '@/context/auth';
import { UiProvider } from '@/context/ui';

import AOS from 'aos';
import '@/styles/globals.css';
import 'aos/dist/aos.css';
import { AppThemeProvider } from "@/theme";
import { SnackbarProvider } from 'notistack';


export default function App({ Component, pageProps }: AppProps) {


  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
    });
  }, [])



  return (
    <SessionProvider>
      <AuthProvider>
        <SnackbarProvider>
          <UiProvider>
            <AppThemeProvider>
              <Component {...pageProps} />
            </AppThemeProvider>
          </UiProvider>
        </SnackbarProvider>
      </AuthProvider>
    </SessionProvider >
  )

}
