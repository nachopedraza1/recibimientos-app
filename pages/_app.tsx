import '@/styles/globals.css';
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react"
import { AppThemeProvider } from "@/theme";
import { SnackbarProvider } from 'notistack';
import { AuthProvider } from '@/context/auth';

export default function App({ Component, pageProps }: AppProps) {

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
