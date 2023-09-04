import AOS from 'aos';
import '@/styles/globals.css';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react"
import { AppThemeProvider } from "@/theme";
import { SnackbarProvider } from 'notistack';
import { AuthProvider } from '@/context/auth';

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
          <AppThemeProvider>
            <Component {...pageProps} />
          </AppThemeProvider>
        </SnackbarProvider>
      </AuthProvider>
    </SessionProvider>
  )

}
