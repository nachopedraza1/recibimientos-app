import { useEffect } from 'react';
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react"
import { SnackbarProvider } from 'notistack';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

import { AuthProvider } from '@/context/auth';
import { UiProvider } from '@/context/ui';

import { AppThemeProvider } from "@/theme";
import { TransitionPage } from '@/components/layouts';

import '@/styles/globals.css';
import 'aos/dist/aos.css';
import AOS from 'aos';



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
      <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID! }}>
        <AuthProvider>
          <SnackbarProvider>
            <UiProvider>
              <AppThemeProvider>
               {/*  <TransitionPage> */}
                  <Component {...pageProps} />
               {/*  </TransitionPage> */}
              </AppThemeProvider>
            </UiProvider>
          </SnackbarProvider>
        </AuthProvider>
      </PayPalScriptProvider>
    </SessionProvider >
  )

}
